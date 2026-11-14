import React from "react";
import { Judul } from "../components/Judul";
import { MATERI } from "../data/learningData";

export const Salah = ({ i, ke, ulang, salahSoal, materiList = MATERI }) => {
  const m = (materiList && materiList[i]) || MATERI[i] || MATERI[0];

  return (
    <>
      <Judul t="Kuis pemrograman" x={`Modul: ${m.t}`} />
      <div className="kartu besar">
        <h3 style={{ color: "var(--salah)" }}>Belum tepat. Coba lagi.</h3>
        <p className="abu">
          {salahSoal?.ulasan ||
            `${m.t}: ${m.d} ${m.contoh[0] || ""}`}
        </p>
        <div className="tombol-baris">
          <button className="tombol" onClick={ulang}>
            Ulangi kuis dari awal
          </button>
          <button className="tombol alt" onClick={() => ke("lesson:" + i)}>
            Pelajari kembali materi
          </button>
        </div>
      </div>
    </>
  );
};
