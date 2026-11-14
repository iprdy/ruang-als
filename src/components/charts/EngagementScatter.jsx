import React from "react";

export function EngagementScatter({ students = [] }) {
  const mx = Math.max(...students.map((m) => m.teks || 0), 10) * 1.1;
  const my = Math.max(...students.map((m) => m.h5p || 0), 10) * 1.1;

  const clusterColors = {
    0: "var(--peringatan)",
    1: "var(--ungu)",
    2: "var(--ok)"
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <svg viewBox="0 0 580 300" width="100%" height="100%" role="img" aria-label="Scatter Plot Visual vs Verbal">
        {/* Grid lines */}
        <line x1="50" y1="260" x2="560" y2="260" stroke="var(--garis)" strokeWidth="1.5" />
        <line x1="50" y1="20" x2="50" y2="260" stroke="var(--garis)" strokeWidth="1.5" />

        {/* Scatter dots */}
        {students.map((m, idx) => {
          const cx = 50 + (510 * (m.teks || 0)) / mx;
          const cy = 260 - (240 * (m.h5p || 0)) / my;
          const color = clusterColors[m.cluster] || "var(--ungu)";

          return (
            <circle
              key={m.nim || idx}
              cx={cx}
              cy={cy}
              r="5"
              fill={color}
              opacity="0.8"
              style={{
                transition: "transform 0.2s",
                cursor: "pointer"
              }}
            >
              <title>{`${m.nama} (${m.profil || `Cluster ${m.cluster}`}) | Visual: ${m.h5p}, Teks: ${m.teks}`}</title>
            </circle>
          );
        })}

        {/* Labels */}
        <text x="305" y="290" textAnchor="middle" fill="var(--abu)" fontSize="11" fontWeight="600">
          Aktivitas Materi Teks (Page / Verbal) →
        </text>
        <text
          x="-140"
          y="20"
          transform="rotate(-90)"
          textAnchor="middle"
          fill="var(--abu)"
          fontSize="11"
          fontWeight="600"
        >
          Aktivitas Konten Visual (H5P) →
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "8px", fontSize: "11px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--peringatan)", display: "inline-block" }} />
          Cluster 0 (Selektif)
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ungu)", display: "inline-block" }} />
          Cluster 1 (Konsisten)
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <i style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ok)", display: "inline-block" }} />
          Cluster 2 (Intensif)
        </span>
      </div>
    </div>
  );
}
