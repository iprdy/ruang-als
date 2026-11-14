import React from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { MultiModalContent } from "../components/als/MultiModalContent";
import { Icon } from "../assets/icons";

export function LessonDetailPage({
  modul,
  quizList = {},
  preferredFormat = "visual",
  isCompleted = false,
  onStartQuiz,
  onMarkComplete,
  onNavigate
}) {
  if (!modul) {
    return (
      <div className="kartu besar" style={{ textAlign: "center", padding: "60px" }}>
        <h3>Modul Tidak Ditemukan</h3>
        <p className="abu" style={{ marginTop: "8px" }}>Silakan kembali ke katalog untuk memilih modul pembelajaran yang valid.</p>
        <button className="tombol" style={{ marginTop: "16px" }} onClick={() => onNavigate("materi")}>
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const moduleQuizzes = quizList[modul.id] || [];
  const hasQuiz = moduleQuizzes.length > 0;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "-10px" }}>
        <button className="tombol alt" onClick={() => onNavigate("materi")} style={{ padding: "6px 12px", fontSize: "11px" }}>
          <Icon name="arrow-left" size={14} />
          <span>Kembali ke Katalog</span>
        </button>
        <span className="cap">
          Trek: <b>{modul.trackTitle}</b> • Estimasi: <b>{modul.menit} menit</b>
        </span>
      </div>

      <TitleHeader
        title={modul.t}
        subtitle={`${modul.f} • Modul Pembelajaran Terpersonalisasi`}
      />

      {/* Alur Konsep */}
      <div className="alur" style={{ fontSize: "15px", fontWeight: "600", padding: "16px 20px" }}>
        ⚡ {modul.v}
      </div>

      {/* Multi-Modal Content Viewer (Adaptive Presentation) */}
      <MultiModalContent modul={modul} preferredFormat={preferredFormat} />

      {/* Konsep Inti & Kode Referensi */}
      <div className="kartu besar masuk">
        <h3 style={{ fontSize: "15px" }}>Konsep Utama & Skenario Implementasi</h3>
        <p style={{ lineHeight: "1.6", color: "var(--teks)" }}>{modul.d}</p>

        {modul.contoh && modul.contoh.length > 0 && (
          <div style={{ marginTop: "12px", background: "var(--kartu)", border: "1px solid var(--garis)", borderRadius: "var(--radius-md)", padding: "16px" }}>
            <span className="cap" style={{ fontWeight: 700, color: "var(--ungu)" }}>
              Sintaks / Implementasi Referensi:
            </span>
            <pre style={{ margin: "8px 0 0 0", fontFamily: "Consolas, Monaco, monospace", fontSize: "12px", overflowX: "auto", color: "var(--teks)", lineHeight: "1.5" }}>
              {modul.contoh.join("\n")}
            </pre>
          </div>
        )}
      </div>

      {/* Action / Evaluation Card */}
      <div className="kartu besar masuk" style={{ background: "var(--lav-terang)", border: "1px solid var(--ungu2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <h3 style={{ fontSize: "15px" }}>Evaluasi & Konfirmasi Pembelajaran</h3>
            <p className="abu" style={{ fontSize: "12px", marginTop: "2px" }}>
              {hasQuiz
                ? `Tersedia ${moduleQuizzes.length} soal kuis formatif untuk menguji tingkat pemahamanmu.`
                : "Tandai modul ini telah selesai dipelajari untuk memperbarui profil progresmu."}
            </p>
          </div>

          <div className="tombol-baris">
            {hasQuiz && (
              <button className="tombol" onClick={() => onStartQuiz(modul.id)}>
                <Icon name="award" size={15} />
                <span>Mulai Kuis Modul ({moduleQuizzes.length} Soal)</span>
              </button>
            )}

            <button
              className={`tombol ${isCompleted ? "alt" : ""}`}
              onClick={() => onMarkComplete(modul.id)}
            >
              <Icon name="check-circle" size={15} />
              <span>{isCompleted ? "✓ Sudah Ditandai Selesai" : "Tandai Selesai"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
