import React from "react";
import { useAngka } from "../hooks/useAngka";

export const Stat = ({ nilai, label, nol }) => {
  const n = useAngka(nilai);
  return (
    <div className="kartu stat">
      <b>{nol ? String(n).padStart(2, "0") : n.toLocaleString("id-ID")}</b>
      <span>{label}</span>
    </div>
  );
};
