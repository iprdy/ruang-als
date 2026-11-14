import React from "react";

export const Judul = ({ t, x }) => (
  <div className="judul">
    <h1>{t}</h1>
    <p className="cap">RUANG · Pembelajaran adaptif / Data simulasi</p>
    {x && <p>{x}</p>}
  </div>
);
