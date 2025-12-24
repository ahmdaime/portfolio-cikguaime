/**
 * Auto eRPH Order Form Backend
 * Google Apps Script Web App
 *
 * SETUP:
 * 1. Buka Google Sheets baru untuk tempahan
 * 2. Extensions > Apps Script
 * 3. Copy kod ini ke dalam editor
 * 4. Ganti SPREADSHEET_ID dengan ID spreadsheet anda
 * 5. Ganti FOLDER_ID dengan ID folder Google Drive untuk simpan fail
 * 6. Deploy > New deployment > Web app
 * 7. Execute as: Me, Who has access: Anyone
 * 8. Copy URL dan paste dalam AutoErphPage.tsx (APPS_SCRIPT_URL)
 */

// ============================================================================
// KONFIGURASI - GANTI DENGAN ID ANDA
// ============================================================================

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ID Google Sheets untuk log tempahan
const FOLDER_ID = 'YOUR_FOLDER_ID'; // ID Google Drive folder untuk simpan template
const SHEET_NAME = 'Tempahan'; // Nama sheet

// ============================================================================
// WEB APP HANDLERS
// ============================================================================

/**
 * Handle GET requests (untuk testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Auto eRPH Order Form Backend is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests dari form
 */
function doPost(e) {
  try {
    // Parse JSON data
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.namaGuru || !data.noWhatsapp || !data.namaSekolah || !data.negeri) {
      return createResponse(false, 'Data tidak lengkap');
    }

    // Save file to Google Drive
    let fileUrl = '';
    if (data.fileBase64 && data.fileName) {
      fileUrl = saveFileToDrive(data.fileBase64, data.fileName, data.namaGuru);
    }

    // Log to spreadsheet
    logToSpreadsheet({
      timestamp: data.timestamp || new Date().toISOString(),
      namaGuru: data.namaGuru,
      noWhatsapp: data.noWhatsapp,
      namaSekolah: data.namaSekolah,
      negeri: data.negeri,
      subjek: data.subjek || '',
      catatan: data.catatan || '',
      fileName: data.fileName || '',
      fileUrl: fileUrl,
      status: 'Baru'
    });

    // Send email notification (optional)
    sendNotificationEmail(data, fileUrl);

    return createResponse(true, 'Tempahan berjaya diterima');

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Ralat: ' + error.message);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create JSON response
 */
function createResponse(success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save base64 file to Google Drive
 */
function saveFileToDrive(base64Data, fileName, namaGuru) {
  try {
    // Decode base64
    const decoded = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(decoded, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName);

    // Get or create folder
    let folder;
    if (FOLDER_ID && FOLDER_ID !== 'YOUR_FOLDER_ID') {
      folder = DriveApp.getFolderById(FOLDER_ID);
    } else {
      // Create folder if not specified
      const folders = DriveApp.getFoldersByName('Auto eRPH Templates');
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder('Auto eRPH Templates');
      }
    }

    // Create unique filename
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyyMMdd_HHmmss');
    const uniqueName = namaGuru.replace(/[^a-zA-Z0-9]/g, '_') + '_' + timestamp + '_' + fileName;

    // Save file
    const file = folder.createFile(blob.setName(uniqueName));

    return file.getUrl();

  } catch (error) {
    Logger.log('Error saving file: ' + error.toString());
    return 'Error: ' + error.message;
  }
}

/**
 * Log order to spreadsheet
 */
function logToSpreadsheet(data) {
  try {
    let ss;
    if (SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID') {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } else {
      // Create new spreadsheet if not specified
      ss = SpreadsheetApp.create('Auto eRPH Tempahan');
      Logger.log('Created new spreadsheet: ' + ss.getUrl());
    }

    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet with headers if not exists
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 10).setValues([[
        'Timestamp',
        'Nama Guru',
        'No. WhatsApp',
        'Nama Sekolah',
        'Negeri',
        'Subjek',
        'Catatan',
        'Nama Fail',
        'Link Fail',
        'Status'
      ]]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Append new row
    sheet.appendRow([
      data.timestamp,
      data.namaGuru,
      data.noWhatsapp,
      data.namaSekolah,
      data.negeri,
      data.subjek,
      data.catatan,
      data.fileName,
      data.fileUrl,
      data.status
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 10);

  } catch (error) {
    Logger.log('Error logging to spreadsheet: ' + error.toString());
  }
}

/**
 * Send email notification for new order
 */
function sendNotificationEmail(data, fileUrl) {
  try {
    const recipient = Session.getActiveUser().getEmail();

    if (!recipient) {
      Logger.log('No email recipient found');
      return;
    }

    const subject = '🆕 Tempahan Baru Auto eRPH - ' + data.namaGuru;

    const body = `
Tempahan Baru Auto eRPH!

================================
MAKLUMAT PELANGGAN
================================
Nama: ${data.namaGuru}
WhatsApp: ${data.noWhatsapp}
Sekolah: ${data.namaSekolah}
Negeri: ${data.negeri}
Subjek: ${data.subjek || '-'}
Catatan: ${data.catatan || '-'}

================================
FAIL TEMPLATE
================================
Nama Fail: ${data.fileName || '-'}
Link: ${fileUrl || '-'}

================================
Masa Tempahan: ${data.timestamp}
================================

Sila hubungi pelanggan dalam masa 24 jam.
    `;

    MailApp.sendEmail(recipient, subject, body);
    Logger.log('Notification email sent to ' + recipient);

  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
  }
}

// ============================================================================
// TEST FUNCTIONS
// ============================================================================

/**
 * Test function - run this to check if everything works
 */
function testSetup() {
  Logger.log('=== Testing Auto eRPH Backend ===');

  // Test spreadsheet access
  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID') {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      Logger.log('✅ Spreadsheet accessible: ' + ss.getName());
    } else {
      Logger.log('⚠️ SPREADSHEET_ID not configured - will create new spreadsheet on first order');
    }
  } catch (e) {
    Logger.log('❌ Spreadsheet error: ' + e.message);
  }

  // Test folder access
  try {
    if (FOLDER_ID && FOLDER_ID !== 'YOUR_FOLDER_ID') {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      Logger.log('✅ Folder accessible: ' + folder.getName());
    } else {
      Logger.log('⚠️ FOLDER_ID not configured - will create "Auto eRPH Templates" folder');
    }
  } catch (e) {
    Logger.log('❌ Folder error: ' + e.message);
  }

  Logger.log('=== Test Complete ===');
}

/**
 * Test with sample data
 */
function testOrder() {
  const sampleData = {
    namaGuru: 'Cikgu Test',
    noWhatsapp: '0123456789',
    namaSekolah: 'SK Test',
    negeri: 'Selangor',
    subjek: 'Bahasa Melayu',
    catatan: 'Ini adalah test',
    timestamp: new Date().toISOString()
  };

  logToSpreadsheet({
    ...sampleData,
    fileName: '',
    fileUrl: '',
    status: 'Test'
  });

  Logger.log('✅ Test order logged successfully');
}
