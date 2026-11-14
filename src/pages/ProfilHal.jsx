import React from "react";
import { Judul } from "../components/Judul";
import { Skala } from "../components/Skala";

export const ProfilHal = ({ ke, profil, onUbahProfil, user }) => {
  const namaUser = user?.nama || "Alex";
  const rasioVisual = user?.ratio ? Math.round(user.ratio * 100) : 91;

  return (
    <>
      <Judul
        t="Profil belajar"
        x={`Pemodelan preferensi belajar FSLSM ${namaUser} dibandingkan dengan kecenderungan kelas nyata.`}
      />
      <div className="dua">
        <div className="kartu besar">
          <h3>Profil belajar pribadi (FSLSM)</h3>
          <p className="cap">Geser slider untuk simulasi adaptasi preferensi belajar</p>
          {profil.map((p, i) => (
            <div key={p[0]}>
              <Skala
                kiri={p[0]}
                kanan={p[1]}
                persen={p[2]}
                i={i}
                isInteractive={true}
                onChange={(val) => onUbahProfil && onUbahProfil(i, val)}
              />
            </div>
          ))}
          <p className="cap">
            Preferensi FSLSM bukan label kemampuan intelektual tetap, melainkan cara ternyaman dalam menyerap informasi.
          </p>
        </div>

        <div className="tumpuk">
          <div className="ungu-muda">
            <h3>Profil {namaUser}</h3>
            <p className="abu">
              Berdasarkan aktivitas log dengan rasio visual <strong>{rasioVisual}%</strong>, Anda sangat responsif terhadap representasi grafis, bagan alir, dan latihan langsung.
            </p>
            <div style={{ marginTop: "8px" }}>
              <button className="tombol" onClick={() => ke("materi")}>
                Lihat materi rekomendasi
              </button>
            </div>
          </div>

          <div className="kartu besar">
            <h3>Profil kelas dari log nyata</h3>
            <Skala kiri="Visual" kanan="Verbal" persen={90} />
            <Skala kiri="Aktif" kanan="Reflektif" persen={7} i={1} />
            <p className="cap">
              Rata-rata rasio dari 120.290 baris log LMS Moodle (48.2% akses H5P, menunjukkan dominasi preferensi visual kelas).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
