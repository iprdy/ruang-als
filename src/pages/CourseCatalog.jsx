import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { ProgressBar } from "../components/common/ProgressBar";
import { AdaptiveBadge } from "../components/common/AdaptiveBadge";
import { Icon } from "../assets/icons";

export function CourseCatalog({
  modules = [],
  completedModules = {},
  onOpenLesson
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all"); // 'all' | 'security' | 'programming'
  const [modalityFilter, setModalityFilter] = useState("all"); // 'all' | 'visual' | 'latihan' | 'bacaan'

  const filteredModules = modules.filter((modul) => {
    const matchesSearch =
      (modul.t + " " + modul.d + " " + modul.trackTitle)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesTrack = trackFilter === "all" || modul.track === trackFilter;
    const matchesModality = modalityFilter === "all" || modul.kat === modalityFilter;

    return matchesSearch && matchesTrack && matchesModality;
  });

  return (
    <>
      <TitleHeader
        title="Katalog Modul Pembelajaran"
        subtitle="Jalur materi Keamanan Sistem Informasi & Fondasi Pemrograman. Disusun adaptif sesuai profil gaya belajar Anda."
      />

      {/* Search & Filter Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              className="cari"
              placeholder="⌕ Cari topik, kata kunci atau modul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "14px" }}
            />
          </div>

          {/* Track Filter */}
          <div className="chips">
            <button
              className={`chip-btn ${trackFilter === "all" ? "on" : ""}`}
              onClick={() => setTrackFilter("all")}
            >
              Semua Trek
            </button>
            <button
              className={`chip-btn ${trackFilter === "security" ? "on" : ""}`}
              onClick={() => setTrackFilter("security")}
            >
              🛡️ Keamanan Siber (6)
            </button>
            <button
              className={`chip-btn ${trackFilter === "programming" ? "on" : ""}`}
              onClick={() => setTrackFilter("programming")}
            >
              💻 Pemrograman Dasar (4)
            </button>
          </div>
        </div>

        {/* Modality Chips */}
        <div className="chips">
          <span className="cap" style={{ fontWeight: 600 }}>Format Media:</span>
          {["all", "visual", "latihan", "bacaan"].map((f) => (
            <button
              key={f}
              className={`chip-btn ${modalityFilter === f ? "on" : ""}`}
              onClick={() => setModalityFilter(f)}
              style={{ fontSize: "11px", padding: "5px 12px" }}
            >
              {f === "all"
                ? "Semua Format"
                : f === "visual"
                ? "Visual (H5P)"
                : f === "latihan"
                ? "Lab Terapan"
                : "Modul Bacaan"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid2" key={trackFilter + modalityFilter + searchQuery}>
        {filteredModules.length > 0 ? (
          filteredModules.map((modul, idx) => {
            const isCompleted = !!completedModules[modul.id];
            return (
              <div
                key={modul.id}
                className="kartu interaktif masuk"
                style={{ cursor: "pointer", animationDelay: `${idx * 50}ms` }}
                onClick={() => onOpenLesson(modul.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <AdaptiveBadge type={modul.badge} label={modul.badgeLabel} />
                  <span
                    className="cap"
                    style={{
                      background: modul.track === "security" ? "var(--lav)" : "var(--ok-bg)",
                      color: modul.track === "security" ? "var(--ungu)" : "var(--ok)",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 600
                    }}
                  >
                    {modul.trackTitle}
                  </span>
                </div>

                <h4 style={{ fontSize: "14px", fontWeight: 700, marginTop: "4px" }}>{modul.t}</h4>
                <p className="cap" style={{ color: "var(--ungu)", fontWeight: 600 }}>
                  {modul.f} • {modul.menit} menit
                </p>
                <p className="abu" style={{ fontSize: "12px", lineHeight: "1.5", flex: 1 }}>
                  {modul.d}
                </p>

                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <ProgressBar persen={isCompleted ? 100 : 30} height={6} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                    <span className={isCompleted ? "ok-teks" : "cap"}>
                      {isCompleted ? "✓ Selesai" : "Belum selesai"}
                    </span>
                    <span className="link">Buka Materi →</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="kartu" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p className="abu">Tidak ada modul yang cocok dengan kriteria pencarian atau filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
