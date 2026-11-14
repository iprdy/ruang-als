import React, { useState } from "react";
import { Judul } from "../components/Judul";
import { KUIS_PER_MODUL, MATERI } from "../data/learningData";

export function Kuis({ i, ke, selesaiKuis, onSetSalahSoal, kuisList = KUIS_PER_MODUL, materiList = MATERI }) {
  const soalList = (kuisList && kuisList[i]) || KUIS_PER_MODUL[i] || KUIS_PER_MODUL[0] || [];
  const [no, setNo] = useState(0);
  const [pilih, setPilih] = useState(-1);

  const modulNama = (materiList[i] && materiList[i].t) || `Modul ${i + 1}`;

  if (!soalList || soalList.length === 0) {
    return (
      <>
        <Judul t="Kuis pemrograman" x={`Modul: ${modulNama}`} />
        <div className="kartu besar">
          <h3>Belum ada soal kuis untuk modul ini.</h3>
          <p className="abu">Dosen pengampu dapat menambahkan soal kuis baru melalui menu 'Kelola Materi & Kuis'.</p>
          <div className="tombol-baris">
            <button className="tombol alt" onClick={() => ke("lesson:" + i)}>
              ← Kembali ke materi
            </button>
          </div>
        </div>
      </>
    );
  }

  const soal = soalList[no];
  const benar = pilih === soal.benar;

  const jawab = (k) => {
    setPilih(k);
    if (k !== soal.benar) {
      if (onSetSalahSoal) {
        onSetSalahSoal({ ...soal, pilihanUser: k });
      }
      setTimeout(() => ke("salah:" + i), 700);
    }
  };

  const lanjut = () => {
    if (no < soalList.length - 1) {
      setNo(no + 1);
      setPilih(-1);
    } else {
      selesaiKuis(100);
    }
  };

  return (
    <>
      <Judul
        t="Kuis pemrograman"
        x={`Pertanyaan ${no + 1} dari ${soalList.length} · ${modulNama} · Pilih satu jawaban yang tepat`}
      />
      <div className="kartu besar" key={no}>
        <h3>{soal.q}</h3>
        {soal.opsi.map((o, k) => (
          <button
            key={o}
            disabled={pilih > -1}
            className={
              "opsi" +
              (pilih === k
                ? k === soal.benar
                  ? " benar"
                  : " salah"
                : "")
            }
            onClick={() => jawab(k)}
          >
            {pilih === k ? "●" : "○"} {o}
          </button>
        ))}

        {benar ? (
          <>
            <p className="ok-teks">✓ Jawaban benar!</p>
            {soal.ulasan && <p className="abu" style={{ marginTop: "4px" }}>{soal.ulasan}</p>}
            <div style={{ marginTop: "12px" }}>
              <button className="tombol" onClick={lanjut}>
                {no < soalList.length - 1 ? "Pertanyaan berikutnya →" : "Lihat hasil kuis →"}
              </button>
            </div>
          </>
        ) : (
          <p className="cap" style={{ marginTop: "12px" }}>
            {pilih > -1 ? "Belum tepat…" : "Pilih salah satu opsi untuk melanjutkan."}
          </p>
        )}
      </div>

      <div className="tombol-baris">
        <button className="tombol alt" onClick={() => ke("lesson:" + i)}>
          ← Kembali ke materi
        </button>
      </div>
    </>
  );
}
