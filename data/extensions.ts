export type ExtensionCategory = 'Kehadiran' | 'PBD' | 'Utiliti';
export type ExtensionStatus = 'Aktif' | 'Beta' | 'Dalam Pembangunan';

export interface Extension {
    id: string;
    name: string;
    description: string;
    benefit: string;
    category: ExtensionCategory;
    status: ExtensionStatus;
    installLink: string;
    demoLink?: string;
    stats: string;
    rating: number;
}

export const extensions: Extension[] = [
    {
        id: 'pbd-onepage',
        name: 'PBD OnePage',
        description: 'Tukar laporan PBD dan Kemahiran yang ada banyak mukasurat kepada satu mukasurat sahaja.',
        benefit: 'Menjimatkan kertas dan dakwat sehingga 80%.',
        category: 'Utiliti',
        status: 'Aktif',
        installLink: 'https://chromewebstore.google.com/detail/pbd-onepage-laporan-satu/lbefimcackfpdklimoiclkklookickjl',
        stats: '4,485 Pengguna',
        rating: 5
    },
    {
        id: 'moies-kehadiran',
        name: 'MOIES Kehadiran Helper',
        description: 'Memudahkan guru mengisi kehadiran dalam sistem MOIES secara pukal dan automatik.',
        benefit: 'Tak perlu lagi klik sebab dan kategori satu persatu. Semuanya automatik dan pantas.',
        category: 'Kehadiran',
        status: 'Aktif',
        installLink: 'https://chromewebstore.google.com/detail/moeis-kehadiran-helper/aopjilfeegfaadfalilcnjgehpilnenm',
        stats: '3,427 Pengguna',
        rating: 5
    },
    {
        id: 'idme-pbd',
        name: 'IDME PBD Helper',
        description: 'Memudahkan pengisian PBD dan markah dalam sistem IDME untuk guru yang mengajar banyak kelas.',
        benefit: 'Jimat masa mengisi markah beratus murid dalam beberapa klik sahaja.',
        category: 'PBD',
        status: 'Aktif',
        installLink: 'https://chromewebstore.google.com/detail/idme-pbd-helper/ljbhcdaienegobdeoamibnnfihlnipkc',
        stats: '2,852 Pengguna',
        rating: 5
    }
];
