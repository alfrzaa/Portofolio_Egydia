/**
 * EGYDIA ALFARIZA RAMADHANI — ANTIMAINSTREAM PORTFOLIO ENGINE
 * Features:
 * - Dual-Engine Mode Switcher (Designer 🎨 | Developer ⚡ | Editorial ✨)
 * - Web Audio API Synthesizer (Micro-Haptic SFX)
 * - 3D Tilt Holographic ID Card (Perspective & Shimmer Physics)
 * - Project Spec Inspector & Dual Device Mockup Frame (Desktop & Mobile)
 * - Interactive CLI Terminal Drawer with Command Parsing
 * - Ambient Canvas Particles & Matrix Visualizer
 * - Custom Magnetic Cursor
 * - Certification Lightbox & WhatsApp Direct Contact
 */

// ================= 1. SOUND SYNTHESIZER (WEB AUDIO API) =================
class SoundController {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.initAudio();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio not supported:', e);
    }
  }

  ensureContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type = 'click') {
    if (!this.enabled || !this.ctx) return;
    this.ensureContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'blip') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'mode') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const noteOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(this.ctx.destination);
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.07);
        noteGain.gain.setValueAtTime(0.1, now + idx * 0.07);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.15);
        noteOsc.start(now + idx * 0.07);
        noteOsc.stop(now + idx * 0.07 + 0.15);
      });
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const sfx = new SoundController();

// ================= 2. MODE SWITCHER (DESIGNER / DEV / EDITORIAL) =================
const btnModeDesigner = document.getElementById('btnModeDesigner');
const btnModeDev = document.getElementById('btnModeDev');
const btnModeEditorial = document.getElementById('btnModeEditorial');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundIcon = document.getElementById('soundIcon');
const soundToast = document.getElementById('soundToast');
const figmaGridOverlay = document.getElementById('figmaGridOverlay');

function setStudioMode(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('egydia_portfolio_mode', mode);

  [btnModeDesigner, btnModeDev, btnModeEditorial].forEach(btn => {
    if (btn) btn.classList.remove('active');
  });

  if (mode === 'designer') {
    btnModeDesigner?.classList.add('active');
    if (figmaGridOverlay) figmaGridOverlay.style.opacity = '0.8';
    showToast('🎨 Designer Mode: Figma Canvas & Specs Enabled');
  } else if (mode === 'dev') {
    btnModeDev?.classList.add('active');
    if (figmaGridOverlay) figmaGridOverlay.style.opacity = '0.2';
    showToast('⚡ Developer Mode: Cyber Code & HUD Activated');
  } else if (mode === 'editorial') {
    btnModeEditorial?.classList.add('active');
    if (figmaGridOverlay) figmaGridOverlay.style.opacity = '0.05';
    showToast('✨ Editorial Mode: Luxe Clean Aesthetics');
  }

  sfx.play('mode');
}

btnModeDesigner?.addEventListener('click', () => setStudioMode('designer'));
btnModeDev?.addEventListener('click', () => setStudioMode('dev'));
btnModeEditorial?.addEventListener('click', () => setStudioMode('editorial'));

// Sound toggle
soundToggleBtn?.addEventListener('click', () => {
  const isEnabled = sfx.toggle();
  if (soundIcon) {
    soundIcon.className = isEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  }
  showToast(isEnabled ? '🔊 Sound Effects: Enabled' : '🔇 Sound Effects: Muted');
  if (isEnabled) sfx.play('blip');
});

function showToast(msg) {
  if (!soundToast) return;
  soundToast.textContent = msg;
  soundToast.classList.add('show');
  setTimeout(() => soundToast.classList.remove('show'), 2600);
}

// ================= 3. SPEC INSPECTOR (DESIGNER MODE FEATURE) =================
const specInspector = document.getElementById('specInspector');
const specTag = document.getElementById('specTag');
const specDim = document.getElementById('specDim');

