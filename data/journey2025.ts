// Types for Journey 2025 data
export interface MajorAward {
    image: string;
    title: string;
    description: string;
    awards: string[];
    link: string | null;
    linkType: string | null;
}

export interface VideoAchievement {
    image: string;
    title: string;
    description: string;
    awards: string[];
    stats: string | null;
    link: string | null;
}

export interface ContentStats {
    image: string;
    title: string;
    stats: Array<{ value: string; label: string }>;
}

export interface RepresentationAchievement {
    image: string;
    title: string;
    description: string;
    badge: string;
    link: string | null;
}

export interface SportsAchievement {
    image: string;
    title: string;
    description: string;
    role: string;
    featured: boolean;
}

export interface OtherAchievement {
    image: string;
    title: string;
    description: string;
    type: string;
}

// Major Awards
export const majorAwards: MajorAward[] = [
    {
        image: 'https://i.imgur.com/MUB64Fo.jpeg',
        title: 'Anugerah Perkhidmatan Cemerlang & Pencipta Kandungan Digital',
        description: 'Menerima APC dan Anugerah Pencipta Kandungan Digital WP Putrajaya',
        awards: ['APC', 'Pencipta Kandungan Digital WP'],
        link: 'https://www.tiktok.com/@ahmdaime/video/7546515182516833544',
        linkType: 'tiktok'
    },
    {
        image: 'https://i.imgur.com/ZmKLHQH.jpeg',
        title: 'SAS International Techno Drama',
        description: 'Menyertai pertandingan drama teknologi peringkat antarabangsa',
        awards: ['Best Poster', 'Best Actress - Adik Ilhan', 'Platinum Award', '3rd Place'],
        link: null,
        linkType: null
    }
];

// Video & Creative Achievements
export const videoAchievements: VideoAchievement[] = [
    {
        image: 'https://i.imgur.com/aS6cBGI.jpeg',
        title: 'Festival Lakon Layar WP Putrajaya',
        description: 'Pertandingan filem pendek peringkat WP',
        awards: ['Poster Terbaik', 'Pelakon Wanita Terbaik', 'Suntingan Terbaik', 'Tempat Ke-3'],
        stats: '63K',
        link: 'https://youtu.be/lGY8KsHjkWI',
    },
    {
        image: 'https://i.imgur.com/gBLBxfj.jpeg',
        title: 'Video Kreatif TVPSS Kebangsaan',
        description: 'Pertandingan peringkat kebangsaan',
        awards: ['Naib Johan'],
        stats: null,
        link: 'https://youtu.be/LeEWyrMck1c',
    },
    {
        image: 'https://i.imgur.com/1PZeNd6.jpeg',
        title: 'Video Pendek "Lewat"',
        description: 'Video viral di YouTube',
        awards: ['Viral'],
        stats: '136K',
        link: 'https://youtu.be/1BOLlif3eog',
    },
    {
        image: 'https://i.imgur.com/aj4K5Kk.png',
        title: 'Montaj PETAH KPM 2025',
        description: 'Program PETAH peringkat KPM',
        awards: ['Penglibatan'],
        stats: null,
        link: 'https://youtu.be/QbVaKL7tPoc',
    },
    {
        image: 'https://i.imgur.com/6VsYKN3.jpeg',
        title: 'Video SEA-PLM 2024',
        description: 'Pelancaran Main Regional Report',
        awards: ['Antarabangsa'],
        stats: null,
        link: null,
    },
    {
        image: 'https://i.imgur.com/mM6gwwb.jpeg',
        title: 'Hakim TVPSS SM',
        description: 'Hakim jemputan peringkat SM',
        awards: ['Hakim Jemputan'],
        stats: null,
        link: null,
    },
    {
        image: 'https://i.imgur.com/jPNcBKi.jpeg',
        title: 'TikTok Keselamatan Jalan Raya',
        description: 'Pertandingan peringkat kebangsaan',
        awards: ['Anugerah Khas Juri'],
        stats: null,
        link: 'https://www.tiktok.com/@tvpssfiveone/video/7568811694596623624',
    }
];

// Content Creation Stats
export const contentStats: ContentStats = {
    image: 'https://i.imgur.com/gQo8dNh.jpeg',
    title: 'Peneraju Media Sosial Sekolah',
    stats: [
        { value: '24', label: 'Episod YouTube' },
        { value: '66', label: 'Konten TikTok' },
        { value: '95', label: 'Post Facebook' }
    ]
};

