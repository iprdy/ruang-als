import React, { useState } from "react";
import { Judul } from "../components/Judul";
import { KartuMateri } from "../components/KartuMateri";

export function KelolaMateri({
  materiList = [],
  kuisList = {},
  onTambahMateri,
  onHapusMateri,
  onTambahKuis,
  onTambahPengumuman,
  ke
}) {
  const [tab, setTab] = useState("materi_baru"); // 'materi_baru' | 'buat_kuis' | 'buat_tugas' | 'daftar_aktif'
  const [pesanSukses, setPesanSukses] = useState("");

  // Form State Materi Baru
  const [judulMateri, setJudulMateri] = useState("");
  const [kategori, setKategori] = useState("visual");
  const [format, setFormat] = useState("Diagram visual");
  const [menit, setMenit] = useState(12);
  const [deskripsi, setDeskripsi] = useState("");
  const [alur, setAlur] = useState("Inisialisasi → Evaluasi Logika → Eksekusi → Selesai");
  const [contoh, setContoh] = useState("// Contoh kode sederhana\nlet x = 10;\nif (x > 5) {\n  console.log('Nilai valid');\n}");

  // Form State Kuis Baru
  const [targetModulId, setTargetModulId] = useState(0);
  const [pertanyaan, setPertanyaan] = useState("");
  const [opsiA, setOpsiA] = useState("");
  const [opsiB, setOpsiB] = useState("");
  const [opsiC, setOpsiC] = useState("");
  const [kunciBenar, setKunciBenar] = useState(0);
  const [ulasan, setUlasan] = useState("");

  // Form State Tugas / Pengumuman
  const [judulTugas, setJudulTugas] = useState("");
  const [isiTugas, setIsiTugas] = useState("");
  const [tipeNotif, setTipeNotif] = useState("Tugas Pemrograman");

  // Handler Submit Materi
  const handleSimpanMateri = (e) => {
    e.preventDefault();
    if (!judulMateri.trim() || !deskripsi.trim()) {
      alert("Harap lengkapi judul materi dan ringkasan konsep.");
      return;
    }

    const baru = {
      id: materiList.length,
      t: judulMateri.trim(),
      f: format,
      menit: Number(menit) || 10,
      kat: kategori,
      d: deskripsi.trim(),
      v: alur.trim(),
      contoh: contoh.split("\n").filter((c) => c.trim().length > 0)
    };

    onTambahMateri(baru);
    setPesanSukses(`✓ Materi '${judulMateri}' berhasil dipublikasikan dan langsung dapat dipelajari oleh mahasiswa.`);
    setJudulMateri("");
    setDeskripsi("");
    setTimeout(() => setPesanSukses(""), 5000);
  };

  // Handler Submit Kuis
  const handleSimpanKuis = (e) => {
    e.preventDefault();
    if (!pertanyaan.trim() || !opsiA.trim() || !opsiB.trim() || !opsiC.trim()) {
      alert("Harap lengkapi pertanyaan dan seluruh opsi pilihan jawaban (A, B, C).");
      return;
    }

    const soalBaru = {
      q: pertanyaan.trim(),
      opsi: [opsiA.trim(), opsiB.trim(), opsiC.trim()],
      benar: Number(kunciBenar),
      ulasan: ulasan.trim() || "Jawaban ini sesuai dengan konsep materi yang diajarkan."
    };

    onTambahKuis(Number(targetModulId), soalBaru);
    const modulNama = materiList[targetModulId]?.t || `Modul ${targetModulId}`;
    setPesanSukses(`✓ Soal kuis baru berhasil ditambahkan untuk ${modulNama}.`);
    setPertanyaan("");
    setOpsiA("");
    setOpsiB("");
    setOpsiC("");
    setUlasan("");
    setTimeout(() => setPesanSukses(""), 5000);
  };

  // Handler Submit Pengumuman / Tugas
  const handleSimpanTugas = (e) => {
    e.preventDefault();
    if (!judulTugas.trim() || !isiTugas.trim()) {
      alert("Harap lengkapi judul dan instruksi pengumuman.");
      return;
    }

    const baru = {
      judul: judulTugas.trim(),
      isi: isiTugas.trim(),
      tipe: tipeNotif,
      waktu: "Baru saja diterbitkan oleh Dosen"
    };

    onTambahPengumuman(baru);
    setPesanSukses(`✓ ${tipeNotif} '${judulTugas}' berhasil dikirim ke seluruh mahasiswa.`);
    setJudulTugas("");
    setIsiTugas("");
    setTimeout(() => setPesanSukses(""), 5000);
  };

  return (
    <>
      <Judul
        t="Kelola Materi & Kuis"
        x="Portal dosen untuk mengunggah materi pembelajaran adaptif, membuat kuis evaluasi formatif, dan menerbitkan tugas mahasiswa."
      />

      <div className="banner">
        MODE PENGELOLAAN DOSEN · Seluruh materi dan kuis yang Anda tambahkan di sini akan langsung sinkron dan dapat diakses oleh seluruh mahasiswa.
      </div>

      {pesanSukses && (
        <div
          className="banner"
          style={{
            background: "var(--lav)",
            color: "var(--ok)",
            border: "1px solid var(--ok)",
            fontWeight: "600"
          }}
        >
          {pesanSukses}
        </div>
      )}

      {/* Tab Navigasi Pengelolaan */}
      <div className="chips">
        <button
          className={tab === "materi_baru" ? "on" : ""}
          onClick={() => setTab("materi_baru")}
        >
          + Unggah Materi Baru
        </button>
        <button
          className={tab === "buat_kuis" ? "on" : ""}
          onClick={() => setTab("buat_kuis")}
        >
          + Buat Soal Kuis
        </button>
        <button
          className={tab === "buat_tugas" ? "on" : ""}
          onClick={() => setTab("buat_tugas")}
        >
          + Kirim Tugas / Pengumuman
        </button>
        <button
          className={tab === "daftar_aktif" ? "on" : ""}
          onClick={() => setTab("daftar_aktif")}
        >
          Daftar Materi Aktif ({materiList.length})
        </button>
      </div>

      {/* TAB 1: FORM UNGGAH MATERI BARU */}
      {tab === "materi_baru" && (
        <div className="kartu besar">
          <h3>Unggah Modul Pembelajaran Adaptif Baru</h3>
          <p className="abu">
            Materi akan diklasifikasikan ke dalam kategori gaya belajar FSLSM agar dapat dipetakan oleh algoritma rekomendasi adaptif.
          </p>

          <form onSubmit={handleSimpanMateri} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
            <div className="dua">
              <div className="input-grup">
                <label>JUDUL MATERI</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Contoh: Perulangan (Looping) While & For"
                  value={judulMateri}
                  onChange={(e) => setJudulMateri(e.target.value)}
                  required
                />
              </div>

              <div className="input-grup">
                <label>DURASI BELAJAR (MENIT)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  value={menit}
                  onChange={(e) => setMenit(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="dua">
              <div className="input-grup">
                <label>KATEGORI GAYA BELAJAR FSLSM</label>
                <select
                  className="cari select"
                  style={{ maxWidth: "100%" }}
                  value={kategori}
                  onChange={(e) => {
                    setKategori(e.target.value);
                    if (e.target.value === "visual") setFormat("Diagram visual");
                    else if (e.target.value === "latihan") setFormat("Latihan interaktif");
                    else setFormat("Bacaan ringkas");
                  }}
                >
                  <option value="visual">Visual (Dominan H5P, Alur Bagan, Diagram)</option>
                  <option value="latihan">Latihan (Aktif, Praktik Coding, Eksperimen)</option>
                  <option value="bacaan">Bacaan (Reflektif, Teks Konseptual Mendalam)</option>
                </select>
              </div>

              <div className="input-grup">
                <label>LABEL FORMAT TAMPILAN</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Contoh: Diagram visual, Latihan interaktif"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />
              </div>
            </div>

            <div className="input-grup">
              <label>RINGKASAN KONSEP UTAMA</label>
              <textarea
                className="cari"
                rows="3"
                placeholder="Jelaskan konsep inti yang harus dipahami mahasiswa..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="input-grup">
              <label>REPRESENTASI ALUR LOGIKA VISUAL</label>
              <input
                type="text"
                className="cari"
                style={{ maxWidth: "100%" }}
                placeholder="Contoh: Inisialisasi → Evaluasi Kondisi → Eksekusi Blok → Selesai"
                value={alur}
                onChange={(e) => setAlur(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>CONTOH KODE / STUDI KASUS (PISAHKAN TIAP BARIS DENGAN ENTER)</label>
              <textarea
                className="cari"
                rows="4"
                style={{ fontFamily: "monospace", fontSize: "12px" }}
                placeholder="Masukkan baris-baris kode atau penjelasan langkah contoh..."
                value={contoh}
                onChange={(e) => setContoh(e.target.value)}
              />
            </div>

            <div className="tombol-baris">
              <button type="submit" className="tombol">
                ✓ Publikasikan Materi Baru ke Mahasiswa →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: FORM BUAT SOAL KUIS */}
      {tab === "buat_kuis" && (
        <div className="kartu besar">
          <h3>Buat Soal Kuis Formatif untuk Mahasiswa</h3>
          <p className="abu">
            Soal kuis akan langsung muncul pada evaluasi modul yang Anda tentukan di bawah ini.
          </p>

          <form onSubmit={handleSimpanKuis} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
            <div className="input-grup">
              <label>PILIH MODUL MATERI TARGET</label>
              <select
                className="cari select"
                style={{ maxWidth: "100%" }}
                value={targetModulId}
                onChange={(e) => setTargetModulId(Number(e.target.value))}
              >
                {materiList.map((m) => (
                  <option key={m.id} value={m.id}>
                    Modul {m.id + 1}: {m.t} ({m.f})
                  </option>
                ))}
              </select>
            </div>

            <div className="input-grup">
              <label>PERTANYAAN KUIS</label>
              <input
                type="text"
                className="cari"
                style={{ maxWidth: "100%" }}
                placeholder="Contoh: Apa yang terjadi jika kondisi perulangan while selalu bernilai true?"
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                required
              />
            </div>

            <div className="dua">
              <div className="input-grup">
                <label>PILIHAN A</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Jawaban opsi A"
                  value={opsiA}
                  onChange={(e) => setOpsiA(e.target.value)}
                  required
                />
              </div>
              <div className="input-grup">
                <label>PILIHAN B</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Jawaban opsi B"
                  value={opsiB}
                  onChange={(e) => setOpsiB(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="dua">
              <div className="input-grup">
                <label>PILIHAN C</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Jawaban opsi C"
                  value={opsiC}
                  onChange={(e) => setOpsiC(e.target.value)}
                  required
                />
              </div>

              <div className="input-grup">
                <label>KUNCI JAWABAN YANG BENAR</label>
                <select
                  className="cari select"
                  style={{ maxWidth: "100%" }}
                  value={kunciBenar}
                  onChange={(e) => setKunciBenar(Number(e.target.value))}
                >
                  <option value={0}>Pilihan A</option>
                  <option value={1}>Pilihan B</option>
                  <option value={2}>Pilihan C</option>
                </select>
              </div>
            </div>

            <div className="input-grup">
              <label>ULASAN & PEMBAHASAN JAWABAN (DITAMPILKAN KE MAHASISWA)</label>
              <textarea
                className="cari"
                rows="2"
                placeholder="Jelaskan alasan logis mengapa jawaban tersebut benar untuk memfasilitasi refleksi mahasiswa..."
                value={ulasan}
                onChange={(e) => setUlasan(e.target.value)}
              />
            </div>

            <div className="tombol-baris">
              <button type="submit" className="tombol">
                ✓ Tambahkan Soal ke Kuis Modul →
              </button>
            </div>
          </form>

          {/* Daftar Soal Terdaftar pada Modul Terpilih */}
          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--garis)" }}>
            <h4>Soal Terdaftar pada {materiList[targetModulId]?.t || "Modul Ini"}:</h4>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {(kuisList[targetModulId] || []).map((s, idx) => (
                <div key={idx} className="banner">
                  <b>{idx + 1}. {s.q}</b>
                  <p className="cap" style={{ marginTop: "4px" }}>
                    Kunci: Opsi {String.fromCharCode(65 + s.benar)} ({s.opsi[s.benar]}) · {s.ulasan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KIRIM TUGAS / PENGUMUMAN */}
      {tab === "buat_tugas" && (
        <div className="kartu besar">
          <h3>Kirim Tugas Pemrograman & Pengumuman LMS</h3>
          <p className="abu">
            Pemberitahuan ini akan langsung masuk ke pusat notifikasi (🔔) seluruh akun mahasiswa.
          </p>

          <form onSubmit={handleSimpanTugas} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
            <div className="dua">
              <div className="input-grup">
                <label>JUDUL TUGAS / PENGUMUMAN</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Contoh: Tugas Praktikum Mandiri: Implementasi Matriks 2D"
                  value={judulTugas}
                  onChange={(e) => setJudulTugas(e.target.value)}
                  required
                />
              </div>

              <div className="input-grup">
                <label>KATEGORI NOTIFIKASI</label>
                <select
                  className="cari select"
                  style={{ maxWidth: "100%" }}
                  value={tipeNotif}
                  onChange={(e) => setTipeNotif(e.target.value)}
                >
                  <option value="Tugas Pemrograman">Tugas Pemrograman (Assignment)</option>
                  <option value="Pengumuman Kuliah">Pengumuman Perkuliahan</option>
                  <option value="Jadwal Evaluasi">Jadwal Evaluasi & Kuis</option>
                </select>
              </div>
            </div>

            <div className="input-grup">
              <label>INSTRUKSI / ISI PENGUMUMAN LENGKAP</label>
              <textarea
                className="cari"
                rows="4"
                placeholder="Tuliskan petunjuk pengerjaan, format pengumpulan kode, atau informasi penting lainnya..."
                value={isiTugas}
                onChange={(e) => setIsiTugas(e.target.value)}
                required
              />
            </div>

            <div className="tombol-baris">
              <button type="submit" className="tombol">
                ✓ Kirim ke Notifikasi Mahasiswa →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: DAFTAR MATERI AKTIF */}
      {tab === "daftar_aktif" && (
        <div className="kartu besar">
          <div className="baris-judul">
            <h3>Daftar Seluruh Modul Pembelajaran ({materiList.length} Modul)</h3>
            <button className="tombol alt" onClick={() => setTab("materi_baru")}>
              + Tambah Modul Baru
            </button>
          </div>
          <p className="abu">
            Berikut adalah modul-modul yang aktif di sistem pembelajaran. Mahasiswa dapat mengakses seluruh materi ini di katalog mereka.
          </p>

          <div className="grid2" style={{ marginTop: "16px" }}>
            {materiList.map((m, idx) => (
              <div key={m.id} className="kartu materi" style={{ cursor: "default" }}>
                <div className="baris-judul">
                  <h4>{m.t}</h4>
                  <span className="cap ungu">{(kuisList[m.id] || []).length} Soal Kuis</span>
                </div>
                <p className="cap">{m.f} · {m.menit} menit · Kategori: {m.kat}</p>
                <p className="abu">{m.d}</p>
                <div className="banner" style={{ fontSize: "11px", marginTop: "4px" }}>
                  Alur: {m.v}
                </div>
                <div className="tombol-baris" style={{ marginTop: "8px" }}>
                  <button
                    className="tombol alt"
                    onClick={() => ke("lesson:" + m.id)}
                    title="Buka simulasi materi ini seperti mahasiswa"
                  >
                    Pratinjau Materi →
                  </button>
                  <button
                    className="tombol alt"
                    onClick={() => {
                      setTargetModulId(m.id);
                      setTab("buat_kuis");
                    }}
                  >
                    + Tambah Soal
                  </button>
                  {m.id >= 4 && (
                    <button
                      className="tombol alt"
                      style={{ color: "var(--salah)", borderColor: "var(--salah)" }}
                      onClick={() => {
                        if (confirm(`Yakin ingin menghapus materi '${m.t}'?`)) {
                          onHapusMateri(m.id);
                        }
                      }}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
