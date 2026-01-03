/**
   * ============================================
   * Google Apps Script - Backend Auto eRPH
   * Version: 2.0 (dengan Auto Email)
   * ============================================
   *
   * CARA SETUP:
   * 1. Buka Google Sheets baru (ini akan jadi database anda)
   * 2. Extensions > Apps Script
   * 3. Padam semua kod default dan paste kod ini
   * 4. Simpan dan run fungsi setup() sekali
   * 5. Run fungsi setupTrigger() untuk activate auto email
   * 6. Deploy > New Deployment > Web App
   *    - Execute as: Me
   *    - Who has access: Anyone
   * 7. Copy URL Web App dan ganti GOOGLE_SCRIPT_URL dalam AutoErphPage.tsx
   */

  // ============================================
  // CONFIGURATION - UBAH MENGIKUT KEPERLUAN
  // ============================================

  // Nama folder dalam Google Drive
  const FOLDER_NAME = 'Resit Auto eRPH';
  const RPH_FOLDER_NAME = 'RPH Auto eRPH';

  // Link folder untuk pembeli Template (RM80)
  const TEMPLATE_FOLDER_LINK = 'https://drive.google.com/drive/folders/18scjNELa0L1nZCW9k2nICDXmRu9UAwgr?usp=sharing';

  // Slot Configuration - UBAH NILAI INI UNTUK SET JUMLAH SLOT
  const MAX_SLOTS = {
    'template-tersedia': 10,  // Pakej RM80 - 10 slot
    'custom-template': 3      // Pakej RM200 - 3 slot
  };

  // ============================================
  // SETUP FUNCTIONS
  // ============================================

  /**
   * Setup - Run sekali untuk sediakan sheet dan folder
   */
  function setup() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      sheet = ss.insertSheet('Orders');
    }

    // Headers lengkap
    const headers = ['Timestamp', 'Nama', 'Email', 'Telegram', 'Pakej', 'Link Resit', 'Jenis RPH', 'Link RPH', 'Status', 'Email Sent'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#4a5568');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    // Auto resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Setup dropdown untuk Status (dari row 2 sampai 1000)
    const statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Baru', 'Approved', 'Rejected'], true)
      .build();
    sheet.getRange(2, 9, 999, 1).setDataValidation(statusRule);

    // Sediakan folder untuk resit dan RPH
    getOrCreateFolder(FOLDER_NAME);
    getOrCreateFolder(RPH_FOLDER_NAME);

    Logger.log('✅ Setup selesai!');
    Logger.log('📋 Sheet ID: ' + SpreadsheetApp.getActiveSpreadsheet().getId());
    Logger.log('');
    Logger.log('⚠️  PENTING: Run setupTrigger() untuk activate auto email!');
  }

  /**
   * Setup trigger untuk auto email - RUN SEKALI SAHAJA
   */
  function setupTrigger() {
    // Padam trigger lama jika ada
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'onSheetEdit') {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Cipta trigger baru
    ScriptApp.newTrigger('onSheetEdit')
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onEdit()
      .create();

    Logger.log('✅ Trigger berjaya dicipta!');
    Logger.log('Auto email akan dihantar bila status tukar ke "Approved"');
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  /**
   * Dapatkan atau cipta folder
   */
  function getOrCreateFolder(folderName) {
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      return folders.next();
    }
    return DriveApp.createFolder(folderName);
  }

  /**
   * Upload file ke Google Drive (untuk resit dan RPH)
   */
  function uploadFile(base64Data, fileName, mimeType, customerName, folderName) {
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
      const folder = getOrCreateFolder(folderName);

      // Create unique filename
      const timestamp = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyyMMdd_HHmmss');
      const uniqueName = customerName.replace(/\s+/g, '_') + '_' + timestamp + '_' + fileName;

      // Upload file
      const file = folder.createFile(blob.setName(uniqueName));

      // Make file viewable by anyone with link
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      return file.getUrl();

    } catch (error) {
      Logger.log('Error uploading file: ' + error.toString());
      return 'Error upload: ' + error.toString();
    }
  }

  // ============================================
  // WEB APP HANDLERS
  // ============================================

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

      // RPH data (untuk pakej custom sahaja)
      const rphUploadType = params.rphUploadType || '';
      const rphFileBase64 = params.rphFile || '';
      const rphFileName = params.rphFileName || '';
      const rphFileType = params.rphFileType || '';
      const rphLink = params.rphLink || '';

      let resitLink = '';
      let rphReference = '';
      let rphTypeDisplay = '';

      // Upload resit ke Google Drive jika ada
      if (resitBase64 && resitName) {
        resitLink = uploadFile(resitBase64, resitName, resitType, nama, FOLDER_NAME);
      }

      // Handle RPH upload (untuk pakej custom)
      if (pakej === 'custom-template') {
        if (rphUploadType === 'excel' && rphFileBase64 && rphFileName) {
          // Upload Excel ke Google Drive
          rphReference = uploadFile(rphFileBase64, rphFileName, rphFileType, nama, RPH_FOLDER_NAME);
          rphTypeDisplay = 'Excel';
        } else if (rphUploadType === 'google-sheets' && rphLink) {
          // Simpan link Google Sheets terus
          rphReference = rphLink;
          rphTypeDisplay = 'Google Sheets';
        }
      }

      // Simpan ke Google Sheet
      saveToSheet(nama, email, telegram, pakej, resitLink, rphTypeDisplay, rphReference);

      // Hantar email notifikasi kepada admin
      sendNotificationEmail(nama, email, telegram, pakej, resitLink, rphTypeDisplay, rphReference);

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

  // ============================================
  // DATA FUNCTIONS
  // ============================================

  /**
   * Get slot availability for all packages
   */
  function getSlotAvailability() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders');

    const orderCounts = {
      'template-tersedia': 0,
      'custom-template': 0
    };

    if (sheet) {
      const data = sheet.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
        const pakej = data[i][4]; // Column E = Pakej

        if (pakej && pakej.includes('RM80')) {
          orderCounts['template-tersedia']++;
        } else if (pakej && pakej.includes('RM200')) {
          orderCounts['custom-template']++;
        }
      }
    }

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
   * Simpan data ke Google Sheet
   */
  function saveToSheet(nama, email, telegram, pakej, resitLink, rphType, rphLink) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      throw new Error('Sheet "Orders" tidak dijumpai. Sila run setup() dahulu.');
    }

    const timestamp = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
    const pakejDisplay = pakej === 'template-tersedia' ? 'Template Tersedia (RM80)' : 'Custom Template (RM200)';

    // Kolum: Timestamp, Nama, Email, Telegram, Pakej, Link Resit, Jenis RPH, Link RPH, Status, Email Sent
    const row = [timestamp, nama, email, telegram, pakejDisplay, resitLink, rphType, rphLink, 'Baru', ''];
    sheet.appendRow(row);
  }

  // ============================================
  // EMAIL FUNCTIONS
  // ============================================

  /**
   * Hantar email notifikasi kepada admin (bila ada order baru)
   */
  function sendNotificationEmail(nama, email, telegram, pakej, resitLink, rphType, rphLink) {
    try {
      const adminEmail = Session.getActiveUser().getEmail();
      const pakejDisplay = pakej === 'template-tersedia' ? 'Template Tersedia (RM80)' : 'Custom Template (RM200)';

      const subject = '🎉 Tempahan Baru Auto eRPH - ' + nama;

      let rphInfo = '';
      if (pakej === 'custom-template' && rphLink) {
        rphInfo = `
  📄 RPH PELANGGAN
  Jenis: ${rphType}
  Link: ${rphLink}
  `;
      }

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
  ${rphInfo}
  ━━━━━━━━━━━━━━━━━━━━
  Sila semak dan proses tempahan ini.
      `;

      MailApp.sendEmail(adminEmail, subject, body);

    } catch (error) {
      Logger.log('Error sending notification email: ' + error.toString());
    }
  }

  /**
   * Hantar email approval dengan link folder (untuk pembeli RM80)
   */
  function sendApprovalEmail(nama, email) {
    const subject = '✅ Akses Auto eRPH Anda Sudah Sedia!';

    const body = `Assalamualaikum ${nama},

  Terima kasih kerana membeli Auto eRPH! 🎉

  Pembayaran anda telah disahkan. Berikut adalah akses kepada template dan video tutorial:

  📁 LINK AKSES
  ${TEMPLATE_FOLDER_LINK}

  Dalam folder tersebut, anda akan jumpa:
  • Template Auto eRPH
  • Video tutorial cara setup
  • Panduan penggunaan

  Jika ada sebarang soalan, boleh hubungi saya di Telegram.

  Terima kasih! 🙏

  ---
  Cikgu Aime
  Auto eRPH`;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
  }

  // ============================================
  // AUTO EMAIL TRIGGER
  // ============================================

  /**
   * Trigger: Dijalankan setiap kali ada edit dalam sheet
   */
  function onSheetEdit(e) {
    try {
      const sheet = e.source.getActiveSheet();

      // Hanya proses sheet "Orders"
      if (sheet.getName() !== 'Orders') return;

      const range = e.range;
      const row = range.getRow();
      const col = range.getColumn();

      // Column index (1-based):
      // 1=Timestamp, 2=Nama, 3=Email, 4=Telegram, 5=Pakej,
      // 6=Link Resit, 7=Jenis RPH, 8=Link RPH, 9=Status, 10=Email Sent
      const STATUS_COL = 9;
      const EMAIL_SENT_COL = 10;

      // Hanya proses jika edit pada kolum Status
      if (col !== STATUS_COL) return;

      // Skip header row
      if (row === 1) return;

      // FIX: Dapatkan value terus dari cell, bukan dari e.value
      // e.value mungkin undefined untuk dropdown atau installable trigger
      const newValue = sheet.getRange(row, col).getValue();

      Logger.log('Status changed to: ' + newValue + ' for row ' + row);

      // Hanya proses jika status tukar ke "Approved"
      if (newValue !== 'Approved') return;

      // Check jika email sudah dihantar
      const emailSent = sheet.getRange(row, EMAIL_SENT_COL).getValue();
      if (emailSent === 'Yes' || emailSent === 'Manual') {
        Logger.log('Email sudah dihantar/diproses sebelum ini. Skip.');
        return;
      }

      // Dapatkan data row
      const rowData = sheet.getRange(row, 1, 1, 9).getValues()[0];
      const nama = rowData[1];
      const email = rowData[2];
      const pakej = rowData[4];

      Logger.log('Processing: ' + nama + ' (' + email + ') - ' + pakej);

      // Hanya hantar email untuk pakej Template (RM80)
      if (!pakej.includes('RM80')) {
        Logger.log('Pakej Custom (RM200) - skip auto email. PM manual.');
        sheet.getRange(row, EMAIL_SENT_COL).setValue('Manual');
        return;
      }

      // Hantar email
      sendApprovalEmail(nama, email);

      // Mark as sent
      sheet.getRange(row, EMAIL_SENT_COL).setValue('Yes');
      Logger.log('✅ Email berjaya dihantar kepada: ' + email);

    } catch (error) {
      Logger.log('Error in onSheetEdit: ' + error.toString());
    }
  }

  // ============================================
  // TEST FUNCTIONS
  // ============================================

  /**
   * Test order submission
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

  /**
   * Test custom order dengan RPH
   */
  function testDoPostCustom() {
    const mockEvent = {
      parameter: {
        nama: 'Test Custom User',
        email: 'custom@example.com',
        telegram: '@customuser',
        pakej: 'custom-template',
        rphUploadType: 'google-sheets',
        rphLink: 'https://docs.google.com/spreadsheets/d/abc123'
      }
    };

    const result = doPost(mockEvent);
    Logger.log(result.getContent());
  }

  /**
   * Test approval email
   */
  function testApprovalEmail() {
    // Ganti dengan email anda untuk test
    sendApprovalEmail('Test User', Session.getActiveUser().getEmail());
    Logger.log('✅ Test email dihantar!');
  }