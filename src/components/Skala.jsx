import React from "react";
import { Bar } from "./Bar";

export const Skala = ({ kiri, kanan, persen, i = 0, isInteractive, onChange }) => (
  <div className="skala">
    <div className="lbl">
      <b>{kiri}</b>
      <span>{kanan} ({persen}%)</span>
    </div>
    {isInteractive ? (
      <input
        type="range"
        min="0"
        max="100"
        value={persen}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        style={{ width: "100%", height: "6px", margin: "6px 0", cursor: "pointer" }}
      />
    ) : (
      <Bar persen={persen} delay={i * 120} />
    )}
  </div>
);
