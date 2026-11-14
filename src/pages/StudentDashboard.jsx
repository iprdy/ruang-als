import React from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { StatCard } from "../components/common/StatCard";
import { ProgressBar } from "../components/common/ProgressBar";
import { AdaptiveBadge } from "../components/common/AdaptiveBadge";
import { AdaptiveNudge } from "../components/als/AdaptiveNudge";
import { Icon } from "../assets/icons";

export function StudentDashboard({
  user,
  profile,
  adaptedModules = [],
  completedModules = {},
  announcements = [],
  onOpenLesson,
  onNavigate
}) {
  const firstName = user?.nama ? user.nama.split(" ")[0] : "Mahasiswa";
  const completedCount = Object.keys(completedModules).length;
  const totalCount = Math.max(adaptedModules.length, 1);
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));

  // Top 2 recommended modules
  const topRecommendations = adaptedModules.slice(0, 2);

  return (
    <>
      <TitleHeader
        title={`Halo, ${firstName}. Siap bertumbuh hari ini?`}
        subtitle="Portal pembelajaran adaptif otomatis Machine Learning (K-Means Clustering & Random Forest)."
      />

      {/* Adaptive Nudge Banner */}
      <AdaptiveNudge
        cluster={user?.cluster !== undefined ? user.cluster : 1}
        profile={profile}
        onActionClick={() => onOpenLesson(topRecommendations[0]?.id || "MOD-01")}
      />

      <div className="dua-kolom">
        <div className="tumpuk">
          {/* Hero Welcome */}
          <div className="hero">
            <h2>Belajar Lebih Nyaman.<br />Pahami Lebih Dalam.</h2>
            <p>
              Jalur belajar dan format media telah dipersonalisasi otomatis oleh sistem adaptif berdasarkan karakteristik interaksi belajarmu.
            </p>
            <button className="tombol" onClick={() => onOpenLesson(topRecommendations[0]?.id || "MOD-01")}>
              <span>Lanjutkan Belajar Modul Prioritas</span>
              <Icon name="arrow-right" size={15} />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="stats-grid">
            <StatCard nilai={adaptedModules.length} label="Total Modul Kurikulum" icon="book" />
            <StatCard nilai={completedCount} label="Modul Selesai" icon="check-circle" />
            <StatCard nilai={progressPercent} label="Progres Belajar (%)" icon="activity" />
          </div>

          {/* Recommended Modules Heading */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon name="award" size={18} color="var(--ungu)" />
              <h3 style={{ fontSize: "16px" }}>Rekomendasi Materi Teratas Untukmu</h3>
            </div>
            <button className="link" onClick={() => onNavigate("materi")}>
              <span>Lihat Semua Katalog ({adaptedModules.length})</span>
              <Icon name="arrow-right" size={13} />
            </button>
          </div>

          {/* Top 2 Module Cards */}
          <div className="grid2">
            {topRecommendations.map((modul, idx) => {
              const isCompleted = !!completedModules[modul.id];
              return (
                <div
                  key={modul.id}
                  className="kartu interaktif masuk"
                  style={{ cursor: "pointer", animationDelay: `${idx * 80}ms` }}
                  onClick={() => onOpenLesson(modul.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <AdaptiveBadge type={modul.badge} label={modul.badgeLabel} />
                    <span className="cap">{modul.trackTitle}</span>
                  </div>

                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--teks)" }}>{modul.t}</h4>
                  <p className="cap" style={{ color: "var(--ungu)", fontWeight: 600 }}>
                    {modul.f} • {modul.menit} menit
                  </p>
                  <p className="abu" style={{ fontSize: "12px", lineHeight: "1.5", flex: 1 }}>
                    {modul.d}
                  </p>

                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <ProgressBar persen={isCompleted ? 100 : 35} height={6} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                      <span className="ungu" style={{ fontWeight: 600 }}>
                        {isCompleted ? "✓ Selesai dipelajari" : "35% Dipelajari"}
                      </span>
                      <span className="link">Buka Modul →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="cap">
            ℹ️ Urutan dan lencana materi disesuaikan secara dinamis oleh model machine learning berdasarkan klaster FSLSM Anda.
          </p>
        </div>

        {/* Right Sidebar: ML Profile & Announcements */}
        <div className="tumpuk">
          {/* ML Adaptive Path Card */}
          <div className="kartu besar">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon name="shield" size={20} color="var(--ungu)" />
              <h3 style={{ fontSize: "15px" }}>Jalur Belajar Adaptif ML</h3>
            </div>
            <p className="cap" style={{ color: "var(--ungu)", fontWeight: "700" }}>
              Otomatisasi K-Means × FSLSM Aktif
            </p>
            <p className="abu" style={{ fontSize: "11.5px", lineHeight: "1.6" }}>
              Profil preferensi belajar Anda dihitung secara matematis oleh model <b>K-Means Clustering ($k=3$)</b> dan divalidasi oleh <b>Random Forest (92.31%)</b> dari log Moodle LMS.
            </p>

            <div style={{ background: "var(--lav)", padding: "14px", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span className="abu">Profil Klaster:</span>
                <b style={{ color: "var(--ungu)" }}>{profile?.nama}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span className="abu">Format Prioritas:</span>
                <b style={{ color: "var(--teks)" }}>{profile?.formatPrioritas}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span className="abu">Strategi Navigasi:</span>
                <b style={{ color: "var(--ok)" }}>✓ {user?.navigasi || "Sequential Guidance"}</b>
              </div>
            </div>
            <span className="cap">Format modul yang paling efisien disajikan secara terarah di katalog belajar Anda.</span>
          </div>

          {/* Teacher Announcements Card */}
          <div className="kartu besar" style={{ background: "linear-gradient(135deg, var(--lav) 0%, var(--lav-terang) 100%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon name="bell" size={18} color="var(--ungu)" />
              <h3 style={{ fontSize: "15px" }}>Tugas & Pengumuman Dosen</h3>
            </div>

            {announcements && announcements.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {announcements.slice(0, 2).map((item, idx) => (
                  <div key={idx} style={{ background: "var(--kartu)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
                    <b style={{ fontSize: "12px", color: "var(--ungu)" }}>{item.judul}</b>
                    <p style={{ fontSize: "11px", color: "var(--teks)", marginTop: "4px", lineHeight: "1.4" }}>
                      {item.isi}
                    </p>
                    <span className="cap" style={{ display: "block", marginTop: "4px" }}>
                      {item.waktu}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="abu" style={{ fontSize: "11.5px" }}>Belum ada penugasan baru dari dosen pengampu.</p>
            )}

            <button className="tombol" onClick={() => onNavigate("materi")}>
              <span>Buka Modul Tugas Terkait</span>
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
