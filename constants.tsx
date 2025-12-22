
import React from 'react';
import {
  Chrome,
  Users,
  Eye,
  FileCheck,
  Zap,
  FileText,
  Facebook,
  Globe,
  Palette,
  Hourglass,
  BookOpen,
  Bot,
  GraduationCap,
  ScrollText,
  History,
  Languages,
  FileSpreadsheet
} from 'lucide-react';
import { Extension, StatItem, Testimonial, SocialLink, Achievement, MediaChannel, BlogPost } from './types';

// Using a custom TikTok icon component as it's not in the default lucide set used in this context
const TikTokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const EXTENSIONS: Extension[] = [
  {
    id: 'idme',
    title: 'IDME PBD Helper',
    description: 'Automasi pengurusan data IDME PBD untuk guru. Jimatkan masa memasukkan markah dan data pentaksiran.',
    features: ['Auto-fill Data', 'Analisis Cepat', 'Mesra Pengguna'],
    stats: '3,000+ Guru',
    link: 'https://ahmdaime.github.io/cikguaime/landing-page.html',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    icon: <Zap className="w-6 h-6 text-white" />,
    tags: ['Best Seller', 'Produktiviti'],
    image: 'https://i.imgur.com/aPBQ26s.png',
    rating: 5.0,
    users: '3,000+',
    category: 'Produktiviti'
  },
  {
    id: 'moies',
    title: 'MOIES Kehadiran Helper',
    description: 'Sistem automasi untuk pengurusan kehadiran guru dan murid dalam platform MOIES.',
    features: ['Satu Klik Siap', 'Laporan Automatik', 'Data Tepat'],
    stats: '3,000+ Guru',
    link: 'https://landing-page-moies.vercel.app/',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: <FileCheck className="w-6 h-6 text-white" />,
    tags: ['Automasi', 'Kehadiran'],
    image: 'https://i.imgur.com/RODLmhS.png',
    rating: 5.0,
    users: '3,000+',
    category: 'Kehadiran'
  },
  {
    id: 'onepage',
    title: 'PBD OnePage',
    description: 'Tukar laporan berbilang halaman kepada satu halaman padat untuk penjimatan kertas dan dakwat.',
    features: ['Jimat Kertas', 'Tandatangan Digital', 'Batch Processing'],
    stats: '4,000+ Guru',
    link: 'https://chromewebstore.google.com/detail/pbd-onepage-laporan-satu/lbefimcackfpdklimoiclkklookickjl',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: <FileText className="w-6 h-6 text-white" />,
    tags: ['Eco-Friendly', 'Printing'],
    image: 'https://i.imgur.com/JV01XFT.png',
    rating: 5.0,
    users: '4,000+',
    category: 'Utiliti'
  }
];

// Auto eRPH - Apps Script (separate from Chrome extensions)
export const AUTO_ERPH = {
  id: 'auto-erph',
  title: 'Auto eRPH',
  description: 'Sistem automasi RPH Google Sheets yang dibina 100% custom mengikut struktur sekolah anda. Siap dalam 5 minit!',
  features: ['Full Custom', 'Sidebar UI', 'Lifetime Support'],
  stats: '50+ Guru',
  link: '/auto-erph',
  gradient: 'from-purple-500 via-pink-500 to-rose-500',
  icon: <FileSpreadsheet className="w-6 h-6 text-white" />,
  tags: ['Terbaru', 'Apps Script'],
  image: 'https://i.imgur.com/qRnZNoL.jpeg',
  isInternal: true,
  isFeatured: true,
  users: '50+',
  category: 'Apps Script'
};

