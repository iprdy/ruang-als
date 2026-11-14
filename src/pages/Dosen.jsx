import React, { useState, useMemo } from "react";
import { Judul } from "../components/Judul";
import { Stat } from "../components/Stat";
import { LOG } from "../data/learningData";

export function Dosen({ ke, mhs = [] }) {
  const [sudah, setSudah] = useState(false);
  const [kPilihan, setKPilihan] = useState(3);

  // Perhitungan klaster dinamis dari dataset mahasiswa
  const klasterHasil = useMemo(() => {
    const total = mhs.length || 1;
    const c0 = mhs.filter((m) => m.cluster === 0);
    const c1 = mhs.filter((m) => m.cluster === 1);
    const c2 = mhs.filter((m) => m.cluster === 2);

    return [
      {
        nama: `Cluster 0 · ${c0.length} mahasiswa (${Math.round((c0.length / total) * 100)}%)`,
        deskripsi: "Dominan Visual (H5P > 92%). Lebih cepat memahami alur melalui diagram.",
        kat: "visual",
        rataRatio: (c0.reduce((s, m) => s + m.ratio, 0) / (c0.length || 1)).toFixed(3)
      },
      {
        nama: `Cluster 1 · ${c1.length} mahasiswa (${Math.round((c1.length / total) * 100)}%)`,
        deskripsi: "Aktivitas Praktik Tinggi. Dominan mengerjakan tugas mandiri dan kuis formatif.",
        kat: "latihan",
        rataRatio: (c1.reduce((s, m) => s + m.ratio, 0) / (c1.length || 1)).toFixed(3)
      },
      {
        nama: `Cluster 2 · ${c2.length} mahasiswa (${Math.round((c2.length / total) * 100)}%)`,
        deskripsi: "Penelaah Reflektif. Memiliki akses materi teks teori dan forum diskusi di atas rata-rata.",
        kat: "bacaan",
        rataRatio: (c2.reduce((s, m) => s + m.ratio, 0) / (c2.length || 1)).toFixed(3)
      }
    ];
  }, [mhs]);

  return (
    <>
      <Judul t="Dashboard dosen" x="Pemodelan analitik aktivitas belajar dan eksplorasi pengelompokan mahasiswa." />
      <div className="banner">
        SIMULASI KLASTERING · {mhs.length} mahasiswa terdeteksi dari log. Algoritma K-Means mempartisi pola akses H5P dan materi teks.
      </div>

      {sudah ? (
        <div className="kartu besar">
          <div className="baris-judul">
            <h3>Hasil simulasi klastering K-Means (K = {kPilihan})</h3>
            <div className="chips">
              {[2, 3, 4].map((k) => (
                <button
                  key={k}
                  className={kPilihan === k ? "on" : ""}
                  onClick={() => setKPilihan(k)}
                >
                  K = {k}
                </button>
              ))}
            </div>
          </div>
          <p className="abu">
            Mahasiswa berhasil dikelompokkan berdasarkan kemiripan pola akses materi visual H5P, teks, dan frekuensi submission tugas.
          </p>

          <div className="grid3">
            {klasterHasil.slice(0, kPilihan).map((k, u) => (
              <div
                className="kartu materi"
                style={{ animationDelay: u * 120 + "ms" }}
                key={k.nama}
              >
                <h4>{k.nama}</h4>
                <p className="abu">{k.deskripsi}</p>
                <p className="cap ungu">Rata-rata rasio visual: {k.rataRatio}</p>
                <div className="tombol-baris" style={{ marginTop: "8px" }}>
                  <button
                    className="tombol alt"
                    onClick={() => ke("materi:" + k.kat)}
                  >
                    Lihat materi terkait
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="tombol-baris">
            <button className="tombol alt" onClick={() => setSudah(false)}>
              Ulangi simulasi
            </button>
            <button className="tombol alt" onClick={() => ke("data")}>
              Buka data mahasiswa
            </button>
            <button className="tombol alt" onClick={() => ke("beranda")}>
              Kembali sebagai mahasiswa
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="kartu besar">
            <h3>Analisis pola aktivitas belajar (K-Means)</h3>
            <p className="abu">
              Alur pipeline riset: kumpulkan log Moodle → bersihkan data (120k baris) → standardisasi fitur → eksplorasi K → interpretasi klaster → pemetaan FSLSM.
            </p>
            <div className="tombol-baris">
              <button className="tombol" onClick={() => setSudah(true)}>
                Jalankan simulasi klastering
              </button>
              <button className="tombol alt" onClick={() => ke("beranda")}>
                Kembali sebagai mahasiswa
              </button>
            </div>
          </div>

          <div className="kartu besar">
            <h3>Fitur log yang dianalisis</h3>
            <p className="abu">
              visual_count (H5P) · verbal_count (Teks) · visual_ratio · active_actions (Tugas/Kuis) · reflective_actions · active_days
            </p>
          </div>
        </>
      )}

      <div className="stats">
        <Stat nilai={LOG.mahasiswa} label="Mahasiswa unik (log nyata)" />
        <Stat nilai={LOG.baris} label="Baris log bersih" />
        <Stat nilai={LOG.rata} label="Rata-rata aktivitas per mahasiswa" />
      </div>
    </>
  );
}
