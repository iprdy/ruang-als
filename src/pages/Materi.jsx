import React, { useState } from "react";
import { Judul } from "../components/Judul";
import { KartuMateri } from "../components/KartuMateri";
import { MATERI } from "../data/learningData";

export function Materi({ selesai, buka, filterAwal, materiList = MATERI }) {
  const [filter, setFilter] = useState(filterAwal || "semua");
  const [cari, setCari] = useState("");

  const hasil = materiList.map((_, i) => i).filter(
    (i) =>
      (filter === "semua" || materiList[i].kat === filter) &&
      (materiList[i].t + " " + materiList[i].d).toLowerCase().includes(cari.toLowerCase())
  );

  return (
    <>
      <Judul
        t="Materi belajar"
        x="Pilih materi dan format belajar. Seluruh materi tetap bisa diakses bebas, apa pun preferensimu."
      />
      <input
        className="cari"
        placeholder="⌕ Cari materi, sintaks, atau konsep..."
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        aria-label="Cari materi"
      />
      <div className="chips">
        {["semua", "visual", "latihan", "bacaan"].map((f) => (
          <button
            key={f}
            className={filter === f ? "on" : ""}
            onClick={() => setFilter(f)}
          >
            {f === "semua" ? "Semua Format" : f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid2" key={filter + cari}>
        {hasil.length ? (
          hasil.map((i, u) => (
            <KartuMateri
              key={i}
              i={i}
              urut={u}
              selesai={selesai}
              buka={buka}
              materiList={materiList}
            />
          ))
        ) : (
          <p className="cap">Tidak ada materi yang cocok dengan pencarian "{cari}".</p>
        )}
      </div>
    </>
  );
}
