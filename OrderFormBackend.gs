/**
 * Google Apps Script - Backend untuk Order Form Auto eRPH
 *
 * CARA SETUP:
 * 1. Buka Google Sheets baru (ini akan jadi database anda)
 * 2. Extensions > Apps Script
 * 3. Padam semua kod default dan paste kod ini
 * 4. Simpan dan run fungsi setup() sekali
 * 5. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy URL Web App dan ganti GOOGLE_SCRIPT_URL dalam AutoErphPage.tsx
 */

// ID Google Sheet (akan diisi selepas setup)
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// ID Folder Google Drive untuk simpan resit (akan dicipta automatik)
const FOLDER_NAME = 'Resit Auto eRPH';

// Slot Configuration - UBAH NILAI INI UNTUK SET JUMLAH SLOT
const MAX_SLOTS = {
  'template-tersedia': 10,  // Pakej RM80 - 10 slot
  'custom-template': 3      // Pakej RM200 - 3 slot
};

/**
 * Setup - Run sekali untuk sediakan sheet dan folder
 */
function setup() {
  // Sediakan sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Orders');

  if (!sheet) {
    sheet = ss.insertSheet('Orders');
  }

  // Set headers
  const headers = ['Timestamp', 'Nama', 'Email', 'Telegram', 'Pakej', 'Link Resit', 'Status'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);

  // Auto resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }

  // Sediakan folder untuk resit
  getOrCreateFolder();

  Logger.log('Setup selesai! Sheet dan folder sudah sedia.');
  Logger.log('Sheet ID: ' + SHEET_ID);
}

/**
 * Dapatkan atau cipta folder untuk resit
 */
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(FOLDER_NAME);
}

/**
 * Handle POST request dari form
 */
function doPost(e) {
  try {
    const params = e.parameter;

    const nama = params.nama || '';
    const email = params.email || '';
    const telegram = params.telegram || '';
    const pakej = params.pakej || '';
    const resitBase64 = params.resit || '';
    const resitName = params.resitName || '';
    const resitType = params.resitType || '';

    let resitLink = '';

    // Upload resit ke Google Drive jika ada
    if (resitBase64 && resitName) {
      resitLink = uploadResit(resitBase64, resitName, resitType, nama);
    }

    // Simpan ke Google Sheet
    saveToSheet(nama, email, telegram, pakej, resitLink);

    // Hantar email notifikasi (optional)
    sendNotificationEmail(nama, email, telegram, pakej, resitLink);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Tempahan berjaya!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET request - Return slot availability
 */
function doGet(e) {
  try {
    const slots = getSlotAvailability();

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        slots: slots
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get slot availability for all packages
 */
function getSlotAvailability() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Orders');

  // Default counts
  const orderCounts = {
    'template-tersedia': 0,
    'custom-template': 0
  };

  if (sheet) {
    const data = sheet.getDataRange().getValues();

    // Skip header row, count orders per package
    for (let i = 1; i < data.length; i++) {
      const pakej = data[i][4]; // Column E = Pakej

      if (pakej && pakej.includes('RM80')) {
        orderCounts['template-tersedia']++;
      } else if (pakej && pakej.includes('RM200')) {
        orderCounts['custom-template']++;
      }
    }
  }

  // Calculate remaining slots
  return {
    'template-tersedia': {
      max: MAX_SLOTS['template-tersedia'],
      sold: orderCounts['template-tersedia'],
      remaining: Math.max(0, MAX_SLOTS['template-tersedia'] - orderCounts['template-tersedia'])
    },
    'custom-template': {
      max: MAX_SLOTS['custom-template'],
      sold: orderCounts['custom-template'],
      remaining: Math.max(0, MAX_SLOTS['custom-template'] - orderCounts['custom-template'])
    }
  };
}

/**
 * Upload resit ke Google Drive
 */
function uploadResit(base64Data, fileName, mimeType, customerName) {
  try {
    // Remove data URL prefix if present
    const base64Content = base64Data.replace(/^data:[^;]+;base64,/, '');

    // Decode base64
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Content),
      mimeType,
      fileName
    );

    // Get folder
    const folder = getOrCreateFolder();

    // Create unique filename
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyyMMdd_HHmmss');
    const uniqueName = customerName.replace(/\s+/g, '_') + '_' + timestamp + '_' + fileName;

    // Upload file
    const file = folder.createFile(blob.setName(uniqueName));

    // Make file viewable by anyone with link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();

  } catch (error) {
    Logger.log('Error uploading resit: ' + error.toString());
    return 'Error upload: ' + error.toString();
  }
}

/**
 * Simpan data ke Google Sheet
 */
function saveToSheet(nama, email, telegram, pakej, resitLink) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Orders');

  if (!sheet) {
    throw new Error('Sheet "Orders" tidak dijumpai. Sila run setup() dahulu.');
  }

  const timestamp = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
  const pakejDisplay = pakej === 'template-tersedia' ? 'Template Tersedia (RM80)' : 'Custom Template (RM200)';

  const row = [timestamp, nama, email, telegram, pakejDisplay, resitLink, 'Baru'];
  sheet.appendRow(row);
}

/**
 * Hantar email notifikasi kepada admin
 */
function sendNotificationEmail(nama, email, telegram, pakej, resitLink) {
  try {
    const adminEmail = Session.getActiveUser().getEmail();
    const pakejDisplay = pakej === 'template-tersedia' ? 'Template Tersedia (RM80)' : 'Custom Template (RM200)';

    const subject = '🎉 Tempahan Baru Auto eRPH - ' + nama;
    const body = `
Anda menerima tempahan baru!

📋 MAKLUMAT PELANGGAN
━━━━━━━━━━━━━━━━━━━━
Nama: ${nama}
Email: ${email}
Telegram: ${telegram}
Pakej: ${pakejDisplay}

📎 RESIT PEMBAYARAN
${resitLink ? resitLink : 'Tiada resit dimuat naik'}

━━━━━━━━━━━━━━━━━━━━
Sila semak dan proses tempahan ini.
    `;

    MailApp.sendEmail(adminEmail, subject, body);

  } catch (error) {
    Logger.log('Error sending email: ' + error.toString());
  }
}

/**
 * Test function
 */
function testDoPost() {
  const mockEvent = {
    parameter: {
      nama: 'Test User',
      email: 'test@example.com',
      telegram: '@testuser',
      pakej: 'template-tersedia'
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
