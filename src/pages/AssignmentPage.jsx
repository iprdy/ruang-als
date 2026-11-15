import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { Icon } from "../assets/icons";

export function AssignmentPage({
  assignments = [],
  user,
  onSubmitAssignment,
  onGradeAssignment
}) {
  const isLecturer = user?.role === "d";
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'submitted' | 'graded'
  const [activeAssignmentId, setActiveAssignmentId] = useState(null);

  // Form Submission Mahasiswa
  const [submissionText, setSubmissionText] = useState("");
  const [mockFileName, setMockFileName] = useState("");

  // Form Penilaian Dosen
  const [inputNilai, setInputNilai] = useState("");
  const [inputFeedback, setInputFeedback] = useState("");

  const activeAssignment = assignments.find((a) => a.id === activeAssignmentId);

  const filteredAssignments = assignments.filter((a) => {
    if (filter === "pending") return a.status === "Belum Dikumpulkan";
    if (filter === "submitted") return a.status === "Menunggu Penilaian";
    if (filter === "graded") return a.status === "Dinilai";
    return true;
  });

  const handleOpenDetail = (assignment) => {
    setActiveAssignmentId(assignment.id);
    setSubmissionText(assignment.submissionData?.teksJawaban || "");
    setMockFileName(assignment.submissionData?.fileName || "");
    setInputNilai(assignment.nilai !== null ? String(assignment.nilai) : "");
    setInputFeedback(assignment.feedbackDosen || "");
  };

  const handleSendSubmission = (e) => {
    e.preventDefault();
    if (!submissionText.trim() && !mockFileName) {
      alert("Harap masukkan teks jawaban online atau pilih berkas lampiran laporan.");
      return;
    }

    const submissionPayload = {
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      teksJawaban: submissionText.trim(),
      fileName: mockFileName || "laporan_analisis_tugas.pdf"
    };

    onSubmitAssignment(activeAssignment.id, submissionPayload);
    alert("✓ Tugas berhasil dikumpulkan ke sistem pembelajaran.");
  };

  const handleSendGrade = (e) => {
    e.preventDefault();
    const scoreNum = Number(inputNilai);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      alert("Nilai harus berupa angka antara 0 hingga 100.");
      return;
    }

    onGradeAssignment(activeAssignment.id, scoreNum, inputFeedback.trim());
    alert("✓ Penilaian berhasil disimpan dan diterbitkan untuk mahasiswa.");
  };

  return (
    <>
      <TitleHeader
        title={isLecturer ? "Manajemen Penugasan Mahasiswa (Assignment Portal)" : "Penugasan & Evaluasi Mandiri (Assignment)"}
        subtitle="Komponen LMS Moodle: Pelacakan penugasan terapan, pengumpulan teks online, dan penilaian dosen."
      />

      <div className="dua-kolom">
        {/* Kolom Kiri: Daftar Tugas */}
        <div className="tumpuk">
          {/* Filter Status */}
          <div className="chips">
            <button className={`chip-btn ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>
              Semua Tugas ({assignments.length})
            </button>
            <button className={`chip-btn ${filter === "pending" ? "on" : ""}`} onClick={() => setFilter("pending")}>
              Belum Dikumpulkan
            </button>
            <button className={`chip-btn ${filter === "submitted" ? "on" : ""}`} onClick={() => setFilter("submitted")}>
              Menunggu Penilaian
            </button>
            <button className={`chip-btn ${filter === "graded" ? "on" : ""}`} onClick={() => setFilter("graded")}>
              Sudah Dinilai
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filteredAssignments.map((item) => {
              const isSelected = item.id === activeAssignmentId;
              let statusBadgeClass = "badge-prioritas rekomendasi";
              if (item.status === "Dinilai") statusBadgeClass = "badge-prioritas pengayaan";
              if (item.status === "Belum Dikumpulkan") statusBadgeClass = "badge-prioritas utama";

              return (
                <div
                  key={item.id}
                  className={`kartu interaktif masuk ${isSelected ? "dipilih" : ""}`}
                  style={{
                    cursor: "pointer",
                    borderColor: isSelected ? "var(--ungu)" : "var(--garis)",
                    background: isSelected ? "var(--lav-terang)" : "var(--kartu)"
                  }}
                  onClick={() => handleOpenDetail(item)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <div>
                      <span className="cap" style={{ fontWeight: 700, color: "var(--ungu)" }}>
                        {item.id} • Bobot: {item.bobot} Poin
                      </span>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, marginTop: "2px" }}>{item.judul}</h4>
                    </div>
                    <span className={statusBadgeClass} style={{ textTransform: "none", fontSize: "10.5px" }}>
                      {item.status === "Dinilai" ? `✓ Nilai: ${item.nilai}/100` : item.status}
                    </span>
                  </div>

                  <p className="abu" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    {item.deskripsi}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", marginTop: "6px" }}>
                    <span className="cap" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Icon name="clock" size={13} />
                      Batas Waktu: {item.deadline} WIB
                    </span>
                    <span className="link">Buka Lembar Tugas →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Detail & Form Pengumpulan/Penilaian */}
        <div className="tumpuk">
          {activeAssignment ? (
            <div className="kartu besar masuk">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Icon name="clipboard" size={20} color="var(--ungu)" />
                <h3 style={{ fontSize: "15px" }}>Lembar Kerja: {activeAssignment.id}</h3>
              </div>
              <b style={{ fontSize: "13px" }}>{activeAssignment.judul}</b>
              <p className="abu" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                {activeAssignment.deskripsi}
              </p>

              {/* Status Submission Saat Ini */}
              <div style={{ background: "var(--lav)", padding: "12px 14px", borderRadius: "var(--radius-md)", fontSize: "11.5px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="abu">Status Tugas:</span>
                  <b style={{ color: activeAssignment.status === "Dinilai" ? "var(--ok)" : "var(--ungu)" }}>
                    {activeAssignment.status}
                  </b>
                </div>
                {activeAssignment.submissionData && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="abu">Waktu Pengumpulan:</span>
                    <span>{activeAssignment.submissionData.submittedAt}</span>
                  </div>
                )}
                {activeAssignment.nilai !== null && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="abu">Nilai Akhir:</span>
                    <b style={{ fontSize: "14px", color: "var(--ok)" }}>{activeAssignment.nilai} / 100</b>
                  </div>
                )}
              </div>

              {/* Catatan Feedback Dosen jika ada */}
              {activeAssignment.feedbackDosen && (
                <div style={{ background: "var(--ok-bg)", border: "1px solid rgba(32,134,78,0.3)", padding: "12px", borderRadius: "var(--radius-md)" }}>
                  <span className="cap" style={{ fontWeight: 700, color: "var(--ok)" }}>💬 Catatan & Ulasan Dosen:</span>
                  <p style={{ fontSize: "12px", marginTop: "4px", color: "var(--teks)" }}>
                    {activeAssignment.feedbackDosen}
                  </p>
                </div>
              )}

              {/* Form Mahasiswa: Online Text Submission */}
              {!isLecturer && (
                <form onSubmit={handleSendSubmission} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
                  <div className="input-grup">
                    <label>Teks Pengumpulan Online (Online Text Submission):</label>
                    <textarea
                      className="input-teks"
                      rows={4}
                      placeholder="Ketikkan ringkasan hasil analisis, argumen, atau sintaks perintah di sini..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                    />
                  </div>

                  <div className="input-grup">
                    <label>Simulasi Unggah Berkas Laporan (.pdf / .docx):</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        className="input-teks"
                        placeholder="Nama file lampiran (contoh: laporan_tugas_01_nim.pdf)"
                        value={mockFileName}
                        onChange={(e) => setMockFileName(e.target.value)}
                      />
                      <button
                        type="button"
                        className="tombol alt"
                        onClick={() => setMockFileName(`laporan_${activeAssignment.id.toLowerCase()}_${user?.nim || "mhs"}.pdf`)}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <Icon name="upload" size={14} />
                        <span>Lampirkan</span>
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="tombol" style={{ padding: "11px 18px", marginTop: "4px" }}>
                    <Icon name="send" size={15} />
                    <span>{activeAssignment.submissionData ? "Perbarui Pengumpulan Tugas" : "Kumpulkan Tugas Sekarang"}</span>
                  </button>
                </form>
              )}

              {/* Form Dosen: Beri Nilai & Ulasan */}
              {isLecturer && (
                <form onSubmit={handleSendGrade} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px", borderTop: "1px solid var(--garis)", paddingTop: "14px" }}>
                  <b style={{ fontSize: "12.5px", color: "var(--ungu)" }}>👨‍🏫 Portal Penilaian Dosen:</b>

                  {activeAssignment.submissionData ? (
                    <div style={{ background: "var(--lav-terang)", padding: "12px", borderRadius: "var(--radius-md)", fontSize: "11.5px" }}>
                      <b>Jawaban Teks Mahasiswa:</b>
                      <p style={{ marginTop: "4px", color: "var(--teks)" }}>{activeAssignment.submissionData.teksJawaban}</p>
                      <span className="cap" style={{ display: "block", marginTop: "6px" }}>
                        Berkas: <code>{activeAssignment.submissionData.fileName}</code>
                      </span>
                    </div>
                  ) : (
                    <p className="abu" style={{ fontSize: "11.5px" }}>Mahasiswa belum mengumpulkan tugas ini.</p>
                  )}

                  <div className="input-grup">
                    <label>Beri Skor Nilai (0 - 100):</label>
                    <input
                      type="number"
                      className="input-teks"
                      placeholder="Contoh: 95"
                      value={inputNilai}
                      onChange={(e) => setInputNilai(e.target.value)}
                    />
                  </div>

                  <div className="input-grup">
                    <label>Ulasan & Feedback Dosen:</label>
                    <textarea
                      className="input-teks"
                      rows={3}
                      placeholder="Tuliskan umpan balik untuk membimbing mahasiswa..."
                      value={inputFeedback}
                      onChange={(e) => setInputFeedback(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="tombol" style={{ padding: "10px 18px" }}>
                    <Icon name="award" size={15} />
                    <span>Simpan & Terbitkan Penilaian</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="kartu besar" style={{ textAlign: "center", padding: "40px 20px" }}>
              <Icon name="clipboard" size={36} color="var(--abu)" />
              <h3 style={{ fontSize: "14px", marginTop: "8px" }}>Pilih Tugas di Sebelah Kiri</h3>
              <p className="abu" style={{ fontSize: "11.5px", marginTop: "4px" }}>
                Klik salah satu penugasan untuk melihat rincian instruksi, formulir pengumpulan online text, dan status penilaian.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
