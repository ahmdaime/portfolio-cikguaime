import React, { useState } from 'react';
import {
  Shield,
  Settings,
  Table,
  FileUp,
  PenTool,
  FolderOpen,
  AlertTriangle,
  Search,
  ChevronRight,
  BookOpen,
  MessageCircle,
  X,
  LucideIcon
} from 'lucide-react';
import { TELEGRAM_LINK, IS_LAUNCHED } from './constants';

interface Issue {
  id: string;
  title: string;
  error: string;
  cause: string;
  solution: string;
}

interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  issues: Issue[];
}

const documentationData: { categories: Category[] } = {
  categories: [
    {
      id: 'permissions',
      title: 'Kebenaran & Akses',
      icon: Shield,
      issues: [
        {
          id: 'license-not-found',
          title: 'Lesen tidak dijumpai',
          error: '"Lesen tidak dijumpai. Sila hubungi penjual untuk mendapatkan lesen."',
          cause: 'Email Google anda tidak didaftar dalam sistem lesen.',
          solution: 'Hubungi penjual melalui Telegram dengan menyertakan email Google yang anda gunakan untuk mendapatkan lesen.',
        },
        {
          id: 'license-deactivated',
          title: 'Lesen dinyahaktifkan',
          error: '"Lesen anda telah dinyahaktifkan. Sila hubungi penjual."',
          cause: 'Admin telah menyahaktifkan lesen anda.',
          solution: 'Hubungi penjual untuk mengetahui sebab penyahaktifan dan cara mengaktifkan semula.',
        },
        {
          id: 'not-logged-in',
          title: 'Tidak log masuk',
          error: '"Sila log masuk ke akaun Google anda"',
          cause: 'Anda belum log masuk ke akaun Google dalam browser.',
          solution: 'Log masuk ke akaun Google anda, kemudian refresh Google Sheets dan cuba lagi.',
        },
        {
          id: 'connection-failed',
          title: 'Connection failed',
          error: '"Connection failed"',
          cause: 'Tiada sambungan internet atau Web App server mengalami masalah.',
          solution: 'Pastikan anda mempunyai sambungan internet yang stabil. Cuba lagi selepas beberapa minit.',
        },
      ]
    },
    {
      id: 'setup',
      title: 'Setup & Pemasangan',
      icon: Settings,
      issues: [
        {
          id: 'menu-not-showing',
          title: 'Menu RPH Helper tidak muncul',
          error: 'Tiada menu "📚 RPH Helper" di toolbar Google Sheets.',
          cause: 'Fungsi onOpen() tidak berjalan secara automatik.',
          solution: '1. Refresh halaman Google Sheets (Ctrl+R)\n2. Jika masih tidak muncul, buka Extensions > Apps Script > Run > pilih "onOpen"\n3. Klik Run dan berikan kebenaran jika diminta.',
        },
        {
          id: 'sidebar-not-showing',
          title: 'Sidebar tidak muncul',
          error: 'Klik menu tapi sidebar tidak muncul.',
          cause: 'Google memerlukan kebenaran untuk memaparkan sidebar.',
          solution: '1. Apabila popup "Authorization required" muncul, klik "Continue"\n2. Pilih akaun Google anda\n3. Klik "Allow" untuk memberi kebenaran\n4. Cuba klik menu sekali lagi.',
        },
        {
          id: 'jadual-sheet-missing',
          title: 'Sheet JADUAL tidak dijumpai',
          error: '"Sheet JADUAL tidak dijumpai!"',
          cause: 'Tiada sheet bernama "JADUAL" dalam spreadsheet anda.',
          solution: 'Buat sheet baru dengan nama "JADUAL" (huruf besar semua). Sheet ini perlu mengandungi jadual waktu anda dengan format yang betul.',
        },
        {
          id: 'day-sheet-missing',
          title: 'Sheet hari tidak dijumpai',
          error: '"Sheet ISNIN tidak dijumpai"',
          cause: 'Tiada sheet untuk hari tersebut.',
          solution: 'Buat sheet dengan nama hari dalam huruf besar: ISNIN, SELASA, RABU, KHAMIS, JUMAAT. Setiap sheet mesti mengandungi template RPH.',
        },
      ]
    },
    {
      id: 'jadual',
      title: 'Jadual & Struktur',
      icon: Table,
      issues: [
        {
          id: 'empty-schedule',
          title: 'Jadual kosong / tiada kelas',
          error: 'Sidebar menunjukkan 0 kelas.',
          cause: 'Format sheet JADUAL tidak mengikut struktur yang ditetapkan.',
          solution: 'Pastikan sheet JADUAL mempunyai column mengikut urutan: BIL | TAHUN | KELAS | MASA | HINGGA | SUBJEK | BIL MURID. Header hari (ISNIN, SELASA, dll) perlu berada di Column H.',
        },
        {
          id: 'erph-not-detected',
          title: 'eRPH tidak dikesan',
          error: 'RPH count = 0 walaupun ada template.',
          cause: 'Sistem mencari text "eRPH" dalam Column B untuk mengesan section RPH.',
          solution: 'Pastikan setiap section RPH mempunyai cell dalam Column B yang mengandungi text "eRPH".',
        },
        {
          id: 'wrong-cell-offset',
          title: 'Data masuk cell yang salah',
          error: 'Content RPH masuk ke cell yang tidak betul.',
          cause: 'Template anda mempunyai struktur yang berbeza dari template standard (Base RPH 2026).',
          solution: IS_LAUNCHED
            ? 'Pakej Template Tersedia (RM80) hanya serasi dengan template standard. Untuk template sekolah anda sendiri, sila gunakan Pakej Custom Template (RM200).'
            : 'Pakej Template Tersedia hanya serasi dengan template standard. Untuk template sekolah anda sendiri, sila gunakan Pakej Custom Template.',
        },
      ]
    },
    {
      id: 'word-upload',
      title: 'Upload Word',
      icon: FileUp,
      issues: [
        {
          id: 'file-not-received',
          title: 'Fail tidak diterima',
          error: '"Data fail tidak diterima"',
          cause: 'Fail tidak dipilih sebelum klik upload.',
          solution: 'Klik butang "Pilih Fail" dan pilih fail .docx anda sebelum klik "Upload".',
        },
        {
          id: 'invalid-format',
          title: 'Format fail tidak sah',
          error: '"Fail bukan format ZIP/DOCX yang sah"',
          cause: 'Fail yang diupload bukan .docx sebenar. Mungkin fail .doc (format lama) atau fail corrupt.',
          solution: '1. Buka fail dalam Microsoft Word\n2. Klik File > Save As\n3. Pilih format "Word Document (.docx)"\n4. Save dan upload semula.',
        },
        {
          id: 'extract-failed',
          title: 'Gagal extract fail',
          error: '"Gagal extract fail" atau "document.xml tidak dijumpai"',
          cause: 'Struktur fail .docx rosak atau tidak lengkap.',
          solution: '1. Buka fail dalam Microsoft Word\n2. Copy semua kandungan\n3. Buka dokumen Word baru\n4. Paste kandungan\n5. Save sebagai .docx baru dan upload.',
        },
        {
          id: 'zero-weeks-parsed',
          title: '0 minggu diparse',
          error: 'Upload berjaya tapi "0 minggu diparse".',
          cause: 'Sistem tidak dapat mengesan pattern "MINGGU X" dalam dokumen.',
          solution: 'Pastikan dokumen Word anda mempunyai text "MINGGU 1", "MINGGU 2", dll untuk setiap bahagian RPH mingguan.',
        },
        {
          id: 'content-mixed',
          title: 'SK dan SP tercampur',
          error: 'Standard Kandungan dan Standard Pembelajaran jadi satu field.',
          cause: 'Format RPH (contoh: PSV, BM) mempunyai struktur yang berbeza.',
          solution: 'Sistem v1.0.8+ sudah menyokong format PSV dan BM. Pastikan anda menggunakan versi terkini. Jika masih berlaku, hubungi support.',
        },
      ]
    },
    {
      id: 'fill-rph',
      title: 'Pengisian RPH',
      icon: PenTool,
      issues: [
        {
          id: 'invalid-day',
          title: 'Hari tidak sah',
          error: '"Hari tidak sah: XXXXX"',
          cause: 'Nama hari yang dimasukkan tidak dikenali.',
          solution: 'Gunakan nama hari dalam huruf besar sahaja: ISNIN, SELASA, RABU, KHAMIS, JUMAAT.',
        },
        {
          id: 'invalid-week',
          title: 'Minggu tidak sah',
          error: '"Minggu mesti antara 1 hingga 42"',
          cause: 'Nombor minggu di luar julat yang dibenarkan.',
          solution: 'Pilih nombor minggu antara 1 hingga 42 sahaja.',
        },
        {
          id: 'text-too-long',
          title: 'Text terlalu panjang',
          error: '"Tema terlalu panjang (XXXXX aksara). Maksimum: 30000"',
          cause: 'Kandungan field melebihi had maksimum.',
          solution: 'Ringkaskan kandungan field tersebut. Had maksimum adalah 30,000 aksara per field.',
        },
        {
          id: 'rph-number-invalid',
          title: 'Nombor RPH tidak sah',
          error: '"RPH X tidak sah. RPH yang sah: 1 hingga Y"',
          cause: 'Nombor RPH yang dipilih melebihi jumlah eRPH yang ada dalam sheet.',
          solution: 'Semak jumlah section eRPH dalam sheet hari tersebut. Pastikan nombor RPH tidak melebihi jumlah yang ada.',
        },
      ]
    },
    {
      id: 'templates',
      title: 'Template Mingguan',
      icon: FolderOpen,
      issues: [
        {
          id: 'template-not-found',
          title: 'Template tidak dijumpai',
          error: '"Template X Minggu Y tidak dijumpai!"',
          cause: 'Belum ada template yang disimpan untuk subjek dan minggu tersebut.',
          solution: 'Upload fail Word untuk import template, atau isi dan simpan template secara manual.',
        },
        {
          id: 'no-templates',
          title: 'Tiada template disimpan',
          error: '"Tiada template disimpan!"',
          cause: 'UserProperties kosong - belum ada template yang pernah disimpan.',
          solution: 'Upload RPH dari Word untuk import template secara automatik.',
        },
        {
          id: 'template-data-corrupt',
          title: 'Data template rosak',
          error: '"Data template rosak. Sila hubungi admin."',
          cause: 'Data JSON dalam storage corrupt atau tidak valid.',
          solution: 'Gunakan butang "Reset Semua Template" untuk clear data corrupt, kemudian upload semula dari Word.',
        },
        {
          id: 'slot-invalid',
          title: 'Slot tidak sah',
          error: '"Slot tidak sah (1-10)"',
          cause: 'Nombor slot melebihi had maksimum.',
          solution: 'Gunakan nombor slot antara 1 hingga 10 sahaja. Untuk subjek teras (BM, BI, MT), biasanya guna slot 1-5.',
        },
      ]
    },
    {
      id: 'common-mistakes',
      title: 'Kesilapan Biasa',
      icon: AlertTriangle,
      issues: [
        {
          id: 'doc-not-docx',
          title: 'Upload .doc bukan .docx',
          error: '"Fail bukan format ZIP/DOCX yang sah"',
          cause: 'Fail .doc adalah format Word lama (2003 dan ke bawah) yang tidak disokong.',
          solution: 'Buka fail dalam Word > File > Save As > pilih format "Word Document (.docx)" > Save.',
        },
        {
          id: 'edit-code',
          title: 'Edit kod Apps Script',
          error: 'Pelbagai error atau sistem tidak berfungsi.',
          cause: 'Mengubah kod dalam Code.gs boleh merosakkan sistem.',
          solution: 'JANGAN edit sebarang kod dalam Apps Script. Jika sudah edit, hubungi support untuk restore.',
        },
        {
          id: 'different-account',
          title: 'Guna akaun Google berbeza',
          error: '"Lesen tidak dijumpai"',
          cause: 'Log masuk dengan akaun Google yang berbeza dari akaun yang didaftarkan.',
          solution: 'Log masuk menggunakan akaun Google yang sama semasa pembelian dan pendaftaran lesen.',
        },
        {
          id: 'rename-sheets',
          title: 'Rename sheet hari',
          error: 'RPH tidak dikesan.',
          cause: 'Sistem mencari sheet dengan nama tepat: ISNIN, SELASA, RABU, KHAMIS, JUMAAT.',
          solution: 'Kekalkan nama sheet hari dalam huruf besar tanpa sebarang perubahan.',
        },
        {
          id: 'copy-to-new-spreadsheet',
          title: 'Copy ke Spreadsheet baru',
          error: 'Lesen dan template tidak berfungsi.',
          cause: 'Lesen dan template disimpan dalam spreadsheet asal sahaja.',
          solution: 'Hubungi admin untuk transfer lesen ke spreadsheet baru. Template perlu diupload semula.',
        },
      ]
    },
  ]
};

