import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { AdaptiveBadge } from "../components/common/AdaptiveBadge";
import { predictStudentCluster } from "../services/clusterPredictor";
import { Icon } from "../assets/icons";

export function DeveloperPanel({
  user,
  onSwitchUser,
  onResetData,
  onNavigate
}) {
  // Form State untuk Prediksi Mahasiswa Baru
  const [nimBaru, setNimBaru] = useState("2415099999");
  const [namaBaru, setNamaBaru] = useState("Mahasiswa Baru (Simulasi)");
  const [visualCount, setVisualCount] = useState(480);
  const [verbalCount, setVerbalCount] = useState(45);
  const [activeActions, setActiveActions] = useState(38);
  const [reflectiveActions, setReflectiveActions] = useState(520);
  const [practicalEngagement, setPracticalEngagement] = useState(65);
  const [activeDays, setActiveDays] = useState(28);

  const [hasilPrediksi, setHasilPrediksi] = useState(null);

  const presetSimulasi = (tipe) => {
    if (tipe === "rendah") {
      setVisualCount(200);
      setVerbalCount(22);
      setActiveActions(20);
      setReflectiveActions(260);
      setPracticalEngagement(30);
      setActiveDays(15);
    } else if (tipe === "sedang") {
      setVisualCount(460);
      setVerbalCount(48);
      setActiveActions(42);
      setReflectiveActions(540);
      setPracticalEngagement(68);
      setActiveDays(32);
    } else if (tipe === "tinggi") {
      setVisualCount(750);
      setVerbalCount(85);
      setActiveActions(60);
      setReflectiveActions(950);
      setPracticalEngagement(85);
      setActiveDays(46);
    }
    setHasilPrediksi(null);
  };

  const handleJalankanPrediksi = (e) => {
    e.preventDefault();

    const dataInput = {
      visual_count: Number(visualCount) || 0,
      verbal_count: Number(verbalCount) || 0,
      active_actions: Number(activeActions) || 0,
      reflective_actions: Number(reflectiveActions) || 0,
      practical_engagement: Number(practicalEngagement) || 0,
      active_days: Number(activeDays) || 1
    };

    const hasil = predictStudentCluster(dataInput);
    setHasilPrediksi({
      ...hasil,
      nim: nimBaru.trim(),
      nama: namaBaru.trim()
    });
  };

  const handleMasukSebagaiMahasiswaIni = () => {
    if (!hasilPrediksi) return;

    const userBaru = {
      role: "m",
      nim: hasilPrediksi.nim,
      nama: hasilPrediksi.nama,
      cluster: hasilPrediksi.cluster,
      profil: hasilPrediksi.profile.namaLengkap,
      inisial: hasilPrediksi.nama
        .split(" ")
        .map((k) => k[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      navigasi: hasilPrediksi.recommendation.navigasi
    };

    onSwitchUser(userBaru);
    onNavigate("beranda");
  };

  const simulationUsers = [
    {
      label: "Simulasi Mahasiswa Cluster 0 (Selektif / Low Engagement)",
      user: {
        role: "m",
        nim: "2415091008",
        nama: "Ketut Arya Wiguna",
        cluster: 0,
        profil: "Pembelajar Selektif / Minimalis (Low-Engagement)",
        inisial: "KA",
        navigasi: "Direct Guidance (Fokus Esensial)"
      },
      desc: "Perhatikan: Format visual H5P akan menjadi prioritas, materi diberi lencana [PRIORITAS UTAMA], dan banner dorongan mengingatkan untuk tidak menunda belajar."
    },
    {
      label: "Simulasi Mahasiswa Cluster 1 (Konsisten & Teratur - Mayoritas)",
      user: {
        role: "m",
        nim: "2315091043",
        nama: "Putu Aldi Rama Pradika Yasa",
        cluster: 1,
        profil: "Pembelajar Konsisten & Teratur (Moderate-Regular)",
        inisial: "PA",
        navigasi: "Sequential Guidance (Alur Bertahap)"
      },
      desc: "Perhatikan: Kurikulum berurutan per modul dengan lencana [REKOMENDASI], dan banner dorongan mengapresiasi ritme belajar yang stabil."
    },
    {
      label: "Simulasi Mahasiswa Cluster 2 (Intensif & Reflektif)",
      user: {
        role: "m",
        nim: "2315091092",
        nama: "VERY IRAWAN SIMBOLON",
        cluster: 2,
        profil: "Pembelajar Intensif & Reflektif (High-Intensity Reflective)",
        inisial: "VI",
        navigasi: "Hierarchical Guidance (Eksplorasi Mendalam)"
      },
      desc: "Perhatikan: Modul studi kasus dan lab terapan diutamakan dengan lencana [PENGAYAAN], dan banner dorongan menantang analisis keamanan tingkat lanjut."
    },
    {
      label: "Simulasi Peran Dosen Pengampu",
      user: {
        role: "d",
        nama: "Dr. I Gede Dosen Pengampu, M.Kom.",
        nip: "198507122010121002",
        inisial: "DS"
      },
      desc: "Akses penuh ke dashboard analitik dosen, pengunggahan materi baru, penugasan, dan tabel 128 mahasiswa."
    }
  ];

  return (
    <>
      <TitleHeader
        title="Panel Pengembang & Simulasi Inferensi Model"
        subtitle="Uji respons adaptif sistem secara instan dan jalankan inferensi otomatis untuk mahasiswa baru."
      />

      {/* Bagian 1: Form Inferensi Mahasiswa Baru */}
      <div className="kartu besar masuk" style={{ border: "2px solid var(--ungu)", background: "linear-gradient(135deg, var(--kartu) 0%, var(--lav-terang) 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--ungu)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="cpu" size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: "16px" }}>Simulasi Inferensi Mahasiswa Baru (Dynamic Clustering)</h3>
            <p className="cap">Masukkan aktivitas belajar mahasiswa baru untuk menguji klasifikasi otomatis Machine Learning secara real-time.</p>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="chips" style={{ marginTop: "10px" }}>
          <span className="cap" style={{ fontWeight: 600 }}>Muat Preset Simulasi:</span>
          <button type="button" className="chip-btn" onClick={() => presetSimulasi("rendah")}>
            Tingkat Aktivitas Rendah (Arah Klaster 0)
          </button>
          <button type="button" className="chip-btn" onClick={() => presetSimulasi("sedang")}>
            Tingkat Aktivitas Konsisten (Arah Klaster 1)
          </button>
          <button type="button" className="chip-btn" onClick={() => presetSimulasi("tinggi")}>
            Tingkat Aktivitas Tinggi (Arah Klaster 2)
          </button>
        </div>

        <form onSubmit={handleJalankanPrediksi} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "14px" }}>
          <div className="dua">
            <div className="input-grup">
              <label>NIM Mahasiswa Baru</label>
              <input type="text" className="input-teks" value={nimBaru} onChange={(e) => setNimBaru(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Nama Mahasiswa</label>
              <input type="text" className="input-teks" value={namaBaru} onChange={(e) => setNamaBaru(e.target.value)} />
            </div>
          </div>

          <div className="dua">
            <div className="input-grup">
              <label>Akses Visual H5P (visual_count)</label>
              <input type="number" className="input-teks" value={visualCount} onChange={(e) => setVisualCount(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Akses Dokumen Teks (verbal_count)</label>
              <input type="number" className="input-teks" value={verbalCount} onChange={(e) => setVerbalCount(e.target.value)} />
            </div>
          </div>

          <div className="dua">
            <div className="input-grup">
              <label>Aksi Aktif Tugas/Forum (active_actions)</label>
              <input type="number" className="input-teks" value={activeActions} onChange={(e) => setActiveActions(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Aksi Telaah Materi (reflective_actions)</label>
              <input type="number" className="input-teks" value={reflectiveActions} onChange={(e) => setReflectiveActions(e.target.value)} />
            </div>
          </div>

          <div className="dua">
            <div className="input-grup">
              <label>Pengerjaan Kuis Terapan (practical_engagement)</label>
              <input type="number" className="input-teks" value={practicalEngagement} onChange={(e) => setPracticalEngagement(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Jumlah Hari Aktif (active_days)</label>
              <input type="number" className="input-teks" value={activeDays} onChange={(e) => setActiveDays(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "12px 24px" }}>
            <Icon name="cpu" size={16} />
            <span>Jalankan Prediksi Klaster Otomatis (Machine Learning)</span>
          </button>
        </form>

        {/* Hasil Prediksi Box */}
        {hasilPrediksi && (
          <div className="masuk" style={{ marginTop: "16px", padding: "20px", background: "var(--kartu)", borderRadius: "var(--radius-lg)", border: `2px solid ${hasilPrediksi.profile.warna}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AdaptiveBadge type={hasilPrediksi.cluster === 0 ? "utama" : hasilPrediksi.cluster === 2 ? "pengayaan" : "rekomendasi"} />
                <h4 style={{ fontSize: "16px", color: hasilPrediksi.profile.warna }}>
                  Hasil: {hasilPrediksi.profile.namaLengkap}
                </h4>
              </div>
              <button className="tombol" onClick={handleMasukSebagaiMahasiswaIni}>
                <span>Masuk Portal Sebagai Mahasiswa Ini & Uji Adaptasi →</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "14px" }}>
              <div style={{ background: "var(--lav-terang)", padding: "10px 14px", borderRadius: "var(--radius-md)" }}>
                <span className="cap">Format Media Prioritas:</span>
                <b style={{ display: "block", fontSize: "12px", marginTop: "2px" }}>{hasilPrediksi.recommendation.formatPrioritas}</b>
              </div>
              <div style={{ background: "var(--lav-terang)", padding: "10px 14px", borderRadius: "var(--radius-md)" }}>
                <span className="cap">Strategi Navigasi:</span>
                <b style={{ display: "block", fontSize: "12px", marginTop: "2px" }}>{hasilPrediksi.recommendation.navigasi}</b>
              </div>
              <div style={{ background: "var(--lav-terang)", padding: "10px 14px", borderRadius: "var(--radius-md)" }}>
                <span className="cap">Rasio Visual Terhitung:</span>
                <b style={{ display: "block", fontSize: "12px", marginTop: "2px" }}>{hasilPrediksi.computedFeatures.visual_ratio}</b>
              </div>
            </div>

            <p style={{ marginTop: "12px", fontSize: "12px", color: "var(--teks)", lineHeight: "1.5" }}>
              <b>Pesan Nudge Adaptif:</b> <em>"{hasilPrediksi.recommendation.pesan}"</em>
            </p>
          </div>
        )}
      </div>

      {/* Bagian 2: Tombol Cepat Pindah Akun */}
      <div className="kartu besar masuk">
        <h3 style={{ fontSize: "16px" }}>Beralih Profil Pengguna Cepat (Simulasi Preset)</h3>
        <p className="cap">
          Klik tombol simulasi di bawah untuk mengamati perubahan antarmuka mahasiswa berdasarkan 3 Dimensi Adaptasi:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
          {simulationUsers.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                padding: "16px",
                background: "var(--lav-terang)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--garis)"
              }}
            >
              <div style={{ flex: 1, minWidth: "260px" }}>
                <b style={{ fontSize: "13px", color: "var(--ungu)" }}>{item.label}</b>
                <p style={{ fontSize: "11.5px", color: "var(--teks)", marginTop: "4px", lineHeight: "1.5" }}>
                  {item.desc}
                </p>
              </div>

              <button
                className="tombol"
                onClick={() => {
                  onSwitchUser(item.user);
                  onNavigate(item.user.role === "d" ? "dosen" : "beranda");
                }}
              >
                <span>Aktifkan Profil Ini →</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian 3: Reset Data Storage */}
      <div className="kartu besar masuk" style={{ border: "1px solid rgba(211,78,52,0.3)" }}>
        <h3 style={{ fontSize: "15px", color: "var(--salah)" }}>Manajemen Penyimpanan Lokal (Local Storage)</h3>
        <p className="abu" style={{ fontSize: "12px" }}>
          Reset seluruh data sesi, progres pengerjaan modul mahasiswa, penugasan buatan dosen, dan kembalikan sistem ke kondisi awal riset.
        </p>

        <div style={{ marginTop: "12px" }}>
          <button className="tombol bahaya" onClick={onResetData}>
            <Icon name="alert-triangle" size={14} color="#fff" />
            <span>Reset Seluruh Data ke Setelan Awal</span>
          </button>
        </div>
      </div>
    </>
  );
}