document.addEventListener('mousemove', (e) => {
  const currentMode = document.documentElement.getAttribute('data-theme');
  if (currentMode !== 'designer' || !specInspector) {
    if (specInspector) specInspector.classList.remove('active');
    return;
  }

  const target = e.target.closest('.bento-card, .btn, .nav-link, .cert-card, .id-card-3d, .tool-tile');
  if (target) {
    const rect = target.getBoundingClientRect();
    const tag = target.tagName.toLowerCase();
    const className = target.classList[0] ? `.${target.classList[0]}` : '';
    
    specTag.textContent = `${tag}${className}`;
    specDim.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`;

    specInspector.style.left = `${e.clientX + 14}px`;
    specInspector.style.top = `${e.clientY + 14}px`;
    specInspector.classList.add('active');
  } else {
    specInspector.classList.remove('active');
  }
});

// ================= 4. 3D TILT HOLOGRAPHIC ID CARD =================
const tiltCard = document.getElementById('tiltCard');
const holoGlare = document.getElementById('holoGlare');
const cardFlipBtn = document.getElementById('cardFlipBtn');
const cardQrClick = document.getElementById('cardQrClick');

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (holoGlare) {
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      holoGlare.style.transform = `translate(${pctX - 50}px, ${pctY - 50}px)`;
    }
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
    tiltCard.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      tiltCard.style.transition = 'transform 0.15s ease-out';
    }, 500);
  });

  // Toggle flip on card click (except if clicking flip button directly)
  tiltCard.addEventListener('click', (e) => {
    if (e.target.closest('#cardQrClick')) return;
    tiltCard.classList.toggle('flipped');
    sfx.play('blip');
  });

  cardFlipBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    tiltCard.classList.toggle('flipped');
    sfx.play('blip');
  });

  cardQrClick?.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.play('success');
    window.open('https://wa.me/6282227376330?text=Halo%20Egydia%20Alfariza%2C%20saya%20melihat%20portofolio%20Anda%20dan%20ingin%20berdiskusi.', '_blank');
  });
}

// ================= 5. PROJECT SHOWCASE DATABASE & MODAL =================
const PROJECTS_DATA = {
  simta: {
    title: 'SIMTA-UM — Sistem Informasi Manajemen Tugas Akhir',
    artboard: 'ARTBOARD 01 // UNDERGRADUATE THESIS',
    category: 'Sistem Informasi & Prototyping Web',
    role: 'Lead Researcher & Frontend Developer',
    techStack: ['React.js', 'Tailwind CSS', 'Figma', 'PHP', 'MySQL'],
    url: 'https://simta.um.alfariza.com',
    fullDesc: 'Sistem Informasi Manajemen Tugas Akhir berbasis web yang dirancang khusus untuk Universitas Merangin menggunakan metodologi Prototyping. Mengakomodasi 4 peran pengguna berbeda: Mahasiswa, Dosen Pembimbing/Penguji, Koordinator Tugas Akhir, dan Superadmin. Memfasilitasi alur lengkap dari pengajuan judul skripsi, catatan logbook bimbingan mandiri, pendaftaran seminar proposal dan ujian sidang, hingga monitoring progres kelulusan secara transparan.',
    highlights: [
      'Meraih skor System Usability Scale (SUS) rata-rata 87.50 (Kategori Grade A / Excellent) dari pengujian empiris terhadap pengguna.',
      'Merancang arsitektur antarmuka terpisah untuk 4 hak akses peran pengguna di Figma hingga implementasi frontend React.js.',
      'Mengurangi birokrasi manual dan rekonsiliasi berkas pengajuan skripsi menjadi sistem serba terpusat dan terdigitalisasi.',
      'Implementasi responsive layout di seluruh perangkat dengan kecepatan akses tinggi.'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/simta-hero.jpg', caption: 'Landing Page Portal SIMTA Universitas Merangin' },
      { src: 'assets/images/projects/simta-dash.png', caption: 'Dashboard Mahasiswa: Pengajuan Judul & Status Bimbingan' },
      { src: 'assets/images/projects/simta-guidance.png', caption: 'Modul Logbook Bimbingan & Catatan Revisi Dosen' },
      { src: 'assets/images/projects/simta-seminar.png', caption: 'Pendaftaran & Penjadwalan Seminar / Ujian Sidang' },
      { src: 'assets/images/projects/simta-superadmin.png', caption: 'Portal Superadmin: Manajemen Pengguna & Monitoring Fakultas' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/simta-dash.png', caption: 'Tampilan Mobile Responsive SIMTA-UM' }
    ],
    designSpecs: [
      { title: 'Metodologi UI/UX', content: 'Prototype Method (Communication, Quick Plan, Modeling Quick Design, Construction of Prototype, Deployment & Feedback).' },
      { title: 'Testing & Evaluasi', content: 'System Usability Scale (SUS) dengan 10 instrumen pertanyaan standar industri, menghasilkan skor 87.50.' },
      { title: 'Design System', content: 'Palet warna hijau institusi Merangin (#10B981, #065F46), tipografi sans-serif modern, hierarki data tabular responsif.' }
    ],
    codeSpecs: [
      { title: 'Frontend Architecture', content: 'React.js dengan komponen fungsional modular, custom hooks untuk manajemen form, dan Tailwind CSS untuk utilitas tata letak.' },
      { title: 'Backend & Data Integration', content: 'RESTful API endpoints dengan PHP dan relational database MySQL dengan skema relasi antar entitas tugas akhir yang solid.' }
    ]
  },

  rajapharma: {
    title: 'RajaPharma — Pharmacy Management System',
    artboard: 'ARTBOARD 02 // ENTERPRISE SAAS & POS',
    category: 'Enterprise SaaS & Point of Sale',
    role: 'Project Manager, UI/UX Designer & Frontend Dev',
    techStack: ['React.js', 'Tailwind CSS', 'Point of Sale (POS)', 'Scrum Framework'],
    url: 'https://rajapharma.alfariza.com',
    fullDesc: 'Aplikasi manajemen informasi apotek terpadu berbasis web yang dibangun untuk mendigitalisasi operasional Apotik Raja. Mengintegrasikan kasir digital (POS), pencatatan transaksi kasir kilat, cetak struk otomatis, pengelolaan stok obat (dengan peringatan cerdas stok minimum dan batas kadaluarsa), serta visualisasi laporan keuangan harian dan bulanan.',
    highlights: [
      'Meraih penghargaan 1st Best Project oleh dosen pengampu mata kuliah atas arsitektur produk yang matang.',
      'Tingkat keberhasilan pengujian sistem (System Testing Success Rate) mencapai 91.67%.',
      'Memimpin alur kerja tim pengembang (Sprint planning, daily standup, backlog grooming) menggunakan metodologi Scrum.',
      'Desain antarmuka kasir cepat yang meminimalkan waktu input transaksi hingga 40% lebih efisien dibanding sistem konvensional.'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/rajapharma-dashboard.png', caption: 'Dashboard Utama Apotek: Statistik Pendapatan & Stok Menipis' },
      { src: 'assets/images/projects/rajapharma-pos.png', caption: 'Modul Kasir Digital (Point of Sale): Pencarian Cepat & Struk' },
      { src: 'assets/images/projects/rajapharma-inventory.png', caption: 'Manajemen Stok Obat: Peringatan Kadaluarsa & Filter Kategori' },
      { src: 'assets/images/projects/rajapharma-reports.png', caption: 'Laporan Penjualan & Grafik Perputaran Kas' },
      { src: 'assets/images/projects/rajapharma-login.png', caption: 'Halaman Otentikasi Administrator Apotik' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/rajapharma-dashboard.png', caption: 'Dashboard Mobile RajaPharma' }
    ],
    designSpecs: [
      { title: 'Design Strategy', content: 'Fokus pada kecepatan respon kasir, kontras warna tinggi untuk keterbacaan data stok obat, serta indikator visual warna (merah: kritis, kuning: waspada, hijau: aman).' },
      { title: 'Figma Workspace', content: 'Sistem komponen lengkap dengan varian tombol, input field, modal konfirmasi transaksi, dan preview cetak struk thermal.' }
    ],
    codeSpecs: [
      { title: 'Frontend Stack', content: 'React.js component-driven design, Tailwind CSS utility layout, dan integrasi library chart visualisasi data.' },
      { title: 'State Management', content: 'Local state & Context API untuk keranjang belanja kasir realtime tanpa delay render.' }
    ]
  },

  tripin: {
    title: 'TripIn — Airport-to-Hotel Shuttle Bus Booking',
    artboard: 'ARTBOARD 03 // MBKM BEST GROUP FINAL PROJECT',
    category: 'Mobile-First Web App & Booking System',
    role: 'Frontend Developer & UI/UX Designer',
    techStack: ['React.js', 'Tailwind CSS', 'Mobile-First UI', 'Payment Gateway'],
    url: 'https://tripin.rakamin.app',
    fullDesc: 'Aplikasi web mobile-first untuk pemesanan layanan shuttle bus eksklusif dari bandara langsung ke hotel tujuan wisatawan. Dibuat sebagai proyek akhir program Studi Independen Bersertifikat (MSIB) Kampus Merdeka di PT Rakamin Kolektif Madani. Mengintegrasikan pemilihan lokasi interaktif, denah pemilihan kursi real-time, sistem poin cashback, pembayaran e-wallet terintegrasi, dan e-ticket digital ber-QR code.',
    highlights: [
      'Membawa tim meraih penghargaan prestisius "Best Group of Final Project" di antara ratusan peserta MSIB Batch 7.',
      'Merancang alur konversi pemesanan tiket 4-langkah (Search → Seat Selection → Checkout → E-Ticket) yang sangat mulus.',
      'Slicing presisi tinggi dari mockup Figma ke komponen React.js dengan visual mobile view 100% responsif.',
      'Fitur tracking perjalanan shuttle bus real-time dan manajemen voucher promo pelanggan.'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/tripin-screen-1.png', caption: 'TripIn Mobile App: Welcome & Search' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/tripin-screen-1.png', caption: '01. Splash & Beranda Pemesanan Shuttle Bus' },
      { src: 'assets/images/projects/tripin-screen-2.png', caption: '02. Pemilihan Rute Bandara ke Hotel Tujuan' },
      { src: 'assets/images/projects/tripin-screen-3.png', caption: '03. Form Detail Penumpang & Jadwal Keberangkatan' },
      { src: 'assets/images/projects/tripin-screen-4.png', caption: '04. Interactive Seat Selection (Peta Kursi Interaktif)' },
      { src: 'assets/images/projects/tripin-screen-5.png', caption: '05. Konfirmasi Pembayaran E-Wallet (GoPay/OVO)' },
      { src: 'assets/images/projects/tripin-screen-6.png', caption: '06. Status Pembayaran Berhasil & Detail Transaksi' },
      { src: 'assets/images/projects/tripin-screen-7.png', caption: '07. E-Ticket Digital dengan QR Code Boarding' },
      { src: 'assets/images/projects/tripin-screen-8.png', caption: '08. Pusat Notifikasi & Riwayat Perjalanan' }
    ],
    designSpecs: [
      { title: 'User Research & Journey', content: 'Riset kebutuhan wisatawan bandara yang membutuhkan kepastian transportasi tanpa antrean panjang di bandara kedatangan.' },
      { title: 'Mobile Interaction Design', content: 'Navigasi thumb-friendly, animasi transisi antar langkah pemesanan, dan visual seat map interaktif dengan status kursi (tersedia, terisi, terpilih).' }
    ],
    codeSpecs: [
      { title: 'Component Architecture', content: 'React.js modular components (SeatGrid, BookingSteps, TicketCard, PaymentSummary) dengan Tailwind CSS.' },
      { title: 'Mock API & State', content: 'Simulasi alur transaksi e-wallet dan validasi kode tiket digital.' }
    ]
  },

  partoid: {
    title: 'Company Profile PT Affan Technology Indonesia (Parto.id)',
    artboard: 'ARTBOARD 04 // CORPORATE INDUSTRY INTERNSHIP',
    category: 'Corporate Web & E-Catalog Portal',
    role: 'Frontend Developer Intern',
    techStack: ['WordPress FSE', 'Gutenverse', 'CSS3/HTML5', 'Figma Slicing'],
    url: 'https://parto.id',
    fullDesc: 'Pengembangan dan penyesuaian website company profile resmi untuk PT Affan Technology Indonesia (Parto.id), platform penyedia e-katalog dan ekosistem pengadaan pemerintah bagi ribuan UMKM. Menjembatani desain antarmuka dari Figma ke dalam WordPress Full Site Editing (FSE) dengan struktur navigasi multi-halaman yang komprehensif, cepat diakses, dan mobile-friendly.',
    highlights: [
      'Menyelesaikan program magang industri bersertifikat dengan predikat "Sangat Baik".',
      'Menerjemahkan desain UI/UX dari Figma secara pixel-perfect ke dalam WordPress Gutenberg & Gutenverse.',
      'Menyusun navigasi multi-halaman meliputi: Home, Our Story, Team Biographies, Marketplace Products, News/Blog, dan Contact Us.',
      'Melakukan black-box testing menyeluruh untuk memvalidasi interaktivitas tombol, form kontak, dan responsivitas di berbagai browser.'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/partoid-landing.jpg', caption: 'Beranda Company Profile Parto.id: Inovasi Digital Pengadaan' },
      { src: 'assets/images/projects/partoid-features.jpg', caption: 'Halaman Fitur & Keunggulan Mitra UMKM' },
      { src: 'assets/images/projects/partoid-market.jpg', caption: 'Katalog Produk & Solusi Ekosistem Pengadaan' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/partoid-landing.jpg', caption: 'Tampilan Mobile Parto.id' }
    ],
    designSpecs: [
      { title: 'Corporate Identity', content: 'Menyelaraskan elemen visual branding hijau toska (#0D5C58) dan aksen emas untuk mencerminkan kredibilitas mitra pemerintah.' },
      { title: 'Information Architecture', content: 'Pengelompokan struktur konten yang rapi untuk mempermudah calon mitra UMKM memahami alur pendaftaran.' }
    ],
    codeSpecs: [
      { title: 'WordPress FSE Engine', content: 'Custom Block Templates, Gutenverse Block Editor, kustomisasi CSS lanjutan, dan optimasi aset gambar.' },
      { title: 'Cross-Device QA', content: 'Black-box testing di Chrome, Safari, Firefox, iOS, dan Android viewports.' }
    ]
  },

  learnify: {
    title: 'Learnify — Educational Platform Student Dashboard',
    artboard: 'ARTBOARD 05 // EDTECH PLATFORM DASHBOARD',
    category: 'EdTech & Learning Management System',
    role: 'UI/UX Designer & Frontend Developer',
    techStack: ['Vanilla JavaScript', 'HTML5', 'Modern CSS3', 'UI/UX Design'],
    url: '#',
    fullDesc: 'Antarmuka dashboard pembelajaran interaktif untuk platform edukasi "Learnify". Dirancang untuk memberikan pengalaman belajar yang teratur bagi mahasiswa, memungkinkan mereka memantau progres belajar kursus (HTML, CSS, JavaScript), melihat notifikasi pengumpulan tugas mendekati tenggat, melihat peringkat kelas secara dinamis, dan mengelola data profil pribadi.',
    highlights: [
      'Dashboard dengan pengalaman pengguna yang ramah, intuitif, dan responsif.',
      'Komponen tracker progres kursus dengan visual meter dan indikator status tugas.',
      'Fitur upload berkas tugas interaktif dengan area drag-and-drop.',
      'Pengujian navigasi sidebar responsif yang dapat diminimalkan (collapsible sidebar).'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/learnify-dashboard.png', caption: 'Dashboard Siswa: Progres Kelas & Pengumuman' },
      { src: 'assets/images/projects/learnify-courses.png', caption: 'Katalog Materi & Modul Pelatihan Pemrograman' },
      { src: 'assets/images/projects/learnify-assignments.png', caption: 'Daftar Tugas & Area Upload Tugas Siswa' },
      { src: 'assets/images/projects/learnify-profile.png', caption: 'Pengaturan Profil & Pencapaian Nilai Siswa' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/learnify-dashboard.png', caption: 'Mobile View Learnify Dashboard' }
    ],
    designSpecs: [
      { title: 'Clean EdTech UI', content: 'Warna dasar netral dengan aksen biru dan oranye untuk menstimulasi fokus belajar tanpa distraksi berlebih.' }
    ],
    codeSpecs: [
      { title: 'Core Frontend', content: 'Struktur HTML5 semantik, CSS Grid & Flexbox untuk layout dinamis, serta JavaScript untuk interaksi DOM.' }
    ]
  },

  tourism: {
    title: 'Regional Tourism — Destination Showcase Landing Page',
    artboard: 'ARTBOARD 06 // TOURISM LANDING PAGE',
    category: 'Landing Page & Interactive Showcase',
    role: 'UI/UX Designer & Frontend Developer',
    techStack: ['HTML5', 'CSS3', 'Responsive Design', 'Interactive Gallery'],
    url: '#',
    fullDesc: 'Landing page promosi destinasi pariwisata unggulan daerah (seperti Gunung Kerinci, Danau Kaco, dan cagar alam Jambi). Menghadirkan visual megah dari keindahan alam lokal yang ditata dengan tipografi modern, kartu destinasi dengan rating, panduan rute wisata, dan galeri foto interaktif yang adaptif di berbagai resolusi layar.',
    highlights: [
      'Merancang visual storytelling untuk memikat wisatawan lokal maupun mancanegara.',
      'Implementasi galeri foto masonry responsif yang menyesuaikan ukuran viewport secara otomatis.',
      'Struktur navigasi cepat dengan anchor links dan tombol call-to-action pemesanan paket wisata.'
    ],
    desktopScreens: [
      { src: 'assets/images/projects/tourism-frontend.png', caption: 'Frontend Implementation: Hero Showcase & Destinasi' },
      { src: 'assets/images/projects/tourism-ui.png', caption: 'Desain Konsep UI di Figma: Grid & Galeri Wisata' }
    ],
    mobileScreens: [
      { src: 'assets/images/projects/tourism-frontend.png', caption: 'Tampilan Mobile Responsive Tourism Page' }
    ],
    designSpecs: [
      { title: 'Visual Concept', content: 'Desain bertema petualangan alam dengan tipografi tebal dan ruang negatif yang luas untuk menonjolkan keindahan foto lanskap.' }
    ],
    codeSpecs: [
      { title: 'Implementation', content: 'Pure CSS3 media queries, CSS Grid untuk galeri foto interaktif, dan semantic markup.' }
    ]
  }
};

let currentModalProjectId = 'simta';
let currentModalDevice = 'desktop';

function openProjectModal(projectId) {
  const data = PROJECTS_DATA[projectId];
  if (!data) return;

  currentModalProjectId = projectId;
  sfx.play('click');

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const artboardTag = document.getElementById('modalArtboardTag');
  const mockupUrlBar = document.getElementById('mockupUrlBar');
  const fullDesc = document.getElementById('modalFullDesc');
  const highlightsList = document.getElementById('modalHighlights');
  const metaPills = document.getElementById('modalMetaPills');
  const designSpecsGrid = document.getElementById('modalDesignSpecs');
  const codeSpecsGrid = document.getElementById('modalCodeSpecs');
  const liveLinkBtn = document.getElementById('modalLiveLink');

  title.textContent = data.title;
  artboardTag.textContent = data.artboard;
  mockupUrlBar.textContent = data.url;
  fullDesc.textContent = data.fullDesc;

  // Highlights
  highlightsList.innerHTML = '';
  data.highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    highlightsList.appendChild(li);
  });

  // Meta pills
  metaPills.innerHTML = `
    <span class="tech-tag react">${data.category}</span>
    <span class="tech-tag tailwind"><i class="fa-solid fa-user"></i> ${data.role}</span>
    ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
  `;

  // Design specs
  designSpecsGrid.innerHTML = data.designSpecs.map(ds => `
    <div class="spec-block">
      <div class="spec-block-title">${ds.title}</div>
      <div class="spec-block-content">${ds.content}</div>
    </div>
  `).join('');

  // Code specs
  codeSpecsGrid.innerHTML = data.codeSpecs.map(cs => `
    <div class="spec-block">
      <div class="spec-block-title">${cs.title}</div>
      <div class="spec-block-content">${cs.content}</div>
    </div>
  `).join('');

  // Live link
  if (data.url && data.url !== '#') {
    liveLinkBtn.href = data.url;
    liveLinkBtn.style.display = 'inline-flex';
  } else {
    liveLinkBtn.style.display = 'none';
  }

  // Setup device screens & thumbs
  // If tripin, default to mobile!
  if (projectId === 'tripin') {
    switchModalDevice('mobile');
  } else {
    switchModalDevice('desktop');
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
  sfx.play('blip');
}

function switchModalDevice(device) {
  currentModalDevice = device;
  const btnDesktop = document.getElementById('btnDeviceDesktop');
  const btnMobile = document.getElementById('btnDeviceMobile');
  const desktopMockup = document.getElementById('desktopMockup');
  const mobileMockup = document.getElementById('mobileMockup');
  const carouselThumbs = document.getElementById('carouselThumbs');

  const data = PROJECTS_DATA[currentModalProjectId];
  if (!data) return;

  btnDesktop.classList.toggle('active', device === 'desktop');
  btnMobile.classList.toggle('active', device === 'mobile');

  const screens = (device === 'mobile' && data.mobileScreens.length > 0)
    ? data.mobileScreens
    : data.desktopScreens;

  if (device === 'mobile') {
    desktopMockup.classList.add('hidden');
    mobileMockup.classList.remove('hidden');
    document.getElementById('mobileMockupImg').src = screens[0].src;
  } else {
    desktopMockup.classList.remove('hidden');
    mobileMockup.classList.add('hidden');
    document.getElementById('desktopMockupImg').src = screens[0].src;
  }

  // Render Thumbnails
  carouselThumbs.innerHTML = '';
  screens.forEach((screen, index) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;
    thumb.title = screen.caption;
    thumb.innerHTML = `<img src="${screen.src}" alt="${screen.caption}" />`;
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (device === 'mobile') {
        document.getElementById('mobileMockupImg').src = screen.src;
      } else {
        document.getElementById('desktopMockupImg').src = screen.src;
      }
      sfx.play('blip');
    });
    carouselThumbs.appendChild(thumb);
  });
}

function switchInfoTab(tabId, tabBtn) {
  document.querySelectorAll('.info-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

  tabBtn.classList.add('active');
  const activePane = document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  if (activePane) activePane.classList.add('active');
  sfx.play('blip');
}

// Project Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    sfx.play('blip');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Card Inspect Click Trigger
document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.project-image-wrapper')?.addEventListener('click', () => {
    const pid = card.getAttribute('data-project-id');
    if (pid) openProjectModal(pid);
  });
});

// ================= 6. INTERACTIVE CLI TERMINAL ENGINE =================
const cliDrawer = document.getElementById('cliDrawer');
const cliInput = document.getElementById('cliInput');
const cliHistory = document.getElementById('cliHistory');
const cliCloseBtn = document.getElementById('cliCloseBtn');
const cliMinBtn = document.getElementById('cliMinBtn');
const cliMaxBtn = document.getElementById('cliMaxBtn');
const terminalToggleBtn = document.getElementById('terminalToggleBtn');
const heroTerminalBtn = document.getElementById('heroTerminalBtn');

function toggleTerminal() {
  if (!cliDrawer) return;
  const isOpen = cliDrawer.classList.toggle('open');
  if (isOpen) {
    cliDrawer.classList.remove('minimized');
    cliInput?.focus();
    sfx.play('click');
  } else {
    sfx.play('blip');
  }
}

terminalToggleBtn?.addEventListener('click', toggleTerminal);
heroTerminalBtn?.addEventListener('click', toggleTerminal);
cliCloseBtn?.addEventListener('click', toggleTerminal);

cliMinBtn?.addEventListener('click', () => {
  cliDrawer?.classList.toggle('minimized');
  sfx.play('blip');
});

cliMaxBtn?.addEventListener('click', () => {
  cliDrawer?.classList.toggle('maximized');
  sfx.play('blip');
});

// Press '~' to toggle terminal anytime
document.addEventListener('keydown', (e) => {
  if (e.key === '`' || e.key === '~') {
    // only toggle if not actively typing in another form element
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      toggleTerminal();
    }
  } else if (e.key === 'Escape') {
    closeProjectModal();
    closeImageLightbox();
  }
});

