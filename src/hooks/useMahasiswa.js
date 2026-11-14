import { useState, useEffect } from "react";
import { CONTOH_MHS } from "../data/learningData";

// Membaca student_features.csv dari folder public/ (data asli dari notebook)
export function useMahasiswa() {
  const [data, setData] = useState(CONTOH_MHS);
  const [dariCSV, setDariCSV] = useState(false);

  useEffect(() => {
    fetch("/student_features.csv")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((teks) => {
        const [kepala, ...baris] = teks.trim().split("\n").map((b) => b.split(","));
        const i = (k) => kepala.indexOf(k);

        const list = baris
          .filter((b) => b.length >= 8 && b[i("NIM")])
          .map((b) => {
            const h5p = +b[i("visual_count")] || 0;
            const teksJml = +b[i("verbal_count")] || 0;
            const ratio = +b[i("visual_ratio")] || 0;
            const aktif = +b[i("active_actions")] || 0;
            const reflektif = +b[i("reflective_actions")] || 0;
            const hari = +b[i("active_days")] || 0;

            // Klasifikasi klaster logis
            let cluster = 0;
            if (aktif >= 48) {
              cluster = 1; // Practice-Oriented
            } else if (ratio < 0.90 || teksJml >= 55) {
              cluster = 2; // Reflective / Text Reviewer
            } else {
              cluster = 0; // Visual-Dominant
            }

            return {
              nim: b[i("NIM")].trim(),
              nama: b[i("Nama")].trim(),
              h5p,
              teks: teksJml,
              ratio,
              aktif,
              reflektif,
              hari,
              cluster
            };
          });

        if (list.length > 0) {
          setData(list);
          setDariCSV(true);
        }
      })
      .catch((err) => {
        console.warn("Menggunakan data mahasiswa bawaan:", err);
      });
  }, []);

  return [data, dariCSV];
}
