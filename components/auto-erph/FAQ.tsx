import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { IS_LAUNCHED } from './constants';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'pembelian',
    title: 'Pembelian & Harga',
    icon: '💰',
    questions: [
      {
        id: 'beza-pakej',
        q: "Apa beza kedua-dua pakej?",
        a: IS_LAUNCHED
          ? "Pakej RM80 menggunakan template RPH yang telah siap sedia - sesuai jika anda fleksibel dengan format. Pakej RM200 pula saya bina Apps Script 100% mengikut template sekolah anda - sesuai jika sekolah ada format template yang spesifik."
          : "Pakej Template Tersedia menggunakan template RPH yang telah siap sedia - sesuai jika anda fleksibel dengan format. Pakej Custom Template pula saya bina Apps Script 100% mengikut template sekolah anda - sesuai jika sekolah ada format template yang spesifik."
      },
      {
        id: 'masa-siap',
        q: "Berapa lama masa untuk siapkan?",
        a: IS_LAUNCHED
          ? "Untuk pakej Template Tersedia (RM80), siap dalam 1-2 jam sahaja. Untuk pakej Custom Template (RM200), mengambil masa 2-3 hari bekerja selepas saya menerima link template RPH sekolah anda dan pengesahan bayaran."
          : "Untuk pakej Template Tersedia, siap dalam 1-2 jam sahaja. Untuk pakej Custom Template, mengambil masa 2-3 hari bekerja selepas saya menerima link template RPH sekolah anda dan pengesahan bayaran."
      },
      {
        id: 'refund',
        q: "Boleh refund kalau tak sesuai?",
        a: "Maaf, produk digital TIDAK BOLEH di-refund setelah template dan Apps Script dihantar kerana anda sudah mempunyai akses penuh kepada produk tersebut. Sila pastikan anda membaca semua ciri-ciri pakej dengan teliti sebelum membuat pembelian. Jika ada sebarang keraguan, hubungi saya di Telegram terlebih dahulu untuk konsultasi percuma."
      },
      {
        id: 'data-selamat',
        q: "Selamat ke data RPH saya?",
        a: "100% selamat. Apps Script ini berjalan sepenuhnya dalam persekitaran Google akaun anda sendiri. Saya tidak menyimpan data pengajaran anda."
      }
    ]
  },
  {
    id: 'penggunaan',
    title: 'Penggunaan & Features',
    icon: '📝',
    questions: [
      {
        id: 'berbilang-minggu',
        q: "Boleh guna untuk berbilang minggu/tahun?",
        a: "Ya! Sistem ini direka untuk generate RPH minggu demi minggu tanpa had. Anda boleh guna untuk tahun-tahun seterusnya selagi format sekolah tidak berubah drastik."
      },
      {
        id: 'pendidikan-islam',
        q: "Boleh guna untuk subjek Pendidikan Islam & Bahasa Arab?",
        a: "Ya, boleh! Template ini menyokong pilihan bahasa Jawi - apabila dipilih, semua label dalam RPH akan bertukar kepada tulisan Jawi secara automatik. Namun, isi kandungan seperti objektif, standard pembelajaran, dan aktiviti PAK-21 masih perlu diisi sendiri oleh cikgu. Kelebihannya, cikgu boleh simpan template aktiviti/objektif yang kerap digunakan supaya tidak perlu taip ulang setiap minggu."
      },
      {
        id: 'upload-word',
        q: "Boleh upload RPH dari Word?",
        a: "Ya! Sistem ini menyokong upload fail .docx (bukan .doc). Pastikan dokumen Word anda mempunyai text 'MINGGU 1', 'MINGGU 2', dll untuk setiap bahagian. Sistem akan auto-parse dan simpan sebagai template mingguan."
      },
      {
        id: 'upload-jawi',
        q: "Boleh upload Word yang ada teks Jawi/Arab?",
        a: "Ya, Upload Word boleh baca teks Jawi dan Bahasa Arab. SYARAT: Format dokumen Word perlu guna header dalam Bahasa Melayu seperti 'Tajuk:', 'Objektif:', 'Aktiviti:' dan sebagainya. Isi kandungan boleh dalam Jawi/Arab, tiada masalah. Jika seluruh dokumen dalam tulisan Arab sahaja tanpa header BM, sistem mungkin tidak dapat kenal pasti bahagian-bahagian RPH dengan tepat."
      }
    ]
  },
  {
    id: 'support',
    title: 'Support & Bantuan',
    icon: '🆘',
    questions: [
      {
        id: 'apa-support',
        q: "Apa yang termasuk dalam support?",
        a: IS_LAUNCHED
          ? "Support meliputi pembaikan ralat teknikal (bug fix) seperti butang tak berfungsi atau script error. Pakej RM80 dapat 30 hari support, manakala pakej RM200 dapat 90 hari. Permintaan feature tambahan atau perubahan template sekolah akan dikenakan caj berasingan."
          : "Support meliputi pembaikan ralat teknikal (bug fix) seperti butang tak berfungsi atau script error. Pakej Template Tersedia dapat 30 hari support, manakala pakej Custom Template dapat 90 hari. Permintaan feature tambahan atau perubahan template sekolah akan dikenakan caj berasingan."
      },
      {
        id: 'dokumentasi',
        q: "Ada dokumentasi atau panduan penggunaan?",
        a: "Ya! Scroll ke bawah ke bahagian 'Dokumentasi Auto eRPH'. Di situ ada panduan lengkap untuk 7 kategori masalah termasuk setup, upload Word, pengisian RPH, dan troubleshooting. Anda juga boleh search error message terus untuk cari penyelesaian."
      },
      {
        id: 'error',
        q: "Apa perlu buat jika dapat error?",
        a: "Pertama, rujuk bahagian Dokumentasi di bawah - kebanyakan error biasa sudah ada penyelesaiannya. Cari error message anda menggunakan search bar. Jika masalah tidak tersenarai atau masih tidak selesai, hubungi saya melalui Telegram untuk bantuan lanjut."
      }
    ]
  }
];

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState<string | null>('pembelian');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Soalan Lazim (FAQ)</h2>
        <p className="text-gray-400 text-center mb-10">Klik kategori untuk lihat soalan berkaitan</p>

        <div className="space-y-4">
          {faqCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 ${
                openCategory === category.id ? 'border-accent-purple/50' : 'border-white/10'
              }`}
            >
              {/* Category Header */}
              <button
                onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                className="w-full p-5 text-left flex items-center justify-between focus:outline-none hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <span className="font-bold text-lg">{category.title}</span>
                    <span className="ml-2 text-sm text-gray-500">({category.questions.length} soalan)</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openCategory === category.id ? 'rotate-180 text-accent-purple' : 'text-gray-500'}`} />
              </button>

              {/* Questions */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openCategory === category.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-white/10 px-5 pb-4">
                  {category.questions.map((item) => (
                    <div key={item.id} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
                        className="w-full py-4 text-left flex items-center justify-between focus:outline-none group"
                      >
                        <span className={`font-medium transition-colors ${openQuestion === item.id ? 'text-accent-purple' : 'text-gray-300 group-hover:text-white'}`}>
                          {item.q}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-2 ${openQuestion === item.id ? 'rotate-90 text-accent-purple' : 'text-gray-500'}`} />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${
                          openQuestion === item.id ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-gray-400 text-sm leading-relaxed pl-4 border-l-2 border-accent-purple/30">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
