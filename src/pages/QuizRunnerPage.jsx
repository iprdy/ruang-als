import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { ProgressBar } from "../components/common/ProgressBar";
import { Icon } from "../assets/icons";

export function QuizRunnerPage({
  modul,
  questions = [],
  onFinishQuiz,
  onNavigate
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const fallbackQuestions = [
    {
      q: `Apa pemahaman esensial dari modul ${modul?.t || "ini"}?`,
      opsi: [
        "Memahami konsep dasar secara analitis dan terstruktur",
        "Mengabaikan instruksi dan prinsip yang diajarkan",
        "Menutup browser tanpa menyelesaikan materi"
      ],
      benar: 0,
      ulasan: "Tepat. Pemahaman konsep secara terstruktur adalah fondasi penguasaan materi."
    }
  ];

  const activeQuestions = questions && questions.length > 0 ? questions : fallbackQuestions;
  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];
  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100);

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.benar;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(-1);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (onFinishQuiz) {
        onFinishQuiz(modul?.id, score + (selectedOption === currentQ.benar ? 1 : 0));
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(-1);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const finalScore = Math.round((score / activeQuestions.length) * 100);
    const isPassed = finalScore >= 70;

    return (
      <div className="kartu besar masuk" style={{ textAlign: "center", padding: "40px 24px", maxWidth: "600px", margin: "20px auto" }}>
        <div style={{ fontSize: "56px", marginBottom: "8px" }}>
          {isPassed ? "🎉" : "📚"}
        </div>
        <h2>{isPassed ? "Luar Biasa, Pemahaman Teruji!" : "Tetap Semangat, Evaluasi Pemahaman!"}</h2>
        <p className="abu" style={{ marginTop: "6px" }}>
          Kuis Formatif: <b>{modul?.t}</b>
        </p>

        <div style={{ margin: "24px 0", padding: "20px", background: "var(--lav)", borderRadius: "var(--radius-lg)" }}>
          <span className="stat-nilai" style={{ fontSize: "52px" }}>{finalScore}</span>
          <span style={{ display: "block", fontSize: "12px", color: "var(--abu)", marginTop: "4px" }}>
            Skor Akhir ({score} dari {activeQuestions.length} soal terjawab benar)
          </span>
        </div>

        <div className="tombol-baris" style={{ justifyContent: "center" }}>
          <button className="tombol alt" onClick={handleRestartQuiz}>
            <span>Ulangi Kuis</span>
          </button>
          <button className="tombol" onClick={() => onNavigate(`lesson:${modul?.id}`)}>
            <span>Kembali ke Modul</span>
            <Icon name="arrow-right" size={14} />
          </button>
          <button className="tombol alt" onClick={() => onNavigate("materi")}>
            <span>Katalog Materi</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="tombol alt" onClick={() => onNavigate(`lesson:${modul?.id}`)} style={{ padding: "6px 12px", fontSize: "11px" }}>
          <Icon name="arrow-left" size={14} />
          <span>Keluar Kuis</span>
        </button>
        <span className="cap">
          Soal <b>{currentIndex + 1}</b> dari <b>{activeQuestions.length}</b>
        </span>
      </div>

      <TitleHeader
        title={`Kuis Formatif: ${modul?.t}`}
        subtitle="Uji pemahaman konsep melalui pertanyaan evaluasi adaptif."
      />

      <ProgressBar persen={progressPercent} height={8} />

      <div className="kartu besar masuk" style={{ marginTop: "10px" }}>
        <h3 style={{ fontSize: "16px", lineHeight: "1.4", fontWeight: 700 }}>
          {currentQ.q}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
          {currentQ.opsi.map((opsiText, idx) => {
            let statusClass = "";
            if (isAnswered) {
              if (idx === currentQ.benar) statusClass = "benar";
              else if (idx === selectedOption) statusClass = "salah";
            }

            return (
              <button
                key={idx}
                className={`opsi ${statusClass}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
              >
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--lav)", color: "var(--ungu)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700" }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span style={{ flex: 1 }}>{opsiText}</span>
                {isAnswered && idx === currentQ.benar && <Icon name="check-circle" size={18} color="var(--ok)" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.benar && <Icon name="alert-triangle" size={18} color="var(--salah)" />}
              </button>
            );
          })}
        </div>

        {/* Review Explanation */}
        {isAnswered && (
          <div className="masuk" style={{ marginTop: "18px", padding: "14px 18px", background: "var(--lav-terang)", borderRadius: "var(--radius-md)", borderLeft: `4px solid ${selectedOption === currentQ.benar ? "var(--ok)" : "var(--salah)"}` }}>
            <b style={{ color: selectedOption === currentQ.benar ? "var(--ok)" : "var(--salah)", fontSize: "12px" }}>
              {selectedOption === currentQ.benar ? "✓ Jawaban Benar!" : "✗ Jawaban Belum Tepat"}
            </b>
            <p style={{ marginTop: "4px", fontSize: "12px", lineHeight: "1.5", color: "var(--teks)" }}>
              {currentQ.ulasan}
            </p>

            <button
              className="tombol"
              style={{ marginTop: "12px" }}
              onClick={handleNextQuestion}
            >
              <span>{currentIndex + 1 < activeQuestions.length ? "Lanjut ke Soal Berikutnya" : "Lihat Hasil Kuis"}</span>
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
