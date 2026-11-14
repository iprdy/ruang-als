import React from "react";
import { Judul } from "../components/Judul";

export const Notif = ({ ke, pengumumanList = [] }) => (
  <>
    <Judul
      t="Notifikasi & Pusat Bantuan"
      x="Informasi penugasan baru dari dosen, evaluasi kuis, serta pengumuman perkuliahan adaptif."
    />

    {/* Pengumuman & Tugas dari Dosen */}
    {pengumumanList.length > 0 && (
      <div className="kartu besar">
        <h3>Pengumuman & Tugas dari Dosen Pengampu</h3>
        <p className="abu">Pemberitahuan resmi terbaru untuk kelas pemrograman adaptif:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
          {pengumumanList.map((p, idx) => (
            <div key={idx} className="banner" style={{ background: "var(--lav)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <b>{p.judul}</b>
                <span className="cap ungu">{p.tipe}</span>
              </div>
              <p style={{ margin: "4px 0" }}>{p.isi}</p>
              <p className="cap">{p.waktu}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="kartu besar">
      <h3>Lanjutkan langkah belajarmu</h3>
      <p className="abu">
        Tersedia materi pemrograman adaptif yang disesuaikan dengan preferensi belajar visual dan interaktifmu.
      </p>
      <div className="tombol-baris">
        <button className="tombol" onClick={() => ke("materi")}>
          Jelajahi materi
        </button>
      </div>
    </div>

    <div className="ungu-muda">
      <h3>Tentang Ruang (FSLSM × K-Means)</h3>
      <p className="abu">
        Model Gaya Belajar Felder-Silverman (FSLSM) digunakan sebagai kerangka acuan preferensi pemrosesan dan penerimaan informasi. Algoritma K-Means mengelompokkan pola log interaksi LMS tanpa label untuk menghasilkan rekomendasi kurikulum adaptif.
      </p>
      <div className="tombol-baris">
        <button className="tombol" onClick={() => ke("beranda")}>
          Kembali ke beranda
        </button>
      </div>
    </div>
  </>
);
