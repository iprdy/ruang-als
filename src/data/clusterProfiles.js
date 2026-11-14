// Definisi Profil Gaya Belajar FSLSM berbasis K-Means Clustering (k=3)
// Hasil validasi riset Machine Learning (Random Forest 92.31%)

export const CLUSTER_PROFILES = {
  0: {
    id: 0,
    nama: "Pembelajar Selektif / Minimalis",
    namaLengkap: "Pembelajar Selektif / Minimalis (Low-Engagement)",
    jumlah: 26,
    persen: "20.3%",
    karakteristik: "Tingkat aktivitas dan hari aktif relatif rendah; interaksi cenderung terpusat pada konten visual esensial (H5P) mendekati batas pengumpulan tugas.",
    fslsmTraits: {
      input: "Sangat Visual (Visual Ratio dominan)",
      processing: "Pasif / Selektif (Aktivitas terpusat)",
      perception: "Spesifik pada target tugas",
      regularity: "Hari aktif rendah (Perlu dorongan / nudging)"
    },
    formatPrioritas: "Visual & Ringkasan Infografis",
    navigasiSaran: "Direct / Micro-modular Guidance (Fokus materi esensial agar tidak kewalahan)",
    nudgePesan: "Interaksimu tercatat cukup selektif. Jangan tunda belajar hingga batas akhir! Luangkan 10 menit hari ini untuk menuntaskan modul interaktif prioritasmu.",
    lencanaDefault: "PRIORITAS UTAMA",
    warna: "var(--peringatan)",
    bg: "var(--peringatan-bg)"
  },
  1: {
    id: 1,
    nama: "Pembelajar Konsisten & Teratur",
    namaLengkap: "Pembelajar Konsisten & Teratur (Moderate-Regular)",
    jumlah: 68,
    persen: "53.1%",
    karakteristik: "Kelompok mayoritas mahasiswa dengan frekuensi kehadiran dan hari aktif belajar yang stabil sepanjang semester; proporsi interaksi seimbang.",
    fslsmTraits: {
      input: "Visual & Tekstual seimbang",
      processing: "Teratur & Bertahap",
      perception: "Praktis & Terencana",
      regularity: "Hari aktif stabil dan tinggi sepanjang semester"
    },
    formatPrioritas: "Panduan Modul Terstruktur & Kuis Formatif Bertahap",
    navigasiSaran: "Sequential Guidance (Alur kurikulum berurutan per minggu)",
    nudgePesan: "Ritme belajarmu sangat stabil dan teratur! Pertahankan konsistensi ini untuk menguasai modul berikutnya secara bertahap.",
    lencanaDefault: "REKOMENDASI",
    warna: "var(--ungu)",
    bg: "var(--lav)"
  },
  2: {
    id: 2,
    nama: "Pembelajar Intensif & Reflektif",
    namaLengkap: "Pembelajar Intensif & Reflektif (High-Intensity Reflective)",
    jumlah: 34,
    persen: "26.6%",
    karakteristik: "Volume log aktivitas sangat tinggi; gemar membaca materi tekstual secara mendalam, meninjau forum, serta aktif mengerjakan latihan evaluasi mandiri.",
    fslsmTraits: {
      input: "Visual & Tekstual komprehensif",
      processing: "Sangat Reflektif & Analitis",
      perception: "Mendalam & Berorientasi Konsep",
      regularity: "Keterlibatan tinggi & pengulangan materi intensif"
    },
    formatPrioritas: "Modul Teori Mendalam, Skenario Kasus Riil & Lab Praktik Tingkat Lanjut",
    navigasiSaran: "Hierarchical / Exploratory Guidance (Kebebasan eksplorasi ke modul pengayaan)",
    nudgePesan: "Refleksi dan pendalaman belajarmu sangat luar biasa! Siap untuk tantangan skenario studi kasus keamanan tingkat lanjut?",
    lencanaDefault: "PENGAYAAN",
    warna: "var(--ok)",
    bg: "var(--ok-bg)"
  }
};
