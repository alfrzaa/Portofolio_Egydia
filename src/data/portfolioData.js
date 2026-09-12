export const PERSONAL_INFO = {
  name: "Egydia Alfariza Ramadhani",
  degree: "S.Kom.",
  title: "Frontend Web Developer & UI/UX Designer",
  status: "Available for Full-time & Freelance",
  gpa: "3.94",
  honors: "Cum Laude",
  university: "Universitas Jambi",
  faculty: "Fakultas Sains dan Teknologi",
  major: "Sistem Informasi (2022–2026)",
  whatsapp: "0822-2737-6330",
  whatsappUrl: "https://wa.me/6282227376330?text=Halo%20Egydia%20Alfariza%2C%20saya%20tertarik%20untuk%20mendiskusikan%20peluang%20project%20atau%20karir%20dengan%20Anda.",
  email: "egydiaalfariza74@gmail.com",
  linkedin: "https://linkedin.com/in/egydiaalfariza",
  github: "https://github.com/alfrzaa",
  instagram: "https://instagram.com/alfrrza",
  avatarGraduation: "/assets/images/profile-graduation.png",
  avatarFormal: "/assets/images/profile-formal.jpg",
  avatarOutdoor: "/assets/images/profile-outdoor.png",
  bio: "Lulusan Sistem Informasi Cum Laude (IPK 3.94) Universitas Jambi yang memadukan presisi desain antarmuka berbasis riset di Figma dengan keahlian implementasi Frontend modern (React.js, Tailwind CSS, JavaScript). Memiliki rekam jejak kepemimpinan tim (Project Manager) dan sertifikasi kompetensi nasional BNSP & Kementerian Komdigi."
};

export const QUICK_STATS = [
  { label: "IPK Cum Laude", value: "3.94", sub: "Universitas Jambi", icon: "GraduationCap" },
  { label: "Featured Projects", value: "6+", sub: "Web & Mobile SaaS", icon: "FolderGit2" },
  { label: "SUS Usability Score", value: "87.5", sub: "Grade A (Excellent)", icon: "CheckCircle2" },
  { label: "Kredensial Resmi", value: "8+", sub: "BNSP, Komdigi, Google", icon: "Award" }
];

