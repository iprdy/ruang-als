import React from "react";
import { Icon } from "../../assets/icons";

export function AdaptiveNudge({ cluster = 1, profile, onActionClick }) {
  const clusterClass = `cluster-${cluster}`;
  const iconName = cluster === 0 ? "alert-triangle" : cluster === 2 ? "award" : "shield";

  return (
    <div className={`nudge-banner ${clusterClass} masuk`}>
      <div className="nudge-icon">
        <Icon name={iconName} size={24} />
      </div>
      <div className="nudge-content" style={{ flex: 1 }}>
        <h4>💡 Rekomendasi Adaptif Berbasis Gaya Belajar FSLSM</h4>
        <p style={{ margin: "4px 0 8px 0" }}>{profile?.nudgePesan}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", fontSize: "11px" }}>
          <span>
            <b>Profil Anda:</b> {profile?.nama}
          </span>
          <span>•</span>
          <span>
            <b>Format Unggulan:</b> {profile?.formatPrioritas}
          </span>
        </div>
      </div>
      {onActionClick && (
        <button
          className="tombol"
          style={{ alignSelf: "center", padding: "8px 14px", fontSize: "11px", whiteSpace: "nowrap" }}
          onClick={onActionClick}
        >
          Pelajari Sekarang →
        </button>
      )}
    </div>
  );
}
