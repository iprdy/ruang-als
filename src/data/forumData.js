// Data Forum Diskusi Mahasiswa & Dosen
// Komponen Moodle LMS: "Open Forum" (7.262 interaksi log)

export const INITIAL_FORUM_THREADS = [
  {
    id: "TH-01",
    modulId: "MOD-01",
    kategori: "Keamanan Sistem Informasi",
    judul: "Dilema CIA Triad: Menyeimbangkan Usability vs Security pada Kebijakan Perbankan",
    penulis: "Dr. I Gede Dosen Pengampu, M.Kom.",
    rolePenulis: "dosen",
    inisial: "DS",
    waktu: "3 hari yang lalu",
    isi: "Rekan-rekan mahasiswa, dalam implementasi Confidentiality sering kali autentikasi berlapis (MFA, password rotasi 30 hari) dikeluhkan nasabah karena menurunkan kenyamanan pengguna (usability). Menurut pengamatan kalian, bagaimana kontrol kompensasi yang ideal agar keamanan tetap terjaga tanpa mengorbankan pengalaman pengguna?",
    dilihat: 142,
    balasan: [
      {
        id: "BAL-01",
        penulis: "Putu Aldi Rama Pradika Yasa",
        role: "mahasiswa",
        nim: "2315091043",
        inisial: "PA",
        waktu: "2 hari yang lalu",
        isi: "Menurut saya pak, pendekatan Adaptive Authentication (Risk-based Authentication) adalah solusi terbaik. Sistem hanya meminta autentikasi tambahan (seperti biometrik/OTP) jika mendeteksi anomali seperti lokasi IP baru atau jam login yang tidak wajar."
      },
      {
        id: "BAL-02",
        penulis: "VERY IRAWAN SIMBOLON",
        role: "mahasiswa",
        nim: "2315091092",
        inisial: "VI",
        waktu: "1 hari yang lalu",
        isi: "Sepakat dengan Aldi. Selain itu standar FIDO2 / Passkeys berbasis hardware kriptografis saat ini jauh lebih cepat dan aman daripada OTP SMS yang rentan SIM Swap."
      }
    ]
  },
  {
    id: "TH-02",
    modulId: "MOD-02",
    kategori: "Tanya Jawab Lab",
    judul: "Menentukan Nilai Threshold Burst Rate pada IPTables SYN Flood",
    penulis: "Anak Agung Ade Jelantik Raditya",
    rolePenulis: "mahasiswa",
    inisial: "AA",
    waktu: "4 hari yang lalu",
    isi: "Halo teman-teman, saat mengerjakan lab modul DDoS, bagaimana cara menentukan batas parameter --limit dan --limit-burst pada iptables agar paket SYN legitimate dari pengguna aktif tidak ikut ter-drop?",
    dilihat: 98,
    balasan: [
      {
        id: "BAL-03",
        penulis: "Dr. I Gede Dosen Pengampu, M.Kom.",
        role: "dosen",
        inisial: "DS",
        waktu: "3 hari yang lalu",
        isi: "Pertanyaan yang sangat bagus, Ade. Penentuan batas harus mengacu pada baseline traffic normal server saat peak hour. Rata-rata server web kecil berkisar di 15-30 koneksi baru per detik, sehingga burst limit 50/s aman digunakan."
      }
    ]
  },
  {
    id: "TH-03",
    modulId: "MOD-04",
    kategori: "Diskusi Teori",
    judul: "Kompleksitas Komputasi Pertukaran Kunci Diffie-Hellman vs RSA",
    penulis: "Luh Indah Sri Puspa Dewi",
    rolePenulis: "mahasiswa",
    inisial: "LI",
    waktu: "5 hari yang lalu",
    isi: "Apakah protokol TLS modern masih menggunakan RSA untuk pertukaran kunci, ataukah sudah sepenuhnya beralih ke ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) untuk menjamin Forward Secrecy?",
    dilihat: 115,
    balasan: [
      {
        id: "BAL-04",
        penulis: "VERY IRAWAN SIMBOLON",
        role: "mahasiswa",
        nim: "2315091092",
        inisial: "VI",
        waktu: "4 hari yang lalu",
        isi: "Di TLS 1.3, pertukaran kunci RSA statis sudah resmi dihapus (deprecated) demi memastikan Perfect Forward Secrecy (PFS). Sekarang wajib menggunakan (EC)DHE!"
      }
    ]
  }
];
