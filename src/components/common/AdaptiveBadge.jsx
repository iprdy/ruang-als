import React from "react";
import { Icon } from "../../assets/icons";

export function AdaptiveBadge({ type = "rekomendasi", label }) {
  const iconName = type === "utama" ? "alert-triangle" : type === "pengayaan" ? "award" : "check-circle";
  const displayLabel = label || (type === "utama" ? "PRIORITAS UTAMA" : type === "pengayaan" ? "PENGAYAAN" : "REKOMENDASI");

  return (
    <span className={`badge-prioritas ${type}`}>
      <Icon name={iconName} size={11} />
      <span>{displayLabel}</span>
    </span>
  );
}
