import React, { useState } from "react";
import { Judul } from "../components/Judul";

export function DataMhs({ mhs = [] }) {
  const [cari, setCari] = useState("");
  const [filterKlaster, setFilterKlaster] = useState("semua");
  const [urut, setUrut] = useState({ k: "h5p", naik: false });
  const [halaman, setHalaman] = useState(1);
  const [terpilih, setTerpilih] = useState(null);

  const perHalaman = 12;

  let baris = mhs.filter((m) => {
    const matchCari = (m.nim + " " + m.nama).toLowerCase().includes(cari.toLowerCase());
    const matchKlaster =
      filterKlaster === "semua" || String(m.cluster) === String(filterKlaster);
    return matchCari && matchKlaster;
  });

  if (urut.k) {
    baris = [...baris].sort(
      (a, b) => (a[urut.k] > b[urut.k] ? 1 : -1) * (urut.naik ? 1 : -1)
    );
  }

  const totalHalaman = Math.ceil(baris.length / perHalaman) || 1;
  const dataTampil = baris.slice((halaman - 1) * perHalaman, halaman * perHalaman);

  const kolom = [
    ["nim", "NIM"],
    ["nama", "Nama"],
    ["h5p", "Visual (H5P)"],
    ["teks", "Teks (Verbal)"],
    ["ratio", "Rasio visual"],
    ["aktif", "Aktif"],
    ["reflektif", "Reflektif"],
    ["hari", "Hari aktif"],
    ["cluster", "Klaster"]
  ];

  const unduhCSV = () => {
    if (!baris.length) return;
    const header = kolom.map((c) => c[1]).join(",");
    const isi = baris.map((b) =>
      kolom
        .map(([k]) => {
          const val = k === "ratio" ? Number(b[k]).toFixed(4) : b[k];
          return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
        })
        .join(",")
    );
    const blob = new Blob([header + "\n" + isi.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_fitur_mahasiswa_lms.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Judul
        t="Data mahasiswa"
        x="Klik judul kolom untuk mengurutkan data. Klik baris mahasiswa untuk melihat ringkasan diagnosis."
      />

      {terpilih && (
        <div className="banner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b>{terpilih.nama} (NIM: {terpilih.nim})</b> · Klaster {terpilih.cluster} · {terpilih.hari} hari aktif · Rasio visual: {Number(terpilih.ratio).toFixed(3)}
          </div>
          <button className="link" onClick={() => setTerpilih(null)}>
            Tutup [×]
          </button>
        </div>
      )}

      <div className="kartu besar">
        <div className="baris-judul" style={{ flexWrap: "wrap", gap: "10px" }}>
          <input
            className="cari"
            placeholder="Cari nama atau NIM..."
            value={cari}
            onChange={(e) => {
              setCari(e.target.value);
              setHalaman(1);
            }}
            aria-label="Filter tabel"
          />

          <div className="chips">
            {["semua", "0", "1", "2"].map((c) => (
              <button
                key={c}
                className={filterKlaster === c ? "on" : ""}
                onClick={() => {
                  setFilterKlaster(c);
                  setHalaman(1);
                }}
              >
                {c === "semua" ? "Semua Klaster" : `Cluster ${c}`}
              </button>
            ))}
          </div>

          <button className="tombol alt" onClick={unduhCSV}>
            Unduh CSV ({baris.length})
          </button>
        </div>

        <div className="geser">
          <table>
            <thead>
              <tr>
                {kolom.map(([k, l]) => (
                  <th
                    key={k}
                    onClick={() =>
                      setUrut({ k, naik: urut.k === k ? !urut.naik : true })
                    }
                  >
                    {l}
                    {urut.k === k ? (urut.naik ? " ↑" : " ↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTampil.map((m) => (
                <tr
                  key={m.nim}
                  onClick={() => setTerpilih(m)}
                  style={{
                    cursor: "pointer",
                    background: terpilih?.nim === m.nim ? "var(--lav)" : "transparent"
                  }}
                >
                  {kolom.map(([k]) => (
                    <td key={k}>
                      {k === "ratio"
                        ? Number(m[k]).toFixed(3)
                        : k === "cluster"
                        ? `Cluster ${m[k] ?? 0}`
                        : m[k]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paginasi">
          <span>
            Menampilkan {(halaman - 1) * perHalaman + 1} -{" "}
            {Math.min(halaman * perHalaman, baris.length)} dari {baris.length} mahasiswa
          </span>
          <div className="paginasi-tombol">
            <button
              className="tombol alt"
              disabled={halaman <= 1}
              onClick={() => setHalaman((p) => Math.max(1, p - 1))}
              style={{ opacity: halaman <= 1 ? 0.4 : 1 }}
            >
              ← Sebelumnya
            </button>
            <span style={{ padding: "8px 12px", fontWeight: "700", color: "var(--ungu)" }}>
              {halaman} / {totalHalaman}
            </span>
            <button
              className="tombol alt"
              disabled={halaman >= totalHalaman}
              onClick={() => setHalaman((p) => Math.min(totalHalaman, p + 1))}
              style={{ opacity: halaman >= totalHalaman ? 0.4 : 1 }}
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
