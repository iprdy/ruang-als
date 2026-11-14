import React, { useState } from "react";
import { Judul } from "../components/Judul";
import { MATERI } from "../data/learningData";

export function Pelajaran({ i, mulaiKuis, tandai, ke, materiList = MATERI }) {
  const m = materiList[i] || materiList[0] || MATERI[0];
  const [langkahIdx, setLangkahIdx] = useState(0);

  const alurLangkah = m.alurLangkah || [];
  const currentStep = alurLangkah[langkahIdx] || null;

  const nextStep = () => {
    if (alurLangkah.length > 0) {
      setLangkahIdx((prev) => (prev + 1) % alurLangkah.length);
    }
  };

  return (
    <>
      <Judul t={m.t} x={`${m.f} · ${m.menit} menit · Pembelajaran adaptif`} />

      {/* Alur Visual Interaktif */}
      <div
        className="alur"
        onClick={nextStep}
        title="Klik untuk melihat rincian langkah alur eksekusi"
      >
        {m.v}
      </div>

      {currentStep && (
        <div className="banner">
          <b>Tahap {langkahIdx + 1}: {currentStep.step}</b> — {currentStep.desc} (Klik alur untuk langkah berikutnya)
        </div>
      )}

      <div className="kartu besar">
        <h3>Konsep utama</h3>
        <p>{m.d}</p>
      </div>

      <div className="kartu besar">
        <h3>Contoh sederhana & implementasi</h3>
        {(m.contoh || []).map((c, idx) => (
          <p key={idx} style={{ fontFamily: c.includes("=") || c.includes("barang") ? "monospace" : "inherit" }}>
            {c}
          </p>
        ))}
      </div>

      <div className="kartu besar">
        <h3>Cek pemahamanmu</h3>
        <p className="abu">
          Kuis formatif berikut menguji pemahaman konsep pada modul {m.t}.
        </p>
        <div className="tombol-baris">
          <button className="tombol" onClick={mulaiKuis}>
            Mulai kuis
          </button>
          <button className="tombol alt" onClick={tandai}>
            Tandai selesai
          </button>
          <button className="tombol alt" onClick={() => ke("lesson:" + ((i + 1) % materiList.length))}>
            Materi berikutnya
          </button>
          <button className="tombol alt" onClick={() => ke("materi")}>
            Kembali ke katalog
          </button>
        </div>
      </div>
    </>
  );
}
