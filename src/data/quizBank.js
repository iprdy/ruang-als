// Bank Soal Kuis Formatif untuk Seluruh Modul Pembelajaran

export const QUIZ_BANK = {
  "MOD-01": [
    {
      q: "Manakah dari prinsip berikut yang menjamin data tidak dimodifikasi secara ilegal oleh pihak luar?",
      opsi: [
        "Integrity (Integritas)",
        "Confidentiality (Kerahasiaan)",
        "Availability (Ketersediaan)"
      ],
      benar: 0,
      ulasan: "Tepat. Prinsip Integritas menjamin bahwa data tetap akurat, konsisten, dan tidak dapat diubah oleh pihak yang tidak memiliki otorisasi."
    },
    {
      q: "Serangan pencurian kredensial akun menggunakan teknik Eavesdropping melanggar pilar...",
      opsi: [
        "Confidentiality (Kerahasiaan)",
        "Availability (Ketersediaan)",
        "Accountability (Akuntabilitas)"
      ],
      benar: 0,
      ulasan: "Benar. Eavesdropping membocorkan kerahasiaan data yang dikirimkan tanpa enkripsi."
    }
  ],
  "MOD-02": [
    {
      q: "Apa mekanisme utama terjadinya serangan SYN Flood pada protokol TCP?",
      opsi: [
        "Pengiriman paket SYN terus menerus tanpa mengirimkan paket ACK balasan",
        "Pemutusan kabel fiber optik gateway penyedia layanan internet",
        "Penulisan ulang firmware router target dari jarak jauh"
      ],
      benar: 0,
      ulasan: "Tepat. SYN Flood memanfaatkan antrean alokasi memori (backlog) server yang menunggu jabat tangan 3 arah yang tidak pernah diselesaikan."
    },
    {
      q: "Teknologi manakah yang paling efektif untuk menyaring dan menyerap lonjakan traffic DDoS sebelum mencapai server utama?",
      opsi: [
        "Scrubbing Center & Anycast BGP Routing",
        "Menonaktifkan firewall server",
        "Menghapus file log sistem operasi"
      ],
      benar: 0,
      ulasan: "Benar. Scrubbing Center berfungsi sebagai filter lalu lintas jaringan untuk memisahkan traffic sah dari traffic flooding botnet."
    }
  ],
  "MOD-03": [
    {
      q: "Protokol manakah yang menggunakan tanda tangan kriptografis kunci privat domain untuk memverifikasi integritas email?",
      opsi: [
        "DKIM (DomainKeys Identified Mail)",
        "FTP (File Transfer Protocol)",
        "Telnet unencrypted protocol"
      ],
      benar: 0,
      ulasan: "Tepat. DKIM membubuhkan tanda tangan digital pada header email yang dapat divalidasi publik melalui record DNS domain pengirim."
    },
    {
      q: "Tindakan paling krusial untuk mencegah kebocoran akun akibat credential harvesting adalah...",
      opsi: [
        "Mengaktifkan Multi-Factor Authentication (MFA / 2FA)",
        "Menggunakan satu kata sandi yang sama di semua platform",
        "Membagikan token sesi kepada rekan kerja"
      ],
      benar: 0,
      ulasan: "Tepat. MFA memerlukan faktor verifikasi tambahan (seperti OTP atau hardware token) sehingga password saja tidak cukup untuk membajak akun."
    }
  ],
  "MOD-04": [
    {
      q: "Pada kriptografi asimetris, kunci manakah yang digunakan oleh penerima untuk mendekripsi pesan rahasia?",
      opsi: [
        "Private Key milik penerima",
        "Public Key milik pengirim",
        "Public Key milik Certificate Authority"
      ],
      benar: 0,
      ulasan: "Tepat. Pesan dienkripsi dengan Public Key penerima, dan hanya bisa dibuka secara matematis dengan Private Key milik penerima tersebut."
    },
    {
      q: "Apa fungsi dari Digital Signature pada sebuah dokumen elektronik?",
      opsi: [
        "Menjamin autentisitas pengirim dan non-repudiation (penyangkalan)",
        "Membuat ukuran file dokumen menjadi dua kali lebih besar",
        "Mengubah warna teks dalam dokumen menjadi hitam putih"
      ],
      benar: 0,
      ulasan: "Benar. Tanda tangan digital membuktikan bahwa dokumen berasal dari entitas yang sah dan belum mengalami perubahan apa pun sejak ditandatangani."
    }
  ],
  "MOD-05": [
    {
      q: "Perintah 'vssadmin.exe Delete Shadows /All /Quiet' sering kali dieksekusi oleh ransomware dengan tujuan...",
      opsi: [
        "Menghapus titik pemulihan cadangan (Volume Shadow Copies) Windows agar korban tidak bisa memulihkan data",
        "Mempercepat kecepatan browsing internet korban",
        "Membersihkan cache browser yang menumpuk"
      ],
      benar: 0,
      ulasan: "Tepat. Pelaku ransomware sengaja menghapus shadow copies untuk mencegah korban me-restore sistem operasi secara mandiri."
    },
    {
      q: "YARA merupakan perangkat lunak yang dirancang untuk...",
      opsi: [
        "Mengidentifikasi dan mengklasifikasikan sampel malware berdasarkan pola teks / biner",
        "Mendesain tampilan antarmuka website",
        "Membuat presentasi slide akademik"
      ],
      benar: 0,
      ulasan: "Benar. YARA adalah standar de-facto bagi para peneliti keamanan untuk mendeskripsikan ciri-ciri unik malware dalam bentuk aturan (*rule*)."
    }
  ],
  "MOD-06": [
    {
      q: "Bagaimana cara paling efektif untuk mencegah serangan SQL Injection pada aplikasi web?",
      opsi: [
        "Menggunakan Parameterized Queries / Prepared Statements",
        "Menyambungkan input pengguna secara langsung dengan string SQL query",
        "Menghilangkan autentikasi login database"
      ],
      benar: 0,
      ulasan: "Tepat. Prepared Statements memisahkan instruksi query dari data input, sehingga karakter berbahaya tidak akan dieksekusi sebagai perintah SQL."
    }
  ],
  "MOD-07": [
    {
      q: "Apa definisi dari algoritma dalam konteks komputasi?",
      opsi: [
        "Urutan langkah logis dan sistematis untuk menyelesaikan masalah",
        "Komponen kartu grafis perangkat komputer",
        "Sistem pendingin cairan untuk processor"
      ],
      benar: 0,
      ulasan: "Tepat. Algoritma adalah urutan langkah terstruktur yang menghasilkan solusi yang benar dan dapat diulang."
    }
  ],
  "MOD-08": [
    {
      q: "Mengapa pencarian data berdasarkan indeks pada Array memiliki kompleksitas O(1)?",
      opsi: [
        "Karena alamat memori setiap elemen dapat langsung dihitung dari alamat dasar dan ukuran tipe data",
        "Karena komputer harus memeriksa seluruh elemen satu per satu dari awal",
        "Karena array tidak tersimpan di memori RAM"
      ],
      benar: 0,
      ulasan: "Tepat. Array disimpan secara kontigu (berurutan) di memori sehingga indeks ke-i langsung dialamatkan dengan aritmetika penunjuk memori."
    }
  ],
  "MOD-09": [
    {
      q: "Kapan blok kode di dalam 'if' akan dieksekusi oleh interpreter/kompiler?",
      opsi: [
        "Hanya saat kondisi evaluasi ekspresi bernilai True",
        "Saat program mengalami kehabisan memori RAM",
        "Setiap kali komputer di-restart"
      ],
      benar: 0,
      ulasan: "Tepat. Pernyataan percabangan mengevaluasi kondisi logika boolean sebelum menentukan percabangan alur."
    }
  ],
  "MOD-10": [
    {
      q: "Apa keuntungan utama memecah kode aplikasi monolitik ke dalam modul-modul independen?",
      opsi: [
        "Meningkatkan maintainability, kemudahan kolaborasi tim, dan mempermudah unit testing",
        "Mengharuskan penulisan kode berulang di semua tempat",
        "Memperlambat proses pembacaan logika oleh developer"
      ],
      benar: 0,
      ulasan: "Tepat. Pemisahan tanggung jawab (Separation of Concerns) membuat basis kode lebih bersih, mudah diuji, dan skalabel."
    }
  ]
};
