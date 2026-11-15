import React from "react";
import { Icon } from "../../assets/icons";

export function TopNavbar({ currentRoute, user, onNavigate, onLogout }) {
  const role = user?.role || "m";

  const getBreadcrumb = () => {
    if (currentRoute.startsWith("lesson:")) {
      const id = currentRoute.split(":")[1];
      return `Katalog Materi / Modul ${id}`;
    }
    if (currentRoute.startsWith("kuis:")) {
      const id = currentRoute.split(":")[1];
      return `Katalog Materi / Kuis Modul ${id}`;
    }

    const mapping = {
      beranda: "Beranda Mahasiswa",
      materi: "Katalog Materi Terbuka",
      tugas: "Penugasan & Submission (Assignment)",
      forum: "Forum Diskusi Terbuka (Open Forum)",
      nilai: "Laporan Nilai Akademik (User Report)",
      riwayat: "Riwayat Aktivitas & Progres",
      notif: "Pengumuman Akademik",
      dosen: "Dashboard & Ringkasan Dosen",
      kelola: "Kelola Modul, Kuis & Tugas",
      "analisis-log": "Analisis Log LMS (120k Log)",
      "data-mhs": "Basis Data Mahasiswa (128)",
      dev: "Panel Pengembang"
    };

    return mapping[currentRoute] || "Ruang Belajar";
  };

  const getRoleBadge = () => {
    if (role === "d") return "👨‍🏫 Dosen";
    if (role === "dev") return "⚙️ Pengembang";
    return `🎓 NIM: ${user?.nim || "Simulasi"}`;
  };

  return (
    <header className="top-navbar">
      <div className="nav-breadcrumb">
        <span className="abu">Portal</span>
        <span className="abu">/</span>
        <span style={{ fontWeight: 600, color: "var(--teks)" }}>{getBreadcrumb()}</span>
      </div>

      <div className="nav-actions">
        <span
          className="badge-prioritas rekomendasi"
          style={{ textTransform: "none", fontSize: "11px", padding: "5px 12px", borderRadius: "14px" }}
        >
          {getRoleBadge()}
        </span>

        <button
          onClick={() => onNavigate("notif")}
          className="tombol alt"
          style={{ padding: "8px", borderRadius: "50%", border: "1px solid var(--garis)" }}
          title="Lihat Pengumuman"
        >
          <Icon name="bell" size={16} />
        </button>

        <button
          onClick={onLogout}
          className="tombol alt"
          style={{ padding: "6px 12px", fontSize: "11px", color: "var(--salah)", borderColor: "var(--garis)" }}
        >
          <Icon name="log-out" size={13} color="var(--salah)" />
          <span>Keluar</span>
        </button>
      </div>
    </header>
  );
}
