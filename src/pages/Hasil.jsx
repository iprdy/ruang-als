import React from "react";
import { Judul } from "../components/Judul";
import { useAngka } from "../hooks/useAngka";
import { MATERI } from "../data/learningData";

export function Hasil({ judul, skor, i, ke, ulang, materiList = MATERI }) {
  const n = useAngka(skor ?? 0);
  const nextLessonId = (i + 1) % (materiList.length || MATERI.length);

  return (
    <>
      <Judul t={judul} />
      <div className="banner">
        SIMULASI PROTOTIPE · Hasil evaluasi dan pencapaian tercatat pada profil belajar adaptif.
      </div>
      <div className="kartu besar">
        {skor != null ? (
          <div className="angka-besar">{n} / 100</div>
        ) : (
          <h3>Selesai dipelajari</h3>
        )}
        <p>
          {skor != null
            ? "Seluruh pertanyaan kuis berhasil dijawab dengan tepat."
            : "Satu langkah penting lagi dalam perjalanan belajarmu."}
        </p>
        <p className="abu">Lanjutkan materi dan latihan untuk memperkuat pemahaman logika.</p>
        <div className="tombol-baris">
          <button className="tombol" onClick={() => ke("aktivitas")}>
            Lihat aktivitas
          </button>
          <button className="tombol alt" onClick={() => ke("lesson:" + nextLessonId)}>
            Materi berikutnya
          </button>
          <button className="tombol alt" onClick={() => ke("beranda")}>
            Kembali ke beranda
          </button>
          {ulang && (
            <button className="tombol alt" onClick={ulang}>
              Ulangi kuis
            </button>
          )}
        </div>
      </div>
    </>
  );
}
