import React, { useState } from "react";
import { Judul } from "../components/Judul";
import { Stat } from "../components/Stat";
import { Batang } from "../components/Batang";
import { LOG } from "../data/learningData";

export function AnalisisLog({ mhs, dariCSV }) {
  const [hoveredMhs, setHoveredMhs] = useState(null);
  const maks = LOG.modul[0][1];
  const total = LOG.modul.reduce((a, m) => a + m[1], 0);

  const mx = Math.max(...mhs.map((m) => m.teks), 10) * 1.1;
  const my = Math.max(...mhs.map((m) => m.h5p), 10) * 1.1;

  return (
    <>
      <Judul
        t="Analisis log"
        x="Aktivitas tertinggi ada pukul 22.00 dan 10.00 sampai 11.00; Selasa dan Jumat paling ramai."
      />

      <div className="stats">
        <Stat nilai={LOG.mahasiswa} label="Mahasiswa unik" />
        <Stat nilai={LOG.baris} label="Baris log bersih" />
        <Stat nilai={LOG.rata} label="Rata-rata aktivitas per mahasiswa" />
      </div>

      <div className="dua">
        <div className="kartu besar">
          <h3>Aktivitas per jam</h3>
          <Batang nilai={LOG.jam} label={LOG.jam.map((_, i) => i)} tiap={3} />
          <p className="cap" style={{ marginTop: "8px" }}>
            Puncak aktivitas mandiri tercatat pukul 22.00 (9.050 log) dan sesi pagi pukul 10.00-11.00.
          </p>
        </div>

        <div className="kartu besar">
          <h3>Aktivitas per hari</h3>
          <Batang
            nilai={LOG.hari.map((h) => h[1])}
            label={LOG.hari.map((h) => h[0])}
          />
          <p className="cap" style={{ marginTop: "8px" }}>
            Selasa (22.700) dan Jumat (22.400) mencatat beban aktivitas tertinggi di sistem.
          </p>
        </div>
      </div>

      <div className="kartu besar">
        <h3>Komposisi modul LMS</h3>
        {LOG.modul.map((m, i) => (
          <div className="hbaris" key={m[0]}>
            <span>{m[0]}</span>
            <div className="trek">
              <i
                style={{
                  "--lebar": (m[1] / maks) * 100 + "%",
                  animationDelay: i * 80 + "ms"
                }}
              />
            </div>
            <em>
              {m[1].toLocaleString("id-ID")} (
              {((m[1] / total) * 100).toFixed(1).replace(".", ",")}%)
            </em>
          </div>
        ))}
      </div>

      <div className="kartu besar">
        <div className="baris-judul">
          <h3>Materi teks vs konten visual H5P</h3>
          {hoveredMhs && (
            <span className="cap ungu">
              {hoveredMhs.nama} ({hoveredMhs.nim}) · H5P: {hoveredMhs.h5p} · Teks: {hoveredMhs.teks} · Rasio: {hoveredMhs.ratio.toFixed(3)}
            </span>
          )}
        </div>
        <p className="cap">
          {dariCSV
            ? `${mhs.length} mahasiswa dari student_features.csv.`
            : "Baru 5 mahasiswa contoh. student_features.csv telah terpasang di folder public/."}{" "}
          Semua titik jauh di atas garis seimbang, membuktikan dominasi konten visual di seluruh kelas. Arahkan kursor ke titik untuk rincian.
        </p>

        <div className="scatter-box">
          <svg
            viewBox="0 0 560 300"
            width="100%"
            role="img"
            aria-label="Scatter teks vs H5P"
          >
            {/* Garis sumbu */}
            <line x1="44" y1="272" x2="552" y2="272" stroke="var(--garis)" strokeWidth="2" />
            <line x1="44" y1="8" x2="44" y2="272" stroke="var(--garis)" strokeWidth="2" />

            {/* Titik-titik mahasiswa */}
            {mhs.map((m, i) => {
              const cx = 44 + (508 * m.teks) / mx;
              const cy = 272 - (264 * m.h5p) / my;
              const isHovered = hoveredMhs?.nim === m.nim;

              return (
                <circle
                  key={m.nim}
                  className="titik"
                  style={{ animationDelay: Math.min(i * 15, 900) + "ms" }}
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "8" : "5"}
                  onMouseEnter={() => setHoveredMhs(m)}
                  onMouseLeave={() => setHoveredMhs(null)}
                >
                  <title>
                    {m.nama} (NIM: {m.nim})&#10;H5P: {m.h5p}&#10;Teks: {m.teks}&#10;Rasio: {m.ratio.toFixed(3)}
                  </title>
                </circle>
              );
            })}

            <text x="300" y="294" textAnchor="middle" className="svg-t">
              Akses materi teks (verbal) →
            </text>
            <text x="20" y="140" textAnchor="middle" className="svg-t" transform="rotate(-90 20 140)">
              Akses H5P (visual) →
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
