import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  Layout,
  Send,
  ChevronDown,
  Star,
  ArrowLeft,
  Package,
  Sparkles,
  X,
  Upload,
  User,
  Mail,
  MessageCircle,
  Loader2,
  Flame,
  MousePointerClick,
  Calendar,
  FileText,
  BarChart3,
  Copy,
  Layers,
  Clock,
  Zap,
  BookOpen,
  Shield,
  Settings,
  Table,
  FileUp,
  PenTool,
  FolderOpen,
  AlertTriangle,
  Search,
  ChevronRight,
  Eye
} from 'lucide-react';

// --- Constants ---
const TELEGRAM_LINK = "https://t.me/cikguaimedotcom";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQAwHl8FWenXAd7h1Ur0nQRO99NJqzbscnbkKtww4g73mKMpT6u9c-CS0hSugMMqk/exec";

// Toggle this to enable/disable ordering (set to true when launching)
const IS_LAUNCHED = false;

// --- Types ---
interface SlotData {
  max: number;
  sold: number;
  remaining: number;
}

interface SlotsState {
  'template-tersedia': SlotData;
  'custom-template': SlotData;
}

// --- Components ---

const Badge = ({ children }: { children?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6 animate-fade-in-up">
    {children}
  </div>
);

const PrimaryButton = ({
  children,
  className = "",
  large = false,
  onClick,
  disabled = false
}: {
  children?: React.ReactNode;
  className?: string;
  large?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-300 ${
      disabled
        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95'
    } ${large ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'} ${className}`}
  >
    {children}
    {!disabled && <Send className="w-5 h-5" />}
  </button>
);

// --- Order Form Modal ---
interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderForm = ({ isOpen, onClose }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telegram: '',
    pakej: 'template-tersedia'
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data as URL params for Google Apps Script
      const params = new URLSearchParams();
      params.append('nama', formData.nama);
      params.append('email', formData.email);
      params.append('telegram', formData.telegram);
      params.append('pakej', formData.pakej);

      if (file) {
        // Convert file to base64 for Google Apps Script
        const base64 = await fileToBase64(file);
        params.append('resit', base64);
        params.append('resitName', file.name);
        params.append('resitType', file.type);
      }

      // Use no-cors mode for Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      // With no-cors, we can't read the response, so assume success
      setSubmitStatus('success');
      setFormData({ nama: '', email: '', telegram: '', pakej: 'template-tersedia' });
      setFile(null);

    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setFormData({ nama: '', email: '', telegram: '', pakej: 'template-tersedia' });
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-navy-800 border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-navy-800 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Tempah Auto eRPH</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tempahan Berjaya!</h3>
              <p className="text-gray-400 mb-6">
                Terima kasih! Saya akan hubungi anda melalui Telegram dalam masa 24 jam.
              </p>
              <button
                onClick={() => { resetForm(); onClose(); }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nama Penuh
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Ahmad bin Abu"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="contoh@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-colors"
                  />
                </div>
              </div>

              {/* Telegram */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username Telegram
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    required
                    placeholder="@username"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-colors"
                  />
                </div>
              </div>

              {/* Pakej */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pilih Pakej
                </label>
                <select
                  name="pakej"
                  value={formData.pakej}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-colors"
                >
                  <option value="template-tersedia" className="bg-navy-800">Template Tersedia - RM80</option>
                  <option value="custom-template" className="bg-navy-800">Custom Template - RM200</option>
                </select>
              </div>

              {/* Upload Resit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Muat Naik Resit Pembayaran
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    file
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-white/10 hover:border-accent-purple/50 hover:bg-white/5'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 text-sm">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Klik untuk muat naik resit</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG atau PDF</p>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Maklumat Pembayaran:</strong>
                </p>
                <p className="text-sm text-gray-400">
                  Bank: <strong className="text-white">Maybank</strong><br/>
                  No. Akaun: <strong className="text-white">153039127745</strong><br/>
                  Nama: <strong className="text-white">AHMAD AIMAN</strong>
                </p>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-400">
                    Ralat berlaku. Sila cuba lagi atau hubungi saya di Telegram.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menghantar...
                  </>
                ) : (
                  <>
                    Hantar Tempahan
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Alternative */}
              <p className="text-center text-sm text-gray-500">
                Ada soalan? <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-accent-purple hover:underline">Chat di Telegram</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sections ---

const NavBar = ({ onOpenForm }: { onOpenForm: () => void }) => {
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
        <div className="flex items-center gap-4">
          <a
            href="#documentation"
            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Dokumentasi</span>
          </a>
          <PrimaryButton onClick={onOpenForm} disabled={!IS_LAUNCHED}>
            {IS_LAUNCHED ? 'Tempah Sekarang' : 'Akan Datang'}
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

// Blurred Price Component with reveal on hover/tap
const BlurredPrice = ({ price, color = 'white' }: { price: string; color?: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className="relative cursor-pointer select-none group"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onClick={() => setIsRevealed(!isRevealed)}
    >
      <div className={`text-4xl font-bold transition-all duration-500 ${
        isRevealed ? 'blur-0' : 'blur-md'
      }`} style={{ color }}>
        {price}
      </div>

      {/* Hint overlay - only show when blurred */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Hover untuk lihat</span>
          <span className="sm:hidden">Tap untuk lihat</span>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const [slots, setSlots] = useState<SlotsState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        if (data.success && data.slots) {
          setSlots(data.slots);
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
        setSlots({
          'template-tersedia': { max: 10, sold: 0, remaining: 10 },
          'custom-template': { max: 3, sold: 0, remaining: 3 }
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlots();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Decor */}
      <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] bg-accent-purple/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-[-100px] bg-accent-pink/20 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <Badge>🚀 Automasi RPH Guru Malaysia</Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Auto eRPH <br/>
          <span className="text-accent-purple">Jimat Masa Anda</span>
        </h1>

        <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
          Sistem automasi RPH Google Sheets yang membantu guru mengisi RPH dengan pantas.
        </p>

        <div className="inline-flex items-center gap-2 text-sm text-accent-pink font-semibold bg-accent-pink/10 px-4 py-2 rounded-full mb-10">
          <CheckCircle className="w-4 h-4" /> Sekali Bayar, Tiada Yuran Bulanan
        </div>

        {/* Price Cards with Slot Counter */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mb-10 max-w-2xl mx-auto">
          {/* RM80 Card */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Package className="w-5 h-5" />
              <span className="text-sm font-medium">Template Tersedia</span>
            </div>
            <div className="mb-4">
              <BlurredPrice price="RM80" />
            </div>

            {/* Slot Progress */}
            {!isLoading && slots ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ditempah</span>
                  <span className={`font-semibold ${slots['template-tersedia'].remaining <= 3 ? 'text-orange-400' : 'text-white'}`}>
                    {slots['template-tersedia'].sold} / {slots['template-tersedia'].max}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-accent-purple rounded-full transition-all duration-1000"
                    style={{ width: `${(slots['template-tersedia'].sold / slots['template-tersedia'].max) * 100}%` }}
                  />
                </div>
                {slots['template-tersedia'].remaining <= 3 && slots['template-tersedia'].remaining > 0 && (
                  <div className="flex items-center gap-1 text-orange-400 text-xs">
                    <Flame className="w-3 h-3 animate-pulse" />
                    <span>Tinggal {slots['template-tersedia'].remaining} slot!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memuatkan...</span>
              </div>
            )}
          </div>

          {/* RM200 Card */}
          <div className="flex-1 bg-white/5 border border-accent-purple/30 rounded-2xl p-6 hover:border-accent-purple/50 transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-full font-medium">Popular</span>
            </div>
            <div className="flex items-center gap-2 text-accent-purple mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Custom Template</span>
            </div>
            <div className="mb-4">
              <BlurredPrice price="RM200" />
            </div>

            {/* Slot Progress */}
            {!isLoading && slots ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ditempah</span>
                  <span className={`font-semibold ${slots['custom-template'].remaining <= 1 ? 'text-orange-400' : 'text-white'}`}>
                    {slots['custom-template'].sold} / {slots['custom-template'].max}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-purple to-accent-pink rounded-full transition-all duration-1000"
                    style={{ width: `${(slots['custom-template'].sold / slots['custom-template'].max) * 100}%` }}
                  />
                </div>
                {slots['custom-template'].remaining <= 1 && slots['custom-template'].remaining > 0 && (
                  <div className="flex items-center gap-1 text-orange-400 text-xs">
                    <Flame className="w-3 h-3 animate-pulse" />
                    <span>Tinggal {slots['custom-template'].remaining} slot!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memuatkan...</span>
              </div>
            )}
          </div>
        </div>

        <PrimaryButton large onClick={onOpenForm} disabled={!IS_LAUNCHED}>
          {IS_LAUNCHED ? 'Tempah Sekarang' : 'Akan Datang'}
        </PrimaryButton>

        {/* Exploration Encouragement + Reassurance Message */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 via-accent-purple/10 to-accent-pink/10 border border-white/10 rounded-xl p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-medium">Sebelum membeli</span>, scroll ke bawah untuk lihat semua ciri-ciri, video demo, dan dokumentasi lengkap.
              <span className="text-accent-purple font-medium"> Pembelian anda 100% berbaloi</span> — jimat berjam-jam setiap minggu, guna sepanjang tahun, dan dapat support terus dari developer.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Sekali bayar
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Guna setahun
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                Support included
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-gray-300">50+ Guru Berpuas Hati</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></div>
          <div>Trusted by Teachers Nationwide</div>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  const problems = [
    {
      text: "Isi objektif sama untuk 5-6 kelas berbeza",
      detail: "Copy-paste berulang kali"
    },
    {
      text: "Subjek teras ada 4-5 slot seminggu",
      detail: "BM, BI, MT kena isi satu-satu"
    },
    {
      text: "Susah track minggu mana dah siap",
      detail: "Scroll sana sini cari yang kosong"
    },
    {
      text: "RPH dalam Word tapi Sheet lain format",
      detail: "Kena taip semula satu-satu"
    },
    {
      text: "Copy minggu lepas, terlupa tukar tarikh",
      detail: "Silap tulis Minggu 3 jadi Minggu 2"
    },
    {
      text: "Script internet tak compatible",
      detail: "Template sekolah lain, script error"
    }
  ];

  const solutions = [
    {
      text: "Batch fill semua kelas sekaligus",
      detail: "Satu klik, 6 kelas siap"
    },
    {
      text: "Support multiple slot per minggu",
      detail: "Subjek teras pun settle"
    },
    {
      text: "Progress tracking visual",
      detail: "Nampak terus status setiap minggu"
    },
    {
      text: "Upload dari Word, auto-extract",
      detail: "Tak perlu taip semula"
    },
    {
      text: "Template 42 minggu tersimpan",
      detail: "Setup sekali, guna setahun"
    },
    {
      text: "Custom ikut template sekolah",
      detail: "Atau guna template siap sedia"
    }
  ];

  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Masalah Guru vs <span className="text-accent-purple">Penyelesaian Auto eRPH</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kami faham struggle guru isi RPH setiap minggu. Sebab tu kami bina sistem ini.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problems */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-l-4 border-l-red-500/50 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="p-2 bg-red-500/10 rounded-lg text-red-500"><XCircle /></span>
              Struggle Setiap Minggu
            </h3>
            <ul className="space-y-4">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-300">{item.text}</span>
                    <span className="block text-sm text-gray-500 mt-0.5">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-l-4 border-l-green-500/50 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle /></span>
              Dengan Auto eRPH
            </h3>
            <ul className="space-y-4">
              {solutions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-200">{item.text}</span>
                    <span className="block text-sm text-green-400/70 mt-0.5">{item.detail}</span>
                  </div>
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
      icon: <MousePointerClick className="w-8 h-8" />,
      title: "Isi RPH Satu Klik",
      desc: "Pilih minggu, tekan butang, selesai! Semua field RPH diisi secara automatik dalam beberapa saat.",
      highlight: true
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Template 42 Minggu",
      desc: "Simpan template untuk setiap minggu persekolahan. Satu tahun, satu setup. Guna berulang kali.",
      highlight: false
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Upload dari Word",
      desc: "Ada RPH dalam Word? Upload sahaja! Sistem akan extract dan parse semua maklumat secara automatik.",
      highlight: false
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracking",
      desc: "Lihat status RPH setiap minggu - lengkap, separuh siap, atau kosong. Visual bar untuk setiap subjek.",
      highlight: false
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Sokongan Subjek Teras",
      desc: "BM, BI, MT ada 4-5 slot seminggu? Sistem ini support multiple slot per minggu untuk subjek teras.",
      highlight: false
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "Browse & Copy RPH",
      desc: "Lihat senarai RPH sedia ada, filter ikut subjek atau minggu, dan copy ke slot lain dalam satu klik.",
      highlight: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Batch Fill Pelbagai Kelas",
      desc: "Isi RPH untuk semua kelas sekaligus. Tak perlu ulang proses yang sama berulang kali.",
      highlight: false
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Sidebar Mesra Pengguna",
      desc: "Panel kawalan di tepi Google Sheet. Tak perlu sentuh kod. Semua button dan dropdown yang mudah.",
      highlight: false
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute w-[300px] h-[300px] rounded-full bottom-20 left-10 bg-blue-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute w-[200px] h-[200px] rounded-full top-20 right-10 bg-accent-purple/20 blur-[80px] pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Yang Anda Dapat?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bukan sekadar script biasa. Ini sistem lengkap dengan ciri-ciri premium untuk memudahkan kerja RPH anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`bg-white/5 backdrop-blur-sm border p-6 rounded-xl hover:-translate-y-2 transition-all duration-300 ${
                feat.highlight
                  ? 'border-accent-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                feat.highlight
                  ? 'bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 text-accent-purple'
                  : 'bg-white/5 text-accent-purple'
              }`}>
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Time Saved Highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-accent-purple" />
            <span className="text-gray-300">
              Purata penjimatan: <strong className="text-white">3-5 jam seminggu</strong> untuk kerja RPH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const templateTersediaSteps = [
    { step: "1", title: "Hubungi & Bayar", desc: "Chat di Telegram, buat bayaran RM80." },
    { step: "2", title: "Terima Template", desc: "Dapat Google Sheet dengan script siap pasang." },
    { step: "3", title: "Guna!", desc: "Terus mula guna dalam 1-2 jam." }
  ];

  const customSteps = [
    { step: "1", title: "Hantar Template", desc: "Share link Google Sheet RPH sekolah anda." },
    { step: "2", title: "Analisis & Dev", desc: "Saya bina script custom (2-3 hari)." },
    { step: "3", title: "Install & Guna", desc: "Script dipasang, terus boleh guna!" }
  ];

  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Bagaimana Ia <span className="text-accent-purple">Berfungsi?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Template Tersedia Flow */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold">Template Tersedia</h3>
              <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded">RM80</span>
            </div>

            <div className="space-y-6">
              {templateTersediaSteps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Template Flow */}
          <div className="bg-white/5 backdrop-blur-sm border border-accent-purple/30 p-8 rounded-2xl relative">
            <div className="absolute -top-3 right-4">
              <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-white text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-accent-purple" />
              <h3 className="text-xl font-bold">Custom Template</h3>
              <span className="text-sm text-accent-purple bg-accent-purple/10 px-2 py-1 rounded">RM200</span>
            </div>

            <div className="space-y-6">
              {customSteps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/20 border border-accent-purple/50 text-accent-purple font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
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

// Slot Counter Component
const SlotCounter = ({
  sold,
  max,
  isPopular
}: {
  sold: number;
  max: number;
  isPopular: boolean;
}) => {
  const percentage = (sold / max) * 100;
  const remaining = max - sold;
  const isLow = remaining <= 3;
  const isSoldOut = remaining === 0;

  return (
    <div className="mb-6">
      {/* Slot Text */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isLow && !isSoldOut && (
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          )}
          <span className={`text-sm font-medium ${
            isSoldOut
              ? 'text-red-400'
              : isLow
                ? 'text-orange-400'
                : 'text-gray-400'
          }`}>
            {isSoldOut
              ? 'Slot Habis!'
              : isLow
                ? `Tinggal ${remaining} slot lagi!`
                : `${sold}/${max} telah ditempah`
            }
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isSoldOut
              ? 'bg-red-500'
              : isLow
                ? 'bg-gradient-to-r from-orange-500 to-red-500'
                : isPopular
                  ? 'bg-gradient-to-r from-accent-purple to-accent-pink'
                  : 'bg-gradient-to-r from-blue-500 to-accent-purple'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Pricing = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const [slots, setSlots] = useState<SlotsState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slot availability on mount
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        if (data.success && data.slots) {
          setSlots(data.slots);
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
        // Fallback to default values if fetch fails
        setSlots({
          'template-tersedia': { max: 10, sold: 0, remaining: 10 },
          'custom-template': { max: 3, sold: 0, remaining: 3 }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const packages = [
    {
      id: 'template-tersedia',
      name: "Template Tersedia",
      price: "RM80",
      icon: <Package className="w-8 h-8" />,
      description: "Guna template RPH yang telah siap sedia dengan Apps Script",
      features: [
        "Template RPH siap pakai",
        "Apps Script automation",
        "Sidebar UI mesra pengguna",
        "Siap dalam 1-2 jam",
        "30 hari support (bug fix)"
      ],
      popular: false,
      gradient: "from-blue-500 to-accent-purple"
    },
    {
      id: 'custom-template',
      name: "Custom Template",
      price: "RM200",
      icon: <Sparkles className="w-8 h-8" />,
      description: "Apps Script dibina khas mengikut template sekolah anda",
      features: [
        "100% ikut template sekolah anda",
        "Apps Script custom-built",
        "Sidebar UI mesra pengguna",
        "Analisis template penuh",
        "Siap dalam 2-3 hari",
        "90 hari support (bug fix)"
      ],
      popular: true,
      gradient: "from-accent-purple to-accent-pink"
    }
  ];

  return (
    <section className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pilih <span className="text-accent-purple">Pakej Anda</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dua pilihan untuk memenuhi keperluan berbeza. Sekali bayar, guna seumur hidup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, idx) => {
            const slotData = slots?.[pkg.id as keyof SlotsState];
            const isSoldOut = slotData?.remaining === 0;

            return (
              <div
                key={idx}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  pkg.popular
                    ? 'border-accent-purple/50 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                    : 'border-white/10'
                } ${isSoldOut ? 'opacity-75' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-white text-sm font-bold px-4 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${pkg.gradient} flex items-center justify-center text-white mb-6`}>
                  {pkg.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl font-extrabold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                    {pkg.price}
                  </span>
                  <span className="text-gray-500 text-sm">/ sekali bayar</span>
                </div>

                {/* Slot Counter */}
                {isLoading ? (
                  <div className="mb-6 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">Memuatkan slot...</span>
                  </div>
                ) : slotData ? (
                  <SlotCounter
                    sold={slotData.sold}
                    max={slotData.max}
                    isPopular={pkg.popular}
                  />
                ) : null}

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.popular ? 'text-accent-purple' : 'text-green-400'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onOpenForm}
                  disabled={isSoldOut || !IS_LAUNCHED}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-3 font-bold transition-all duration-300 ${
                    isSoldOut || !IS_LAUNCHED
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : pkg.popular
                        ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {!IS_LAUNCHED ? 'Akan Datang' : isSoldOut ? 'Slot Habis' : 'Tempah Sekarang'}
                  {IS_LAUNCHED && !isSoldOut && <Send className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-500 text-sm">
            💡 Tidak pasti pakej mana? Hubungi saya untuk konsultasi percuma!
          </p>
          <p className="text-gray-600 text-xs">
            * Support meliputi pembaikan ralat teknikal (bug fix) sahaja. Permintaan feature tambahan atau perubahan template sekolah akan dikenakan caj berasingan.
          </p>
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
      a: "Untuk pakej Template Tersedia (RM80), siap dalam 1-2 jam sahaja. Untuk pakej Custom Template (RM200), mengambil masa 2-3 hari bekerja selepas saya menerima link template RPH sekolah anda dan pengesahan bayaran."
    },
    {
      q: "Apa beza pakej RM80 dan RM200?",
      a: "Pakej RM80 menggunakan template RPH yang telah siap sedia - sesuai jika anda fleksibel dengan format. Pakej RM200 pula saya bina Apps Script 100% mengikut template sekolah anda - sesuai jika sekolah ada format template yang spesifik."
    },
    {
      q: "Apa yang termasuk dalam support?",
      a: "Support meliputi pembaikan ralat teknikal (bug fix) seperti butang tak berfungsi atau script error. Pakej RM80 dapat 30 hari support, manakala pakej RM200 dapat 90 hari. Permintaan feature tambahan atau perubahan template sekolah akan dikenakan caj berasingan."
    },
    {
      q: "Boleh guna untuk berbilang minggu/tahun?",
      a: "Ya! Sistem ini direka untuk generate RPH minggu demi minggu tanpa had. Anda boleh guna untuk tahun-tahun seterusnya selagi format sekolah tidak berubah drastik."
    },
    {
      q: "Selamat ke data RPH saya?",
      a: "100% selamat. Apps Script ini berjalan sepenuhnya dalam persekitaran Google akaun anda sendiri. Saya tidak menyimpan data pengajaran anda."
    },
    {
      q: "Ada dokumentasi atau panduan penggunaan?",
      a: "Ya! Scroll ke bawah ke bahagian 'Dokumentasi Auto eRPH'. Di situ ada panduan lengkap untuk 7 kategori masalah termasuk setup, upload Word, pengisian RPH, dan troubleshooting. Anda juga boleh search error message terus untuk cari penyelesaian."
    },
    {
      q: "Apa perlu buat jika dapat error?",
      a: "Pertama, rujuk bahagian Dokumentasi di bawah - kebanyakan error biasa sudah ada penyelesaiannya. Cari error message anda menggunakan search bar. Jika masalah tidak tersenarai atau masih tidak selesai, hubungi saya melalui Telegram untuk bantuan lanjut."
    },
    {
      q: "Boleh upload RPH dari Word?",
      a: "Ya! Sistem ini menyokong upload fail .docx (bukan .doc). Pastikan dokumen Word anda mempunyai text 'MINGGU 1', 'MINGGU 2', dll untuk setiap bahagian. Sistem akan auto-parse dan simpan sebagai template mingguan."
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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

// Documentation Data
const documentationData = {
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
          solution: 'Pakej Template Tersedia (RM80) hanya serasi dengan template standard. Untuk template sekolah anda sendiri, sila gunakan Pakej Custom Template (RM200).',
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

const Footer = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <footer className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Bersedia Jimatkan Masa Anda?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Jangan biarkan kerja perkeranian mengganggu fokus mengajar anda. Dapatkan sistem automasi RPH anda hari ini.
        </p>

        <div className="flex flex-col items-center">
          <PrimaryButton large onClick={onOpenForm} disabled={!IS_LAUNCHED}>
            {IS_LAUNCHED ? 'Tempah Sekarang' : 'Akan Datang'}
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
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const openOrderForm = () => setIsOrderFormOpen(true);
  const closeOrderForm = () => setIsOrderFormOpen(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-white bg-navy-900 selection:bg-accent-purple selection:text-white">
      <NavBar onOpenForm={openOrderForm} />
      <Hero onOpenForm={openOrderForm} />
      <ProblemSolution />
      <Features />
      <Process />
      <VideoDemo />
      <Pricing onOpenForm={openOrderForm} />
      <FAQ />
      <Documentation />
      <Footer onOpenForm={openOrderForm} />
      <OrderForm isOpen={isOrderFormOpen} onClose={closeOrderForm} />
    </div>
  );
}

export default AutoErphPage;
