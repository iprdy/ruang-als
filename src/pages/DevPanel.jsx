import React from "react";
import { Judul } from "../components/Judul";
import { Stat } from "../components/Stat";
import { LOG } from "../data/learningData";

export function DevPanel({ mhs = [], dariCSV, onResetData, onSimulasikanUser, ke }) {
  return (
    <>
      <Judul
        t="Panel Pengembang Web"
        x="Pusat konfigurasi sistem, diagnostik dataset log Moodle, dan parameter simulasi K-Means × FSLSM."
      />

      <div className="banner">
        AKSES PEMBUAT WEB (SUPERUSER) · Anda memiliki akses penuh ke seluruh modul sistem, analitik dosen, dan simulasi mahasiswa.
      </div>

      <div className="stats">
        <Stat nilai={LOG.baris} label="Total baris log Moodle" />
        <Stat nilai={mhs.length} label="Mahasiswa aktif di database" />
        <Stat nilai={LOG.modul.length} label="Modul LMS terdaftar" />
      </div>

      <div className="dua">
        <div className="kartu besar">
          <h3>Status Integrasi Data (student_features.csv)</h3>
          <p className="abu">
            Sumber data: <b>{dariCSV ? "public/student_features.csv (File Eksternal Aktif)" : "Fallback Memori Bawaan"}</b>
          </p>
          <div className="baris">
            <span>Kolom NIM, Nama, visual_count, verbal_count</span>
            <span className="cap ungu">✓ Valid</span>
          </div>
          <div className="baris">
            <span>Kolom visual_ratio, active_actions, reflective_actions</span>
            <span className="cap ungu">✓ Terhitung</span>
          </div>
          <div className="baris">
            <span>Standardisasi Jarak Euclidean Min-Max</span>
            <span className="cap ungu">✓ Aktif</span>
          </div>
          <div className="tombol-baris" style={{ marginTop: "12px" }}>
            <button className="tombol alt" onClick={() => ke("data")}>
              Periksa Tabel Mahasiswa →
            </button>
            <button className="tombol alt" onClick={() => ke("log")}>
              Buka Visualisasi Log LMS →
            </button>
          </div>
        </div>

        <div className="kartu besar">
          <h3>Alat Pengembang & Simulasi Akses</h3>
          <p className="abu">
            Uji coba tampilan dari perspektif peran lain secara langsung tanpa keluar dari sesi:
          </p>
          <div className="chips" style={{ margin: "10px 0" }}>
            <button
              onClick={() => onSimulasikanUser("2315091043")}
              title="Simulasikan sebagai Putu Aldi (Cluster 1)"
            >
              Simulasi Mahasiswa: Aldi (Klaster 1)
            </button>
            <button
              onClick={() => onSimulasikanUser("2315091092")}
              title="Simulasikan sebagai Very (Cluster 0)"
            >
              Simulasi Mahasiswa: Very (Klaster 0)
            </button>
            <button
              onClick={() => ke("dosen")}
            >
              Buka Mode Dosen
            </button>
          </div>

          <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--garis)" }}>
            <p className="cap" style={{ marginBottom: "8px" }}>MANAJEMEN PENYIMPANAN LOKAL</p>
            <button
              className="tombol alt"
              onClick={onResetData}
              style={{ color: "var(--salah)", borderColor: "var(--salah)" }}
            >
              Reset Riwayat Selesai & State Aplikasi
            </button>
          </div>
        </div>
      </div>

      <div className="kartu besar">
        <h3>Arsitektur & Konfigurasi Algoritma</h3>
        <p className="abu">
          Sistem menggunakan pendekatan <b>Unsupervised Clustering (K-Means)</b> pada ruang fitur 4-dimensi:
        </p>
        <div className="banner" style={{ fontFamily: "monospace", margin: "10px 0" }}>
          Fitur = [ visual_ratio, active_actions, reflective_actions, active_days ]
          <br />
          Normalisasi: X_norm = (X - X_min) / (X_max - X_min)
          <br />
          Jarak: d(p, q) = √ Σ (p_i - q_i)²
        </div>
        <p className="cap">
          Hasil klaster dipetakan ke 4 dimensi Felder-Silverman (Active/Reflective, Sensing/Intuitive, Visual/Verbal, Sequential/Global) untuk menentukan rekomendasi materi adaptif.
        </p>
      </div>
    </>
  );
}
