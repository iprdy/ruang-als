import React from "react";

export function TitleHeader({ title, subtitle, tag = "SISTEM PEMBELAJARAN ADAPTIF (FSLSM × K-MEANS)" }) {
  return (
    <div className="judul masuk">
      {tag && <span className="cap ungu" style={{ fontWeight: 700, letterSpacing: "0.5px" }}>{tag}</span>}
      <h1>{title}</h1>
      {subtitle && <p className="sub-judul">{subtitle}</p>}
    </div>
  );
}
