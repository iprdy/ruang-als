import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { StatCard } from "../components/common/StatCard";
import { LOG_METRICS } from "../data/logAnalyticsData";
import { Icon } from "../assets/icons";

export function TeacherDashboard({
  modules = [],
  announcements = [],
  onAddModule,
  onAddAnnouncement,
  onNavigate
}) {
  const [tab, setTab] = useState("ringkasan"); // 'ringkasan' | 'tambah_materi' | 'buat_tugas'
  const [successMsg, setSuccessMsg] = useState("");

  // Form Tambah Materi
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("visual");
  const [durasi, setDurasi] = useState(15);
  const [alur, setAlur] = useState("Input Masalah → Analisis Keamanan → Mitigasi Proteksi → Validasi");

  // Form Pengumuman
  const [judulTugas, setJudulTugas] = useState("");
  const [isiTugas, setIsiTugas] = useState("");

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim()) {
      alert("Harap isi judul dan deskripsi materi.");
      return;
    }

    const newModule = {
      id: `MOD-${String(modules.length + 1).padStart(2, "0")}`,
      track: "security",
      trackTitle: "Keamanan Sistem Informasi",
      t: judul.trim(),
      f: kategori === "visual" ? "Diagram visual & H5P" : kategori === "latihan" ? "Lab Simulasi" : "Modul Bacaan",
      menit: Number(durasi) || 15,
      kat: kategori,
      d: deskripsi.trim(),
      v: alur.trim(),
      multiModal: {
        visual: { judul: "Diagram Modul Baru", konten: `[ Visualisasi ]: ${alur}` },
        verbal: { judul: "Panduan Modul Baru", konten: deskripsi },
        praktis: { judul: "Lab Modul Baru", konten: "Latihan pemahaman konsep modul yang ditambahkan dosen." }
      },
      contoh: ["// Implementasi skrip materi baru", "console.log('Modul siap dipelajari');"]
    };

    onAddModule(newModule);
    setSuccessMsg(`✓ Materi '${judul}' berhasil dipublikasikan untuk mahasiswa.`);
    setJudul("");
    setDeskripsi("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!judulTugas.trim() || !isiTugas.trim()) {
      alert("Harap lengkapi judul dan instruksi tugas.");
      return;
    }

    onAddAnnouncement({
      judul: judulTugas.trim(),
      isi: isiTugas.trim(),
      waktu: "Diterbitkan Dosen Pengampu"
    });

    setSuccessMsg("✓ Tugas/Pengumuman baru berhasil diterbitkan.");
    setJudulTugas("");
    setIsiTugas("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <>
      <TitleHeader
        title="Dashboard Dosen & Evaluasi Pembelajaran"
        subtitle="Pantau dinamika belajar 128 mahasiswa Keamanan Sistem Informasi berdasarkan data log LMS & Klaster FSLSM."
      />

      {/* Tabs */}
      <div className="chips">
        <button className={`chip-btn ${tab === "ringkasan" ? "on" : ""}`} onClick={() => setTab("ringkasan")}>
          <Icon name="bar-chart" size={14} />
          <span>Ringkasan Riset & Kurikulum</span>
        </button>
        <button className={`chip-btn ${tab === "tambah_materi" ? "on" : ""}`} onClick={() => setTab("tambah_materi")}>
          <Icon name="plus-circle" size={14} />
          <span>Tambah Materi Baru</span>
        </button>
        <button className={`chip-btn ${tab === "buat_tugas" ? "on" : ""}`} onClick={() => setTab("buat_tugas")}>
          <Icon name="bell" size={14} />
          <span>Terbitkan Penugasan / Nudge</span>
        </button>
      </div>

      {successMsg && (
        <div className="masuk" style={{ background: "var(--ok-bg)", color: "var(--ok)", padding: "12px 18px", borderRadius: "var(--radius-md)", border: "1px solid rgba(32,134,78,0.3)", fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      {tab === "ringkasan" && (
        <>
          <div className="stats-grid">
            <StatCard nilai={LOG_METRICS.uniqueStudents} label="Mahasiswa Terklaster (K-Means)" icon="users" />
            <StatCard nilai={LOG_METRICS.totalLogs} label="Total Baris Log LMS Bersih" icon="activity" />
            <StatCard nilai={modules.length} label="Total Modul Terbit" icon="book" />
          </div>

          <div className="dua">
            {/* Cluster Distribution Card */}
            <div className="kartu besar">
              <h3 style={{ fontSize: "15px" }}>Distribusi Klaster Mahasiswa (FSLSM)</h3>
              <p className="cap">Hasil pemodelan K-Means ($k=3$) tervalidasi Random Forest (92.31%):</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                <div style={{ background: "var(--peringatan-bg)", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid rgba(201,125,16,0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "12px", color: "var(--peringatan)" }}>
                    <span>Cluster 0: Selektif / Minimalis</span>
                    <span>26 Mhs (20.3%)</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--teks)", marginTop: "4px" }}>
                    Interaksi terfokus pada modul H5P visual mendekati deadline tugas. Memerlukan bimbingan langsung (Direct Guidance) dan *nudging* berkala.
                  </p>
                </div>

                <div style={{ background: "var(--lav)", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid rgba(108,71,201,0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "12px", color: "var(--ungu)" }}>
                    <span>Cluster 1: Konsisten & Teratur (Mayoritas)</span>
                    <span>68 Mhs (53.1%)</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--teks)", marginTop: "4px" }}>
                    Kehadiran stabil sepanjang semester dengan proporsi interaksi seimbang. Jalur adaptif: Panduan bertahap mingguan (Sequential Guidance).
                  </p>
                </div>

                <div style={{ background: "var(--ok-bg)", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid rgba(32,134,78,0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "12px", color: "var(--ok)" }}>
                    <span>Cluster 2: Intensif & Reflektif</span>
                    <span>34 Mhs (26.6%)</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--teks)", marginTop: "4px" }}>
                    Volume aktivitas sangat tinggi, membaca modul mendalam & berpartisipasi aktif di forum. Jalur adaptif: Modul pengayaan studi kasus lanjutan.
                  </p>
                </div>
              </div>

              <div className="tombol-baris" style={{ marginTop: "12px" }}>
                <button className="tombol alt" onClick={() => onNavigate("analisis-log")}>
                  <Icon name="bar-chart" size={14} />
                  <span>Lihat Visualisasi Log Lengkap</span>
                </button>
                <button className="tombol alt" onClick={() => onNavigate("data-mhs")}>
                  <Icon name="users" size={14} />
                  <span>Buka Tabel 128 Mahasiswa</span>
                </button>
              </div>
            </div>

            {/* Quick Actions & Recent Modules */}
            <div className="kartu besar">
              <h3 style={{ fontSize: "15px" }}>Katalog Materi Aktif ({modules.length})</h3>
              <p className="cap">Daftar modul yang dapat diakses mahasiswa secara adaptif:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "300px", overflowY: "auto" }}>
                {modules.map((m) => (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "var(--lav-terang)", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
                    <div>
                      <b style={{ fontSize: "12px" }}>{m.t}</b>
                      <span className="cap" style={{ display: "block" }}>{m.trackTitle} • {m.menit} menit</span>
                    </div>
                    <button className="link" onClick={() => onNavigate(`lesson:${m.id}`)}>
                      Lihat →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {tab === "tambah_materi" && (
        <div className="kartu besar masuk">
          <h3>Formulir Publikasi Materi Pembelajaran Baru</h3>
          <p className="cap">Materi yang diterbitkan akan otomatis disortir oleh Mesin Adaptif sesuai klaster mahasiswa.</p>

          <form onSubmit={handleSaveModule} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "12px" }}>
            <div className="input-grup">
              <label>Judul Modul Pembelajaran</label>
              <input
                type="text"
                className="input-teks"
                placeholder="Contoh: Manajemen Kunci Enkripsi & HSM (Hardware Security Module)"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>

            <div className="dua">
              <div className="input-grup">
                <label>Format Media Utama</label>
                <select className="input-teks" value={kategori} onChange={(e) => setKategori(e.target.value)}>
                  <option value="visual">Visual (Diagram / H5P)</option>
                  <option value="latihan">Praktis (Lab / Latihan)</option>
                  <option value="bacaan">Verbal (Teks / Dokumen Standar)</option>
                </select>
              </div>
              <div className="input-grup">
                <label>Estimasi Durasi (Menit)</label>
                <input
                  type="number"
                  className="input-teks"
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value)}
                />
              </div>
            </div>

            <div className="input-grup">
              <label>Ringkasan Konsep Modul</label>
              <textarea
                className="input-teks"
                rows={3}
                placeholder="Jelaskan ringkasan materi dan relevansi keamanan informasinya..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>Alur Pembelajaran Singkat (Flow)</label>
              <input
                type="text"
                className="input-teks"
                value={alur}
                onChange={(e) => setAlur(e.target.value)}
              />
            </div>

            <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "10px 20px" }}>
              <Icon name="plus-circle" size={15} />
              <span>Publikasikan Modul ke Katalog</span>
            </button>
          </form>
        </div>
      )}

      {tab === "buat_tugas" && (
        <div className="kartu besar masuk">
          <h3>Terbitkan Penugasan & Pesan Dorongan (Nudge)</h3>
          <p className="cap">Pesan penugasan akan tampil di dashboard beranda seluruh mahasiswa.</p>

          <form onSubmit={handleSaveAnnouncement} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "12px" }}>
            <div className="input-grup">
              <label>Judul Tugas / Pengumuman</label>
              <input
                type="text"
                className="input-teks"
                placeholder="Contoh: Tugas Praktik 02: Analisis Paket PCAP Wireshark DDoS"
                value={judulTugas}
                onChange={(e) => setJudulTugas(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>Instruksi Penugasan</label>
              <textarea
                className="input-teks"
                rows={4}
                placeholder="Jelaskan target modul, kuis formatif yang harus diselesaikan, dan batas waktu pengumpulan..."
                value={isiTugas}
                onChange={(e) => setIsiTugas(e.target.value)}
              />
            </div>

            <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "10px 20px" }}>
              <Icon name="bell" size={15} />
              <span>Terbitkan Pengumuman</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