export const STUDENT_INNOVATIONS: Extension[] = [
  {
    id: 'ai-sejarah',
    title: 'AI Tutor Sejarah Thn 6',
    description: 'Custom GPT yang dilatih khusus untuk membantu murid menguasai silibus Sejarah Tahun 6 KSSR.',
    features: ['Tanya Apa Sahaja', 'Semakan Fakta', 'Interaktif 24/7'],
    stats: 'AI Powered',
    link: 'https://chatgpt.com/g/g-675ec0b937788191ada65642e362dc03-sejarah-tahun-6-kssr',
    gradient: 'from-violet-600 via-fuchsia-500 to-pink-500',
    icon: <Bot className="w-8 h-8 text-white" />,
    tags: ['Artificial Intelligence', 'Inovasi 2025']
  },
  {
    id: 'uasa-thn6',
    title: 'Bank Soalan UASA Thn 6',
    description: 'Set ulangkaji format UASA sebenar untuk Sejarah Tahun 6. Telah dijawab oleh ribuan murid.',
    features: ['Format Terkini', 'Skema Jawapan', 'Google Form'],
    stats: '2,000+ Calon',
    link: 'https://www.cikguaime.com/2024/01/set-ulang-kaji-uasa-sejarah-tahun-6.html',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    tags: ['Peperiksaan', 'Latih Tubi']
  },
  {
    id: 'kerja-kursus',
    title: 'Panduan Kerja Kursus',
    description: 'Panduan lengkap langkah demi langkah untuk membantu murid menyiapkan kerja kursus Sejarah.',
    features: ['Langkah Mudah', 'Contoh Jawapan', 'Video Tutorial'],
    stats: '200,000+ Capaian',
    link: 'https://www.cikguaime.com/',
    gradient: 'from-emerald-500 via-green-500 to-teal-400',
    icon: <ScrollText className="w-8 h-8 text-white" />,
    tags: ['Viral', 'Wajib Baca']
  },
  {
    id: 'psv-thn6',
    title: 'Kuiz Interaktif PSV',
    description: 'Latihan Pendidikan Seni Visual Tahun 6 dengan pendekatan visual yang menarik minat murid.',
    features: ['Soalan Bergambar', 'Mesra Mobile', 'Skor Automatik'],
    stats: 'Tahun 6',
    link: 'https://ahmdaime.github.io/cikguaime/kuizpsvtahun6.html',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    icon: <Palette className="w-8 h-8 text-white" />,
    tags: ['Seni', 'Gamifikasi']
  },
  {
    id: 'sej-thn6',
    title: 'Kuiz Sejarah Thn 6',
    description: 'Latih tubi interaktif Sejarah Tahun 6 untuk mengukuhkan ingatan fakta-fakta penting.',
    features: ['Latih Tubi', 'Fakta Padat', 'Interaktif'],
    stats: 'Tahun 6',
    link: 'https://ahmdaime.github.io/cikguaime/kuizsejarahtahun6.html',
    gradient: 'from-amber-600 via-orange-500 to-yellow-500',
    icon: <History className="w-8 h-8 text-white" />,
    tags: ['Sejarah', 'Ulangkaji']
  },
  {
    id: 'sej-thn5',
    title: 'Kuiz Sejarah Thn 5',
    description: 'Modul kuiz digital untuk silibus Sejarah Tahun 5 bagi persediaan awal murid.',
    features: ['Soalan Topikal', 'Mesra Murid', 'Web-Based'],
    stats: 'Tahun 5',
    link: 'https://ahmdaime.github.io/cikguaime/index.html',
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    icon: <History className="w-8 h-8 text-white" />,
    tags: ['Sejarah', 'Digital']
  },
  {
    id: 'bm-thn4',
    title: 'Kuiz BM Thn 4 (Bhg A)',
    description: 'Latihan Bahasa Melayu Tahun 4 memfokuskan kepada Bahagian A (Sistem Bahasa).',
    features: ['Tatabahasa', 'Pemahaman', 'Skor Terus'],
    stats: 'Tahun 4',
    link: 'https://ahmdaime.github.io/bmtahun4/',
    gradient: 'from-indigo-600 via-blue-500 to-cyan-500',
    icon: <Languages className="w-8 h-8 text-white" />,
    tags: ['Bahasa', 'Tatabahasa']
  }
];

export const STATS: StatItem[] = [
  {
    id: 1,
    label: 'Guru Menggunakan Extension',
    value: '2,400',
    suffix: '+',
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 2,
    label: 'Murid Dibantu',
    value: '200',
    suffix: 'k+',
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    id: 3,
    label: 'Inovasi Digital',
    value: '7',
    suffix: '+',
    icon: <Zap className="w-6 h-6" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Cikgu Sarah",
    role: "Guru SK di Selangor",
    text: "IDME PBD Helper sangat membantu! Kerja yang biasanya ambil masa 3 hari, sekarang siap dalam 3 jam sahaja.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Cikgu Azlan",
    role: "Guru Besar",
    text: "Inovasi yang sangat diperlukan dalam sistem pendidikan kita. PBD OnePage menjimatkan kos kertas sekolah kami.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Adik Faris",
    role: "Murid Tahun 6",
    text: "Kuiz Sejarah Cikgu Aime best! Saya boleh buat ulangkaji guna phone je masa dalam kereta.",
    avatar: "https://picsum.photos/100/100?random=4"
  }
];

export const SOCIALS: SocialLink[] = [
  {
    name: 'Website',
    url: 'https://www.cikguaime.com/',
    icon: <Globe className="w-5 h-5" />
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/aimansic/',
    icon: <Facebook className="w-5 h-5" />
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@ahmdaime',
    icon: <TikTokIcon />
  }
];

