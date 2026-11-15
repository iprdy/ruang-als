import React from "react";
import { Icon } from "../../assets/icons";

export function Sidebar({ currentRoute, onNavigate, user, onLogout }) {
  const role = user?.role || "m";

  const menuConfig = {
    m: [
      { id: "beranda", label: "Beranda", icon: "home" },
      { id: "materi", label: "Katalog Materi", icon: "book" },
      { id: "tugas", label: "Penugasan (Assignment)", icon: "clipboard" },
      { id: "forum", label: "Forum Diskusi", icon: "message-square" },
      { id: "nilai", label: "Laporan Nilai (Report)", icon: "trending-up" },
      { id: "riwayat", label: "Riwayat Belajar", icon: "activity" },
      { id: "notif", label: "Pengumuman", icon: "bell" }
    ],
    d: [
      { id: "dosen", label: "Dashboard Dosen", icon: "home" },
      { id: "tugas", label: "Periksa Penugasan", icon: "clipboard" },
      { id: "forum", label: "Moderasi Forum", icon: "message-square" },
      { id: "kelola", label: "Kelola Materi & Kuis", icon: "plus-circle" },
      { id: "analisis-log", label: "Analisis Log LMS", icon: "bar-chart" },
      { id: "data-mhs", label: "Data Mahasiswa (128)", icon: "users" }
    ],
    dev: [
      { id: "dev", label: "Panel Pengembang", icon: "settings" },
      { id: "beranda", label: "Simulasi Mahasiswa", icon: "home" },
      { id: "tugas", label: "Penugasan (Assignment)", icon: "clipboard" },
      { id: "forum", label: "Forum Diskusi", icon: "message-square" },
      { id: "nilai", label: "Laporan Nilai (Report)", icon: "trending-up" },
      { id: "analisis-log", label: "Visualisasi Log", icon: "bar-chart" },
      { id: "data-mhs", label: "Tabel Data (128)", icon: "users" }
    ]
  };

  const navItems = menuConfig[role] || menuConfig.m;

  const getPortalLabel = () => {
    if (role === "d") return "Portal Dosen";
    if (role === "dev") return "Portal Developer";
    return "Ruang Belajar";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo" onClick={() => onNavigate(navItems[0].id)}>
          ruang.
        </div>
        <span className="portal-tag">{getPortalLabel()}</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id || (item.id === "materi" && (currentRoute.startsWith("lesson") || currentRoute.startsWith("kuis")));
          return (
            <button
              key={item.id}
              className={isActive ? "on" : ""}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", background: "var(--lav-terang)", borderRadius: "var(--radius-md)" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--ungu)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "11px" }}>
            {user?.inisial || "US"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: "12px", fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.nama ? user.nama.split(" ")[0] : "Pengguna"}
            </span>
            <span className="cap" style={{ fontSize: "10px" }}>
              {role === "m" ? `NIM: ${user?.nim}` : role === "d" ? "Dosen Pengampu" : "Developer"}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="link"
          style={{ color: "var(--salah)", padding: "6px 8px", fontSize: "11.5px", justifyContent: "flex-start" }}
        >
          <Icon name="log-out" size={14} color="var(--salah)" />
          <span>Keluar Portal</span>
        </button>
      </div>
    </aside>
  );
}
