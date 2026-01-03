import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSlots, SlotsState } from '../hooks/useSlots';
import { FAQ, VideoDemo, Documentation, SlotProgressSkeleton, ErrorBoundary } from '../components/auto-erph';
import {
  TELEGRAM_LINK,
  GOOGLE_SCRIPT_URL,
  IS_LAUNCHED,
  RM80_ADDITIONAL_SLOTS,
  TELEGRAM_SUPPORT_LINK,
  LAUNCH_DATE
} from '../components/auto-erph/constants';
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
  ChevronRight,
  Eye,
  BookOpen,
  Table,
  FileUp,
  History,
  Shield,
  Cloud,
  Bot,
  Globe,
  Rocket,
  ArrowUpRight
} from 'lucide-react';

// --- Types ---
// SlotData and SlotsState imported from useSlots hook

// --- Components ---

const Badge = ({ children }: { children?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6 animate-fade-in-up">
    {children}
  </div>
);

// --- Countdown Timer Component ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = LAUNCH_DATE.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) return null;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 text-sm text-amber-400 font-semibold bg-amber-500/10 px-4 py-2 rounded-full mb-6 animate-pulse">
        <Clock className="w-4 h-4" />
        Tempahan Dibuka Pada 30 Dis 2025, 8:00 PM
      </div>

      <div className="flex items-center justify-center gap-3 md:gap-4">
        <TimeBlock value={timeLeft.days} label="Hari" />
        <span className="text-2xl md:text-3xl font-bold text-accent-purple mb-6">:</span>
        <TimeBlock value={timeLeft.hours} label="Jam" />
        <span className="text-2xl md:text-3xl font-bold text-accent-purple mb-6">:</span>
        <TimeBlock value={timeLeft.minutes} label="Minit" />
        <span className="text-2xl md:text-3xl font-bold text-accent-purple mb-6">:</span>
        <TimeBlock value={timeLeft.seconds} label="Saat" />
      </div>
    </div>
  );
};

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
  const { slots } = useSlots({ enabled: isOpen });
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

  // RPH upload states (for Custom package only)
  const [rphUploadType, setRphUploadType] = useState<'excel' | 'google-sheets'>('excel');
  const [rphFile, setRphFile] = useState<File | null>(null);
  const [rphLink, setRphLink] = useState('');
  const rphFileInputRef = useRef<HTMLInputElement>(null);

  // Policy agreement checkbox
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  // Auto-select available package when slots are loaded
  useEffect(() => {
    if (slots) {
      const rm80Available = slots['template-tersedia'].remaining > 0 || RM80_ADDITIONAL_SLOTS > 0;
      const rm200Available = slots['custom-template'].remaining > 0;
      if (!rm80Available && rm200Available) {
        setFormData(prev => ({ ...prev, pakej: 'custom-template' }));
      } else if (rm80Available) {
        setFormData(prev => ({ ...prev, pakej: 'template-tersedia' }));
      }
    }
  }, [slots]);

  const rm80Remaining = (slots?.['template-tersedia']?.remaining ?? 0) + RM80_ADDITIONAL_SLOTS;
  const rm200Remaining = slots?.['custom-template']?.remaining ?? 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRphFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRphFile(e.target.files[0]);
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

      // RPH data for Custom package
      if (formData.pakej === 'custom-template') {
        params.append('rphUploadType', rphUploadType);
        if (rphUploadType === 'excel' && rphFile) {
          const rphBase64 = await fileToBase64(rphFile);
          params.append('rphFile', rphBase64);
          params.append('rphFileName', rphFile.name);
          params.append('rphFileType', rphFile.type);
        } else if (rphUploadType === 'google-sheets' && rphLink) {
          params.append('rphLink', rphLink);
        }
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
      setRphUploadType('excel');
      setRphFile(null);
      setRphLink('');

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
    setRphUploadType('excel');
    setRphFile(null);
    setRphLink('');
    setAgreedToPolicy(false);
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
              <p className="text-gray-400 mb-4">
                Terima kasih! Pembayaran anda akan disemak dan diproses dalam masa 30 minit.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-amber-200 font-medium mb-1">
                  📧 Penting:
                </p>
                <p className="text-sm text-gray-400">
                  Sila semak folder <strong className="text-white">Spam/Junk</strong> jika tidak menerima email pengesahan dalam inbox anda.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-200 font-medium mb-1">
                  💬 Telegram Support:
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Join group Telegram untuk sokongan teknikal dan updates.
                </p>
                <a
                  href={TELEGRAM_SUPPORT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Support Group
                </a>
              </div>
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
                  className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white focus:outline-none transition-colors ${
                    formData.pakej === 'template-tersedia' && RM80_ADDITIONAL_SLOTS > 0
                      ? 'border-green-500/50 focus:border-green-500/70 focus:ring-1 focus:ring-green-500/50'
                      : 'border-white/10 focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50'
                  }`}
                >
                  <option
                    value="template-tersedia"
                    className="bg-navy-800"
                    disabled={rm80Remaining <= 0}
                  >
                    Template Tersedia - RM80 {rm80Remaining <= 0 ? '(HABIS)' : RM80_ADDITIONAL_SLOTS > 0 ? `(+${RM80_ADDITIONAL_SLOTS} SLOT BARU!)` : `(${rm80Remaining} slot)`}
                  </option>
                  <option
                    value="custom-template"
                    className="bg-navy-800"
                    disabled={rm200Remaining <= 0}
                  >
                    Custom Template - RM200 {rm200Remaining <= 0 ? '(HABIS)' : `(${rm200Remaining} slot)`}
                  </option>
                </select>
                {/* Additional Slots Notice */}
                {formData.pakej === 'template-tersedia' && RM80_ADDITIONAL_SLOTS > 0 && (
                  <div className="mt-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-300 flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-green-400" />
                      Permintaan tinggi! {RM80_ADDITIONAL_SLOTS} slot tambahan dibuka
                    </p>
                  </div>
                )}
                {rm80Remaining <= 0 && rm200Remaining <= 0 && (
                  <p className="text-sm text-red-400 mt-2">
                    Maaf, semua slot telah penuh. Sila hubungi Telegram untuk senarai menunggu.
                  </p>
                )}
              </div>

              {/* RPH Upload - Only for Custom Template */}
              {formData.pakej === 'custom-template' && (
                <div className="space-y-4">
                  {/* Pre-Assessment Notice */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-300 mb-1">Proses Pra-Penilaian</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Untuk pakej Custom Template, saya akan <strong className="text-white">analisis template anda terlebih dahulu</strong> untuk pastikan ia boleh diautomasikan.
                          Bayaran hanya dibuat <strong className="text-white">selepas pengesahan</strong> template sesuai. Jika template tidak sesuai, anda tidak perlu bayar.
                        </p>
                      </div>
                    </div>
                  </div>

                  <label className="block text-sm font-medium text-gray-300">
                    Muat Naik Template RPH Sekolah Anda
                  </label>

                  {/* Toggle Options */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setRphUploadType('excel'); setRphLink(''); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                        rphUploadType === 'excel'
                          ? 'bg-accent-purple/20 border border-accent-purple/50 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Table className="w-4 h-4" />
                      Fail Excel
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRphUploadType('google-sheets'); setRphFile(null); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                        rphUploadType === 'google-sheets'
                          ? 'bg-accent-purple/20 border border-accent-purple/50 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Google Sheets
                    </button>
                  </div>

                  {/* Excel Upload */}
                  {rphUploadType === 'excel' && (
                    <div
                      onClick={() => rphFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                        rphFile
                          ? 'border-green-500/50 bg-green-500/5'
                          : 'border-white/10 hover:border-accent-purple/50 hover:bg-white/5'
                      }`}
                    >
                      <input
                        ref={rphFileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleRphFileChange}
                        className="hidden"
                      />
                      {rphFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 text-sm">{rphFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <FileUp className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                          <p className="text-sm text-gray-400">Klik untuk muat naik fail Excel</p>
                          <p className="text-xs text-gray-500">.xlsx atau .xls</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Google Sheets Link */}
                  {rphUploadType === 'google-sheets' && (
                    <input
                      type="url"
                      value={rphLink}
                      onChange={(e) => setRphLink(e.target.value)}
                      placeholder="Paste link Google Sheets anda"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-colors text-sm"
                    />
                  )}

                  <p className="text-xs text-gray-500">
                    {rphUploadType === 'google-sheets'
                      ? 'Pastikan link boleh diakses (Share → Anyone with the link)'
                      : 'Saya akan gunakan fail ini sebagai rujukan untuk custom template anda'}
                  </p>
                </div>
              )}

              {/* Upload Resit - Required for RM80, Optional for RM200 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {formData.pakej === 'custom-template'
                    ? 'Muat Naik Resit Pembayaran (Optional)'
                    : 'Muat Naik Resit Pembayaran'}
                </label>

                {formData.pakej === 'custom-template' && (
                  <p className="text-xs text-gray-500 mb-2">
                    Boleh skip dahulu. Bayaran dibuat selepas template disahkan sesuai.
                  </p>
                )}

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
              <div className={`rounded-lg p-4 ${
                formData.pakej === 'custom-template'
                  ? 'bg-blue-500/10 border border-blue-500/30'
                  : 'bg-accent-purple/10 border border-accent-purple/30'
              }`}>
                {formData.pakej === 'custom-template' ? (
                  <>
                    <p className="text-sm text-blue-300 mb-2">
                      <strong>Proses Seterusnya:</strong>
                    </p>
                    <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                      <li>Saya akan semak template anda dalam <strong className="text-white">24 jam</strong></li>
                      <li>Jika sesuai, saya akan hubungi anda untuk pembayaran</li>
                      <li>Jika tidak sesuai, anda akan dimaklumkan (tiada caj)</li>
                    </ol>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Maklumat Pembayaran:</strong>
                    </p>
                    <p className="text-sm text-gray-400">
                      Bank: <strong className="text-white">Maybank</strong><br/>
                      No. Akaun: <strong className="text-white">153039127745</strong><br/>
                      Nama: <strong className="text-white">AHMAD AIMAN</strong>
                    </p>
                  </>
                )}
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

              {/* Policy Agreement Checkbox */}
              <div className={`rounded-lg p-4 ${
                formData.pakej === 'custom-template'
                  ? 'bg-blue-500/5 border border-blue-500/20'
                  : 'bg-amber-500/5 border border-amber-500/20'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreedToPolicy}
                      onChange={(e) => setAgreedToPolicy(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-500 rounded transition-all peer-checked:border-green-500 peer-checked:bg-green-500 group-hover:border-gray-400">
                      {agreedToPolicy && (
                        <CheckCircle className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {formData.pakej === 'custom-template' ? (
                      <>
                        Saya faham bahawa ini adalah <strong className="text-white">permohonan untuk penilaian template</strong>.
                        Bayaran hanya dibuat selepas template disahkan sesuai.
                        <strong className="text-blue-400"> Produk digital TIDAK BOLEH di-refund</strong> setelah pembayaran dan script dihantar.
                      </>
                    ) : (
                      <>
                        Saya telah membaca semua <strong className="text-white">ciri-ciri pakej</strong> dan faham bahawa <strong className="text-amber-400">produk digital TIDAK BOLEH di-refund</strong> setelah template dan script dihantar.
                      </>
                    )}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !agreedToPolicy}
                className={`w-full py-4 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  formData.pakej === 'custom-template'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    : 'bg-gradient-to-r from-accent-purple to-accent-pink hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menghantar...
                  </>
                ) : formData.pakej === 'custom-template' ? (
                  <>
                    <Eye className="w-5 h-5" />
                    Hantar untuk Penilaian
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

  // If not launched, show mystery price
  if (!IS_LAUNCHED) {
    return (
      <div className="relative select-none">
        <div className="text-4xl font-bold text-gray-500">
          RM???
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Harga didedahkan 30 Dis
        </div>
      </div>
    );
  }

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
  const { slots, isLoading } = useSlots();

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

        {/* Countdown Timer - Only show when not launched */}
        {!IS_LAUNCHED && <CountdownTimer />}

        {/* Price Cards with Slot Counter */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mb-10 max-w-2xl mx-auto">
          {/* RM80 Card */}
          <div className="flex-1 bg-white/5 border border-green-500/50 rounded-2xl p-6 hover:border-green-400/70 transition-all hover:-translate-y-1 relative overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            {/* Restock Badge */}
            {RM80_ADDITIONAL_SLOTS > 0 && (
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-bl-xl rounded-tr-xl blur-md opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl flex items-center gap-1 shadow-lg">
                    <Flame className="w-3 h-3 animate-pulse" />
                    <span>+{RM80_ADDITIONAL_SLOTS} SLOT BARU!</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Package className="w-5 h-5" />
              <span className="text-sm font-medium">Template Tersedia</span>
            </div>
            <div className="mb-4">
              <BlurredPrice price="RM80" />
            </div>

            {/* Hot Demand Notice */}
            {RM80_ADDITIONAL_SLOTS > 0 && (
              <div className="mb-3 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                <p className="text-xs text-green-300 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Permintaan tinggi! Slot tambahan dibuka
                </p>
              </div>
            )}

            {/* Slot Progress */}
            {!isLoading && slots ? (() => {
              const rm80Max = slots['template-tersedia'].max + RM80_ADDITIONAL_SLOTS;
              const rm80Remaining = slots['template-tersedia'].remaining + RM80_ADDITIONAL_SLOTS;
              const rm80Sold = slots['template-tersedia'].sold;
              return (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ditempah</span>
                    <span className={`font-semibold ${rm80Remaining <= 3 ? 'text-orange-400' : 'text-green-400'}`}>
                      {rm80Sold} / {rm80Max}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${(rm80Sold / rm80Max) * 100}%` }}
                    />
                  </div>
                  {rm80Remaining <= 3 && rm80Remaining > 0 && (
                    <div className="flex items-center gap-1 text-orange-400 text-xs">
                      <Flame className="w-3 h-3 animate-pulse" />
                      <span>Tinggal {rm80Remaining} slot!</span>
                    </div>
                  )}
                </div>
              );
            })() : (
              <SlotProgressSkeleton />
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
              <SlotProgressSkeleton />
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
    { step: "1", title: "Hubungi & Bayar", desc: IS_LAUNCHED ? "Chat di Telegram, buat bayaran RM80." : "Chat di Telegram, buat bayaran." },
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
              <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{IS_LAUNCHED ? 'RM80' : 'RM???'}</span>
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
              <span className="text-sm text-accent-purple bg-accent-purple/10 px-2 py-1 rounded">{IS_LAUNCHED ? 'RM200' : 'RM???'}</span>
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
// Slot Counter Component
const SlotCounter = ({
  sold,
  max,
  isPopular,
  isRestock = false
}: {
  sold: number;
  max: number;
  isPopular: boolean;
  isRestock?: boolean;
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
          {isRestock && !isLow && !isSoldOut && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
          <span className={`text-sm font-medium ${
            isSoldOut
              ? 'text-red-400'
              : isLow
                ? 'text-orange-400'
                : isRestock
                  ? 'text-green-400'
                  : 'text-gray-400'
          }`}>
            {isSoldOut
              ? 'Slot Habis!'
              : isLow
                ? `Tinggal ${remaining} slot lagi!`
                : isRestock
                  ? `${remaining} slot tersedia!`
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
                : isRestock
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400'
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
  const { slots, isLoading } = useSlots();

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
            // Apply additional slots for template-tersedia package
            const additionalSlots = pkg.id === 'template-tersedia' ? RM80_ADDITIONAL_SLOTS : 0;
            const remaining = (slotData?.remaining ?? 0) + additionalSlots;
            const max = (slotData?.max ?? 0) + additionalSlots;
            const sold = slotData?.sold ?? 0;
            const isSoldOut = remaining === 0;

            // Check if this package has additional slots (for special styling)
            const hasAdditionalSlots = additionalSlots > 0;

            return (
              <div
                key={idx}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  pkg.popular
                    ? 'border-accent-purple/50 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                    : hasAdditionalSlots
                      ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                      : 'border-white/10'
                } ${isSoldOut ? 'opacity-75' : ''}`}
              >
                {/* Restock Badge for RM80 */}
                {hasAdditionalSlots && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50 animate-pulse" />
                      <span className="relative bg-gradient-to-r from-green-500 to-emerald-400 text-white text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Flame className="w-3.5 h-3.5 animate-pulse" />
                        +{additionalSlots} Slot Tambahan!
                      </span>
                    </div>
                  </div>
                )}

                {pkg.popular && !hasAdditionalSlots && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-white text-sm font-bold px-4 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${hasAdditionalSlots ? 'from-green-500 to-emerald-400' : pkg.gradient} flex items-center justify-center text-white mb-6`}>
                  {pkg.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

                {/* Hot Demand Notice */}
                {hasAdditionalSlots && (
                  <div className="mb-4 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-300 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Permintaan tinggi! Slot tambahan dibuka
                    </p>
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-4">
                  {IS_LAUNCHED ? (
                    <>
                      <span className={`text-4xl font-extrabold bg-gradient-to-r ${hasAdditionalSlots ? 'from-green-500 to-emerald-400' : pkg.gradient} bg-clip-text text-transparent`}>
                        {pkg.price}
                      </span>
                      <span className="text-gray-500 text-sm">/ sekali bayar</span>
                    </>
                  ) : (
                    <div>
                      <span className="text-4xl font-extrabold text-gray-500">RM???</span>
                      <p className="text-xs text-gray-500 mt-1">Harga didedahkan 30 Dis</p>
                    </div>
                  )}
                </div>

                {/* Slot Counter */}
                {isLoading ? (
                  <div className="mb-6">
                    <SlotProgressSkeleton />
                  </div>
                ) : slotData ? (
                  <SlotCounter
                    sold={sold}
                    max={max}
                    isPopular={pkg.popular}
                    isRestock={hasAdditionalSlots}
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

// --- Changelog/Roadmap Section ---
const ChangelogSection = () => {
  const [expandedVersion, setExpandedVersion] = useState<string | null>('v1.0.12');

  const changelog = [
    {
      version: 'v1.0.12',
      date: 'Januari 2026',
      status: 'latest',
      highlights: [
        {
          icon: Bot,
          title: 'Gemini AI Parsing',
          description: 'Upload Word dalam apa-apa format, AI faham automatik. Sokong BM, English, Jawi, Arab, Tamil & Cina.',
          color: 'purple'
        },
        {
          icon: Cloud,
          title: 'DSKP Cloud Database',
          description: 'Data SK/SP dari cloud - sentiasa terkini tanpa perlu update manual.',
          color: 'blue'
        },
        {
          icon: Shield,
          title: 'Keselamatan Dipertingkat',
          description: 'Perlindungan data input dan kawalan akses yang lebih baik.',
          color: 'green'
        },
        {
          icon: Globe,
          title: 'Sokongan Pelbagai Bahasa',
          description: 'Parsing pintar untuk dokumen Jawi, Arab, Tamil dan Cina.',
          color: 'pink'
        }
      ],
      details: [
        'Pilihan Tahun/Tingkatan untuk template mingguan',
        'DSKP Helper dengan dropdown filter (Subjek → Tahun → Tema)',
        'Auto-retry untuk upload Word jika API sibuk',
        'Tetapan API Key sendiri (optional) untuk penggunaan tinggi'
      ]
    },
    {
      version: 'v1.0.11',
      date: 'Disember 2025',
      status: 'previous',
      highlights: [
        {
          icon: Layers,
          title: 'Multi-Slot System',
          description: 'Sokongan multiple RPH per minggu dengan sistem slot.',
          color: 'purple'
        },
        {
          icon: FileUp,
          title: 'Word Parser Improved',
          description: 'Parsing lebih tepat untuk format PSV, BM dan lain-lain.',
          color: 'blue'
        }
      ],
      details: [
        'Auto-assign slot untuk multiple RPH dalam satu minggu',
        'Simpan template lebih pantas',
        'Format SK/SP yang lebih kemas dan tersusun'
      ]
    },
    {
      version: 'v1.0.10',
      date: 'November 2025',
      status: 'previous',
      highlights: [
        {
          icon: Table,
          title: 'Template Mingguan',
          description: 'Simpan dan guna semula template untuk setiap minggu.',
          color: 'green'
        }
      ],
      details: [
        'Sistem template mingguan',
        'DSKP browser untuk cari SK/SP',
        'Antaramuka pengguna yang lebih baik'
      ]
    }
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: 'bg-accent-purple/10', border: 'border-accent-purple/30', text: 'text-accent-purple' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    pink: { bg: 'bg-accent-pink/10', border: 'border-accent-pink/30', text: 'text-accent-pink' }
  };

  return (
    <section id="changelog" className="py-20 bg-navy-900/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-medium mb-6">
            <History className="w-4 h-4" />
            Changelog & Roadmap
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Kemas Kini <span className="text-accent-purple">Terbaru</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Lihat apa yang baru dalam Auto eRPH. Kami sentiasa menambah baik sistem untuk pengalaman terbaik.
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="max-w-4xl mx-auto">
          {changelog.map((release, index) => (
            <div key={release.version} className="relative">
              {/* Timeline line */}
              {index < changelog.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple/50 to-transparent" />
              )}

              {/* Version Card */}
              <div className="relative pl-16 pb-12">
                {/* Timeline dot */}
                <div className={`absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                  release.status === 'latest'
                    ? 'bg-accent-purple shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                    : 'bg-gray-700'
                }`}>
                  {release.status === 'latest' ? (
                    <Rocket className="w-3 h-3 text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    release.status === 'latest'
                      ? 'border-accent-purple/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setExpandedVersion(expandedVersion === release.version ? null : release.version)}
                >
                  {/* Card Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold">{release.version}</h3>
                          {release.status === 'latest' && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-accent-purple rounded-full">
                              TERKINI
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{release.date}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedVersion === release.version ? 'rotate-180' : ''
                    }`} />
                  </div>

                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedVersion === release.version ? 'max-h-[1000px]' : 'max-h-0'
                  }`}>
                    <div className="px-6 pb-6">
                      {/* Highlights Grid */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {release.highlights.map((highlight, i) => {
                          const colors = colorClasses[highlight.color];
                          return (
                            <div
                              key={i}
                              className={`${colors.bg} border ${colors.border} rounded-xl p-4`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                  <highlight.icon className={`w-5 h-5 ${colors.text}`} />
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">{highlight.title}</h4>
                                  <p className="text-sm text-gray-400">{highlight.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Details List */}
                      <div className="bg-black/20 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Perincian Perubahan
                        </h4>
                        <ul className="space-y-2">
                          {release.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-accent-purple" />
              <span className="font-semibold">Akan Datang</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Integrasi Google Classroom, Export PDF automatik, Dashboard statistik penggunaan, dan banyak lagi dalam perancangan.
            </p>
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
    <ErrorBoundary>
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
        <ChangelogSection />
        <Footer onOpenForm={openOrderForm} />
        <OrderForm isOpen={isOrderFormOpen} onClose={closeOrderForm} />
      </div>
    </ErrorBoundary>
  );
}

export default AutoErphPage;
