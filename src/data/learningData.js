// ============================================================
// DATA PEMBELAJARAN & ANALISIS LMS (ruang.)
// Sesuai perancangan FSLSM × K-Means
// ============================================================

export const MATERI = [
  {
    id: 0,
    t: "Algoritma & Logika",
    f: "Diagram visual",
    menit: 12,
    kat: "visual",
    d: "Algoritma adalah urutan langkah terstruktur untuk menyelesaikan masalah komputasi secara efisien.",
    v: "Input → Validasi → Proses → Logika → Output",
    alurLangkah: [
      { step: "Input", desc: "Menerima nilai UTS (75) dan UAS (85)" },
      { step: "Proses", desc: "Menghitung Nilai Akhir: (0.4 × 75) + (0.6 × 85) = 81" },
      { step: "Kondisi", desc: "Mengevaluasi apakah Nilai Akhir ≥ 60? (Benar)" },
      { step: "Output", desc: "Menampilkan status: 'Lulus dengan Baik'" }
    ],
    contoh: [
      "Menghitung rata-rata nilai:",
      "1. Masukkan seluruh nilai ujian.",
      "2. Jumlahkan semua nilai yang dimasukkan.",
      "3. Bagi jumlah nilai dengan banyaknya data.",
      "4. Tampilkan hasil perhitungan rata-rata."
    ]
  },
  {
    id: 1,
    t: "Struktur Data",
    f: "Latihan interaktif",
    menit: 15,
    kat: "latihan",
    d: "Array menyimpan sekumpulan elemen dalam urutan memori tertentu yang dapat diakses melalui indeks berbasis nol.",
    v: "[ Buku ] [ Pena ] [ Tas ] [ Laptop ]",
    alurLangkah: [
      { step: "Indeks 0", desc: "barang[0] ➔ 'Buku' (Alamat memori awal 0x100)" },
      { step: "Indeks 1", desc: "barang[1] ➔ 'Pena' (Alamat memori 0x104)" },
      { step: "Indeks 2", desc: "barang[2] ➔ 'Tas' (Alamat memori 0x108)" },
      { step: "Indeks 3", desc: "barang[3] ➔ 'Laptop' (Alamat memori 0x10C)" }
    ],
    contoh: [
      "barang = ['Buku', 'Pena', 'Tas']",
      "Indeks dimulai dari 0. barang[1] menghasilkan 'Pena'.",
      "barang.push('Laptop') menambahkan elemen baru di akhir array.",
      "Panjang barang.length sekarang bernilai 4."
    ]
  },
  {
    id: 2,
    t: "Memahami Percabangan",
    f: "Bacaan ringkas",
    menit: 8,
    kat: "bacaan",
    d: "Percabangan mengevaluasi kondisi logika boolean untuk menentukan jalur instruksi mana yang akan dijalankan CPU.",
    v: "Nilai ≥ 60? → [True: Lulus] | [False: Remidi]",
    alurLangkah: [
      { step: "Ekspresi", desc: "if (nilai >= 60)" },
      { step: "Cabang True", desc: "Jalankan blok: status = 'Lulus'" },
      { step: "Cabang False", desc: "Jalankan blok else: status = 'Remidi'" },
      { step: "Lanjut", desc: "Program melanjutkan instruksi berikutnya" }
    ],
    contoh: [
      "Jika nilai ≥ 60, tampilkan 'Lulus'. Jika nilai < 60, tampilkan 'Belum lulus'.",
      "Kondisi menentukan jalur cabang yang dijalankan.",
      "Contoh jam belajar: if (jam >= 22) tampilkan 'Aktivitas Belajar Mandiri Malam'."
    ]
  },
  {
    id: 3,
    t: "Peta Konsep Pemrograman",
    f: "Peta konsep",
    menit: 10,
    kat: "visual",
    d: "Program komputer mengolah data terstruktur mengikuti langkah-langkah logis algoritma untuk menghasilkan informasi.",
    v: "Data → Algoritma → Bahasa Pemrograman → Solusi",
    alurLangkah: [
      { step: "Data", desc: "Variabel, tipe data, dan struktur penyimpanan memori" },
      { step: "Kontrol", desc: "Percabangan kondisi dan perulangan iterasi" },
      { step: "Fungsi", desc: "Modularitas dan pemecahan masalah besar jadi sub-program" },
      { step: "Sistem", desc: "Aplikasi utuh yang melayani kebutuhan pengguna" }
    ],
    contoh: [
      "Variabel menyimpan data mentah.",
      "Percabangan memilih langkah keputusan berdasarkan logika.",
      "Perulangan mengulangi proses yang sama secara efisien.",
      "Fungsi membungkus logika agar dapat digunakan kembali (reusable)."
    ]
  }
];