// Representation & Leadership
export const representationAchievements: RepresentationAchievement[] = [
    {
        image: 'https://i.imgur.com/T51rGqr.jpeg',
        title: 'Pempamer Festival TVPSS Kebangsaan',
        description: 'Dikunjungi Permaisuri Selangor',
        badge: 'VIP',
        link: 'https://www.tiktok.com/@ahmdaime/video/7559732196454550792'
    },
    {
        image: 'https://i.imgur.com/0ulFFWw.jpeg',
        title: "World's Best School Prizes 2025",
        description: 'Majlis pengumuman antarabangsa',
        badge: 'Antarabangsa',
        link: null
    },
    {
        image: 'https://i.imgur.com/E8q6Sav.jpeg',
        title: 'Kolokium Guru Cemerlang',
        description: 'Jemputan Pegawai Pendidikan Muda',
        badge: 'Jemputan',
        link: null
    },
    {
        image: 'https://i.imgur.com/zsFE0AN.jpeg',
        title: 'Lawatan Penanda Aras TVPSS',
        description: 'SMK Cheras, PPD Pasir Puteh, SK Ismail Petra',
        badge: 'Penanda Aras',
        link: null
    },
    {
        image: 'https://i.imgur.com/4C7ZVZl.jpeg',
        title: 'Bengkel Pemerkasaan TVPSS',
        description: 'Peringkat WP Putrajaya',
        badge: 'Fasilitator',
        link: null
    },
    {
        image: 'https://i.imgur.com/IjW0MoL.jpeg',
        title: 'Kem Komandan Perkhemahan',
        description: 'Mengetuai Unit Uniform',
        badge: 'Kepimpinan',
        link: null
    },
    {
        image: 'https://i.imgur.com/ByTWACP.jpeg',
        title: 'Penyelaras Bulan Kebangsaan',
        description: 'Sambutan Hari Malaysia 2025',
        badge: 'Penyelaras',
        link: null
    },
    {
        image: 'https://i.imgur.com/dx1k1sy.jpeg',
        title: 'Lawatan ke Parlimen Malaysia',
        description: 'Bersama murid-murid sekolah',
        badge: 'Lawatan',
        link: null
    }
];

// Sports & Committee
export const sportsAchievements: SportsAchievement[] = [
    {
        image: 'https://i.imgur.com/GD4ViC4.jpeg',
        title: 'Jurulatih Olahraga MSSWP',
        description: '3 Emas, 1 Perak, Pecah Rekod',
        role: 'Jurulatih',
        featured: true
    },
    {
        image: 'https://i.imgur.com/kia3Rw1.jpeg',
        title: 'JK Tenpin Boling MSSM',
        description: 'Jurugambar rasmi kejohanan',
        role: 'Jawatankuasa',
        featured: false
    },
    {
        image: 'https://i.imgur.com/M7G0rD2.jpeg',
        title: 'JK Sofbol MSSWP',
        description: 'Peringkat WP Putrajaya',
        role: 'Jawatankuasa',
        featured: false
    },
    {
        image: 'https://i.imgur.com/XM1CcwQ.jpeg',
        title: 'JK FNKSS Kebangsaan',
        description: 'Jurugambar rasmi kejohanan',
        role: 'Jawatankuasa',
        featured: false
    },
    {
        image: 'https://i.imgur.com/ioxe9O9.jpeg',
        title: 'JK Sepak Takraw MSSM',
        description: 'Peringkat kebangsaan',
        role: 'Jawatankuasa',
        featured: false
    },
    {
        image: 'https://i.imgur.com/RKmu201.jpeg',
        title: 'JK PETAH Bicara Berirama',
        description: 'Peringkat kebangsaan',
        role: 'Jawatankuasa',
        featured: false
    },
    {
        image: 'https://i.imgur.com/UDdneaR.jpeg',
        title: 'JK Siaran Langsung Genta Suara',
        description: 'Generasi Madani Kebangsaan',
        role: 'Jawatankuasa',
        featured: false
    }
];

// Innovation & Recognition
export const otherAchievements: OtherAchievement[] = [
    {
        image: 'https://i.imgur.com/oqLOyG8.jpeg',
        title: 'Inovasi Digital dalam PdPc',
        description: 'Murid menghasilkan slaid menggunakan Canva',
        type: 'Inovasi'
    },
    {
        image: 'https://i.imgur.com/l4RdtAr.jpeg',
        title: 'Liputan Majlis oleh KRU TVPSS',
        description: 'Memberi peluang murid membuat liputan',
        type: 'Inovasi'
    },
    {
        image: 'https://i.imgur.com/2AIlxy4.jpeg',
        title: 'Penggambaran Graduasi Tahun 6',
        description: 'Dihasilkan sendiri oleh guru-guru',
        type: 'Inovasi'
    },
    {
        image: 'https://i.imgur.com/ycR4xfP.jpeg',
        title: 'Ikon Guru Fashionista',
        description: 'Terpilih peringkat sekolah',
        type: 'Pengiktirafan'
    }
];

// Summary stats for hero section
export const heroStats = [
    { value: '200K+', label: 'Tontonan' },
    { value: '11+', label: 'Anugerah' },
    { value: '4', label: 'Pingat' },
    { value: '8', label: 'JK/Sukan' },
    { value: '29', label: 'Pencapaian' }
];

// Featured sports highlights
export const featuredSportsHighlights = ['3 Emas', '1 Perak', 'Pecah Rekod Negeri'];
