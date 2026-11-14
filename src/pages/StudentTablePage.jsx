import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { AdaptiveBadge } from "../components/common/AdaptiveBadge";
import { Icon } from "../assets/icons";

export function StudentTablePage({ students = [] }) {
  const [search, setSearch] = useState("");
  const [clusterFilter, setClusterFilter] = useState("all"); // 'all' | '0' | '1' | '2'
  const [sortConfig, setSortConfig] = useState({ key: "nim", ascending: true });

  const filtered = students.filter((m) => {
    const matchesSearch = (m.nim + " " + m.nama).toLowerCase().includes(search.toLowerCase());
    const matchesCluster = clusterFilter === "all" || String(m.cluster) === clusterFilter;
    return matchesSearch && matchesCluster;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    const comp = valA > valB ? 1 : valA < valB ? -1 : 0;
    return sortConfig.ascending ? comp : -comp;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      ascending: prev.key === key ? !prev.ascending : true
    }));
  };

  const columns = [
    { key: "nim", label: "NIM" },
    { key: "nama", label: "Nama Mahasiswa" },
    { key: "cluster", label: "Klaster ML" },
    { key: "h5p", label: "Visual (H5P)" },
    { key: "teks", label: "Teks (Page)" },
    { key: "ratio", label: "Rasio Visual" },
    { key: "aktif", label: "Aksi Aktif" },
    { key: "hari", label: "Hari Aktif" }
  ];

  return (
    <>
      <TitleHeader
        title="Basis Data 128 Mahasiswa & Klaster FSLSM"
        subtitle="Hasil pemodelan K-Means ($k=3$) dan ekstraksi fitur Felder-Silverman dari log LMS Moodle."
      />

      <div className="kartu besar masuk">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ position: "relative", minWidth: "280px" }}>
            <input
              type="text"
              className="cari"
              placeholder="⌕ Cari nama atau NIM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="chips">
            <span className="cap" style={{ fontWeight: 600 }}>Filter Klaster:</span>
            <button className={`chip-btn ${clusterFilter === "all" ? "on" : ""}`} onClick={() => setClusterFilter("all")}>
              Semua ({students.length})
            </button>
            <button className={`chip-btn ${clusterFilter === "0" ? "on" : ""}`} onClick={() => setClusterFilter("0")}>
              Cluster 0 (Selektif)
            </button>
            <button className={`chip-btn ${clusterFilter === "1" ? "on" : ""}`} onClick={() => setClusterFilter("1")}>
              Cluster 1 (Konsisten)
            </button>
            <button className={`chip-btn ${clusterFilter === "2" ? "on" : ""}`} onClick={() => setClusterFilter("2")}>
              Cluster 2 (Intensif)
            </button>
          </div>
        </div>

        <div className="geser" style={{ marginTop: "14px" }}>
          <table>
            <thead>
              <tr>
                {columns.map((col) => {
                  const isSorted = sortConfig.key === col.key;
                  return (
                    <th key={col.key} onClick={() => handleSort(col.key)}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span>{col.label}</span>
                        {isSorted && <span>{sortConfig.ascending ? "▲" : "▼"}</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sorted.length > 0 ? (
                sorted.map((m) => (
                  <tr key={m.nim}>
                    <td><code>{m.nim}</code></td>
                    <td style={{ fontWeight: 600 }}>{m.nama}</td>
                    <td>
                      <AdaptiveBadge
                        type={m.cluster === 0 ? "utama" : m.cluster === 2 ? "pengayaan" : "rekomendasi"}
                        label={`Cluster ${m.cluster}`}
                      />
                    </td>
                    <td>{m.h5p.toLocaleString("id-ID")}</td>
                    <td>{m.teks.toLocaleString("id-ID")}</td>
                    <td><code>{Number(m.ratio).toFixed(3)}</code></td>
                    <td>{m.aktif.toLocaleString("id-ID")}</td>
                    <td><b>{m.hari}</b> hari</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: "center", padding: "30px", color: "var(--abu)" }}>
                    Tidak ada data mahasiswa yang sesuai dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="cap" style={{ marginTop: "10px" }}>
          💡 Klik judul kolom tabel mana saja untuk melakukan pengurutan data otomatis (ascending / descending).
        </p>
      </div>
    </>
  );
}