const CLI_COMMANDS = {
  help: () => `
<div class="cli-output-block">
  <strong>Perintah CLI yang Tersedia:</strong><br>
  • <span class="cmd-highlight">about</span> atau <span class="cmd-highlight">bio</span> : Profil singkat Egydia Alfariza<br>
  • <span class="cmd-highlight">skills</span> : Radar keahlian Frontend & UI/UX<br>
  • <span class="cmd-highlight">projects</span> : Daftar 6 proyek unggulan<br>
  • <span class="cmd-highlight">project [1-6]</span> : Buka inspeksi detail proyek (contoh: <code>project 1</code>)<br>
  • <span class="cmd-highlight">education</span> : Riwayat studi & predikat Cum Laude<br>
  • <span class="cmd-highlight">certifications</span> : Daftar sertifikasi resmi (BNSP, Komdigi, Google)<br>
  • <span class="cmd-highlight">experience</span> : Pengalaman kerja industri & magang MSIB<br>
  • <span class="cmd-highlight">contact</span> : Kontak langsung (WhatsApp, Email, LinkedIn, GitHub)<br>
  • <span class="cmd-highlight">hire</span> : Salin link chat WhatsApp Egydia<br>
  • <span class="cmd-highlight">matrix</span> : Aktifkan efek visualizer hujan kode hijau<br>
  • <span class="cmd-highlight">theme [designer|dev|editorial]</span> : Ubah mode studio<br>
  • <span class="cmd-highlight">clear</span> : Bersihkan layar terminal
</div>`,

  about: () => `
<div class="cli-output-block">
  <strong>EGYDIA ALFARIZA RAMADHANI, S.Kom.</strong><br>
  Lulusan Sarjana Sistem Informasi Universitas Jambi (2022–2026) dengan IPK <strong>3.94 / 4.00 (Cum Laude)</strong>.<br>
  Spesialisasi: Menggabungkan presisi visual antarmuka (UI/UX di Figma) dengan arsitektur kode frontend yang tangguh (React.js, Tailwind CSS, JavaScript).
</div>`,

  bio: () => CLI_COMMANDS.about(),

  skills: () => `
<div class="cli-output-block">
  <strong>FRONTEND STACK:</strong><br>
  [■■■■■■■■■□] React.js (Component, Hooks, Router) - 92%<br>
  [■■■■■■■■■■] Tailwind CSS & Vanilla CSS3 - 95%<br>
  [■■■■■■■■■□] JavaScript (ES6+, DOM, Fetch) - 90%<br>
  [■■■■■■■■□□] WordPress FSE & Gutenverse - 88%<br>
  [■■■■■■■■□□] HTML5 Semantic & Web Accessibility - 94%<br><br>
  <strong>UI/UX DESIGN DISCIPLINES:</strong><br>
  • Figma Wireframing & Hi-Fi Interactive Prototyping<br>
  • User-Centered Research & Prototype Methodology<br>
  • System Usability Scale (SUS) Testing (Score 87.50 / Grade A)<br>
  • Design Systems, Tokenization & Component Slicing
</div>`,

  projects: () => `
<div class="cli-output-block">
  <strong>6 FEATURED PROJECTS:</strong><br>
  1. <strong>SIMTA-UM</strong> — Thesis Management System (SUS 87.50 Grade A) ➔ Ketik: <code>project 1</code><br>
  2. <strong>RajaPharma</strong> — Pharmacy Management & POS (1st Best Project) ➔ Ketik: <code>project 2</code><br>
  3. <strong>TripIn</strong> — Shuttle Bus Mobile App (MSIB Best Group) ➔ Ketik: <code>project 3</code><br>
  4. <strong>Parto.id</strong> — Company Profile PT Affan Technology ➔ Ketik: <code>project 4</code><br>
  5. <strong>Learnify</strong> — EdTech Platform Student Dashboard ➔ Ketik: <code>project 5</code><br>
  6. <strong>Regional Tourism</strong> — Scenic Destination Showcase ➔ Ketik: <code>project 6</code>
</div>`,

  education: () => `
<div class="cli-output-block">
  <strong>Universitas Jambi (2022 – 2026)</strong><br>
  Gelar: Sarjana Komputer (S.Kom.) dalam Sistem Informasi<br>
  IPK: <strong>3.94 / 4.00 — Graduated with Honors (Cum Laude)</strong><br>
  Skripsi: Analisis dan Perancangan Frontend Sistem Informasi Manajemen Tugas Akhir pada Universitas Merangin Menggunakan Metode Prototype.
</div>`,

  certifications: () => `
<div class="cli-output-block">
  <strong>DAFTAR SERTIFIKASI RESMI:</strong><br>
  1. Keamanan Siber Muda (Junior Cyber Security) — BNSP / LSP Teknologi Digital<br>
  2. Best Group of Final Project (TripIn) — PT Rakamin Kolektif Madani<br>
  3. Fullstack Web Development & Data Science — MSIB Kampus Merdeka Batch 7<br>
  4. Vocational School Graduate Academy (VSGA) Cyber Security — Komdigi<br>
  5. Google Analytics Individual Certification — Google Skillshop<br>
  6. Frontend Developer Internship Certificate — PT Affan Technology Indonesia<br>
  7. Intro to Data Analytics — RevoU<br>
  8. Literasi Digital & AI Mindset — Kementerian Kominfo / Komdigi
</div>`,

  experience: () => `
<div class="cli-output-block">
  <strong>PENGALAMAN KERJA & RISET:</strong><br>
  • <strong>Jan 2026 – Jun 2026</strong>: Lead Researcher & Frontend Dev — SIMTA-UM (SUS 87.50 Grade A)<br>
  • <strong>Jul 2025 – Agu 2025</strong>: Frontend Developer Intern — PT Affan Technology Indonesia (Parto.id)<br>
  • <strong>Feb 2025 – Jun 2025</strong>: Project Manager & Frontend Dev — RajaPharma (1st Best Project Award)<br>
  • <strong>Sep 2024 – Des 2024</strong>: Fullstack Student — MSIB Rakamin (Best Group Final Project)
</div>`,

  contact: () => `
<div class="cli-output-block">
  <strong>CONNECT WITH EGYDIA:</strong><br>
  • WhatsApp : <a href="https://wa.me/6282227376330" target="_blank" style="color:#25D366">0822-2737-6330</a><br>
  • Email    : <a href="mailto:egydiaalfariza74@gmail.com" style="color:#EE2B5B">egydiaalfariza74@gmail.com</a><br>
  • LinkedIn : <a href="https://linkedin.com/in/egydiaalfariza" target="_blank" style="color:#0A66C2">linkedin.com/in/egydiaalfariza</a><br>
  • GitHub   : <a href="https://github.com/alfrzaa" target="_blank" style="color:#38BDF8">github.com/alfrzaa</a><br>
  • Instagram: <a href="https://instagram.com/alfrrza" target="_blank" style="color:#E1306C">@alfrrza</a>
</div>`,

  hire: () => {
    window.open('https://wa.me/6282227376330?text=Halo%20Egydia%2C%20saya%20tertarik%20untuk%20merekrut%20atau%20bekerja%20sama%20dengan%20Anda.', '_blank');
    return `<div class="cli-output-block" style="color:#10B981">Membuka WhatsApp untuk terhubung langsung dengan Egydia Alfariza...</div>`;
  },

  matrix: () => {
    isMatrixMode = !isMatrixMode;
    sfx.play('success');
    return `<div class="cli-output-block" style="color:#00F0FF">Matrix Visualizer Mode: <strong>${isMatrixMode ? 'ACTIVATED [ON]' : 'DEACTIVATED [OFF]'}</strong></div>`;
  },

  clear: () => {
    if (cliHistory) cliHistory.innerHTML = '';
    return '';
  }
};