// Soal Kuis Spesifik per Modul
export const KUIS_PER_MODUL = {
  0: [
    {
      q: "Apa yang dimaksud dengan algoritma?",
      opsi: [
        "Urutan langkah logis untuk menyelesaikan masalah",
        "Nama perangkat keras di dalam komputer",
        "Tempat penyimpanan file sistem operasi"
      ],
      benar: 0,
      ulasan: "Algoritma adalah serangkaian instruksi terdefinisi dengan jelas untuk menyelesaikan suatu masalah langkah-demi-langkah."
    },
    {
      q: "Dalam perancangan flowchart, simbol apakah yang digunakan untuk membuat percabangan keputusan?",
      opsi: [
        "Belah ketupat (Decision)",
        "Persegi panjang (Process)",
        "Oval (Terminator)"
      ],
      benar: 0,
      ulasan: "Simbol belah ketupat melambangkan kondisi logika (True/False) yang menentukan jalur alur program selanjutnya."
    }
  ],
  1: [
    {
      q: "Apa fungsi utama dari struktur data Array?",
      opsi: [
        "Menyimpan sekumpulan elemen data sejenis secara berurutan",
        "Menghapus seluruh baris program secara permanen",
        "Mengganti sistem operasi komputer secara otomatis"
      ],
      benar: 0,
      ulasan: "Array menyimpan elemen-elemen data pada alamat memori berurutan yang dapat diakses dengan cepat melalui nomor indeks."
    },
    {
      q: "Jika terdapat array `barang = ['Buku', 'Pena', 'Tas']`, berapakah nilai `barang[1]`?",
      opsi: [
        "Pena",
        "Buku",
        "Tas"
      ],
      benar: 0,
      ulasan: "Karena indeks array dimulai dari angka 0, maka indeks 0 adalah 'Buku' dan indeks 1 adalah 'Pena'."
    }
  ],
  2: [
    {
      q: "Kapan instruksi di dalam blok `else` akan dijalankan?",
      opsi: [
        "Ketika kondisi pada bagian `if` bernilai salah (false)",
        "Ketika program baru pertama kali dijalankan",
        "Setiap saat tanpa mempedulikan kondisi logika"
      ],
      benar: 0,
      ulasan: "Blok `else` berfungsi sebagai jalur alternatif yang hanya dieksekusi apabila kondisi utama pada `if` tidak terpenuhi."
    },
    {
      q: "Operator logika manakah yang digunakan untuk memeriksa apakah dua kondisi sekaligus harus benar?",
      opsi: [
        "Operator AND (&&)",
        "Operator OR (||)",
        "Operator NOT (!)"
      ],
      benar: 0,
      ulasan: "Operator AND (&&) menghasilkan nilai benar hanya jika kedua ekspresi yang diuji bernilai benar."
    }
  ],
  3: [
    {
      q: "Bagaimana hubungan antara Data dan Algoritma dalam pemrograman?",
      opsi: [
        "Algoritma memproses dan memanipulasi data untuk menghasilkan output",
        "Data dan algoritma adalah dua hal yang sama persis",
        "Data hanya boleh digunakan tanpa algoritma"
      ],
      benar: 0,
      ulasan: "Data adalah bahan masukan (input) mentah, sedangkan algoritma adalah resep atau prosedur logis untuk mengolah data tersebut."
    },
    {
      q: "Apa keuntungan utama memecah kode program ke dalam fungsi-fungsi modular?",
      opsi: [
        "Kode lebih mudah dibaca, diuji, dan dapat digunakan kembali",
        "Membuat ukuran file program menjadi lebih rumit",
        "Menghilangkan kebutuhan variabel di memori"
      ],
      benar: 0,
      ulasan: "Modularitas kode membuat pemecahan masalah besar menjadi sub-masalah kecil yang mandiri dan terstruktur rapi."
    }
  ]
};