// Latest blog posts (manually curated)
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'IDME PBD Helper: Memudahkan Guru Mengisi PBD di IDME',
    excerpt: 'Extension Chrome yang direka khas untuk membantu guru-guru mengisi data PBD dengan lebih pantas dan efisien.',
    date: '09 Nov 2025',
    link: 'https://www.cikguaime.com/2025/11/idme-pbd-helper-memudahkan-guru-mengisi.html'
  },
  {
    id: 2,
    title: 'Contoh Ulasan Guru Untuk Pelaporan Murid (Kemaskini 2025)',
    excerpt: 'Sejak UPSR dimansuhkan, Pentaksiran Bilik Darjah (PBD) telah menjadi instrumen utama untuk mengukur tahap pencapaian murid.',
    date: '01 Nov 2025',
    link: 'https://www.cikguaime.com/2022/09/contoh-ulasan-pbd.html'
  },
  {
    id: 3,
    title: 'Soalan Sejarah Tahun 6 (Kuiz Interaktif)',
    excerpt: 'Kuiz interaktif Sejarah Tahun 6 untuk membantu murid mengulangkaji silibus dengan cara yang menyeronokkan dan efektif.',
    date: '30 Okt 2025',
    link: 'https://www.cikguaime.com/2025/10/soalan-sejarah-tahun-6-kuiz-interaktif.html'
  }
];

// Teaching journey achievements (2021-2024)
export const ACHIEVEMENTS: Achievement[] = [
  {
    year: '2021',
    title: 'Permulaan Kerjaya',
    highlights: [
      'Dilantik sebagai pendidik di SK Putrajaya Presint 5(1)',
      'Mula mengajar di tengah pandemik COVID-19',
      'Transisi dari pelajar kepada pendidik profesional'
    ],
    link: 'https://www.cikguaime.com/2022/11/refleksi-cikgu-aime-tahun-2021.html',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2022',
    title: 'Tanggungjawab Baru',
    highlights: [
      'Dilantik sebagai Penyelaras TVPSS Sekolah',
      'Berkongsi ilmu melalui penulisan blog',
      'Pembangunan profesional dalam bidang pendidikan'
    ],
    link: 'https://www.cikguaime.com/2022/11/refleksi-cikgu-aime-tahun-2022.html',
    color: 'from-purple-500 to-pink-500'
  },
  {
    year: '2023',
    title: 'Pengiktirafan Digital',
    highlights: [
      'Tersenarai TOP 150 Cikgu Juara Digital (Ranking #112)',
      'Menghasilkan video Raya pertama sekolah dengan kualiti profesional',
      'Tahun ketiga perkhidmatan sebagai pendidik'
    ],
    link: 'https://www.cikguaime.com/2024/12/refleksi-cikgu-aime-tahun-2023.html',
    color: 'from-orange-500 to-red-500'
  },
  {
    year: '2024',
    title: 'Kepimpinan Komuniti',
    highlights: [
      'Sertai "Perkongsian Kisah Digital" dengan hampir 1,000 pendidik',
      'Penulisan refleksi tahunan selama 4 tahun berturut-turut',
      'Aktif dalam kumpulan Edufluencer Putrajaya'
    ],
    link: 'https://www.cikguaime.com/2025/01/refleksi-cikgu-aime-tahun-2024.html',
    color: 'from-green-500 to-emerald-500'
  }
];

// Media channels for video editing and content creation
export const MEDIA_CHANNELS: MediaChannel[] = [
  {
    id: 'tvpss-youtube',
    platform: 'youtube',
    title: 'TVPSS FiveOne',
    handle: '@TVPSSFIVEONE',
    description: 'Saluran rasmi TVPSS SK Putrajaya Presint 5(1). Video dokumentari, berita sekolah, dan program khas yang dihasilkan dengan kualiti profesional.',
    link: 'https://www.youtube.com/@TVPSSFIVEONE',
    gradient: 'from-red-500 via-red-600 to-red-700',
    stats: 'Video Editor'
  },
  {
    id: 'tvpss-tiktok',
    platform: 'tiktok',
    title: 'TVPSS FiveOne',
    handle: '@tvpssfiveone',
    description: 'Kandungan kreatif pendek untuk TVPSS. Klip trending, highlights, dan behind-the-scenes aktiviti sekolah.',
    link: 'https://www.tiktok.com/@tvpssfiveone',
    gradient: 'from-gray-900 via-black to-gray-800',
    stats: 'Content Creator'
  },
  {
    id: 'ahmdaime-tiktok',
    platform: 'tiktok',
    title: 'Cikgu Aime',
    handle: '@ahmdaime',
    description: 'Kandungan pendidikan yang kreatif dan informatif. Tips mengajar, perkongsian inovasi digital, dan inspirasi untuk pendidik.',
    link: 'https://www.tiktok.com/@ahmdaime',
    gradient: 'from-cyan-400 via-pink-500 to-purple-600',
    stats: 'Edu Creator'
  }
];