function execCommand(rawCmd) {
  const trimmed = rawCmd.trim();
  if (!trimmed) return;

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const arg = parts[1];

  // Append user line to history
  const userLine = document.createElement('div');
  userLine.className = 'cli-line';
  userLine.innerHTML = `<span class="prompt-user">guest@egydia-studio</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span> <span class="cli-output-cmd">${trimmed}</span>`;
  cliHistory.appendChild(userLine);

  let outputHtml = '';

  if (cmd === 'clear') {
    cliHistory.innerHTML = '';
  } else if (cmd === 'project') {
    const projMap = { '1': 'simta', '2': 'rajapharma', '3': 'tripin', '4': 'partoid', '5': 'learnify', '6': 'tourism', 'simta': 'simta', 'rajapharma': 'rajapharma', 'tripin': 'tripin', 'partoid': 'partoid', 'learnify': 'learnify', 'tourism': 'tourism' };
    const pKey = projMap[arg];
    if (pKey) {
      openProjectModal(pKey);
      outputHtml = `<div class="cli-output-block" style="color:#10B981">Membuka modal inspeksi untuk proyek <strong>${PROJECTS_DATA[pKey].title}</strong>...</div>`;
    } else {
      outputHtml = `<div class="cli-output-block" style="color:#EF4444">Nomor proyek tidak valid. Gunakan 1 sampai 6. (Contoh: <code>project 1</code>)</div>`;
    }
  } else if (cmd === 'theme') {
    if (['designer', 'dev', 'editorial'].includes(arg)) {
      setStudioMode(arg);
      outputHtml = `<div class="cli-output-block" style="color:#38BDF8">Theme berhasil diubah ke <strong>${arg}</strong>!</div>`;
    } else {
      outputHtml = `<div class="cli-output-block" style="color:#EF4444">Pilihan theme: <code>designer</code>, <code>dev</code>, atau <code>editorial</code>.</div>`;
    }
  } else if (CLI_COMMANDS[cmd]) {
    outputHtml = CLI_COMMANDS[cmd]();
  } else {
    outputHtml = `<div class="cli-output-block" style="color:#EF4444">Perintah '<strong>${cmd}</strong>' tidak dikenali. Ketik <span class="cmd-highlight">help</span> untuk melihat daftar perintah.</div>`;
    sfx.play('blip');
  }

  if (outputHtml && cmd !== 'clear') {
    const outDiv = document.createElement('div');
    outDiv.innerHTML = outputHtml;
    cliHistory.appendChild(outDiv);
  }

  // Scroll to bottom
  const cliBody = document.getElementById('cliBody');
  if (cliBody) cliBody.scrollTop = cliBody.scrollHeight;
}

cliInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    execCommand(cliInput.value);
    cliInput.value = '';
    sfx.play('blip');
  }
});

// ================= 7. AMBIENT CANVAS & MATRIX RAIN =================
const canvas = document.getElementById('ambientCanvas');
let ctx = canvas ? canvas.getContext('2d') : null;
let isMatrixMode = false;
let particles = [];
let matrixDrops = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
  initMatrix();
}

function initParticles() {
  particles = [];
  const count = Math.min(window.innerWidth / 20, 60);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.6
    });
  }
}

function initMatrix() {
  const columns = Math.floor(canvas.width / 18);
  matrixDrops = [];
  for (let i = 0; i < columns; i++) {
    matrixDrops[i] = Math.floor(Math.random() * -50);
  }
}

function renderCanvas() {
  if (!ctx || !canvas) return;

  if (isMatrixMode) {
    ctx.fillStyle = 'rgba(5, 8, 14, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00F0FF';
    ctx.font = '14px "JetBrains Mono", monospace';

    const chars = '01EGYDIAREACTTAILWINDUIUX3.94CUM_LAUDE';
    for (let i = 0; i < matrixDrops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * 18, matrixDrops[i] * 18);

      if (matrixDrops[i] * 18 > canvas.height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      matrixDrops[i]++;
    }
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = document.documentElement.getAttribute('data-theme');
    const pColor = theme === 'dev' ? 'rgba(0, 240, 255, 0.25)' : (theme === 'editorial' ? 'rgba(194, 30, 86, 0.15)' : 'rgba(238, 43, 91, 0.2)');

    ctx.fillStyle = pColor;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw subtle connective lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 100) {
          ctx.strokeStyle = theme === 'dev' ? `rgba(0, 240, 255, ${0.15 * (1 - dist / 100)})` : `rgba(238, 43, 91, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(renderCanvas);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(renderCanvas);

// ================= 8. CUSTOM MAGNETIC CURSOR =================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let outlineX = cursorX;
let outlineY = cursorY;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;
  }
});

function animateCursor() {
  outlineX += (cursorX - outlineX) * 0.18;
  outlineY += (cursorY - outlineY) * 0.18;

  if (cursorOutline) {
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
  }
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.querySelectorAll('a, button, .bento-card, .cert-card, .id-card-3d, .tool-tile, .direct-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// ================= 9. LIGHTBOX MODAL FOR CERTIFICATES & PHOTOS =================
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');

function openImageLightbox(src, caption) {
  if (!imageLightbox) return;
  lightboxImage.src = src;
  lightboxCaption.textContent = caption || '';
  imageLightbox.classList.add('open');
  imageLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  sfx.play('click');
}

function closeImageLightbox() {
  if (!imageLightbox) return;
  imageLightbox.classList.remove('open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  sfx.play('blip');
}

// ================= 10. CLIPBOARD & FORM SUBMISSION =================
function copyToClipboard(text, msg = 'Tersalin ke clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 ${msg}`);
    sfx.play('success');
  }).catch(() => {
    showToast('Gagal menyalin');
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('senderName')?.value || '';
  const email = document.getElementById('senderEmail')?.value || '';
  const topic = document.getElementById('messageTopic')?.value || '';
  const msg = document.getElementById('senderMessage')?.value || '';

  const waMessage = `Halo Egydia Alfariza,%0A%0ASaya: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0ATopik: ${encodeURIComponent(topic)}%0A%0APesan:%0A${encodeURIComponent(msg)}`;
  const waUrl = `https://wa.me/6282227376330?text=${waMessage}`;

  sfx.play('success');
  showToast('🚀 Mengarahkan pesan ke WhatsApp...');
  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 400);
}

