// Kurikulum Pembelajaran Terintegrasi
// Trek 1: Keamanan Sistem Informasi (SIFS124407) - Fokus Riset KP
// Trek 2: Fondasi Pemrograman & Algoritma

export const MODUL_DATA = [
  // ==========================================
  // TREK 1: KEAMANAN SISTEM INFORMASI (SIF5124407)
  // ==========================================
  {
    id: "MOD-01",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Prinsip Dasar Keamanan Informasi & CIA Triad",
    f: "Diagram interaktif & Studi Regulasi",
    menit: 15,
    kat: "visual",
    d: "Memahami tiga pilar utama keamanan siber: Confidentiality (Kerahasiaan), Integrity (Integritas), dan Availability (Ketersediaan) dalam arsitektur sistem informasi modern.",
    v: "Confidentiality (Akses Terbatas) ↔ Integrity (Validitas Data) ↔ Availability (Kesiapan Layanan)",
    multiModal: {
      visual: {
        judul: "Diagram Interaktif CIA Triad & Threat Vector",
        konten: "[ Visual Infografis H5P ]: Representasi interaktif hubungan segitiga CIA dengan vektor ancaman (Eavesdropping, Man-in-the-Middle, DDoS)."
      },
      verbal: {
        judul: "Panduan Konseptual Standar ISO/IEC 27001",
        konten: "Kerahasiaan menjamin data hanya dapat diakses oleh pihak yang berwenang. Integritas memastikan data tidak dimanipulasi tanpa izin melalui hashing & checksum. Ketersediaan menjamin redundansi server agar layanan tetap online."
      },
      praktis: {
        judul: "Lab Analisis Vektor Kerentanan Organisasi",
        konten: "Studi Kasus: Evaluasi kebocoran database kredensial rumah sakit. Identifikasi pilar CIA mana yang dilanggar dan tentukan kontrol kompensasi yang relevan."
      }
    },
    contoh: [
      "Confidentiality: Penerapan AES-256 pada database kredensial pengguna.",
      "Integrity: Validasi SHA-256 checksum pada file firmware sebelum instalasi.",
      "Availability: Penerapan multi-region load balancer & anti-DDoS scrubber."
    ]
  },
  {
    id: "MOD-02",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Anatomi Serangan DDoS & Mitigasi Traffic Flooding",
    f: "Simulasi alur & Packet Inspection",
    menit: 20,
    kat: "latihan",
    d: "Menganalisis serangan Distributed Denial of Service (SYN Flood, UDP Amplification, HTTP Flood) dan strategi pertahanan berbasis scrubbing center & rate limiting.",
    v: "Botnet Cluster → Target Gateway → Resource Exhaustion → Server Down",
    multiModal: {
      visual: {
        judul: "Visualisasi Alur TCP Three-Way Handshake vs SYN Flood",
        konten: "[ Simulasi H5P ]: Botnet mengirimkan ribuan paket SYN tanpa pernah mengirim ACK balasan, membanjiri antrean backlog server."
      },
      verbal: {
        judul: "Dokumentasi Arsitektur Anycast DNS & Scrubbing Center",
        konten: "Serangan Layer 4 (SYN/UDP flood) menghabiskan bandwidth jaringan, sedangkan serangan Layer 7 (HTTP GET flood) menghabiskan thread web server. Mitigasi mencakup SYN cookies, CAPTCHA challenge, dan Anycast IP routing."
      },
      praktis: {
        judul: "Lab Praktis: Analisis File PCAP Wireshark & Rate Limiting",
        konten: "Gunakan filter Wireshark 'tcp.flags.syn == 1 and tcp.flags.ack == 0' untuk mendeteksi anomali volume paket per detik dari alamat IP tersangka."
      }
    },
    contoh: [
      "# Deteksi koneksi mencurigakan di Linux Gateway",
      "netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -n",
      "# Aturan iptables untuk membatasi laju koneksi SYN baru",
      "iptables -A INPUT -p tcp --syn -m limit --limit 10/s --limit-burst 20 -j ACCEPT"
    ]
  },
  {
    id: "MOD-03",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Rekayasa Sosial (Phishing) & Proteksi Autentikasi",
    f: "Analisis Header Email & Uji Autentikasi",
    menit: 18,
    kat: "bacaan",
    d: "Mengenali teknik spear-phishing, credential harvesting, serta implementasi standar autentikasi email modern (SPF, DKIM, DMARC) dan Multi-Factor Authentication (MFA).",
    v: "Spoofed Email → Rekayasa Psikologis → Fake Login Portal → Credential Exfiltration",
    multiModal: {
      visual: {
        judul: "Peta Alur Deteksi Email Header & Domain Spoofing",
        konten: "[ Diagram Interaktif ]: Anatomi header email 'Return-Path', 'Authentication-Results', dan analisis link punycode IDN homograph attack."
      },
      verbal: {
        judul: "Protokol Validasi Keaslian: SPF, DKIM, dan Kebijakan DMARC",
        konten: "SPF membatasi IP pengirim yang sah atas nama domain. DKIM menandatangani isi pesan secara kriptografis dengan private key. DMARC menentukan tindakan (none/quarantine/reject) jika pemeriksaan gagal."
      },
      praktis: {
        judul: "Lab Uji Header Email & Konfigurasi FIDO2/WebAuthn",
        konten: "Periksa file email raw .eml. Telusuri IP pengirim hop-by-hop dan bandingkan domain asli dengan domain penyamaran (typosquatting)."
      }
    },
    contoh: [
      "Header Email Indikasi Phishing:",
      "From: 'Bank BCA Resmi' <admin@bca-verifikasi-keamanan.com>",
      "Received: from unknown-host.ru ([185.220.101.5])",
      "DMARC-Filter: fail (p=reject) header.from=bca.co.id"
    ]
  },
  {
    id: "MOD-04",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Kriptografi Kunci Publik & Digital Signature",
    f: "Visualisasi Asimetris & Praktik OpenSSL",
    menit: 22,
    kat: "visual",
    d: "Mendalami algoritma kriptografi asimetris (RSA, ECC), enkripsi hibrida TLS/SSL, serta penerbitan sertifikat digital berbasis Public Key Infrastructure (PKI).",
    v: "Pesan Asli → Enkripsi dengan Public Key Penerima → Ciphertext → Dekripsi dengan Private Key",
    multiModal: {
      visual: {
        judul: "Animasi Interaktif Protokol Pertukaran Kunci Diffie-Hellman",
        konten: "[ Model Visual H5P ]: Visualisasi analogi percampuran warna cat untuk memahami bagaimana dua entitas menyepakati shared secret melalui kanal publik tanpa membocorkan kunci rahasia."
      },
      verbal: {
        judul: "Matematika RSA & Sertifikat X.509",
        konten: "Keamanan RSA didasarkan pada kesulitan komputasi pemfaktoran bilangan prima besar. Sertifikat digital X.509 mengikat identitas pemilik dengan public key melalui tanda tangan tepercaya dari Certificate Authority (CA)."
      },
      praktis: {
        judul: "Lab Praktik: Pembuatan Pasangan Kunci & Verifikasi Tanda Tangan Digital",
        konten: "Gunakan perintah OpenSSL untuk membuat pasangan kunci RSA 2048-bit, membuat digest hash SHA-256 dari dokumen, menandatanganinya, dan memverifikasi keabsahannya."
      }
    },
    contoh: [
      "# Generate private key RSA 2048-bit",
      "openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048",
      "# Ekstrak public key",
      "openssl rsa -pubout -in private.pem -out public.pem",
      "# Verifikasi tanda tangan digital dokumen",
      "openssl dgst -sha256 -verify public.pem -signature dokumen.sig dokumen.pdf"
    ]
  },
  {
    id: "MOD-05",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Analisis Malware & Deteksi Ransomware",
    f: "Sandbox Analysis & YARA Rule",
    menit: 25,
    kat: "latihan",
    d: "Teknik analisis malware statis dan dinamis, mendeteksi perilaku anomali (injeksi proses, persistensi registri), serta pembuatan signature YARA untuk threat hunting.",
    v: "Infiltrasi Dropper → Evasion (Anti-VM) → Enkripsi Massal → Tebusan Ransom Note",
    multiModal: {
      visual: {
        judul: "Bagan Alur Eksekusi Ransomware & Kill Chain",
        konten: "[ Diagram H5P ]: Siklus hidup serangan ransomware dari tahap akses awal, eskalasi privilese, penghapusan shadow copy (vssadmin), hingga enkripsi asimetris file penting."
      },
      verbal: {
        judul: "Metodologi Analisis Statis PE Header & String Extraction",
        konten: "Analisis statis memeriksa binary file executable (PE header, import table, section entropy) tanpa mengeksekusi file tersebut, guna menemukan indikasi packer atau API berbahaya seperti VirtualAllocEx."
      },
      praktis: {
        judul: "Lab Hands-on: Menulis Aturan Deteksi YARA",
        konten: "Tulis aturan YARA untuk mendeteksi signature teks dan hex unik dari varian malware uji coba di lingkungan terisolasi."
      }
    },
    contoh: [
      "rule Deteksi_Ransomware_Simpel {",
      "    strings:",
      "        $s1 = 'vssadmin.exe Delete Shadows /All /Quiet'",
      "        $s2 = 'Your files have been encrypted!'",
      "    condition:",
      "        uint16(0) == 0x5A4D and all of ($s*)",
      "}"
    ]
  },
  {
    id: "MOD-06",
    track: "security",
    trackTitle: "Keamanan Sistem Informasi",
    t: "Audit Keamanan & Penetration Testing",
    f: "Metodologi OWASP & Vulnerability Assessment",
    menit: 20,
    kat: "latihan",
    d: "Memahami tahapan ethical hacking terstandar (Reconnaissance, Scanning, Exploitation, Post-Exploitation, Reporting) dan pengujian kerentanan web OWASP Top 10.",
    v: "Reconnaissance → Vulnerability Scanning → Exploitation → Patch & Remediate",
    multiModal: {
      visual: {
        judul: "Mindmap Metodologi Pengujian Penetrasi PTES & OWASP",
        konten: "[ Peta Konsep ]: Gambaran alur kerja tim Red Team vs Blue Team dalam siklus pengujian keamanan infrastruktur digital."
      },
      verbal: {
        judul: "Katalog Kerentanan Kritis: SQL Injection, XSS, dan Broken Access Control",
        konten: "SQL Injection memungkinkan penyerang menyisipkan perintah SQL ilegal ke database. Broken Object Level Authorization (BOLA) terjadi saat backend tidak memvalidasi kepemilikan data sebelum mengembalikan respons."
      },
      praktis: {
        judul: "Lab Analisis Kerentanan SQLi & Remediasi Prepared Statement",
        konten: "Bandingkan query SQL rentan konkatenasi string dengan query terproteksi Parameterized PreparedStatement."
      }
    },
    contoh: [
      "# Query Rentan (SQL Injection):",
      "String query = 'SELECT * FROM users WHERE user = \\'' + input + '\\';';",
      "# Query Terproteksi (Parameterized PreparedStatement):",
      "PreparedStatement ps = conn.prepareStatement('SELECT * FROM users WHERE user = ?');",
      "ps.setString(1, input);"
    ]
  },

  // ==========================================
  // TREK 2: FONDASI PEMROGRAMAN & ALGORITMA
  // ==========================================
  {
    id: "MOD-07",
    track: "programming",
    trackTitle: "Fondasi Pemrograman",
    t: "Algoritma & Logika Berpikir Komputasional",
    f: "Diagram visual & Pemecahan Masalah",
    menit: 12,
    kat: "visual",
    d: "Algoritma adalah urutan langkah logis dan sistematis untuk menyelesaikan suatu masalah komputasi secara efisien.",
    v: "Input Masalah → Dekomposisi → Alur Logika → Solusi Output",
    multiModal: {
      visual: {
        judul: "Diagram Flowchart Algoritma Logika",
        konten: "[ Bagan Visual H5P ]: Representasi simbol flowchart standar (Terminator, Process, Decision, Data) dalam menyelesaikan kalkulasi sistematis."
      },
      verbal: {
        judul: "Konsep Dasar Berpikir Komputasional",
        konten: "Empat pilar berpikir komputasional: Dekomposisi (memecah masalah besar), Pengenalan Pola, Abstraksi (fokus pada esensi), dan Perancangan Algoritma."
      },
      praktis: {
        judul: "Latihan Alur Pseudocode",
        konten: "Susun pseudocode untuk mencari nilai maksimum dari sekumpulan bilangan tak terurut."
      }
    },
    contoh: [
      "Algoritma Menghitung Nilai Akhir Mahasiswa:",
      "1. Input nilai Tugas, UTS, dan UAS.",
      "2. Nilai_Akhir = (Tugas * 0.3) + (UTS * 0.3) + (UAS * 0.4).",
      "3. Jika Nilai_Akhir >= 65 maka Status = 'Lulus', selain itu 'Remedial'."
    ]
  },
  {
    id: "MOD-08",
    track: "programming",
    trackTitle: "Fondasi Pemrograman",
    t: "Struktur Data Linier: Array & List",
    f: "Latihan interaktif manipulasi memori",
    menit: 15,
    kat: "latihan",
    d: "Array menyimpan sekumpulan elemen bertipe sejenis secara berurutan dalam memori dengan indeks terstruktur untuk akses acak yang cepat (O(1)).",
    v: "[ Index 0: Blok 1 ] [ Index 1: Blok 2 ] [ Index 2: Blok 3 ]",
    multiModal: {
      visual: {
        judul: "Visualisasi Alokasi Array Kontigu di Memori",
        konten: "[ Visual Interaktif ]: Bagaimana alamat dasar memori (base address) ditambah perkalian ukuran tipe data menentukan lokasi elemen array."
      },
      verbal: {
        judul: "Karakteristik Akses dan Kompleksitas Waktu Array",
        konten: "Pencarian berdasarkan indeks memiliki kompleksitas O(1), sedangkan penyisipan atau penghapusan elemen di tengah memerlukan pergeseran memori dengan kompleksitas O(N)."
      },
      praktis: {
        judul: "Latihan Manipulasi Array Dinamis",
        konten: "Praktikkan operasi penyaringan (filter), pemetaan (map), dan agregasi (reduce) pada array objek mahasiswa."
      }
    },
    contoh: [
      "const mahasiswa = ['Budi', 'Siti', 'Dewi'];",
      "console.log(mahasiswa[0]); // Akses elemen pertama: 'Budi'",
      "mahasiswa.push('Rian'); // Menambah data di ujung array (O(1))"
    ]
  },
  {
    id: "MOD-09",
    track: "programming",
    trackTitle: "Fondasi Pemrograman",
    t: "Logika Kontrol & Percabangan Kondisional",
    f: "Bacaan ringkas & Uji Kasus Logika",
    menit: 10,
    kat: "bacaan",
    d: "Percabangan mengevaluasi kondisi boolean (True/False) untuk menentukan jalur eksekusi kode berikutnya secara dinamis.",
    v: "Evaluasi Ekspresi Logika? → [True: Blok A] | [False: Blok B]",
    multiModal: {
      visual: {
        judul: "Diagram Pohon Keputusan (Decision Tree)",
        konten: "[ Diagram Interaktif ]: Alur percabangan bertingkat (if - else if - else) dan struktur switch-case dalam menentukan respons sistem."
      },
      verbal: {
        judul: "Tabel Kebenaran Operator Logika (AND, OR, NOT)",
        konten: "Operator AND (&&) menghasilkan True hanya jika kedua operan True. Operator OR (||) bernilai True jika salah satu operan True. Operan NOT (!) membalikkan nilai boolean."
      },
      praktis: {
        judul: "Uji Kasus: Sistem Validasi Akses Peran Pengguna",
        konten: "Buat blok logika percabangan untuk memeriksa apakah pengguna berstatus 'Dosen' DAN memiliki hak akses 'Admin' sebelum mengizinkan aksi penghapusan modul."
      }
    },
    contoh: [
      "if (role === 'dosen' && isVerified) {",
      "  izinkanAksesPenuh();",
      "} else if (role === 'mahasiswa') {",
      "  bukaKatalogMateri();",
      "} else {",
      "  arahkanKeLogin();",
      "}"
    ]
  },
  {
    id: "MOD-10",
    track: "programming",
    trackTitle: "Fondasi Pemrograman",
    t: "Peta Konsep Pemrograman Modern & Arsitektur Modul",
    f: "Peta konsep komprehensif",
    menit: 12,
    kat: "visual",
    d: "Arsitektur perangkat lunak modern menghubungkan struktur data, instruksi algoritma, antarmuka modular, dan komunikasi data berbasis API.",
    v: "Komponen Frontend → REST API Client → Layanan Backend → Penyimpanan Database",
    multiModal: {
      visual: {
        judul: "Peta Konsep Client-Server & Modularitas Komponen",
        konten: "[ Peta Konsep Arsitektur ]: Bagaimana pemisahan kode ke dalam modul (Separation of Concerns) memudahkan pemeliharaan sistem skala besar."
      },
      verbal: {
        judul: "Prinsip Clean Code & Modul Independen",
        konten: "Menulis kode yang mudah dibaca oleh sesama manusia. Hindari fungsi monolitik yang menangani terlalu banyak tanggung jawab (Single Responsibility Principle)."
      },
      praktis: {
        judul: "Refaktorisasi Kode: Memecah Fungsi Monolitik",
        konten: "Identifikasi fungsi berukuran 500 baris kode dan pisahkan menjadi modul penanganan state, modul tampilan, dan modul pembaca data."
      }
    },
    contoh: [
      "// Arsitektur Modular Bersih:",
      "import { parseStudentData } from './hooks/useStudentData';",
      "import { AdaptiveEngine } from './components/als/AdaptiveEngine';",
      "import { TopNavbar } from './components/layout/TopNavbar';"
    ]
  }
];
