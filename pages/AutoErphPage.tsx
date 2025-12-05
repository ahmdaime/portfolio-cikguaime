import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  Rocket,
  Layout,
  FileSpreadsheet,
  LifeBuoy,
  Send,
  ChevronDown,
  Star,
  ArrowLeft
} from 'lucide-react';

// --- Constants ---
const TELEGRAM_LINK = "https://t.me/+w2Ri8NTkpyZhOTU9";

// --- Components ---

const Badge = ({ children }: { children?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6 animate-fade-in-up">
    {children}
  </div>
);

const PrimaryButton = ({ children, className = "", large = false }: { children?: React.ReactNode; className?: string; large?: boolean }) => (
  <a
    href={TELEGRAM_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 ${large ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'} ${className}`}
  >
    {children}
    <Send className="w-5 h-5" />
  </a>
);

// --- Sections ---

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali ke Portfolio</span>
        </Link>
        <PrimaryButton>Tempah Sekarang</PrimaryButton>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Decor */}
      <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] bg-accent-purple/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-[-100px] bg-accent-pink/20 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <Badge>🚀 Automasi RPH Guru Malaysia</Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Auto eRPH <br/>
          <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Full Custom</span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Sistem automasi RPH Google Sheets yang dibina 100% mengikut struktur sekolah anda. Tiada lagi copy-paste manual yang memenatkan.
        </p>

        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-bold text-white">RM150</span>
            <span className="text-gray-400 font-medium">/ template</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-accent-pink font-semibold bg-accent-pink/10 px-3 py-1 rounded">
            <CheckCircle className="w-4 h-4" /> Sekali Bayar Seumur Hidup
          </div>
        </div>

        <PrimaryButton large>Tempah Sekarang</PrimaryButton>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-gray-300">50+ Guru Berpuas Hati</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-gray-700 rounded-full"></div>
          <div>Trusted by Teachers Nationwide</div>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Masalah Biasa vs <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Penyelesaian Kami</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problems */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-l-4 border-l-red-500/50 relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="p-2 bg-red-500/10 rounded-lg text-red-500"><XCircle /></span>
              Cara Lama
            </h3>
            <ul className="space-y-4">
              {[
                "Berjam-jam isi RPH setiap minggu",
                "Struktur template sekolah selalu berubah",
                "Stress copy-paste berulang kali",
                "Risiko tertinggal atau terlupa isi",
                "Script generic dari internet tak berfungsi"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-l-4 border-l-accent-purple/50 relative overflow-hidden group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle /></span>
              Dengan Auto eRPH
            </h3>
            <ul className="space-y-4">
              {[
                "Siap RPH seminggu dalam 5 minit",
                "Custom built 100% ikut template anda",
                "Automasi penuh dengan Sidebar UI",
                "Alert & tracking progress automatik",
                "Support teknikal direct dari developer"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Analisis Template Penuh",
      desc: "Kami kaji setiap sel dan row template sekolah anda untuk pastikan script berfungsi dengan tepat."
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8" />,
      title: "Sidebar UI Mesra Pengguna",
      desc: "Panel kawalan yang mudah di tepi Google Sheet. Tak perlu sentuh coding langsung."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Batch Fill & Copy",
      desc: "Isi RPH untuk pelbagai kelas sekaligus. Copy RPH minggu lepas dengan satu klik."
    },
    {
      icon: <LifeBuoy className="w-8 h-8" />,
      title: "Lifetime Support",
      desc: "Tiada yuran bulanan. Bantuan percuma melalui Telegram jika berlaku sebarang ralat."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute w-[300px] h-[300px] rounded-full bottom-20 left-10 bg-blue-600/20 blur-[100px] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Yang Anda Dapat?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bukan sekadar script, tapi satu sistem lengkap untuk memudahkan hidup anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center text-accent-purple mb-4">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Bagaimana Ia <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">Berfungsi?</span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { step: "1", title: "Hantar Template", desc: "Share link Google Sheet RPH sekolah anda." },
              { step: "2", title: "Analisis & Dev", desc: "Saya bina script custom (2-3 hari)." },
              { step: "3", title: "Install", desc: "Saya pasang sistem dalam sheet anda." },
              { step: "4", title: "Guna!", desc: "Jimat masa setiap minggu selamanya." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-navy-800 border-2 border-accent-purple text-white font-bold text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoDemo = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Lihat Auto eRPH Dalam Aksi</h2>

        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-2xl relative">
          <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/KBQdJuD8tyM"
              title="Demo Auto eRPH"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Berapa lama masa untuk siapkan?",
      a: "Biasanya mengambil masa 2-3 hari bekerja selepas saya menerima link template RPH sekolah anda dan pengesahan bayaran."
    },
    {
      q: "Macam mana kalau template saya sangat kompleks?",
      a: "Tiada masalah! Harga tetap RM150 (sekali bayar) tidak kira betapa kompleks atau panjang template RPH sekolah anda."
    },
    {
      q: "Ada support selepas pembelian?",
      a: "Ya, support adalah percuma seumur hidup melalui Telegram. Jika ada butang tak berfungsi atau ralat pada script, saya akan baiki segera."
    },
    {
      q: "Boleh guna untuk berbilang minggu/tahun?",
      a: "Ya! Sistem ini direka untuk generate RPH minggu demi minggu tanpa had. Anda boleh guna untuk tahun-tahun seterusnya selagi format sekolah tidak berubah drastik."
    },
    {
      q: "Selamat ke data RPH saya?",
      a: "100% selamat. Apps Script ini berjalan sepenuhnya dalam persekitaran Google akaun anda sendiri. Saya tidak menyimpan data pengajaran anda."
    }
  ];

  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Soalan Lazim (FAQ)</h2>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-accent-purple/50 bg-white/10' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="font-semibold text-lg">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-accent-purple' : 'text-gray-500'}`} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Bersedia Jimatkan Masa Anda?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Jangan biarkan kerja perkeranian mengganggu fokus mengajar anda. Dapatkan sistem automasi RPH custom anda hari ini.
        </p>

        <div className="flex flex-col items-center">
          <PrimaryButton large>
            Hubungi Saya di Telegram
          </PrimaryButton>
          <p className="mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Auto eRPH by Cikgu Aime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

function AutoErphPage() {
  return (
    <div className="min-h-screen font-sans text-white bg-navy-900 selection:bg-accent-purple selection:text-white">
      <NavBar />
      <Hero />
      <ProblemSolution />
      <Features />
      <Process />
      <VideoDemo />
      <FAQ />
      <Footer />
    </div>
  );
}

export default AutoErphPage;