// Active Nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 200;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-link, .dock-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${id}`) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  });
});

// Mobile hamburger toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
mobileMenuBtn?.addEventListener('click', () => {
  if (navMenu) {
    navMenu.classList.toggle('mobile-open');
    sfx.play('blip');
  }
});

// Auto close mobile menu when nav link is clicked
document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('mobile-open');
  });
});

// Auto-hide floating dock when typing on mobile to prevent obscuring inputs / keyboard
const formInputs = document.querySelectorAll('input, textarea, select');
const studioDock = document.querySelector('.studio-dock');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    if (window.innerWidth < 768 && studioDock) {
      studioDock.style.opacity = '0';
      studioDock.style.pointerEvents = 'none';
      studioDock.style.transform = 'translateX(-50%) translateY(30px)';
      studioDock.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    }
  });
  input.addEventListener('blur', () => {
    if (studioDock) {
      studioDock.style.opacity = '1';
      studioDock.style.pointerEvents = 'auto';
      studioDock.style.transform = 'translateX(-50%) translateY(0)';
    }
  });
});

// Restore previous mode
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('egydia_portfolio_mode') || 'designer';
  setStudioMode(savedMode);
  console.log(`%c✨ Egydia Studio Engine v3.94 loaded! %cMode: ${savedMode}`, 'color:#EE2B5B; font-weight:bold; font-size:14px', 'color:#38BDF8');
});