export const PROJECTS_DATA = [
  {
    id: "simta",
    title: "SIMTA-UM — Sistem Informasi Manajemen Tugas Akhir",
    artboard: "ARTBOARD 01 // THESIS RESEARCH PROJECT",
    category: "thesis",
    categoryName: "Skripsi & Riset",
    role: "Lead Researcher & Frontend Developer",
    techStack: ["React.js", "Tailwind CSS", "Figma", "PHP & MySQL"],
    featuredAward: {
      title: "SUS Score: 87.50 (Grade A)",
      type: "gold"
    },
    heroImage: "/assets/images/projects/simta-hero.jpg",
    url: "https://simta.um.alfariza.com",
    shortDesc: "Sistem manajemen tugas akhir berbasis web untuk Universitas Merangin dengan metodologi prototyping. Mengintegrasikan 4 hak akses dari pendaftaran judul, logbook bimbingan, hingga pendaftaran ujian.",
    fullDesc: "Penelitian tugas akhir komprehensif yang berfokus pada analisis kebutuhan dan perancangan antarmuka pengguna berbasis metode Prototype pada Sistem Informasi Manajemen Tugas Akhir Universitas Merangin (SIMTA-UM). Mengakomodasi 4 hak akses peran pengguna (Mahasiswa, Dosen Pembimbing, Koordinator TA, dan Superadmin) dengan alur pengajuan judul skripsi, penjadwalan seminar proposal, logbook bimbingan digital, hingga pendaftaran sidang skripsi.",
    highlights: [
      "Meraih skor evaluasi kepuasan pengguna System Usability Scale (SUS) 87.50 dengan predikat Grade A (Excellent).",
      "Memangkas waktu birokrasi pengajuan judul dan verifikasi berkas ujian tugas akhir hingga lebih dari 60%.",
      "Merancang lebih dari 40+ artboard responsif di Figma dan mengimplementasikannya secara modular menggunakan React.js dan Tailwind CSS.",
      "Mengintegrasikan fitur ekspor berkas berita acara seminar dan monitoring progres mahasiswa real-time."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/simta-hero.jpg", caption: "Beranda Utama Portal SIMTA-UM: Hero Showcase & Navigasi" },
      { src: "/assets/images/projects/simta-dash.png", caption: "Dashboard Mahasiswa: Status Pengajuan Judul & Progres Skripsi" },
      { src: "/assets/images/projects/simta-guidance.png", caption: "Logbook Bimbingan Interaktif: Catatan Dosen & Bukti Revisi" },
      { src: "/assets/images/projects/simta-seminar.png", caption: "Modul Pendaftaran Seminar Proposal & Sidang Skripsi" },
      { src: "/assets/images/projects/simta-superadmin.png", caption: "Master Panel Superadmin: Manajemen Pengguna & Hak Akses" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/simta-dash.png", caption: "Tampilan Mobile Responsive Dashboard Mahasiswa" },
      { src: "/assets/images/projects/simta-guidance.png", caption: "Tampilan Mobile Form Logbook Bimbingan" }
    ],
    designSpecs: [
      { title: "Metodologi Riset", content: "Metode Prototyping (Communication, Quick Plan, Modeling Quick Design, Construction of Prototype, Deployment Delivery & Feedback)." },
      { title: "Design System Tokens", content: "Warna utama Academic Deep Blue (#1E3A8A) berpadu aksen Emerald Green (#10B981) dengan tipografi Plus Jakarta Sans." },
      { title: "Pengujian Empiris", content: "System Usability Scale (SUS) dengan 10 instrumen kuesioner baku terhadap 30+ responden multi-peran." }
    ],
    codeSpecs: [
      { title: "Frontend Architecture", content: "React.js dengan komponen modular, React Router DOM, Tailwind CSS utility-first, dan Axios API integration." },
      { title: "Keamanan & Akses", content: "Role-based Access Control (RBAC) 4 tingkatan dengan token-based authentication." }
    ]
  },
  {
    id: "rajapharma",
    title: "RajaPharma — Pharmacy Management & POS System",
    artboard: "ARTBOARD 02 // ENTERPRISE SAAS SYSTEM",
    category: "web-app",
    categoryName: "Web Apps & SaaS",
    role: "Project Manager, UI/UX Designer & Frontend Dev",
    techStack: ["React.js", "Tailwind CSS", "POS System", "Data Analytics"],
    featuredAward: {
      title: "1st Best Project · 91.67% Test Score",
      type: "emerald"
    },
    heroImage: "/assets/images/projects/rajapharma-dashboard.png",
    url: "https://rajapharma.alfariza.com",
    shortDesc: "Sistem informasi manajemen apotek digital mencakup Point of Sale (POS), pencatatan transaksi kasir, cetak struk belanja, inventaris obat otomatis, dan analitik penjualan komprehensif.",
    fullDesc: "Sistem manajemen operasional apotek end-to-end yang mengintegrasikan kasir Point of Sale (POS), manajemen stok obat batch otomatis dengan sistem peringatan dini obat kedaluwarsa, rekam jejak supplier obat, hingga dashboard visualisasi tren penjualan berbasis grafik dinamis.",
    highlights: [
      "Meraih penghargaan 1st Best Project dari dosen pengampu dengan tingkat keberhasilan pengujian black-box 91.67%.",
      "Memimpin tim beranggotakan 5 developer dengan metodologi Agile Scrum dalam 4 siklus sprint berkala.",
      "Mekanisme kasir cerdas dengan pencarian cepat nama/kode obat, kalkulasi otomatis kembalian, dan cetak struk belanja instan.",
      "Sistem peringatan dini otomatis ketika stok obat mencapai batas minimum atau mendekati tanggal kedaluwarsa (ED)."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/rajapharma-dashboard.png", caption: "Executive Dashboard: Omset Penjualan, Profit & Grafik Tren" },
      { src: "/assets/images/projects/rajapharma-pos.png", caption: "Antarmuka Kasir Point of Sale (POS): Cepat & Keyboard-Friendly" },
      { src: "/assets/images/projects/rajapharma-inventory.png", caption: "Manajemen Inventaris Obat: Batch Number, Stok & Notifikasi Expired" },
      { src: "/assets/images/projects/rajapharma-reports.png", caption: "Laporan Keuangan & Rekap Transaksi Harian/Bulanan" },
      { src: "/assets/images/projects/rajapharma-login.png", caption: "Otentikasi Login Petugas Farmasi & Administrator" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/rajapharma-dashboard.png", caption: "Mobile Responsive Monitor Penjualan Apotek" }
    ],
    designSpecs: [
      { title: "Ergonomi Kasir", content: "Tata letak POS dirancang high-contrast dengan tombol aksi cepat agar kasir dapat memproses transaksi dalam hitungan detik tanpa bottleneck." },
      { title: "Status Hierarchy", content: "Pemberian kode warna visual yang tegas: Merah (Habis/Expired), Oranye (Menipis), Hijau (Aman)." }
    ],
    codeSpecs: [
      { title: "Frontend Stack", content: "React.js component-driven design, Tailwind CSS utility layout, dan integrasi chart visualisasi data." },
      { title: "State Management", content: "State modular & Context API untuk keranjang belanja kasir realtime tanpa delay render." }
    ]
  },
  {
    id: "tripin",
    title: "TripIn — Airport-to-Hotel Shuttle Bus Booking",
    artboard: "ARTBOARD 03 // MBKM BEST GROUP FINAL PROJECT",
    category: "mobile",
    categoryName: "Mobile Apps",
    role: "Frontend Developer & UI/UX Designer",
    techStack: ["React.js", "Tailwind CSS", "Mobile-First UI", "Payment Gateway"],
    featuredAward: {
      title: "Best Group of Final Project (MSIB)",
      type: "purple"
    },
    heroImage: "/assets/images/projects/tripin-screen-1.png",
    url: "https://tripin.rakamin.app",
    shortDesc: "Aplikasi mobile-first untuk pemesanan layanan shuttle bus bandara ke hotel dengan pemilihan rute interaktif, denah kursi real-time, poin cashback, dan e-ticket barcode scanner.",
    fullDesc: "Aplikasi web mobile-first untuk pemesanan layanan shuttle bus eksklusif dari bandara langsung ke hotel tujuan wisatawan. Dibuat sebagai proyek akhir program Studi Independen Bersertifikat (MSIB) Kampus Merdeka di PT Rakamin Kolektif Madani. Mengintegrasikan pemilihan lokasi interaktif, denah kursi real-time, sistem poin cashback, pembayaran e-wallet, dan e-ticket digital.",
    highlights: [
      "Membawa tim meraih penghargaan prestisius 'Best Group of Final Project' di antara ratusan peserta MSIB Batch 7.",
      "Merancang alur konversi pemesanan tiket 4-langkah (Search → Seat Selection → Checkout → E-Ticket) yang sangat mulus.",
      "Slicing presisi tinggi dari mockup Figma ke komponen React.js dengan visual mobile view 100% responsif.",
      "Fitur tracking perjalanan shuttle bus real-time dan manajemen voucher promo pelanggan."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/tripin-screen-1.png", caption: "TripIn Mobile App: Welcome & Search" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/tripin-screen-1.png", caption: "01. Splash & Beranda Pemesanan Shuttle Bus" },
      { src: "/assets/images/projects/tripin-screen-2.png", caption: "02. Pemilihan Rute Bandara ke Hotel Tujuan" },
      { src: "/assets/images/projects/tripin-screen-3.png", caption: "03. Form Detail Penumpang & Jadwal Keberangkatan" },
      { src: "/assets/images/projects/tripin-screen-4.png", caption: "04. Interactive Seat Selection (Peta Kursi Interaktif)" },
      { src: "/assets/images/projects/tripin-screen-5.png", caption: "05. Konfirmasi Pembayaran E-Wallet (GoPay/OVO)" },
      { src: "/assets/images/projects/tripin-screen-6.png", caption: "06. Status Pembayaran Berhasil & Detail Transaksi" },
      { src: "/assets/images/projects/tripin-screen-7.png", caption: "07. E-Ticket Digital dengan QR Code Boarding" },
      { src: "/assets/images/projects/tripin-screen-8.png", caption: "08. Pusat Notifikasi & Riwayat Perjalanan" }
    ],
    designSpecs: [
      { title: "User Research & Journey", content: "Riset kebutuhan wisatawan bandara yang membutuhkan kepastian transportasi tanpa antrean panjang di bandara kedatangan." },
      { title: "Mobile Interaction Design", content: "Navigasi thumb-friendly, animasi transisi antar langkah pemesanan, dan visual seat map interaktif dengan status kursi (tersedia, terisi, terpilih)." }
    ],
    codeSpecs: [
      { title: "Component Architecture", content: "React.js modular components (SeatGrid, BookingSteps, TicketCard, PaymentSummary) dengan Tailwind CSS." },
      { title: "Mock API & State", content: "Simulasi alur transaksi e-wallet dan validasi kode tiket digital." }
    ]
  },
  {
    id: "partoid",
    title: "Company Profile PT Affan Technology (Parto.id)",
    artboard: "ARTBOARD 04 // CORPORATE INDUSTRY INTERNSHIP",
    category: "corporate",
    categoryName: "Corporate",
    role: "Frontend Developer Intern",
    techStack: ["WordPress FSE", "Gutenverse", "CSS3/HTML5", "Figma Slicing"],
    featuredAward: {
      title: "Certified Industry Internship",
      type: "blue"
    },
    heroImage: "/assets/images/projects/partoid-landing.jpg",
    url: "https://parto.id",
    shortDesc: "Pengembangan website profil perusahaan e-katalog dan pengadaan pemerintah. Mengonversi mockup Figma ke WordPress Full Site Editing, navigasi multi-halaman dinamis, dan pengujian black-box.",
    fullDesc: "Pengembangan dan penyesuaian website company profile resmi untuk PT Affan Technology Indonesia (Parto.id), platform penyedia e-katalog dan ekosistem pengadaan pemerintah bagi ribuan UMKM. Menjembatani desain antarmuka dari Figma ke dalam WordPress Full Site Editing (FSE) dengan struktur navigasi multi-halaman yang komprehensif, cepat diakses, dan mobile-friendly.",
    highlights: [
      "Menyelesaikan program magang industri bersertifikat dengan predikat 'Sangat Baik'.",
      "Menerjemahkan desain UI/UX dari Figma secara pixel-perfect ke dalam WordPress Gutenberg & Gutenverse.",
      "Menyusun navigasi multi-halaman meliputi: Home, Our Story, Team Biographies, Marketplace Products, News/Blog, dan Contact Us.",
      "Melakukan black-box testing menyeluruh untuk memvalidasi interaktivitas tombol, form kontak, dan responsivitas di berbagai browser."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/partoid-landing.jpg", caption: "Beranda Company Profile Parto.id: Inovasi Digital Pengadaan" },
      { src: "/assets/images/projects/partoid-features.jpg", caption: "Halaman Fitur & Keunggulan Mitra UMKM" },
      { src: "/assets/images/projects/partoid-market.jpg", caption: "Katalog Produk & Solusi Ekosistem Pengadaan" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/partoid-landing.jpg", caption: "Tampilan Mobile Parto.id" }
    ],
    designSpecs: [
      { title: "Corporate Identity", content: "Menyelaraskan elemen visual branding hijau toska (#0D5C58) dan aksen emas untuk mencerminkan kredibilitas mitra pemerintah." },
      { title: "Information Architecture", content: "Pengelompokan struktur konten yang rapi untuk mempermudah calon mitra UMKM memahami alur pendaftaran." }
    ],
    codeSpecs: [
      { title: "WordPress FSE Engine", content: "Custom Block Templates, Gutenverse Block Editor, kustomisasi CSS lanjutan, dan optimasi aset gambar." },
      { title: "Cross-Device QA", content: "Black-box testing di Chrome, Safari, Firefox, iOS, dan Android viewports." }
    ]
  },
  {
    id: "learnify",
    title: "Learnify — Educational Platform Student Dashboard",
    artboard: "ARTBOARD 05 // EDTECH PLATFORM DASHBOARD",
    category: "web-app",
    categoryName: "Web Apps & SaaS",
    role: "UI/UX Designer & Frontend Developer",
    techStack: ["Vanilla JavaScript", "HTML5", "Modern CSS3", "UI/UX Design"],
    heroImage: "/assets/images/projects/learnify-dashboard.png",
    url: "#",
    shortDesc: "Antarmuka dashboard pembelajaran interaktif untuk platform edukasi 'Learnify'. Siswa dapat memantau progres materi kursus, notifikasi tugas, peringkat kelas, dan pengelolaan profil.",
    fullDesc: "Antarmuka dashboard pembelajaran interaktif untuk platform edukasi 'Learnify'. Dirancang untuk memberikan pengalaman belajar yang teratur bagi mahasiswa, memungkinkan mereka memantau progres belajar kursus (HTML, CSS, JavaScript), melihat notifikasi pengumpulan tugas mendekati tenggat, melihat peringkat kelas secara dinamis, dan mengelola data profil pribadi.",
    highlights: [
      "Dashboard dengan pengalaman pengguna yang ramah, intuitif, dan responsif.",
      "Komponen tracker progres kursus dengan visual meter dan indikator status tugas.",
      "Fitur upload berkas tugas interaktif dengan area drag-and-drop.",
      "Pengujian navigasi sidebar responsif yang dapat diminimalkan (collapsible sidebar)."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/learnify-dashboard.png", caption: "Dashboard Siswa: Progres Kelas & Pengumuman" },
      { src: "/assets/images/projects/learnify-courses.png", caption: "Katalog Materi & Modul Pelatihan Pemrograman" },
      { src: "/assets/images/projects/learnify-assignments.png", caption: "Daftar Tugas & Area Upload Tugas Siswa" },
      { src: "/assets/images/projects/learnify-profile.png", caption: "Pengaturan Profil & Pencapaian Nilai Siswa" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/learnify-dashboard.png", caption: "Mobile View Learnify Dashboard" }
    ],
    designSpecs: [
      { title: "Clean EdTech UI", content: "Warna dasar netral dengan aksen biru dan oranye untuk menstimulasi fokus belajar tanpa distraksi berlebih." }
    ],
    codeSpecs: [
      { title: "Core Frontend", content: "Struktur HTML5 semantik, CSS Grid & Flexbox untuk layout dinamis, serta JavaScript untuk interaksi DOM." }
    ]
  },
  {
    id: "tourism",
    title: "Regional Tourism — Destination Showcase Landing Page",
    artboard: "ARTBOARD 06 // TOURISM LANDING PAGE",
    category: "corporate",
    categoryName: "Corporate",
    role: "UI/UX Designer & Frontend Developer",
    techStack: ["HTML5", "CSS3", "Responsive Design", "Interactive Gallery"],
    heroImage: "/assets/images/projects/tourism-frontend.png",
    url: "#",
    shortDesc: "Landing page promosi pariwisata unggulan daerah (seperti Gunung Kerinci & Danau Kaco) dengan tipografi megah, rating atraksi wisata, dan galeri foto interaktif adaptif.",
    fullDesc: "Landing page promosi destinasi pariwisata unggulan daerah (seperti Gunung Kerinci, Danau Kaco, dan cagar alam Jambi). Menghadirkan visual megah dari keindahan alam lokal yang ditata dengan tipografi modern, kartu destinasi dengan rating, panduan rute wisata, dan galeri foto interaktif yang adaptif di berbagai resolusi layar.",
    highlights: [
      "Merancang visual storytelling untuk memikat wisatawan lokal maupun mancanegara.",
      "Implementasi galeri foto masonry responsif yang menyesuaikan ukuran viewport secara otomatis.",
      "Struktur navigasi cepat dengan anchor links dan tombol call-to-action pemesanan paket wisata."
    ],
    desktopScreens: [
      { src: "/assets/images/projects/tourism-frontend.png", caption: "Frontend Implementation: Hero Showcase & Destinasi" },
      { src: "/assets/images/projects/tourism-ui.png", caption: "Desain Konsep UI di Figma: Grid & Galeri Wisata" }
    ],
    mobileScreens: [
      { src: "/assets/images/projects/tourism-frontend.png", caption: "Tampilan Mobile Responsive Tourism Page" }
    ],
    designSpecs: [
      { title: "Visual Concept", content: "Desain bertema petualangan alam dengan tipografi tebal dan ruang negatif yang luas untuk menonjolkan keindahan foto lanskap." }
    ],
    codeSpecs: [
      { title: "Implementation", content: "Pure CSS3 media queries, CSS Grid untuk galeri foto interaktif, dan semantic markup." }
    ]
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "cert-4",
    title: "Keamanan Siber Muda (Junior Cyber Security)",
    issuer: "BNSP / LSP Digital Technology",
    desc: "Sertifikasi kompetensi profesi resmi keamanan siber tingkat nasional berstandar SKKNI.",
    image: "/assets/images/certs/cert-4.png",
    badge: "BNSP Resmi"
  },
  {
    id: "cert-1",
    title: "Fullstack Web Development & Data Science",
    issuer: "Kemendikbudristek & PT Rakamin",
    desc: "Kelulusan program Studi Independen Bersertifikat (MSIB) Kampus Merdeka Angkatan 7.",
    image: "/assets/images/certs/cert-1.png",
    badge: "MSIB Batch 7"
  },
  {
    id: "cert-2",
    title: "Best Group of Final Project (ByteSquad)",
    issuer: "PT Rakamin Kolektif Madani",
    desc: "Penghargaan tim terbaik pembuatan aplikasi shuttle bus 'TripIn' di antara ratusan peserta.",
    image: "/assets/images/certs/cert-2.png",
    badge: "Award Winner"
  },
  {
    id: "cert-8",
    title: "Vocational School Graduate Academy (VSGA)",
    issuer: "Kementerian Komdigi / Digital Talent Scholarship",
    desc: "Pelatihan intensif spesialisasi Junior Cyber Security dan analisis kerentanan sistem.",
    image: "/assets/images/certs/cert-8.png",
    badge: "Komdigi DTS"
  },
  {
    id: "cert-5",
    title: "Google Analytics Individual Certification",
    issuer: "Google Skillshop",
    desc: "Sertifikasi resmi keahlian pelacakan konversi, user event, dan analisis performa audiens web.",
    image: "/assets/images/certs/cert-5.png",
    badge: "Google Certified"
  },
  {
    id: "cert-7",
    title: "Frontend Developer Internship Certificate",
    issuer: "PT Affan Technology Indonesia",
    desc: "Sertifikat penyelesaian magang industri resmi (Parto.id) dengan predikat Sangat Baik.",
    image: "/assets/images/certs/cert-7.png",
    badge: "Internship Sangat Baik"
  },
  {
    id: "cert-6",
    title: "Intro to Data Analytics",
    issuer: "RevoU Mini Course",
    desc: "Fundamental pengolahan data analitik, metrics bisnis, dan visualisasi data kuantitatif.",
    image: "/assets/images/certs/cert-6.png",
    badge: "Data Analytics"
  },
  {
    id: "cert-9",
    title: "Digital Literacy & Mindset Acceleration",
    issuer: "Kementerian Kominfo / Komdigi",
    desc: "Pengembangan pola pikir adaptif, etika digital, dan pemanfaatan Artificial Intelligence.",
    image: "/assets/images/certs/cert-9.png",
    badge: "Literasi Digital"
  }
];

export const EXPERIENCE_DATA = [
  {
    period: "Januari 2026 – Juni 2026",
    badge: "Skripsi / Riset Akademik",
    badgeColor: "blue",
    title: "Lead Researcher & Frontend Developer",
    institution: "Sistem Informasi Manajemen Tugas Akhir (SIMTA-UM)",
    desc: "Melakukan analisis kebutuhan pengguna menyeluruh, merancang prototipe antarmuka di Figma menggunakan metode Prototype, dan mengimplementasikan frontend interaktif menggunakan React.js dan Tailwind CSS untuk 4 peran pengguna. Berhasil meraih skor evaluasi kepuasan System Usability Scale (SUS) 87.50 (Grade A / Excellent).",
    photo: null
  },
  {
    period: "Juli 2025 – Agustus 2025",
    badge: "Internship Industri",
    badgeColor: "purple",
    title: "Frontend Developer Intern",
    institution: "PT Affan Technology Indonesia (PARTO.ID)",
    desc: "Mengembangkan dan menyesuaikan website company profile resmi PT Affan Technology Indonesia berbasis WordPress Full Site Editing berdasarkan mockup UI/UX dari Figma. Memastikan aksesibilitas tata letak yang mulus di seluruh perangkat desktop dan mobile serta melakukan pengujian black-box antarmuka.",
    photo: {
      src: "/assets/images/experience/partoid-team.jpg",
      caption: "Dokumentasi Tim Magang Frontend Developer di PT Affan Technology Indonesia (Parto.id)"
    }
  },
  {
    period: "Februari 2025 – Juni 2025",
    badge: "1st Best Project Award",
    badgeColor: "emerald",
    title: "Project Manager, UI/UX Designer & Frontend Developer",
    institution: "RajaPharma — Pharmacy Management System",
    desc: "Memimpin tim menggunakan kerangka kerja Scrum (Sprint) untuk membangun aplikasi inventaris dan POS apotek berbasis web. Merancang antarmuka di Figma dan mengimplementasikan frontend dengan React.js dan Tailwind CSS, menghantarkan proyek meraih penghargaan 1st Best Project dari dosen pengampu dengan tingkat keberhasilan pengujian 91.67%.",
    photo: null
  },
  {
    period: "September 2024 – Desember 2024",
    badge: "MSIB Kampus Merdeka Batch 7",
    badgeColor: "gold",
    title: "Independent Study Student (Fullstack Web & Data Science)",
    institution: "PT Rakamin Kolektif Madani",
    desc: "Menyelesaikan pelatihan intensif mencakup UI/UX Design (User Research, Wireframing, Responsive UI), Frontend (HTML, CSS, React.js), Backend (PHP), Cloud, dan IT Security. Bertindak sebagai Frontend Developer dan UI/UX Designer untuk aplikasi shuttle bus 'TripIn', membawa tim memenangkan Best Group of Final Project.",
    photo: {
      src: "/assets/images/experience/rakamin-bestgroup.png",
      caption: "Penghargaan Pemenang Best Group Final Project (ByteSquad) - MSIB Batch 7"
    }
  }
];

export const SKILLS_DATA = {
  design: [
    "User Research",
    "Wireframing & Flow",
    "Hi-Fi Prototyping (Figma)",
    "Design Systems & Tokens",
    "System Usability Scale (SUS)",
    "Mobile & Web Responsive",
    "Component Slicing"
  ],
  engineering: [
    { name: "React.js (Hooks, State, Routing)", level: 92 },
    { name: "Tailwind CSS & Modern CSS3", level: 95 },
    { name: "JavaScript (ES6+, DOM, Fetch API)", level: 90 },
    { name: "WordPress FSE & Block Editing", level: 88 }
  ],
  tools: [
    { name: "Figma", desc: "UI/UX Prototyping" },
    { name: "VS Code", desc: "Code Editor" },
    { name: "Git & GitHub", desc: "Version Control" },
    { name: "React & Vite", desc: "Frontend Ecosystem" },
    { name: "Tailwind CSS", desc: "Styling Engine" },
    { name: "MySQL", desc: "Database Management" }
  ],
  softSkills: [
    {
      title: "Problem Solving & Critical Thinking",
      desc: "Menghadirkan solusi arsitektur desain yang berorientasi pada kemudahan pengguna nyata."
    },
    {
      title: "Scrum & Sprint Leadership",
      desc: "Berpengalaman memimpin tim sebagai Project Manager & Frontend Developer pada RajaPharma."
    },
    {
      title: "Cross-Functional Communication",
      desc: "Mampu menjembatani diskusi antara tim UI/UX, Backend Developer, dan Stakeholder bisnis."
    },
    {
      title: "Attention to Detail & Usability",
      desc: "Presisi hingga hitungan pixel (pixel-perfect) dan konsistensi token desain lintas platform."
    }
  ]
};
