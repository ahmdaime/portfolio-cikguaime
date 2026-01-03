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
  // MENU & UI FUNCTIONS
  // ============================================

  /**
   * Cipta custom menu bila spreadsheet dibuka
   * Menu akan muncul di toolbar Google Sheets
   */
  function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('📧 Auto eRPH')
      .addItem('📝 Buat Draft Email (Row Dipilih)', 'sendEmailToSelectedRow')
      .addItem('📝 Buat Draft Semua Approved', 'sendEmailToAllApproved')
      .addItem('📤 Buka Gmail Drafts', 'openGmailDrafts')
      .addSeparator()
      .addItem('🔧 Run Diagnostic', 'runFullDiagnostic')
      .addItem('📊 Check Email Quota', 'checkEmailQuotaUI')
      .addItem('✅ Check Triggers', 'checkTriggersUI')
      .addSeparator()
      .addItem('⚙️ Setup Trigger', 'setupTrigger')
      .addToUi();
  }

  /**
   * Buka Gmail Drafts dalam tab baru
   */
  function openGmailDrafts() {
    const ui = SpreadsheetApp.getUi();
    const html = HtmlService.createHtmlOutput(
      '<script>window.open("https://mail.google.com/mail/u/0/#drafts", "_blank");google.script.host.close();</script>'
    ).setWidth(100).setHeight(50);
    ui.showModalDialog(html, 'Membuka Gmail Drafts...');
  }

  /**
   * Hantar email ke row yang sedang dipilih
   * Pengguna select mana-mana cell dalam row, kemudian klik menu
   */
  function sendEmailToSelectedRow() {
    const ui = SpreadsheetApp.getUi();
    const sheet = SpreadsheetApp.getActiveSheet();

    // Check jika sheet betul
    if (sheet.getName() !== 'Orders') {
      ui.alert('❌ Error', 'Sila buka sheet "Orders" dahulu.', ui.ButtonSet.OK);
      return;
    }

    const selectedRow = sheet.getActiveRange().getRow();

    // Skip header
    if (selectedRow < 2) {
      ui.alert('❌ Error', 'Sila pilih row data (bukan header).', ui.ButtonSet.OK);
      return;
    }

    // Get row data
    const rowData = sheet.getRange(selectedRow, 1, 1, 10).getValues()[0];
    const nama = rowData[1];
    const email = rowData[2];
    const pakej = rowData[4];
    const status = rowData[8];
    const emailSentStatus = rowData[9];

    // Validate
    if (!email) {
      ui.alert('❌ Error', 'Email kosong untuk row ini.', ui.ButtonSet.OK);
      return;
    }

    // Confirm before creating draft
    const confirm = ui.alert(
      '📝 Buat Draft Email?',
      'Buat draft email untuk:\n\n' +
      'Nama: ' + nama + '\n' +
      'Email: ' + email + '\n' +
      'Pakej: ' + pakej + '\n' +
      'Status: ' + status,
      ui.ButtonSet.YES_NO
    );

    if (confirm !== ui.Button.YES) {
      return;
    }

    // Create draft
    const success = sendApprovalEmail(nama, email);

    if (success) {
      sheet.getRange(selectedRow, 10).setValue('DRAFT - Check Gmail');
      ui.alert('✅ Draft Berjaya!',
        'Draft email telah dicipta untuk ' + email + '\n\n' +
        '➡️ Buka Gmail > Drafts > Klik Send',
        ui.ButtonSet.OK);
    } else {
      sheet.getRange(selectedRow, 10).setValue('FAILED');
      ui.alert('❌ Gagal!', 'Gagal buat draft. Check Logs untuk details.', ui.ButtonSet.OK);
    }
  }

  /**
   * Buat draft email untuk SEMUA row yang status "Approved" tapi belum ada draft
   */
  function sendEmailToAllApproved() {
    const ui = SpreadsheetApp.getUi();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');

    if (!sheet) {
      ui.alert('❌ Error', 'Sheet "Orders" tidak dijumpai.', ui.ButtonSet.OK);
      return;
    }

    const data = sheet.getDataRange().getValues();
    const pendingRows = [];

    // Find all approved but not sent/drafted
    for (let i = 1; i < data.length; i++) {
      const status = data[i][8];
      const emailSent = data[i][9];
      const pakej = data[i][4];

      // Skip jika sudah ada status (Yes, DRAFT, Manual, etc)
      if (status === 'Approved' && !emailSent && pakej.includes('RM80')) {
        pendingRows.push({
          row: i + 1,
          nama: data[i][1],
          email: data[i][2]
        });
      }
    }

    if (pendingRows.length === 0) {
      ui.alert('ℹ️ Info', 'Tiada draft pending untuk dicipta.\n\nSemua order yang Approved sudah ada draft/dihantar.', ui.ButtonSet.OK);
      return;
    }

    // Confirm
    const confirm = ui.alert(
      '📝 Buat Draft Pukal?',
      'Jumpa ' + pendingRows.length + ' order yang perlu draft email:\n\n' +
      pendingRows.map(r => '• ' + r.nama + ' (' + r.email + ')').join('\n'),
      ui.ButtonSet.YES_NO
    );

    if (confirm !== ui.Button.YES) {
      return;
    }

    // Create all drafts
    let successCount = 0;
    let failCount = 0;

    pendingRows.forEach(item => {
      const success = sendApprovalEmail(item.nama, item.email);
      if (success) {
        sheet.getRange(item.row, 10).setValue('DRAFT - Check Gmail');
        successCount++;
      } else {
        sheet.getRange(item.row, 10).setValue('FAILED');
        failCount++;
      }
    });

    ui.alert(
      '📊 Selesai',
      'Draft dicipta: ' + successCount + '\nGagal: ' + failCount + '\n\n' +
      '➡️ Buka Gmail > Drafts > Send semua',
      ui.ButtonSet.OK
    );
  }

  /**
   * UI wrapper untuk check email quota
   */
  function checkEmailQuotaUI() {
    const ui = SpreadsheetApp.getUi();
    const quota = MailApp.getRemainingDailyQuota();
    ui.alert('📧 Email Quota', 'Baki email hari ini: ' + quota, ui.ButtonSet.OK);
  }

  /**
   * UI wrapper untuk check triggers
   */
  function checkTriggersUI() {
    const ui = SpreadsheetApp.getUi();
    const triggers = ScriptApp.getProjectTriggers();
    const hasOnSheetEdit = triggers.some(t => t.getHandlerFunction() === 'onSheetEdit');

    if (hasOnSheetEdit) {
      ui.alert('✅ Trigger Status', 'Trigger onSheetEdit AKTIF.\n\nEmail akan dihantar automatik bila status tukar ke Approved.', ui.ButtonSet.OK);
    } else {
      ui.alert('❌ Trigger Status', 'Trigger TIDAK AKTIF!\n\nSila run "Setup Trigger" dari menu.', ui.ButtonSet.OK);
    }
  }

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
   * Buat DRAFT email approval (user perlu send manual dari Gmail)
   * Ini untuk elak Gmail block automated emails
   * @param {string} nama - Nama customer
   * @param {string} email - Email customer
   * @returns {boolean} true jika draft berjaya dicipta
   */
  function sendApprovalEmail(nama, email) {
    try {
      // Validate email
      if (!email || !email.includes('@')) {
        Logger.log('❌ Email tidak sah: ' + email);
        return false;
      }

      Logger.log('📧 Creating draft for: ' + email);

      const subject = 'Akses Auto eRPH Anda Sudah Sedia! - ' + nama;

      // HTML body (cantik)
      const bodyHtml = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
        '<h2 style="color: #2563eb;">Akses Auto eRPH Anda Sudah Sedia!</h2>' +
        '<p>Assalamualaikum <strong>' + nama + '</strong>,</p>' +
        '<p>Terima kasih kerana membeli Auto eRPH!</p>' +
        '<p>Pembayaran anda telah disahkan. Berikut adalah akses kepada template dan video tutorial:</p>' +
        '<p style="background: #f3f4f6; padding: 15px; border-radius: 8px;">' +
        '<strong>LINK AKSES:</strong><br>' +
        '<a href="' + TEMPLATE_FOLDER_LINK + '" style="color: #2563eb;">' + TEMPLATE_FOLDER_LINK + '</a>' +
        '</p>' +
        '<p>Dalam folder tersebut, anda akan jumpa:</p>' +
        '<ul>' +
        '<li>Template Auto eRPH</li>' +
        '<li>Video tutorial cara setup</li>' +
        '<li>Panduan penggunaan</li>' +
        '</ul>' +
        '<p>Jika ada sebarang soalan, boleh hubungi saya di Telegram.</p>' +
        '<p>Terima kasih!</p>' +
        '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">' +
        '<p style="color: #6b7280; font-size: 14px;">Cikgu Aime<br>Auto eRPH</p>' +
        '</div>';

      // Buat draft (bukan send terus)
      const draft = GmailApp.createDraft(email, subject, '', {
        htmlBody: bodyHtml,
        name: 'Cikgu Aime - Auto eRPH'
      });

      Logger.log('✅ DRAFT BERJAYA DICIPTA!');
      Logger.log('📧 To: ' + email);
      Logger.log('📧 Subject: ' + subject);
      Logger.log('');
      Logger.log('➡️ Buka Gmail > Drafts > Klik Send');

      return true;

    } catch (error) {
      Logger.log('❌ GAGAL buat draft untuk ' + email + ': ' + error.toString());
      return false;
    }
  }

  /**
   * Hantar TERUS email (bypass draft) - guna jika nak cuba send terus
   * @param {string} nama - Nama customer
   * @param {string} email - Email customer
   */
  function sendEmailDirect(nama, email) {
    try {
      if (!email || !email.includes('@')) {
        Logger.log('❌ Email tidak sah: ' + email);
        return false;
      }

      const subject = 'Akses Auto eRPH Anda Sudah Sedia!';
      const bodyText = 'Assalamualaikum ' + nama + ',\n\n' +
        'Terima kasih kerana membeli Auto eRPH!\n\n' +
        'Pembayaran anda telah disahkan. Berikut adalah akses:\n' +
        TEMPLATE_FOLDER_LINK + '\n\n' +
        'Terima kasih!\n\nCikgu Aime';

      GmailApp.sendEmail(email, subject, bodyText);
      Logger.log('✅ Email DIRECT dihantar ke: ' + email);
      return true;

    } catch (error) {
      Logger.log('❌ GAGAL: ' + error.toString());
      return false;
    }
  }

  /**
   * Debug: Check Gmail Sent folder - MUDAH RUN
   * Tukar email di bawah kepada email yang anda nak check
   */
  function checkMySentEmails() {
    // ⬇️ TUKAR EMAIL INI kepada email dummy/customer anda
    const emailToCheck = 'TUKAR_EMAIL_SINI@gmail.com';

    Logger.log('=== CHECKING SENT EMAILS TO: ' + emailToCheck + ' ===');

    const threads = GmailApp.search('to:' + emailToCheck, 0, 10);
    Logger.log('Found ' + threads.length + ' email threads');

    if (threads.length === 0) {
      Logger.log('❌ Tiada email dijumpai ke alamat ini dalam Sent folder');
      Logger.log('Ini bermakna email TIDAK dihantar langsung.');
      return;
    }

    threads.forEach((thread, i) => {
      const messages = thread.getMessages();
      messages.forEach(msg => {
        Logger.log('');
        Logger.log('✅ Email #' + (i + 1));
        Logger.log('   Subject: ' + msg.getSubject());
        Logger.log('   Date: ' + msg.getDate());
        Logger.log('   To: ' + msg.getTo());
      });
    });
  }

  /**
   * Debug: Check 10 email terbaru dalam Sent folder
   */
  function checkRecentSentEmails() {
    Logger.log('=== 10 EMAIL TERBARU DALAM SENT FOLDER ===');

    const threads = GmailApp.search('in:sent', 0, 10);
    Logger.log('Found ' + threads.length + ' threads');

    threads.forEach((thread, i) => {
      const msg = thread.getMessages()[0];
      Logger.log('');
      Logger.log((i + 1) + '. ' + msg.getSubject());
      Logger.log('   To: ' + msg.getTo());
      Logger.log('   Date: ' + msg.getDate());
    });
  }

  /**
   * Debug: Test dengan email ringkas tanpa formatting
   */
  function testSimpleEmail() {
    const myEmail = Session.getActiveUser().getEmail();
    Logger.log('Testing simple email to: ' + myEmail);

    try {
      GmailApp.sendEmail(myEmail, 'Test Email Auto eRPH', 'Ini adalah test email ringkas.');
      Logger.log('✅ Simple email sent!');

      // Also try MailApp
      MailApp.sendEmail(myEmail, 'Test Email Auto eRPH (MailApp)', 'Ini adalah test email ringkas via MailApp.');
      Logger.log('✅ MailApp email sent!');

    } catch (error) {
      Logger.log('❌ Error: ' + error.toString());
    }
  }

  /**
   * 🔧 CHECK BOUNCE: Cari email bounce/gagal dalam inbox
   */
  function checkForBounces() {
    Logger.log('=== CHECKING FOR BOUNCE EMAILS ===');

    // Search for bounce/failure notifications
    const searchTerms = [
      'from:mailer-daemon',
      'subject:delivery',
      'subject:undeliverable',
      'subject:failed',
      'subject:returned'
    ];

    searchTerms.forEach(term => {
      const threads = GmailApp.search(term + ' newer_than:7d', 0, 5);
      if (threads.length > 0) {
        Logger.log('');
        Logger.log('⚠️ FOUND: ' + term);
        threads.forEach(thread => {
          const msg = thread.getMessages()[0];
          Logger.log('   Subject: ' + msg.getSubject());
          Logger.log('   Date: ' + msg.getDate());
        });
      }
    });

    Logger.log('');
    Logger.log('=== CHECK COMPLETE ===');
  }

  /**
   * 🔧 TEST: Hantar email dengan UNIQUE subject (elak duplicate filter)
   * Tukar EMAIL_TEST kepada email yang nak test
   */
  function testUniqueEmail() {
    // ⬇️ TUKAR EMAIL INI
    const testEmail = 'tvpsskpp51@gmail.com';

    const uniqueId = new Date().getTime();
    const subject = 'Test Auto eRPH - ' + uniqueId;
    const body = 'Ini adalah test email dengan ID unik: ' + uniqueId + '\n\n' +
                 'Jika anda terima email ini, sistem berfungsi dengan baik.\n\n' +
                 'Masa dihantar: ' + new Date().toString();

    Logger.log('📧 Sending test email to: ' + testEmail);
    Logger.log('📧 Subject: ' + subject);

    try {
      GmailApp.sendEmail(testEmail, subject, body);
      Logger.log('✅ Email sent! Check inbox ' + testEmail);
      Logger.log('');
      Logger.log('⚠️ JIKA MASIH TAK TERIMA:');
      Logger.log('   1. Gmail mungkin block email dari akaun ini');
      Logger.log('   2. Cuba hantar dari akaun Gmail lain');
      Logger.log('   3. Check Google Account security settings');
    } catch (error) {
      Logger.log('❌ Error: ' + error.toString());
    }
  }

  /**
   * 🔧 TEST: Hantar ke diri sendiri (pasti sampai)
   */
  function testEmailToMyself() {
    const myEmail = Session.getActiveUser().getEmail();
    const uniqueId = new Date().getTime();
    const subject = 'Self Test Auto eRPH - ' + uniqueId;
    const body = 'Test email ke diri sendiri.\nID: ' + uniqueId;

    Logger.log('📧 Sending to myself: ' + myEmail);

    GmailApp.sendEmail(myEmail, subject, body);

    Logger.log('✅ Sent! Check inbox anda.');
    Logger.log('');
    Logger.log('Jika email ini SAMPAI tapi email ke customer TIDAK sampai,');
    Logger.log('masalah adalah Gmail block email ke external recipients.');
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

      // Buat draft email
      const draftSuccess = sendApprovalEmail(nama, email);

      if (draftSuccess) {
        // Mark as draft created
        sheet.getRange(row, EMAIL_SENT_COL).setValue('DRAFT - Check Gmail');
        Logger.log('✅ Draft berjaya dicipta untuk: ' + email);
        Logger.log('➡️ Buka Gmail > Drafts > Send');
      } else {
        // Mark as failed
        sheet.getRange(row, EMAIL_SENT_COL).setValue('FAILED');
        Logger.log('❌ Gagal buat draft untuk: ' + email);
      }

    } catch (error) {
      Logger.log('❌ Error in onSheetEdit: ' + error.toString());
      // Cuba mark as error dalam sheet
      try {
        const sheet = e.source.getActiveSheet();
        const row = e.range.getRow();
        sheet.getRange(row, 10).setValue('ERROR: ' + error.message);
      } catch (e2) {
        Logger.log('Cannot update sheet: ' + e2.toString());
      }
    }
  }

  // ============================================
  // TEST & DEBUG FUNCTIONS
  // ============================================

  /**
   * 🔧 DEBUG: Check semua triggers yang aktif
   * Run ini untuk pastikan trigger sudah setup
   */
  function checkTriggers() {
    const triggers = ScriptApp.getProjectTriggers();
    Logger.log('=== SENARAI TRIGGERS ===');
    Logger.log('Jumlah triggers: ' + triggers.length);

    if (triggers.length === 0) {
      Logger.log('⚠️ TIADA TRIGGER! Run setupTrigger() untuk setup.');
      return;
    }

    triggers.forEach((trigger, index) => {
      Logger.log('');
      Logger.log('Trigger #' + (index + 1));
      Logger.log('  Function: ' + trigger.getHandlerFunction());
      Logger.log('  Type: ' + trigger.getEventType());
      Logger.log('  Source: ' + trigger.getTriggerSource());
    });

    // Check specifically for onSheetEdit
    const hasOnSheetEdit = triggers.some(t => t.getHandlerFunction() === 'onSheetEdit');
    if (hasOnSheetEdit) {
      Logger.log('');
      Logger.log('✅ Trigger onSheetEdit AKTIF');
    } else {
      Logger.log('');
      Logger.log('❌ Trigger onSheetEdit TIDAK AKTIF! Run setupTrigger()');
    }
  }

  /**
   * 🔧 DEBUG: Check email quota
   */
  function checkEmailQuota() {
    const quota = MailApp.getRemainingDailyQuota();
    Logger.log('📧 Email quota remaining: ' + quota);

    if (quota <= 0) {
      Logger.log('❌ QUOTA HABIS! Tidak boleh hantar email hari ini.');
    } else if (quota < 10) {
      Logger.log('⚠️ Quota hampir habis!');
    } else {
      Logger.log('✅ Quota OK');
    }

    return quota;
  }

  /**
   * 🔧 MANUAL: Hantar email ke row tertentu
   * Guna ini jika auto email gagal
   * @param {number} rowNumber - Nombor row dalam sheet (contoh: 2 untuk row pertama data)
   */
  function manualSendEmail(rowNumber) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders');

    if (!sheet) {
      Logger.log('❌ Sheet Orders tidak dijumpai!');
      return;
    }

    if (!rowNumber || rowNumber < 2) {
      Logger.log('❌ Sila masukkan nombor row yang sah (minimum 2)');
      Logger.log('Contoh: manualSendEmail(2) untuk row pertama');
      return;
    }

    const rowData = sheet.getRange(rowNumber, 1, 1, 10).getValues()[0];
    const nama = rowData[1];
    const email = rowData[2];
    const pakej = rowData[4];
    const status = rowData[8];
    const emailSent = rowData[9];

    Logger.log('=== DATA ROW ' + rowNumber + ' ===');
    Logger.log('Nama: ' + nama);
    Logger.log('Email: ' + email);
    Logger.log('Pakej: ' + pakej);
    Logger.log('Status: ' + status);
    Logger.log('Email Sent: ' + emailSent);

    if (!email) {
      Logger.log('❌ Email kosong!');
      return;
    }

    if (!pakej.includes('RM80')) {
      Logger.log('⚠️ Ini pakej Custom (RM200) - perlu PM manual');
      return;
    }

    Logger.log('');
    Logger.log('📧 Cuba hantar email...');

    const success = sendApprovalEmail(nama, email);

    if (success) {
      sheet.getRange(rowNumber, 10).setValue('Yes (Manual)');
      Logger.log('✅ EMAIL BERJAYA DIHANTAR!');
    } else {
      sheet.getRange(rowNumber, 10).setValue('FAILED (Manual)');
      Logger.log('❌ EMAIL GAGAL!');
    }
  }

  /**
   * 🔧 TEST: Hantar test email ke diri sendiri
   */
  function testApprovalEmail() {
    const myEmail = Session.getActiveUser().getEmail();
    Logger.log('📧 Hantar test email ke: ' + myEmail);

    const success = sendApprovalEmail('Test User', myEmail);

    if (success) {
      Logger.log('✅ Test email BERJAYA dihantar! Check inbox anda.');
    } else {
      Logger.log('❌ Test email GAGAL!');
    }
  }

  /**
   * 🔧 FULL DEBUG: Run semua diagnostic
   */
  function runFullDiagnostic() {
    Logger.log('========================================');
    Logger.log('   AUTO eRPH - FULL DIAGNOSTIC');
    Logger.log('========================================');
    Logger.log('');

    // 1. Check triggers
    Logger.log('1️⃣ CHECKING TRIGGERS...');
    checkTriggers();
    Logger.log('');

    // 2. Check email quota
    Logger.log('2️⃣ CHECKING EMAIL QUOTA...');
    checkEmailQuota();
    Logger.log('');

    // 3. Check sheet
    Logger.log('3️⃣ CHECKING SHEET...');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders');
    if (sheet) {
      const lastRow = sheet.getLastRow();
      Logger.log('✅ Sheet Orders exists');
      Logger.log('   Total rows: ' + lastRow);
    } else {
      Logger.log('❌ Sheet Orders TIDAK DIJUMPAI! Run setup()');
    }
    Logger.log('');

    // 4. Test email capability
    Logger.log('4️⃣ TESTING EMAIL...');
    Logger.log('Run testApprovalEmail() untuk test hantar email ke diri sendiri');
    Logger.log('');

    Logger.log('========================================');
    Logger.log('   DIAGNOSTIC COMPLETE');
    Logger.log('========================================');
  }

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