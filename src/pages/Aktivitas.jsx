import React from "react";
import { Judul } from "../components/Judul";

export const Aktivitas = ({ tambahan = [], ke }) => {
  const defaultList = [
    ["Mengenal Algoritma & Logika", "Selesai · 12 menit", "lesson:0"],
    ["Kuis dasar pemrograman", "Nilai 100 · 2 pertanyaan", "lesson:0"],
    ["Struktur Data", "Dilanjutkan · 35%", "lesson:1"]
  ];

  const daftar = [...tambahan, ...defaultList];

  return (
    <>
      <Judul
        t="Aktivitas belajar"
        x="Riwayat perjalanan belajar adaptif dan latihan yang telah diselesaikan."
      />
      <div className="kartu besar">
        {daftar.map((a, u) => (
          <div
            className="baris"
            key={a[0] + u}
            style={{ animationDelay: u * 70 + "ms" }}
          >
            <div>
              <h4>{a[0]}</h4>
              <p className="cap">{a[1]}</p>
            </div>
            <button className="tombol alt" onClick={() => ke(a[2])}>
              Buka materi
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
