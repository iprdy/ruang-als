import React from "react";

// Grafik batang vertikal: tiap batang "tumbuh" dari bawah
export const Batang = ({ nilai, label, tiap = 1 }) => {
  const maks = Math.max(...nilai, 1);
  return (
    <div className="batang-wadah">
      {nilai.map((v, i) => (
        <div
          className="kolom"
          key={i}
          title={`${label[i]}: ${v.toLocaleString("id-ID")}`}
        >
          <div
            className="batang"
            style={{
              height: (v / maks) * 100 + "%",
              animationDelay: i * 30 + "ms"
            }}
          />
          <span>{i % tiap === 0 ? label[i] : ""}</span>
        </div>
      ))}
    </div>
  );
};
