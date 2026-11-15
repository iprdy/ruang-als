// Data Penugasan & Submission Mahasiswa
// Komponen Moodle LMS: "Assignment" & "Online text submissions"

export const INITIAL_ASSIGNMENTS = [
  {
    id: "TGS-01",
    modulId: "MOD-02",
    judul: "Tugas 01: Analisis Paket PCAP Wireshark & Mitigasi SYN Flood",
    deskripsi: "Unduh rekaman paket traffic jaringan (file PCAP), buka menggunakan Wireshark, dan identifikasi alamat IP botnet yang mengirimkan lonjakan paket TCP SYN tanpa menyelesaikan jabat tangan ACK. Susun aturan mitigasi iptables berbasis rate-limiting.",
    deadline: "2026-11-20 23:59",
    bobot: 100,
    status: "Menunggu Penilaian", // 'Belum Dikumpulkan' | 'Menunggu Penilaian' | 'Dinilai'
    submissionType: "online_text", // 'online_text' | 'file'
    submissionData: {
      submittedAt: "2026-11-14 14:32",
      teksJawaban: "Berdasarkan analisis file pcap, ditemukan lonjakan traffic SYN dari subnet IP 185.220.101.0/24 dengan laju 4.500 pps. Rule mitigasi yang diterapkan: iptables -A INPUT -p tcp --syn -m limit --limit 10/s --limit-burst 20 -j ACCEPT.",
      fileName: "analisis_syn_flood_nim.pdf"
    },
    nilai: 92,
    feedbackDosen: "Analisis log Wireshark sangat tajam dan pemilihan parameter rate-limiting tepat sasaran."
  },
  {
    id: "TGS-02",
    modulId: "MOD-03",
    judul: "Tugas 02: Audit Header Email Phishing & Implementasi DMARC",
    deskripsi: "Periksa sampel email raw (.eml) yang terindikasi spear-phishing. Lakukan analisis hop-by-hop pada header 'Received', verifikasi SPF record domain pengirim, dan rekomendasikan kebijakan DMARC (p=reject) yang sesuai standar RFC 7489.",
    deadline: "2026-11-27 23:59",
    bobot: 100,
    status: "Belum Dikumpulkan",
    submissionType: "online_text",
    submissionData: null,
    nilai: null,
    feedbackDosen: null
  },
  {
    id: "TGS-03",
    modulId: "MOD-05",
    judul: "Tugas 03: Penyusunan Aturan Deteksi Malware YARA",
    deskripsi: "Tulis aturan signature YARA untuk mendeteksi varian dropper ransomware yang memanfaatkan perintah penghapusan Volume Shadow Copy (vssadmin) dan eksfiltrasi berkas sensitif.",
    deadline: "2026-12-05 23:59",
    bobot: 100,
    status: "Belum Dikumpulkan",
    submissionType: "online_text",
    submissionData: null,
    nilai: null,
    feedbackDosen: null
  },
  {
    id: "TGS-04",
    modulId: "MOD-06",
    judul: "Tugas 04: Laporan Audit Kerentanan Web & Remediasi SQL Injection",
    deskripsi: "Lakukan pengujian kerentanan SQL Injection pada formulir autentikasi uji coba. Susun laporan teknis perbedaan kerentanan string concatenation dengan implementasi terproteksi Parameterized PreparedStatement.",
    deadline: "2026-12-15 23:59",
    bobot: 100,
    status: "Belum Dikumpulkan",
    submissionType: "online_text",
    submissionData: null,
    nilai: null,
    feedbackDosen: null
  }
];
