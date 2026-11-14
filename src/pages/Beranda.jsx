import React from "react";
import { Judul } from "../components/Judul";
import { Stat } from "../components/Stat";
import { KartuMateri } from "../components/KartuMateri";
import { MATERI } from "../data/learningData";

export function Beranda({
  selesai,
  buka,
  ke,
  user,
  materiList = MATERI,
  pengumumanList = []
}) {
  const jml = Object.keys(selesai).length;
  const namaPanggilan = user?.nama ? user.nama.split(" ")[0] : "Mahasiswa";

  return (
    <>
      <Judul
        t={`Halo, ${namaPanggilan}. Siap bertumbuh?`}
        x={
          user?.nim
            ? `NIM: ${user.nim} · Langkah kecil hari ini, pemahaman baru untuk esok hari.`
            : "Langkah kecil hari ini, pemahaman baru untuk esok hari."
        }
      />
      <div className="dua-kolom">
        <div className="tumpuk">
          <div className="hero">
            <h2>
              Belajar lebih nyaman.<br />Pahami lebih dalam.
            </h2>
            <p>Materi dan alur belajarmu telah dioptimalkan secara otomatis oleh sistem.</p>
            <button className="tombol" onClick={() => buka(1)}>
              Lanjutkan belajar →
            </button>
          </div>

          <div className="stats">
            <Stat nilai={materiList.length} nol label="Materi tersedia" />
            <Stat nilai={jml} nol label="Materi diselesaikan" />
            <Stat
              nilai={Math.min(100, Math.round((jml / (materiList.length || 1)) * 100))}
              label="Progres keseluruhan (%)"
            />
          </div>

          <div className="baris-judul">
            <h3>Rekomendasi materi untukmu</h3>
            <button className="link" onClick={() => ke("materi")}>
              Lihat semua →
            </button>
          </div>

          <div className="grid2">
            {materiList.length > 0 && (
              <KartuMateri
                i={0}
                urut={0}
                selesai={selesai}
                buka={buka}
                matchPercent={95}
                materiList={materiList}
              />
            )}
            {materiList.length > 1 && (
              <KartuMateri
                i={1}
                urut={1}
                selesai={selesai}
                buka={buka}
                matchPercent={90}
                materiList={materiList}
              />
            )}
          </div>

          <p className="cap">
            Personalisasi otomatis · Format materi diatur secara cerdas oleh model machine learning.
          </p>
        </div>

        <div className="tumpuk">
          {/* Kartu Status Personalisasi Machine Learning */}
          <div className="kartu besar">
            <div className="baris-judul">
              <h3>Jalur Belajar Adaptif</h3>
              <span className="cap ungu">Otomatisasi ML Aktif</span>
            </div>
            <p className="abu">
              Format penyajian materi, diagram alur, dan kuis disesuaikan secara otomatis oleh model machine learning berdasarkan pola aktivitas belajarmu.
            </p>
            <div className="banner" style={{ marginTop: "6px" }}>
              <b>Status Model:</b> Pembelajaran adaptif aktif untuk NIM {user?.nim || "Anda"}.
            </div>
          </div>

          {/* Kartu Tugas & Pengumuman Dosen */}
          <div className="kartu besar">
            <div className="baris-judul">
              <h3>Tugas & Pengumuman</h3>
              <button className="link" onClick={() => ke("notif")}>
                Buka notifikasi →
              </button>
            </div>
            <p className="cap" style={{ marginBottom: "6px" }}>
              Pemberitahuan terbaru dari dosen pengampu:
            </p>

            {pengumumanList.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {pengumumanList.slice(0, 2).map((p, idx) => (
                  <div key={idx} className="banner" style={{ background: "var(--lav)" }}>
                    <b>{p.judul}</b>
                    <p className="cap" style={{ marginTop: "2px" }}>
                      {p.tipe} · {p.waktu}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="cap">Belum ada tugas baru yang diterbitkan.</p>
            )}
          </div>

          {/* Kartu Penjelasan Singkat */}
          <div className="ungu-muda">
            <h3>Bagaimana rekomendasi bekerja?</h3>
            <p className="abu">
              Log aktivitas interaksi → Model Machine Learning → Penyesuaian materi adaptif otomatis.
            </p>
            <p className="cap">
              Fokuslah pada proses belajar dan latihan. Sistem secara cerdas akan menyajikan materi dalam format yang paling nyaman untukmu.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