// 4 Dimensi FSLSM (Felder-Silverman Learning Style Model)
export const PROFIL_DEFAULT = [
  ["Aktif", "Reflektif", 33],
  ["Sensing", "Intuitif", 40],
  ["Visual", "Verbal", 28],
  ["Sequential", "Global", 36]
];

// Ringkasan Klaster Contoh
export const KLASTER_DEFAULT = [
  ["Cluster 0 · Visual-Dominant (41%)", "Sering mengakses modul H5P & diagram visual", "visual"],
  ["Cluster 1 · Practice-Oriented (35%)", "Lebih banyak mencoba latihan coding & tugas", "latihan"],
  ["Cluster 2 · Reflective-Reader (24%)", "Sering meninjau materi teks & forum diskusi", "bacaan"]
];

// Hasil analisis log LMS (dari notebook Moodle).
export const LOG = {
  baris: 120290,
  mahasiswa: 130,
  rata: 925,
  jam: [
    3700, 1950, 1200, 750, 300, 450, 1250, 5050,
    6800, 5700, 8100, 8000, 6100, 6950, 5500, 6050,
    5000, 4500, 5500, 6200, 7300, 8150, 9050, 6750
  ],
  hari: [
    ["Sen", 12200],
    ["Sel", 22700],
    ["Rab", 14200],
    ["Kam", 17000],
    ["Jum", 22400],
    ["Sab", 15500],
    ["Min", 16200]
  ],
  modul: [
    ["H5P (Konten Visual Interaktif)", 58022],
    ["System (Akses & Navigasi)", 26880],
    ["Assignment (Tugas Pemrograman)", 14124],
    ["Open Forum (Diskusi Mahasiswa)", 7262],
    ["Page (Teks Teori & Materi)", 5435],
    ["User report (Laporan Aktivitas)", 2906],
    ["Online text (Refleksi Singkat)", 1932],
    ["Quiz (Evaluasi Otomatis)", 1828]
  ]
};

export const CONTOH_MHS = [
  { nim: "2315091043", nama: "Putu Aldi Rama Pradika Yasa", h5p: 496, teks: 48, ratio: 0.9118, aktif: 33, reflektif: 558, hari: 27, cluster: 1 },
  { nim: "2315091092", nama: "VERY IRAWAN SIMBOLON", h5p: 690, teks: 36, ratio: 0.9504, aktif: 40, reflektif: 816, hari: 38, cluster: 0 },
  { nim: "2415091001", nama: "Anak Agung Ade Jelantik Raditya", h5p: 517, teks: 48, ratio: 0.9150, aktif: 59, reflektif: 682, hari: 33, cluster: 1 },
  { nim: "2415091002", nama: "LUH INDAH SRI PUSPA DEWI", h5p: 527, teks: 76, ratio: 0.8740, aktif: 60, reflektif: 695, hari: 37, cluster: 2 },
  { nim: "2415091003", nama: "Kadek Sukadarma", h5p: 301, teks: 28, ratio: 0.9149, aktif: 38, reflektif: 404, hari: 22, cluster: 1 }
];
