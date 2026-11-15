import React from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { StatCard } from "../components/common/StatCard";
import { ProgressBar } from "../components/common/ProgressBar";
import { AdaptiveBadge } from "../components/common/AdaptiveBadge";
import { Icon } from "../assets/icons";

export function UserReportPage({
  user,
  profile,
  modules = [],
  completedModules = {},
  quizzes = {},
  assignments = []
}) {
  const isLecturer = user?.role === "d";

  // Hitung Metrik Kuis
  const completedCount = Object.keys(completedModules).length;
  const totalModules = Math.max(modules.length, 1);
  const completionRate = Math.min(100, Math.round((completedCount / totalModules) * 100));

  // Hitung Rata-rata Tugas
  const gradedAssignments = assignments.filter((a) => a.nilai !== null);
  const avgAssignmentScore = gradedAssignments.length > 0
    ? Math.round(gradedAssignments.reduce((acc, curr) => acc + curr.nilai, 0) / gradedAssignments.length)
    : 88;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <TitleHeader
          title={isLecturer ? "Laporan Evaluasi Akademik (User Report Portal)" : "Laporan Nilai & Evaluasi Belajar (User Report)"}
          subtitle="Komponen LMS Moodle: Rekapitulasi capaian kuis formatif, penugasan, partisipasi forum, dan profil FSLSM."
        />
        <button className="tombol alt" onClick={handlePrint} style={{ alignSelf: "flex-start" }}>
          <Icon name="clipboard" size={15} />
          <span>Cetak / Unduh Rapor</span>
        </button>
      </div>

      {/* Profil Mahasiswa Banner */}
      <div className="kartu besar masuk" style={{ background: "linear-gradient(135deg, var(--lav) 0%, var(--lav-terang) 100%)", border: "1px solid var(--ungu2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--ungu)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>
              {user?.inisial || "MH"}
            </div>
            <div>
              <h3 style={{ fontSize: "16px" }}>{user?.nama || "Mahasiswa"}</h3>
              <span className="cap" style={{ fontSize: "12px" }}>
                NIM: <b>{user?.nim || "198507122010121002"}</b> • Mata Kuliah: <b>Keamanan Sistem Informasi (SIFS124407)</b>
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="cap" style={{ fontWeight: 600 }}>Klaster FSLSM:</span>
            <AdaptiveBadge
              type={user?.cluster === 0 ? "utama" : user?.cluster === 2 ? "pengayaan" : "rekomendasi"}
              label={profile?.nama || "Pembelajar Konsisten"}
            />
          </div>
        </div>
      </div>

      {/* Ringkasan Statistik */}
      <div className="stats-grid">
        <StatCard nilai={completionRate} label="Progres Materi Kurikulum (%)" icon="activity" />
        <StatCard nilai={avgAssignmentScore} label="Rata-rata Nilai Tugas" icon="award" />
        <StatCard nilai={completedCount} label="Modul Dituntaskan" icon="check-circle" />
      </div>

      <div className="dua">
        {/* Tabel 1: Capaian Kuis Formatif (Quiz Component) */}
        <div className="kartu besar masuk">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "15px" }}>Evaluasi Kuis Formatif (Quiz Component)</h3>
            <span className="cap">Standar KKM: 70 Poin</span>
          </div>

          <div className="geser">
            <table>
              <thead>
                <tr>
                  <th>Modul</th>
                  <th>Status</th>
                  <th>Skor</th>
                  <th>Hasil</th>
                </tr>
              </thead>
              <tbody>
                {modules.slice(0, 6).map((m) => {
                  const isDone = !!completedModules[m.id];
                  const score = isDone ? 100 : 0;
                  return (
                    <tr key={m.id}>
                      <td>
                        <b>{m.id}</b>: {m.t}
                      </td>
                      <td>
                        <span className={isDone ? "ok-teks" : "cap"} style={{ fontSize: "11px" }}>
                          {isDone ? "✓ Selesai" : "Belum Ambil"}
                        </span>
                      </td>
                      <td><b>{score}</b> / 100</td>
                      <td>
                        <span
                          className={`badge-prioritas ${isDone ? "pengayaan" : "utama"}`}
                          style={{ fontSize: "9.5px", padding: "2px 6px" }}
                        >
                          {isDone ? "Lulus" : "Tunda"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 2: Penugasan & Submission (Assignment Component) */}
        <div className="kartu besar masuk">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "15px" }}>Penugasan Mandiri (Assignment Component)</h3>
            <span className="cap">{assignments.length} Tugas Total</span>
          </div>

          <div className="geser">
            <table>
              <thead>
                <tr>
                  <th>Kode Tugas</th>
                  <th>Status Pengumpulan</th>
                  <th>Nilai</th>
                  <th>Feedback Dosen</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <b>{item.id}</b>
                      <span className="cap" style={{ display: "block" }}>{item.judul.split(":")[0]}</span>
                    </td>
                    <td>
                      <span
                        className={`badge-prioritas ${item.status === "Dinilai" ? "pengayaan" : item.status === "Menunggu Penilaian" ? "rekomendasi" : "utama"}`}
                        style={{ fontSize: "9.5px", padding: "2px 6px" }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td><b>{item.nilai !== null ? item.nilai : "-"}</b></td>
                    <td style={{ fontSize: "11px", maxWidth: "160px" }}>
                      {item.feedbackDosen ? `"${item.feedbackDosen}"` : item.submissionData ? "Sedang direview" : "Belum ada"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rincian Dimensi Gaya Belajar FSLSM */}
      <div className="kartu besar masuk">
        <h3 style={{ fontSize: "15px" }}>Indikator Gaya Belajar FSLSM Terpetakan (Educational Data Mining)</h3>
        <p className="cap">Metrik aktivitas yang membentuk profil adaptif Anda dari analisis log Moodle:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "12px" }}>
          <div style={{ background: "var(--lav-terang)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
            <span className="cap">Dimensi Input (Visual vs Verbal):</span>
            <b style={{ display: "block", color: "var(--ungu)", marginTop: "4px" }}>
              {profile?.fslsmTraits?.input || "Visual Dominan (H5P)"}
            </b>
            <span className="cap" style={{ display: "block", marginTop: "6px" }}>
              Akses media infografis & simulasi diagram H5P.
            </span>
          </div>

          <div style={{ background: "var(--lav-terang)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
            <span className="cap">Dimensi Processing (Active vs Reflective):</span>
            <b style={{ display: "block", color: "var(--ok)", marginTop: "4px" }}>
              {profile?.fslsmTraits?.processing || "Seimbang & Teratur"}
            </b>
            <span className="cap" style={{ display: "block", marginTop: "6px" }}>
              Proporsi keaktifan tugas dan telaah modul bacaan.
            </span>
          </div>

          <div style={{ background: "var(--lav-terang)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--garis)" }}>
            <span className="cap">Dimensi Regularity (Active Days):</span>
            <b style={{ display: "block", color: "var(--peringatan)", marginTop: "4px" }}>
              {profile?.fslsmTraits?.regularity || "Kehadiran Stabil"}
            </b>
            <span className="cap" style={{ display: "block", marginTop: "6px" }}>
              Jumlah hari aktif login belajar di sepanjang semester.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
