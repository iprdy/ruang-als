import { useState, useEffect } from "react";

const SAMPLE_STUDENTS = [
  {
    nim: "2315091043",
    nama: "Putu Aldi Rama Pradika Yasa",
    h5p: 496,
    teks: 48,
    ratio: 0.9118,
    aktif: 33,
    reflektif: 558,
    hari: 27,
    cluster: 1,
    profil: "Pembelajar Konsisten & Teratur (Moderate-Regular)",
    navigasi: "Sequential Guidance (Jalur Bertahap Terstruktur)",
    lencana: "[REKOMENDASI LANGKAH BERIKUTNYA]",
    modulPrioritas: "MOD-01",
    saranLangkah: "MOD-03: Simulasi Interaktif Serangan Phishing & Malware",
    pesan: "Kemajuan Belajar Baik: Ritme belajar Anda teratur. Pertahankan pengerjaan latihan kuis secara berkala."
  },
  {
    nim: "2315091092",
    nama: "VERY IRAWAN SIMBOLON",
    h5p: 690,
    teks: 36,
    ratio: 0.9504,
    aktif: 40,
    reflektif: 816,
    hari: 38,
    cluster: 2,
    profil: "Pembelajar Intensif & Reflektif (High-Intensity Reflective)",
    navigasi: "Hierarchical Guidance (Eksplorasi Mendalam)",
    lencana: "[PENGAYAAN TINGKAT LANJUT]",
    modulPrioritas: "MOD-05",
    saranLangkah: "MOD-06: Audit Keamanan & Penetration Testing",
    pesan: "Keterlibatan Sangat Tinggi: Refleksi materi Anda mendalam. Tantang diri Anda dengan analisis studi kasus pengayaan."
  },
  {
    nim: "2415091008",
    nama: "Ketut Arya Wiguna",
    h5p: 280,
    teks: 31,
    ratio: 0.9003,
    aktif: 24,
    reflektif: 370,
    hari: 19,
    cluster: 0,
    profil: "Pembelajar Selektif / Minimalis (Low-Engagement)",
    navigasi: "Direct Guidance (Fokus Esensial)",
    lencana: "[PRIORITAS UTAMA]",
    modulPrioritas: "MOD-01",
    saranLangkah: "MOD-02: Anatomi Serangan DDoS & Mitigasi Traffic Flooding",
    pesan: "Perhatian Keterlibatan: Tingkat aktivitas Anda relatif selektif. Selesaikan modul prioritas singkat secara berkala."
  }
];

export function useStudentData() {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [isFromCSV, setIsFromCSV] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/student_clusters.csv").then((r) => (r.ok ? r.text() : Promise.reject())),
      fetch("/als_student_recommendations.csv")
        .then((r) => (r.ok ? r.text() : Promise.resolve("")))
        .catch(() => "")
    ])
      .then(([clusterText, recText]) => {
        // Map rekomendasi jika ada
        const recMap = {};
        if (recText) {
          const [recHeader, ...recRows] = recText.trim().split("\n").map((b) => b.split(","));
          const ri = (k) => recHeader.indexOf(k);
          recRows.forEach((r) => {
            const nim = r[ri("NIM")];
            if (nim) {
              recMap[nim] = {
                navigasi: r[ri("Navigasi_Adaptif")],
                lencana: r[ri("Lencana_Konten")],
                modulPrioritas: r[ri("Modul_Prioritas_Utama")],
                saranLangkah: r[ri("Saran_Langkah_Selanjutnya")],
                pesan: r[ri("Pesan_Intervensi")]
              };
            }
          });
        }

        const [header, ...rows] = clusterText.trim().split("\n").map((b) => b.split(","));
        const i = (k) => header.indexOf(k);

        const parsed = rows.map((b) => {
          const nim = b[i("NIM")];
          const rec = recMap[nim] || {};
          const clusterId = Number(b[i("Cluster")]) || 0;

          return {
            nim,
            nama: b[i("Nama")] || `Mahasiswa (${nim})`,
            h5p: Number(b[i("visual_count")]) || 0,
            teks: Number(b[i("verbal_count")]) || 0,
            ratio: Number(b[i("visual_ratio")]) || 0.9,
            aktif: Number(b[i("active_actions")]) || 0,
            reflektif: Number(b[i("reflective_actions")]) || 0,
            hari: Number(b[i("active_days")]) || 0,
            cluster: clusterId,
            profil: b[i("Profil_Gaya_Belajar")] || (clusterId === 0 ? "Pembelajar Selektif" : clusterId === 1 ? "Pembelajar Konsisten" : "Pembelajar Intensif"),
            navigasi: rec.navigasi || (clusterId === 0 ? "Direct Guidance" : clusterId === 1 ? "Sequential Guidance" : "Hierarchical Guidance"),
            lencana: rec.lencana || (clusterId === 0 ? "[PRIORITAS UTAMA]" : clusterId === 1 ? "[REKOMENDASI]" : "[PENGAYAAN]"),
            modulPrioritas: rec.modulPrioritas || "MOD-01",
            saranLangkah: rec.saranLangkah || "Pelajari modul selanjutnya",
            pesan: rec.pesan || "Terus tingkatkan pemahaman belajarmu!"
          };
        });

        if (parsed.length > 0) {
          setStudents(parsed);
          setIsFromCSV(true);
        }
      })
      .catch((err) => {
        console.warn("Menggunakan data mahasiswa percontohan:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { students, isFromCSV, loading };
}
