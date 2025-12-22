export interface Testimonial {
    id: string;
    name: string;
    role: string;
    extension: string;
    quote: string;
    rating: number;
}

export interface ImpactStat {
    label: string;
    value: string;
    description: string;
}

export interface ComparisonMetric {
    metric: string;
    before: string;
    after: string;
    improvement: string;
}

export const impactStats: ImpactStat[] = [
    {
        label: 'Guru Menggunakan',
        value: '10,700+',
        description: 'Dari seluruh Malaysia'
    },
    {
        label: 'Rating Chrome Store',
        value: '5.0 ★',
        description: 'Purata semua extension'
    },
    {
        label: 'Extension Aktif',
        value: '3',
        description: 'Sedia untuk dimuat turun'
    }
];

export const comparisons: ComparisonMetric[] = [
    {
        metric: 'Masa mengisi kehadiran MOIES (40 murid)',
        before: '10-15 minit',
        after: '< 1 minit',
        improvement: '10x Lebih Pantas'
    },
    {
        metric: 'Klik untuk isi PBD dalam IDME',
        before: '100+ klik',
        after: '3-5 klik',
        improvement: '95% Kurang Klik'
    },
    {
        metric: 'Kertas untuk laporan PBD',
        before: '5-6 mukasurat',
        after: '1 mukasurat',
        improvement: '80% Jimat Kertas'
    }
];

export const testimonials: Testimonial[] = [
    // IDME PBD Helper
    {
        id: 't1',
        name: 'Tengku Nurhanis Syafiqah',
        role: 'Guru KPM',
        extension: 'IDME PBD Helper',
        quote: 'Terbaik cikgu!!! Memang sangat membantu dan memudahkan urusan guru-guru daripada perlu klik satu-satu. Sambil IDME helper buat kerja, cikgu boleh menyelesaikan tugas guru yang lain.',
        rating: 5
    },
    {
        id: 't2',
        name: 'Merna Azim',
        role: 'Guru KPM',
        extension: 'IDME PBD Helper',
        quote: 'Terima kasih cikgu Aiman cipta IDME extension. Sangat bermanfaat, menjimatkan tenaga dan masa untuk mengisi PBD 100++ murid. Apps pun mudah diinstall dan digunakan.',
        rating: 5
    },
    // MOIES Kehadiran Helper
    {
        id: 't3',
        name: 'Siti Nazriah Binti Mohd Orip',
        role: 'Guru KPM',
        extension: 'MOIES Kehadiran Helper',
        quote: 'Alhamdulillah sangat memudahkan terutamanya bila ramai murid yang tidak hadir. Terima kasih kerana menghasilkan suatu yang bermanfaat.',
        rating: 5
    },
    {
        id: 't4',
        name: 'Nur Sofya Azzahra Binti Rosli',
        role: 'Guru KPM',
        extension: 'MOIES Kehadiran Helper',
        quote: 'Ya Allah mudahnya. Terima kasih banyak-banyak cikgu. Moga Allah mudahkan urusan cikgu sentiasa. Memang terbaik dan senang!',
        rating: 5
    },
    // PBD OnePage
    {
        id: 't5',
        name: 'Chee Chi Khiong',
        role: 'Guru KPM',
        extension: 'PBD OnePage',
        quote: 'Mantap cikgu Aime. Terima kasih atas perkongsian extension yang begitu hebat dan memberikan manfaat. Dengan adanya extension ini, dah banyak kertas telah dijimatkan.',
        rating: 5
    },
    {
        id: 't6',
        name: 'Nur Shahira Binti Rosli',
        role: 'Guru KPM',
        extension: 'PBD OnePage',
        quote: 'Alhamdulillah. Thank you cikgu, apps yang sangat memudahkan kerja saya lagi-lagi hujung tahun yang teramat busy. Saya dah share dalam kalangan guru di sekolah saya dan rata-rata memberi komen yang sangat baik.',
        rating: 5
    }
];
