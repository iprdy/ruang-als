import React from "react";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { Icon } from "../../assets/icons";

export function StatCard({ nilai, label, icon = "activity", zeroPad = false }) {
  const animatedValue = useAnimatedCounter(nilai);

  const formatted = zeroPad
    ? String(animatedValue).padStart(2, "0")
    : animatedValue.toLocaleString("id-ID");

  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon name={icon} size={20} />
      </div>
      <div className="stat-info">
        <span className="stat-nilai">{formatted}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}