const Documentation = () => {
  const [activeCategory, setActiveCategory] = useState('permissions');
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeData = documentationData.categories.find(c => c.id === activeCategory);

  // Filter issues based on search
  const filteredCategories = searchQuery.trim()
    ? documentationData.categories.map(cat => ({
        ...cat,
        issues: cat.issues.filter(issue =>
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.error.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.solution.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.issues.length > 0)
    : null;

  const displayCategories = filteredCategories || [activeData!];

  return (
    <section id="documentation" className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Panduan & Troubleshooting</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dokumentasi <span className="text-accent-purple">Auto eRPH</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Penyelesaian untuk masalah-masalah biasa yang mungkin anda hadapi semasa menggunakan Auto eRPH.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Cari masalah atau error message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Hidden when searching */}
          {!searchQuery && (
            <div className="lg:w-64 shrink-0">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 lg:sticky lg:top-24">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Kategori
                </h3>
                <nav className="space-y-1">
                  {documentationData.categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setExpandedIssue(null);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeCategory === cat.id
                            ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">{cat.title}</span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === cat.id
                            ? 'bg-accent-purple/30 text-accent-purple'
                            : 'bg-white/10 text-gray-500'
                        }`}>
                          {cat.issues.length}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {displayCategories.map((category) => (
              <div key={category.id} className="mb-8 last:mb-0">
                {/* Category Header (shown when searching) */}
                {searchQuery && (
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="w-5 h-5 text-accent-purple" />
                    <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple">
                      {category.issues.length} hasil
                    </span>
                  </div>
                )}

                {/* Issues List */}
                <div className="space-y-3">
                  {category.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 ${
                        expandedIssue === issue.id
                          ? 'border-accent-purple/50 bg-white/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Issue Header */}
                      <button
                        onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                        className="w-full p-5 text-left flex items-start gap-4"
                      >
                        <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                          expandedIssue === issue.id
                            ? 'bg-accent-purple/20 text-accent-purple'
                            : 'bg-white/5 text-gray-400'
                        }`}>
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">{issue.title}</h4>
                          <p className="text-sm text-red-400/80 font-mono truncate">{issue.error}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                          expandedIssue === issue.id ? 'rotate-90' : ''
                        }`} />
                      </button>

                      {/* Issue Content */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        expandedIssue === issue.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-5 pb-5 pt-0 border-t border-white/5">
                          {/* Cause */}
                          <div className="mt-4 mb-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-orange-400 mb-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                              Punca
                            </div>
                            <p className="text-gray-400 text-sm pl-4">{issue.cause}</p>
                          </div>

                          {/* Solution */}
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                              Penyelesaian
                            </div>
                            <div className="text-gray-300 text-sm pl-4 whitespace-pre-line leading-relaxed">
                              {issue.solution}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* No Results */}
            {searchQuery && filteredCategories && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Tiada hasil dijumpai</h3>
                <p className="text-gray-400">
                  Cuba cari dengan kata kunci lain atau{' '}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-accent-purple hover:underline"
                  >
                    lihat semua kategori
                  </button>
                </p>
              </div>
            )}

            {/* Still Need Help */}
            {!searchQuery && (
              <div className="mt-8 p-6 bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-purple/20 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Masih perlukan bantuan?</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Jika masalah anda tidak tersenarai di sini, hubungi saya terus melalui Telegram.
                    </p>
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent-purple hover:text-accent-pink transition-colors"
                    >
                      Hubungi Support
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
