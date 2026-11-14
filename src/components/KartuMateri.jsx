import React from "react";
import { MATERI } from "../data/learningData";
import { Bar } from "./Bar";

export const KartuMateri = ({ i, selesai, buka, urut, matchPercent, materiList = MATERI }) => {
  const m = (materiList && materiList[i]) || MATERI[i];
  if (!m) return null;
  const p = selesai[i] ? 100 : i === 1 ? 35 : 40;
  const icon = i === 1 ? "[ ]" : i === 0 ? "{ }" : "λ";

  return (
    <button
      className="kartu materi"
      style={{ animationDelay: urut * 80 + "ms" }}
      onClick={() => buka(i)}
    >
      <div className="ilustrasi">{icon}</div>
      <h4>{m.t}</h4>
      <p className="cap">
        {m.f} · {m.menit} menit · Pemula
        {matchPercent ? ` · ${matchPercent}% Cocok` : ""}
      </p>
      <p className="abu">{m.d}</p>
      <Bar persen={p} delay={300} />
      <p className="cap ungu">
        {selesai[i] ? "✓ Selesai dipelajari" : `${p}% dipelajari`} · Lanjutkan →
      </p>
    </button>
  );
};
