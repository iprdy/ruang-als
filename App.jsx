// ============================================================
// ruang. — Dashboard Pembelajaran Adaptif (React)
// Dilengkapi Sistem Login 3 Akses (Mahasiswa via NIM, Dosen, Pembuat Web)
// Portal Dosen: Upload Materi, Buat Soal Kuis, Terbitkan Tugas Mahasiswa
// Portal Mahasiswa: Jalur Belajar Adaptif Otomatis Machine Learning (Tanpa Slider Manual)
// 100% Mandiri (Self-Contained): Kode, Data, Komponen & CSS dalam 1 File
// ============================================================

import React, { useState, useEffect } from "react";

// ============================================================
// 1. DATA AWAL (DEFAULT DATA & LOG RISET)
// ============================================================
const MATERI_AWAL = [
  {
    id: 0,
    t: "Algoritma & Logika",
    f: "Diagram visual",
    menit: 12,
    kat: "visual",
    d: "Algoritma adalah urutan langkah logis dan sistematis untuk menyelesaikan suatu masalah komputasi.",
    v: "Input → Proses Logika → Validasi Kondisi → Output",
    contoh: [
      "Contoh: Menghitung rata-rata nilai:",
      "1. Masukkan seluruh nilai ujian.",
      "2. Jumlahkan seluruh nilai yang ada.",
      "3. Bagi jumlah nilai dengan total data."
    ]
  },
  {
    id: 1,
    t: "Struktur Data (Array)",
    f: "Latihan interaktif",
    menit: 15,
    kat: "latihan",
    d: "Array menyimpan sekumpulan elemen bertipe sejenis secara berurutan dalam memori dengan indeks terstruktur.",
    v: "[ Index 0: Buku ] [ Index 1: Pena ] [ Index 2: Tas ]",
    contoh: [
      "let barang = ['Buku', 'Pena', 'Tas'];",
      "console.log(barang[1]); // Menghasilkan: 'Pena'",
      "barang.push('Penggaris'); // Menambah elemen di akhir array"
    ]
  },
  {
    id: 2,
    t: "Memahami Percabangan",
    f: "Bacaan ringkas",
    menit: 8,
    kat: "bacaan",
    d: "Percabangan mengevaluasi kondisi boolean (True/False) untuk menentukan jalur eksekusi kode berikutnya.",
    v: "Evaluasi Nilai ≥ 60? → [True: Lulus] | [False: Remedi]",
    contoh: [
      "if (nilai >= 60) {",
      "  status = 'Lulus';",
      "} else {",
      "  status = 'Perlu Belajar Tambahan';",
      "}"
    ]
  },
  {
    id: 3,
    t: "Peta Konsep Pemrograman",
    f: "Peta konsep",
    menit: 10,
    kat: "visual",
    d: "Arsitektur pemrograman menghubungkan struktur data, instruksi algoritma, dan alur kontrol menjadi satu kesatuan.",
    v: "Struktur Data → Algoritma Pemrosesan → Aplikasi Siap Pakai",
    contoh: [
      "Variabel menyimpan nilai.",
      "Percabangan menentukan keputusan alur.",
      "Perulangan (Loop) mengotomatisasi instruksi berulang."
    ]
  }
];

const KUIS_AWAL = {
  0: [
    {
      q: "Apa yang dimaksud dengan algoritma dalam pemrograman?",
      opsi: [
        "Urutan langkah logis untuk menyelesaikan masalah",
        "Nama komponen sirkuit keras pada komputer",
        "Tempat penyimpanan file fisik di hard drive"
      ],
      benar: 0,
      ulasan: "Tepat. Algoritma merupakan fondasi berpikir komputasional dalam menyelesaikan masalah terstruktur."
    },
    {
      q: "Tahapan umum dalam diagram alur algoritma adalah...",
      opsi: [
        "Input → Proses → Output",
        "Output → Hard Disk → Monitor",
        "Monitor → Mouse → Keyboard"
      ],
      benar: 0,
      ulasan: "Benar. Siklus pemrosesan data dasar komputer selalu diawali masukan, pemrosesan, dan luaran."
    }
  ],
  1: [
    {
      q: "Apa fungsi utama dari struktur data Array?",
      opsi: [
        "Menyimpan elemen data berurutan dalam satu wadah",
        "Menghapus seluruh file dari sistem operasi",
        "Menghubungkan komputer ke jaringan internet"
      ],
      benar: 0,
      ulasan: "Tepat. Array memungkinkan kita mengelola banyak nilai dengan tipe sejenis menggunakan indeks."
    },
    {
      q: "Jika array 'arr' memiliki 3 elemen, berapakah nomor indeks pertamanya?",
      opsi: ["Indeks 0", "Indeks 1", "Indeks -1"],
      benar: 0,
      ulasan: "Benar. Mayoritas bahasa pemrograman modern menggunakan 0-based indexing."
    }
  ],
  2: [
    {
      q: "Kapan blok kode di dalam 'if' akan dieksekusi?",
      opsi: [
        "Hanya saat kondisi bernilai benar (True)",
        "Saat program mengalami crash atau error",
        "Hanya saat komputer dinyalakan kembali"
      ],
      benar: 0,
      ulasan: "Tepat. Pernyataan percabangan mengevaluasi ekspresi logika sebelum mengeksekusi blok kode."
    }
  ],
  3: [
    {
      q: "Bagian manakah yang bertugas mengulangi instruksi secara otomatis?",
      opsi: [
        "Perulangan (Looping)",
        "Kabel konektor monitor",
        "Power supply unit"
      ],
      benar: 0,
      ulasan: "Tepat. Perulangan (for/while) mengeksekusi instruksi berulang kali hingga kondisi terminasi terpenuhi."
    }
  ]
};

const KLASTER = [
  ["Cluster 0 · 24 mahasiswa", "Akses dominan diagram & konten visual (H5P)", "visual"],
  ["Cluster 1 · 20 mahasiswa", "Fokus pada latihan praktis & tugas mandiri", "latihan"],
  ["Cluster 2 · 16 mahasiswa", "Meninjau materi tekstual, modul & forum diskusi", "bacaan"]
];

const LOG = {
  baris: 120290,
  mahasiswa: 130,
  rata: 925,
  jam: [3700, 1950, 1200, 750, 300, 450, 1250, 5050, 6800, 5700, 8100, 8000, 6100, 6950, 5500, 6050, 5000, 4500, 5500, 6200, 7300, 8150, 9050, 6750],
  hari: [
    ["Sen", 12200],
    ["Sel", 22700],
    ["Rab", 14200],
    ["Kam", 17000],
    ["Jum", 22400],
    ["Sab", 15500],
    ["Min", 16200]
  ],
  modul: [
    ["H5P (Visual/Interaktif)", 58022],
    ["System Core", 26880],
    ["Assignment (Tugas)", 14124],
    ["Open Forum", 7262],
    ["Page (Teks Modul)", 5435],
    ["User report", 2906],
    ["Online text", 1932],
    ["Quiz Formatif", 1828]
  ]
};

const CONTOH_MHS = [
  { nim: "2315091043", nama: "Putu Aldi Rama Pradika Yasa", h5p: 496, teks: 48, ratio: 0.9118, aktif: 33, reflektif: 558, hari: 27, cluster: 0 },
  { nim: "2315091092", nama: "VERY IRAWAN SIMBOLON", h5p: 690, teks: 36, ratio: 0.9504, aktif: 40, reflektif: 816, hari: 38, cluster: 0 },
  { nim: "2415091001", nama: "Anak Agung Ade Jelantik Raditya", h5p: 517, teks: 48, ratio: 0.915, aktif: 59, reflektif: 682, hari: 33, cluster: 0 },
  { nim: "2415091002", nama: "LUH INDAH SRI PUSPA DEWI", h5p: 527, teks: 76, ratio: 0.874, aktif: 60, reflektif: 695, hari: 37, cluster: 0 },
  { nim: "2415091003", nama: "Kadek Sukadarma", h5p: 301, teks: 28, ratio: 0.9149, aktif: 38, reflektif: 404, hari: 22, cluster: 0 }
];

// ============================================================
// 2. HOOKS
// ============================================================
function useAngka(target) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let id, mulai = performance.now();
    const jalan = (t) => {
      const p = Math.min((t - mulai) / 900, 1);
      setN(Math.round(target * p));
      if (p < 1) id = requestAnimationFrame(jalan);
    };
    id = requestAnimationFrame(jalan);
    return () => cancelAnimationFrame(id);
  }, [target]);
  return n;
}

function useMahasiswa() {
  const [data, setData] = useState(CONTOH_MHS);
  const [dariCSV, setDariCSV] = useState(false);
  useEffect(() => {
    fetch("/student_features.csv")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((teks) => {
        const [kepala, ...baris] = teks.trim().split("\n").map((b) => b.split(","));
        const i = (k) => kepala.indexOf(k);
        const hasil = baris.map((b) => ({
          nim: b[i("NIM")],
          nama: b[i("Nama")],
          h5p: +b[i("visual_count")] || 0,
          teks: +b[i("verbal_count")] || 0,
          ratio: +b[i("visual_ratio")] || 0.9,
          aktif: +b[i("active_actions")] || 30,
          reflektif: +b[i("reflective_actions")] || 500,
          hari: +b[i("active_days")] || 25,
          cluster: (+b[i("visual_ratio")] || 0.9) > 0.9 ? 0 : (+b[i("active_actions")] || 0) > 45 ? 1 : 2
        }));
        if (hasil.length > 0) {
          setData(hasil);
          setDariCSV(true);
        }
      })
      .catch(() => {});
  }, []);
  return [data, dariCSV];
}

// ============================================================
// 3. KOMPONEN UI DASAR
// ============================================================
const Stat = ({ nilai, label, nol }) => {
  const n = useAngka(nilai);
  return (
    <div className="kartu stat">
      <b>{nol ? String(n).padStart(2, "0") : n.toLocaleString("id-ID")}</b>
      <span>{label}</span>
    </div>
  );
};

const Bar = ({ persen, delay = 0 }) => (
  <div className="trek">
    <i style={{ "--lebar": persen + "%", animationDelay: delay + "ms" }} />
  </div>
);

const Skala = ({ kiri, kanan, persen, i = 0 }) => (
  <div className="skala">
    <div className="lbl">
      <b>{kiri}</b>
      <span>{kanan}</span>
    </div>
    <Bar persen={persen} delay={i * 120} />
  </div>
);

const KartuMateri = ({ m, selesai, buka, urut = 0 }) => {
  const p = selesai ? 100 : m.id === 1 ? 35 : 40;
  return (
    <button
      className="kartu materi"
      style={{ animationDelay: urut * 80 + "ms" }}
      onClick={() => buka(m.id)}
    >
      <div className="ilustrasi">{m.id === 1 ? "[ ]" : m.kat === "latihan" ? "⚡" : m.kat === "bacaan" ? "📖" : "{ }"}</div>
      <h4>{m.t}</h4>
      <p className="cap">{m.f} · {m.menit} menit · Pemula</p>
      <p className="abu">{m.d}</p>
      <Bar persen={p} delay={300} />
      <p className="cap ungu">
        {selesai ? "Selesai dipelajari" : p + "% dipelajari"} · Lanjutkan →
      </p>
    </button>
  );
};

const Judul = ({ t, x }) => (
  <div className="judul">
    <h1>{t}</h1>
    <p className="cap">RUANG · Pembelajaran Adaptif (FSLSM × K-Means)</p>
    {x && <p>{x}</p>}
  </div>
);

const Batang = ({ nilai, label, tiap = 1 }) => {
  const maks = Math.max(...nilai, 1);
  return (
    <div className="batang-wadah">
      {nilai.map((v, i) => (
        <div className="kolom" key={i} title={`${label[i]}: ${v.toLocaleString("id-ID")}`}>
          <div
            className="batang"
            style={{ height: (v / maks) * 100 + "%", animationDelay: i * 30 + "ms" }}
          />
          <span>{i % tiap === 0 ? label[i] : ""}</span>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// 4. HALAMAN-HALAMAN SISTEM
// ============================================================

// --- 4.1 Halaman Login (3 Akses) ---
function Login({ onLogin, mhsList = [] }) {
  const [role, setRole] = useState("mahasiswa"); // 'mahasiswa' | 'dosen' | 'dev'
  const [nim, setNim] = useState("2315091043");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pesanError, setPesanError] = useState("");

  const handlePilihRole = (r) => {
    setRole(r);
    setPesanError("");
    if (r === "mahasiswa") {
      setNim("2315091043");
    } else if (r === "dosen") {
      setUsername("dosen");
      setPassword("dosen123");
    } else if (r === "dev") {
      setUsername("admin");
      setPassword("admin123");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setPesanError("");

    if (role === "mahasiswa") {
      const bersihNim = nim.trim();
      if (!bersihNim) {
        setPesanError("Silakan masukkan NIM Anda untuk masuk.");
        return;
      }
      const mhs = mhsList.find((m) => String(m.nim) === bersihNim);
      if (mhs) {
        onLogin({
          role: "m",
          nim: mhs.nim,
          nama: mhs.nama,
          cluster: mhs.cluster || 0,
          inisial: mhs.nama.split(" ").map((k) => k[0]).slice(0, 2).join("").toUpperCase()
        });
      } else {
        onLogin({
          role: "m",
          nim: bersihNim,
          nama: `Mahasiswa (${bersihNim})`,
          cluster: 0,
          inisial: "MH"
        });
      }
    } else if (role === "dosen") {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if ((u === "dosen" || u === "198507122010121002") && (p === "dosen123" || p === "dosen")) {
        onLogin({
          role: "d",
          nama: "Dr. I Gede Dosen, M.Kom.",
          nip: "198507122010121002",
          inisial: "DS"
        });
      } else {
        setPesanError("NIP/Username atau kata sandi dosen belum tepat. (Akun demo: dosen / dosen123)");
      }
    } else if (role === "dev") {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if ((u === "admin" || u === "dev" || u === "pembuat") && (p === "admin123" || p === "dev123" || p === "admin")) {
        onLogin({
          role: "dev",
          nama: "Pengembang Web (Developer)",
          inisial: "DEV"
        });
      } else {
        setPesanError("Username atau kata sandi pengembang belum tepat. (Akun demo: admin / admin123)");
      }
    }
  };

  return (
    <div className="login-wadah">
      <div className="login-kartu">
        <div>
          <div className="logo" style={{ cursor: "default" }}>ruang.</div>
          <p className="cap" style={{ marginTop: "2px" }}>RUANG BELAJARMU · SISTEM PEMBELAJARAN ADAPTIF</p>
          <p className="abu" style={{ marginTop: "8px", fontSize: "12px" }}>
            Pilih hak akses di bawah untuk masuk ke dalam sistem portal pembelajaran.
          </p>
        </div>

        {/* Tab Pilihan 3 Akses */}
        <div className="chips" style={{ width: "100%", justifyContent: "space-between" }}>
          <button
            type="button"
            className={role === "mahasiswa" ? "on" : ""}
            onClick={() => handlePilihRole("mahasiswa")}
            style={{ flex: 1, padding: "8px 4px", fontSize: "11px", textAlign: "center" }}
          >
            🎓 Mahasiswa
          </button>
          <button
            type="button"
            className={role === "dosen" ? "on" : ""}
            onClick={() => handlePilihRole("dosen")}
            style={{ flex: 1, padding: "8px 4px", fontSize: "11px", textAlign: "center" }}
          >
            👨‍🏫 Dosen
          </button>
          <button
            type="button"
            className={role === "dev" ? "on" : ""}
            onClick={() => handlePilihRole("dev")}
            style={{ flex: 1, padding: "8px 4px", fontSize: "11px", textAlign: "center" }}
          >
            ⚙️ Pembuat Web
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {role === "mahasiswa" && (
            <div className="input-grup">
              <label>Nomor Induk Mahasiswa (NIM)</label>
              <input
                type="text"
                className="cari"
                style={{ maxWidth: "100%" }}
                placeholder="Masukkan NIM Anda (contoh: 2315091043)"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              <span className="cap">
                💡 Contoh NIM aktif di log: <code>2315091043</code>, <code>2315091092</code>, <code>2415091001</code>
              </span>
            </div>
          )}

          {role === "dosen" && (
            <>
              <div className="input-grup">
                <label>Username / NIP Dosen</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Username dosen"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Kata Sandi</label>
                <input
                  type="password"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="cap">💡 Akses default dosen: username <code>dosen</code> · sandi <code>dosen123</code></span>
              </div>
            </>
          )}

          {role === "dev" && (
            <>
              <div className="input-grup">
                <label>Username Pengembang</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Kata Sandi</label>
                <input
                  type="password"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="cap">💡 Akses admin: username <code>admin</code> · sandi <code>admin123</code></span>
              </div>
            </>
          )}

          {pesanError && (
            <div style={{ color: "var(--salah)", fontSize: "11px", fontWeight: "600", padding: "8px 12px", background: "var(--lav)", borderRadius: "6px" }}>
              ⚠️ {pesanError}
            </div>
          )}

          <button type="submit" className="tombol" style={{ padding: "12px", fontSize: "12px", width: "100%", marginTop: "6px" }}>
            Masuk ke Portal {role === "mahasiswa" ? "Mahasiswa" : role === "dosen" ? "Dosen" : "Pengembang"} →
          </button>
        </form>
      </div>
    </div>
  );
}

// --- 4.2 Halaman Beranda Mahasiswa (Otomatis ML Tanpa Slider Manual) ---
function BerandaMahasiswa({ user, materiList, selesai, buka, ke, pengumumanList }) {
  const jmlSelesai = Object.keys(selesai).length;
  const namaPanggilan = user?.nama ? user.nama.split(" ")[0] : "Mahasiswa";

  return (
    <>
      <Judul
        t={`Halo, ${namaPanggilan}. Siap bertumbuh?`}
        x="Langkah kecil hari ini, pemahaman baru untuk esok hari."
      />
      <div className="dua-kolom">
        <div className="tumpuk">
          <div className="hero">
            <h2>Belajar lebih nyaman.<br />Pahami lebih dalam.</h2>
            <p>Rekomendasi materi telah dipersonalisasi otomatis oleh sistem adaptif untukmu.</p>
            <button className="tombol" onClick={() => buka(0)}>Lanjutkan belajar →</button>
          </div>

          <div className="stats">
            <Stat nilai={materiList.length} nol label="Materi kurikulum" />
            <Stat nilai={jmlSelesai} nol label="Materi diselesaikan" />
            <Stat nilai={Math.min(100, Math.round((jmlSelesai / Math.max(materiList.length, 1)) * 100))} label="Progres belajar (%)" />
          </div>

          <div className="baris-judul">
            <h3>Rekomendasi materi untukmu</h3>
            <button className="link" onClick={() => ke("materi")}>Lihat semua ({materiList.length}) →</button>
          </div>

          <div className="grid2">
            {materiList.slice(0, 2).map((m, idx) => (
              <KartuMateri key={m.id} m={m} selesai={!!selesai[m.id]} buka={buka} urut={idx} />
            ))}
          </div>
          <p className="cap">Urutan materi disesuaikan secara dinamis oleh model machine learning.</p>
        </div>

        <div className="tumpuk">
          {/* Card Jalur Adaptif Otomatis ML (Menggantikan slider manual FSLSM) */}
          <div className="kartu besar">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>🤖</span>
              <h3>Jalur Belajar Adaptif</h3>
            </div>
            <p className="cap" style={{ color: "var(--ungu)", fontWeight: "600" }}>
              Otomatisasi Machine Learning Aktif
            </p>
            <p className="abu" style={{ fontSize: "11px", lineHeight: "1.6" }}>
              Profil preferensi belajar Anda dihitung secara otomatis oleh model <b>K-Means Clustering</b> berdasarkan pola interaksi log aktivitas LMS (NIM: {user?.nim || "Simulasi"}).
            </p>
            <div style={{ background: "var(--lav)", padding: "12px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span>Format Prioritas:</span>
                <b style={{ color: "var(--ungu)" }}>Visual & Latihan Interaktif</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span>Status Adaptasi:</span>
                <b style={{ color: "var(--ok)" }}>✓ Terpersonalisasi</b>
              </div>
            </div>
            <p className="cap">Sistem secara cerdas menyajikan format modul yang paling efisien untuk pemahamanmu.</p>
          </div>

          {/* Card Tugas & Pengumuman dari Dosen */}
          <div className="ungu-muda">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>📢</span>
              <h3>Tugas & Pengumuman Dosen</h3>
            </div>
            {pengumumanList && pengumumanList.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                {pengumumanList.slice(0, 2).map((p, idx) => (
                  <div key={idx} style={{ background: "var(--kartu)", padding: "12px", borderRadius: "8px", border: "1px solid var(--garis)" }}>
                    <b style={{ fontSize: "11px", color: "var(--ungu)" }}>{p.judul}</b>
                    <p style={{ fontSize: "10px", color: "var(--teks)", marginTop: "4px" }}>{p.isi}</p>
                    <span className="cap" style={{ display: "block", marginTop: "4px" }}>{p.waktu}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="abu">Belum ada tugas baru yang diterbitkan oleh dosen.</p>
            )}
            <button className="tombol" onClick={() => ke("materi")}>Buka modul tugas →</button>
          </div>
        </div>
      </div>
    </>
  );
}

// --- 4.3 Halaman Kelola Materi & Kuis (Fitur Dosen) ---
function KelolaMateri({ materiList, kuisList, onTambahMateri, onHapusMateri, onTambahKuis, onTambahPengumuman, ke }) {
  const [tab, setTab] = useState("materi_baru"); // 'materi_baru' | 'buat_kuis' | 'buat_tugas' | 'daftar_aktif'
  const [pesanSukses, setPesanSukses] = useState("");

  // Form State Materi
  const [judulMateri, setJudulMateri] = useState("");
  const [kategori, setKategori] = useState("visual");
  const [format, setFormat] = useState("Diagram visual");
  const [menit, setMenit] = useState(12);
  const [deskripsi, setDeskripsi] = useState("");
  const [alur, setAlur] = useState("Inisialisasi → Evaluasi Logika → Eksekusi → Selesai");
  const [contoh, setContoh] = useState("// Contoh kode sederhana\nlet x = 10;\nif (x > 5) {\n  console.log('Nilai valid');\n}");

  // Form State Kuis
  const [targetModulId, setTargetModulId] = useState(0);
  const [pertanyaan, setPertanyaan] = useState("");
  const [opsiA, setOpsiA] = useState("");
  const [opsiB, setOpsiB] = useState("");
  const [opsiC, setOpsiC] = useState("");
  const [kunciBenar, setKunciBenar] = useState(0);

  // Form State Tugas
  const [judulTugas, setJudulTugas] = useState("");
  const [isiTugas, setIsiTugas] = useState("");

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
    setPesanSukses(`✓ Materi '${judulMateri}' berhasil dipublikasikan untuk mahasiswa.`);
    setJudulMateri("");
    setDeskripsi("");
    setTimeout(() => setPesanSukses(""), 4000);
  };

  const handleSimpanKuis = (e) => {
    e.preventDefault();
    if (!pertanyaan.trim() || !opsiA.trim() || !opsiB.trim() || !opsiC.trim()) {
      alert("Harap lengkapi pertanyaan dan 3 opsi jawaban.");
      return;
    }
    const soalBaru = {
      q: pertanyaan.trim(),
      opsi: [opsiA.trim(), opsiB.trim(), opsiC.trim()],
      benar: Number(kunciBenar),
      ulasan: "Jawaban ini sesuai dengan konsep modul yang diajarkan."
    };
    onTambahKuis(Number(targetModulId), soalBaru);
    setPesanSukses(`✓ Soal kuis baru berhasil ditambahkan pada materi terpilih.`);
    setPertanyaan("");
    setOpsiA("");
    setOpsiB("");
    setOpsiC("");
    setTimeout(() => setPesanSukses(""), 4000);
  };

  const handleSimpanTugas = (e) => {
    e.preventDefault();
    if (!judulTugas.trim() || !isiTugas.trim()) {
      alert("Harap isi judul dan instruksi tugas.");
      return;
    }
    onTambahPengumuman({
      judul: judulTugas.trim(),
      isi: isiTugas.trim(),
      waktu: "Diterbitkan Dosen Pengampu"
    });
    setPesanSukses(`✓ Tugas/Pengumuman baru berhasil diterbitkan untuk mahasiswa.`);
    setJudulTugas("");
    setIsiTugas("");
    setTimeout(() => setPesanSukses(""), 4000);
  };

  return (
    <>
      <Judul
        t="Kelola Materi, Kuis & Tugas Dosen"
        x="Unggah materi baru, tambahkan latihan kuis interaktif, dan terbitkan penugasan untuk mahasiswa."
      />

      <div className="chips">
        <button className={tab === "materi_baru" ? "on" : ""} onClick={() => setTab("materi_baru")}>
          ➕ Unggah Materi Baru
        </button>
        <button className={tab === "buat_kuis" ? "on" : ""} onClick={() => setTab("buat_kuis")}>
          📝 Buat Soal Kuis
        </button>
        <button className={tab === "buat_tugas" ? "on" : ""} onClick={() => setTab("buat_tugas")}>
          📢 Terbitkan Tugas
        </button>
        <button className={tab === "daftar_aktif" ? "on" : ""} onClick={() => setTab("daftar_aktif")}>
          📂 Katalog Materi ({materiList.length})
        </button>
      </div>

      {pesanSukses && (
        <div style={{ background: "var(--lav)", color: "var(--ok)", padding: "12px 16px", borderRadius: "8px", fontWeight: "600", fontSize: "12px" }}>
          {pesanSukses}
        </div>
      )}

      {/* Tab 1: Form Materi Baru */}
      {tab === "materi_baru" && (
        <div className="kartu besar">
          <h3>Formulir Publikasi Materi Pembelajaran</h3>
          <p className="cap">Materi yang diunggah akan otomatis masuk ke dalam katalog adaptif mahasiswa.</p>
          <form onSubmit={handleSimpanMateri} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
            <div className="dua">
              <div className="input-grup">
                <label>Judul Modul Pembelajaran</label>
                <input
                  type="text"
                  className="cari"
                  placeholder="Contoh: Pemrograman Berorientasi Objek (OOP)"
                  value={judulMateri}
                  onChange={(e) => setJudulMateri(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Format & Gaya Pembelajaran</label>
                <select
                  className="cari"
                  value={format}
                  onChange={(e) => {
                    setFormat(e.target.value);
                    if (e.target.value.includes("visual")) setKategori("visual");
                    else if (e.target.value.includes("Latihan")) setKategori("latihan");
                    else setKategori("bacaan");
                  }}
                >
                  <option value="Diagram visual">Diagram visual (Visual)</option>
                  <option value="Latihan interaktif">Latihan interaktif (Aktif)</option>
                  <option value="Bacaan ringkas">Bacaan ringkas (Verbal/Sensing)</option>
                  <option value="Peta konsep">Peta konsep (Global)</option>
                </select>
              </div>
            </div>

            <div className="dua">
              <div className="input-grup">
                <label>Estimasi Waktu Belajar (Menit)</label>
                <input
                  type="number"
                  className="cari"
                  value={menit}
                  onChange={(e) => setMenit(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Kategori Adaptif FSLSM</label>
                <select className="cari" value={kategori} onChange={(e) => setKategori(e.target.value)}>
                  <option value="visual">Visual (Dominan diagram & flow)</option>
                  <option value="latihan">Latihan (Aksi & eksekusi praktis)</option>
                  <option value="bacaan">Bacaan (Teks & literasi teori)</option>
                </select>
              </div>
            </div>

            <div className="input-grup">
              <label>Ringkasan Konsep Utama</label>
              <textarea
                className="cari"
                style={{ height: "70px" }}
                placeholder="Tuliskan intisari konsep teori materi..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>Alur Visual Representasi (Step-by-step)</label>
              <input
                type="text"
                className="cari"
                value={alur}
                onChange={(e) => setAlur(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>Contoh Kode / Kasus Terapan (Baris demi baris)</label>
              <textarea
                className="cari"
                style={{ height: "90px", fontFamily: "monospace", fontSize: "11px" }}
                value={contoh}
                onChange={(e) => setContoh(e.target.value)}
              />
            </div>

            <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "12px 20px" }}>
              💾 Terbitkan Modul Materi untuk Mahasiswa →
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Form Kuis */}
      {tab === "buat_kuis" && (
        <div className="kartu besar">
          <h3>Tambah Soal Kuis Formatif ke Modul</h3>
          <p className="cap">Soal kuis akan langsung dapat dikerjakan mahasiswa untuk mengukur pemahaman.</p>
          <form onSubmit={handleSimpanKuis} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
            <div className="input-grup">
              <label>Pilih Target Modul Materi</label>
              <select className="cari" value={targetModulId} onChange={(e) => setTargetModulId(e.target.value)}>
                {materiList.map((m, idx) => (
                  <option key={m.id || idx} value={idx}>
                    Modul {idx + 1}: {m.t} ({m.f})
                  </option>
                ))}
              </select>
            </div>

            <div className="input-grup">
              <label>Pertanyaan Soal</label>
              <textarea
                className="cari"
                style={{ height: "60px" }}
                placeholder="Tuliskan pertanyaan kuis..."
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
              />
            </div>

            <div className="input-grup">
              <label>Pilihan Jawaban A</label>
              <input type="text" className="cari" placeholder="Opsi A" value={opsiA} onChange={(e) => setOpsiA(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Pilihan Jawaban B</label>
              <input type="text" className="cari" placeholder="Opsi B" value={opsiB} onChange={(e) => setOpsiB(e.target.value)} />
            </div>
            <div className="input-grup">
              <label>Pilihan Jawaban C</label>
              <input type="text" className="cari" placeholder="Opsi C" value={opsiC} onChange={(e) => setOpsiC(e.target.value)} />
            </div>

            <div className="input-grup">
              <label>Kunci Jawaban yang Benar</label>
              <select className="cari" value={kunciBenar} onChange={(e) => setKunciBenar(e.target.value)}>
                <option value={0}>Pilihan A</option>
                <option value={1}>Pilihan B</option>
                <option value={2}>Pilihan C</option>
              </select>
            </div>

            <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "12px 20px" }}>
              💾 Simpan Soal Kuis Baru →
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Form Terbitkan Tugas */}
      {tab === "buat_tugas" && (
        <div className="kartu besar">
          <h3>Terbitkan Tugas & Pengumuman Dosen</h3>
          <p className="cap">Pengumuman ini akan langsung muncul di dashboard beranda seluruh mahasiswa.</p>
          <form onSubmit={handleSimpanTugas} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
            <div className="input-grup">
              <label>Judul Tugas / Pengumuman</label>
              <input
                type="text"
                className="cari"
                placeholder="Contoh: Tugas Mandiri: Analisis Kompleksitas Algoritma"
                value={judulTugas}
                onChange={(e) => setJudulTugas(e.target.value)}
              />
            </div>
            <div className="input-grup">
              <label>Instruksi Penugasan / Isi Pesan</label>
              <textarea
                className="cari"
                style={{ height: "90px" }}
                placeholder="Tuliskan petunjuk pengerjaan dan batas waktu tugas..."
                value={isiTugas}
                onChange={(e) => setIsiTugas(e.target.value)}
              />
            </div>
            <button type="submit" className="tombol" style={{ alignSelf: "flex-start", padding: "12px 20px" }}>
              📢 Terbitkan ke Seluruh Mahasiswa →
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Katalog Materi Aktif */}
      {tab === "daftar_aktif" && (
        <div className="kartu besar">
          <h3>Daftar Materi yang Sedang Tayang ({materiList.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
            {materiList.map((m, idx) => (
              <div key={m.id || idx} className="baris">
                <div>
                  <h4>{m.t}</h4>
                  <p className="cap">{m.f} · {m.menit} menit · Kategori: {m.kat}</p>
                  <p className="abu" style={{ fontSize: "11px", marginTop: "4px" }}>{m.d}</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="tombol alt" onClick={() => ke("lesson:" + idx)}>Pratinjau</button>
                  {materiList.length > 1 && (
                    <button className="tombol alt" style={{ color: "var(--salah)" }} onClick={() => onHapusMateri(m.id)}>
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

// --- 4.4 Halaman Materi (Katalog Pembelajaran) ---
function Materi({ materiList, selesai, buka, filterAwal }) {
  const [filter, setFilter] = useState(filterAwal || "semua");
  const [cari, setCari] = useState("");

  const hasil = materiList.filter(
    (m) =>
      (filter === "semua" || m.kat === filter) &&
      (m.t + m.d).toLowerCase().includes(cari.toLowerCase())
  );

  return (
    <>
      <Judul
        t="Materi belajar"
        x="Pilih materi dan format belajar. Seluruh materi tetap bisa diakses sesuai kecepatan belajarmu."
      />
      <input
        className="cari"
        placeholder="⌕ Cari materi..."
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        aria-label="Cari materi"
      />
      <div className="chips">
        {["semua", "visual", "latihan", "bacaan"].map((f) => (
          <button
            key={f}
            className={filter === f ? "on" : ""}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid2" key={filter + cari}>
        {hasil.length ? (
          hasil.map((m, u) => (
            <KartuMateri key={m.id} m={m} selesai={!!selesai[m.id]} buka={buka} urut={u} />
          ))
        ) : (
          <p className="cap">Tidak ada materi yang cocok dengan pencarian.</p>
        )}
      </div>
    </>
  );
}

// --- 4.5 Halaman Pelajaran (Detail Modul) ---
function Pelajaran({ m, kuisList, mulaiKuis, tandai, ke }) {
  if (!m) return null;
  const adaKuis = kuisList[m.id] && kuisList[m.id].length > 0;

  return (
    <>
      <Judul t={m.t} x={`${m.f} · ${m.menit} menit · Modul Pembelajaran`} />
      <div className="alur">{m.v}</div>
      <div className="kartu besar">
        <h3>Konsep utama</h3>
        <p>{m.d}</p>
      </div>
      <div className="kartu besar">
        <h3>Contoh sederhana</h3>
        {m.contoh && m.contoh.map((c, idx) => <p key={idx} style={{ fontFamily: "monospace", fontSize: "11px" }}>{c}</p>)}
      </div>
      <div className="kartu besar">
        <h3>Cek pemahamanmu</h3>
        <p className="abu">
          {adaKuis
            ? `Tersedia ${kuisList[m.id].length} soal kuis formatif untuk menguji pemahaman materi ini.`
            : "Selesaikan materi dan tandai progres belajarmu."}
        </p>
        <div className="tombol-baris">
          {adaKuis && (
            <button className="tombol" onClick={mulaiKuis}>Mulai kuis modul →</button>
          )}
          <button className="tombol alt" onClick={tandai}>Tandai selesai</button>
          <button className="tombol alt" onClick={() => ke("materi")}>Kembali ke katalog</button>
        </div>
      </div>
    </>
  );
}

// --- 4.6 Halaman Kuis ---
function Kuis({ m, bankSoal, ke, selesaiKuis, onJawabanSalah }) {
  const [no, setNo] = useState(0);
  const [pilih, setPilih] = useState(-1);
  const soalList = bankSoal || [
    {
      q: `Apa inti pemahaman dari modul ${m?.t}?`,
      opsi: ["Memahami konsep dasar secara terstruktur", "Mengabaikan instruksi algoritma", "Menutup program aplikasi"],
      benar: 0,
      ulasan: "Tepat sekali."
    }
  ];
  const soal = soalList[no] || soalList[0];
  const benar = pilih === soal.benar;

  const jawab = (k) => {
    setPilih(k);
    if (k !== soal.benar) {
      setTimeout(() => {
        onJawabanSalah(soal);
        ke("salah");
      }, 700);
    }
  };

  const lanjut = () => {
    if (no < soalList.length - 1) {
      setNo(no + 1);
      setPilih(-1);
    } else {
      selesaiKuis();
    }
  };

  return (
    <>
      <Judul t={`Kuis: ${m?.t || "Pemrograman"}`} x={`Pertanyaan ${no + 1} dari ${soalList.length} · Pilih satu jawaban yang tepat`} />
      <div className="kartu besar" key={no}>
        <h3>{soal.q}</h3>
        {soal.opsi.map((o, k) => (
          <button
            key={o}
            disabled={pilih > -1}
            className={"opsi" + (pilih === k ? (k === soal.benar ? " benar" : " salah") : "")}
            onClick={() => jawab(k)}
          >
            {pilih === k ? "●" : "○"} {o}
          </button>
        ))}
        {benar ? (
          <>
            <p className="ok-teks">✓ Jawaban benar! {soal.ulasan}</p>
            <button className="tombol" onClick={lanjut}>
              {no < soalList.length - 1 ? "Pertanyaan berikutnya →" : "Lihat hasil kuis →"}
            </button>
          </>
        ) : (
          <p className="cap">{pilih > -1 ? "Belum tepat…" : "Pilih jawaban untuk melanjutkan."}</p>
        )}
      </div>
      <button className="tombol alt" onClick={() => ke("lesson:" + (m?.id || 0))}>Kembali ke materi</button>
    </>
  );
}

// --- 4.7 Halaman Salah & Hasil ---
function Salah({ i, ke, ulang, soal }) {
  return (
    <>
      <Judul t="Kuis formatif" />
      <div className="kartu besar">
        <h3>Belum tepat. Mari tinjau kembali konsepnya.</h3>
        <p className="abu">
          {soal?.ulasan || "Pelajari kembali materi terkait untuk memperkuat pemahaman sebelum mencoba lagi."}
        </p>
        <div className="tombol-baris">
          <button className="tombol" onClick={ulang}>Ulangi kuis</button>
          <button className="tombol alt" onClick={() => ke("lesson:" + i)}>Pelajari materi modul</button>
        </div>
      </div>
    </>
  );
}

function Hasil({ judul, skor, i, ke, ulang }) {
  const n = useAngka(skor ?? 0);
  return (
    <>
      <Judul t={judul} />
      <div className="banner">SIMULASI PROTOTIPE · Hasil evaluasi langsung direkam ke dalam progres adaptifmu.</div>
      <div className="kartu besar">
        {skor != null ? <div className="angka-besar">{n} / 100</div> : <h3>Selesai dipelajari</h3>}
        <p>{skor != null ? "Seluruh pertanyaan berhasil dijawab dengan benar." : "Satu langkah lebih maju dalam perjalanan belajarmu."}</p>
        <p className="abu">Lanjutkan modul pembelajaran berikutnya untuk meningkatkan penguasaan materi.</p>
        <div className="tombol-baris">
          <button className="tombol" onClick={() => ke("aktivitas")}>Lihat aktivitas</button>
          <button className="tombol alt" onClick={() => ke("lesson:" + ((i + 1) % 4))}>Materi berikutnya →</button>
          <button className="tombol alt" onClick={() => ke("beranda")}>Kembali ke beranda</button>
          {ulang && <button className="tombol alt" onClick={ulang}>Ulangi kuis</button>}
        </div>
      </div>
    </>
  );
}

// --- 4.8 Halaman Aktivitas & Notifikasi ---
function Aktivitas({ tambahan, ke }) {
  const daftar = [
    ["Mengenal Algoritma & Logika", "Selesai · 12 menit", "lesson:0"],
    ["Kuis Algoritma & Logika", "Nilai 100 · 2 pertanyaan", "lesson:0"],
    ["Struktur Data (Array)", "Dilanjutkan · 35%", "lesson:1"],
    ...tambahan
  ];
  return (
    <>
      <Judul t="Aktivitas belajar" x="Riwayat interaksi pembelajaran yang tercatat oleh sistem adaptif." />
      <div className="kartu besar">
        {daftar.map((a, u) => (
          <div className="baris" key={a[0] + u} style={{ animationDelay: u * 70 + "ms" }}>
            <div>
              <h4>{a[0]}</h4>
              <p className="cap">{a[1]}</p>
            </div>
            <button className="tombol alt" onClick={() => ke(a[2])}>Buka materi</button>
          </div>
        ))}
      </div>
    </>
  );
}

function Notif({ ke, pengumumanList }) {
  return (
    <>
      <Judul t="Notifikasi & Pengumuman" />
      <div className="kartu besar">
        <h3>Pembaruan Sistem & Penugasan</h3>
        <p className="abu">Informasi penting dan tugas terbaru dari dosen pengampu.</p>
        {pengumumanList && pengumumanList.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
            {pengumumanList.map((p, idx) => (
              <div key={idx} style={{ background: "var(--lav)", padding: "10px 14px", borderRadius: "8px" }}>
                <b>{p.judul}</b>
                <p style={{ fontSize: "11px", marginTop: "4px" }}>{p.isi}</p>
                <span className="cap">{p.waktu}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "14px" }}>
          <button className="tombol" onClick={() => ke("materi")}>Jelajahi materi</button>
        </div>
      </div>
      <div className="ungu-muda">
        <h3>Tentang Sistem Pembelajaran Adaptif</h3>
        <p className="abu">
          Sistem ini memadukan model FSLSM (Felder-Silverman Learning Style Model) dengan algoritma K-Means Clustering untuk menghasilkan jalur belajar adaptif berbasis data log mahasiswa secara otomatis.
        </p>
        <button className="tombol" onClick={() => ke("beranda")}>Kembali ke beranda</button>
      </div>
    </>
  );
}

// --- 4.9 Halaman Dashboard Dosen, Analisis Log, Data Mahasiswa & Dev Panel ---
function Dosen({ ke }) {
  const [sudah, setSudah] = useState(false);
  return (
    <>
      <Judul t="Dashboard Dosen" />
      <div className="banner">
        PORTAL RISET & PENGAJARAN · K-Means Clustering berbasis log interaksi LMS mahasiswa.
      </div>
      {sudah ? (
        <div className="kartu besar">
          <h3>Simulasi Hasil Klaster Selesai</h3>
          <p className="abu">Berikut adalah distribusi kelompok gaya belajar mahasiswa berdasarkan pola akses visual vs teks.</p>
          <div className="grid3">
            {KLASTER.map((k, u) => (
              <div className="kartu materi" style={{ animationDelay: u * 120 + "ms" }} key={k[0]}>
                <h4>{k[0]}</h4>
                <p className="abu">{k[1]}</p>
                <button className="tombol alt" onClick={() => ke("materi:" + k[2])}>Lihat materi format ini</button>
              </div>
            ))}
          </div>
          <div className="tombol-baris">
            <button className="tombol alt" onClick={() => setSudah(false)}>Ulangi simulasi</button>
            <button className="tombol alt" onClick={() => ke("kelola")}>Kelola materi & kuis</button>
          </div>
        </div>
      ) : (
        <>
          <div className="kartu besar">
            <h3>Analisis Pola Aktivitas Belajar Mahasiswa</h3>
            <p className="abu">Alur: Pengumpulan log LMS → Pembersihan data → Ekstraksi fitur FSLSM → Klastering K-Means → Rekomendasi otomatis.</p>
            <div className="tombol-baris">
              <button className="tombol" onClick={() => setSudah(true)}>Jalankan simulasi klaster</button>
              <button className="tombol alt" onClick={() => ke("kelola")}>Buka Kelola Materi & Kuis</button>
            </div>
          </div>
          <div className="kartu besar">
            <h3>Fitur Log yang Dianalisis</h3>
            <p className="abu">Akses H5P visual · Akses teks/halaman · Aksi aktif kuis & forum · Hari aktif belajar</p>
          </div>
        </>
      )}
      <div className="stats">
        <Stat nilai={LOG.mahasiswa} label="Mahasiswa unik (log nyata)" />
        <Stat nilai={LOG.baris} label="Baris log bersih" />
        <Stat nilai={LOG.rata} label="Rata-rata aktivitas" />
      </div>
    </>
  );
}

function AnalisisLog({ mhs, dariCSV }) {
  const maks = LOG.modul[0][1], total = LOG.modul.reduce((a, m) => a + m[1], 0);
  const mx = Math.max(...mhs.map((m) => m.teks), 1) * 1.1;
  const my = Math.max(...mhs.map((m) => m.h5p), 1) * 1.1;

  return (
    <>
      <Judul t="Analisis Log LMS" x="Puncak aktivitas tercatat pada pukul 22.00 dan 10.00; hari Selasa dan Jumat paling ramai." />
      <div className="stats">
        <Stat nilai={LOG.mahasiswa} label="Mahasiswa unik" />
        <Stat nilai={LOG.baris} label="Baris log bersih" />
        <Stat nilai={LOG.rata} label="Rata-rata aktivitas per mahasiswa" />
      </div>
      <div className="dua">
        <div className="kartu besar">
          <h3>Aktivitas per Jam</h3>
          <Batang nilai={LOG.jam} label={LOG.jam.map((_, i) => i)} tiap={3} />
        </div>
        <div className="kartu besar">
          <h3>Aktivitas per Hari</h3>
          <Batang nilai={LOG.hari.map((h) => h[1])} label={LOG.hari.map((h) => h[0])} />
        </div>
      </div>
      <div className="kartu besar">
        <h3>Komposisi Modul LMS</h3>
        {LOG.modul.map((m, i) => (
          <div className="hbaris" key={m[0]}>
            <span>{m[0]}</span>
            <div className="trek">
              <i style={{ "--lebar": (m[1] / maks) * 100 + "%", animationDelay: i * 80 + "ms" }} />
            </div>
            <em>{m[1].toLocaleString("id-ID")} ({((m[1] / total) * 100).toFixed(1).replace(".", ",")}%)</em>
          </div>
        ))}
      </div>
      <div className="kartu besar">
        <h3>Materi Teks vs Konten Visual H5P</h3>
        <p className="cap">
          {dariCSV ? `${mhs.length} mahasiswa dari student_features.csv.` : "5 mahasiswa percontohan. Taruh student_features.csv di public/ untuk data lengkap."}
        </p>
        <svg viewBox="0 0 560 300" width="100%" role="img" aria-label="Scatter teks vs H5P">
          <line x1="44" y1="272" x2="552" y2="272" stroke="var(--garis)" />
          <line x1="44" y1="8" x2="44" y2="272" stroke="var(--garis)" />
          {mhs.map((m, i) => (
            <circle
              key={m.nim}
              className="titik"
              style={{ animationDelay: Math.min(i * 15, 900) + "ms" }}
              cx={44 + (508 * m.teks) / mx}
              cy={272 - (264 * m.h5p) / my}
              r="5"
            >
              <title>{m.nama} (Visual: {m.h5p}, Teks: {m.teks})</title>
            </circle>
          ))}
          <text x="300" y="294" textAnchor="middle" className="svg-t">Akses materi teks</text>
        </svg>
      </div>
    </>
  );
}

function DataMhs({ mhs }) {
  const [cari, setCari] = useState("");
  const [urut, setUrut] = useState({ k: null, naik: true });

  let baris = mhs.filter((m) => (m.nim + m.nama).toLowerCase().includes(cari.toLowerCase()));
  if (urut.k) {
    baris = [...baris].sort((a, b) => (a[urut.k] > b[urut.k] ? 1 : -1) * (urut.naik ? 1 : -1));
  }

  const kolom = [
    ["nim", "NIM"],
    ["nama", "Nama Mahasiswa"],
    ["h5p", "Visual (H5P)"],
    ["teks", "Teks (Page)"],
    ["ratio", "Rasio Visual"],
    ["aktif", "Aksi Aktif"],
    ["reflektif", "Reflektif"],
    ["hari", "Hari Aktif"]
  ];

  return (
    <>
      <Judul t="Data Mahasiswa" x="Klik judul kolom untuk mengurutkan data secara otomatis." />
      <div className="kartu besar">
        <input
          className="cari"
          placeholder="Cari nama atau NIM..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          aria-label="Filter tabel"
        />
        <div className="geser">
          <table>
            <thead>
              <tr>
                {kolom.map(([k, l]) => (
                  <th key={k} onClick={() => setUrut({ k, naik: urut.k === k ? !urut.naik : true })}>
                    {l}{urut.k === k ? (urut.naik ? " ↑" : " ↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {baris.map((m) => (
                <tr key={m.nim}>
                  {kolom.map(([k]) => (
                    <td key={k}>{k === "ratio" ? Number(m[k]).toFixed(3) : m[k]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function DevPanel({ user, ke, setUser, onResetData }) {
  return (
    <>
      <Judul t="Panel Pengembang Web (Developer)" x="Kelola lingkungan sistem, observasi status data lokal, dan beralih peran instan." />
      <div className="dua">
        <div className="kartu besar">
          <h3>Status Lingkungan & Akun</h3>
          <p className="abu">Informasi sesi akun aktif saat ini:</p>
          <div style={{ background: "var(--lav)", padding: "12px", borderRadius: "8px", marginTop: "10px", fontSize: "11px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div>Nama Pengguna: <b>{user?.nama}</b></div>
            <div>Hak Akses: <b>{user?.role === "dev" ? "Pengembang (Admin)" : user?.role === "dosen" ? "Dosen" : "Mahasiswa"}</b></div>
            <div>Penyimpanan: <b>Local Storage Browser</b></div>
          </div>
        </div>
        <div className="kartu besar">
          <h3>Beralih Peran Cepat</h3>
          <p className="abu">Uji tampilan antarmuka dari sudut pandang peran lain:</p>
          <div className="tombol-baris" style={{ marginTop: "10px" }}>
            <button className="tombol alt" onClick={() => { setUser({ role: "m", nim: "2315091043", nama: "Putu Aldi Rama Pradika Yasa", cluster: 0, inisial: "PA" }); ke("beranda"); }}>
              Sebagai Mahasiswa
            </button>
            <button className="tombol alt" onClick={() => { setUser({ role: "d", nama: "Dr. I Gede Dosen, M.Kom.", inisial: "DS" }); ke("dosen"); }}>
              Sebagai Dosen
            </button>
            <button className="tombol alt" style={{ color: "var(--salah)" }} onClick={onResetData}>
              Reset Data ke Bawaan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// 5. APLIKASI UTAMA (MAIN APP COMPONENT)
// ============================================================
const MENU = {
  m: [
    ["beranda", "Beranda"],
    ["materi", "Materi belajar"],
    ["aktivitas", "Aktivitas"]
  ],
  d: [
    ["dosen", "Dashboard dosen"],
    ["kelola", "Kelola materi & kuis"],
    ["log", "Analisis log"],
    ["data", "Data mahasiswa"]
  ],
  dev: [
    ["dev", "Panel Pengembang"],
    ["dosen", "Dashboard dosen"],
    ["kelola", "Kelola materi & kuis"],
    ["log", "Analisis log"],
    ["data", "Data mahasiswa"],
    ["beranda", "Simulasi Mahasiswa"]
  ]
};

export default function App() {
  // 1. State Autentikasi Pengguna (3 Akses)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. State Materi (Dapat Ditambah/Dihapus oleh Dosen)
  const [materiList, setMateriList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_materi");
      return saved ? JSON.parse(saved) : MATERI_AWAL;
    } catch {
      return MATERI_AWAL;
    }
  });

  // 3. State Kuis (Dapat Ditambah Soal oleh Dosen)
  const [kuisList, setKuisList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_kuis");
      return saved ? JSON.parse(saved) : KUIS_AWAL;
    } catch {
      return KUIS_AWAL;
    }
  });

  // 4. State Pengumuman / Tugas Dosen
  const [pengumumanList, setPengumumanList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_pengumuman");
      return saved
        ? JSON.parse(saved)
        : [
            {
              judul: "Tugas 01: Analisis Alur Algoritma & Flowchart",
              isi: "Pelajari modul 'Algoritma & Logika', lalu selesaikan kuis formatif sebelum hari Selasa pk 23.59 WIB.",
              waktu: "Diterbitkan Dosen Pengampu"
            }
          ];
    } catch {
      return [];
    }
  });

  const [halaman, setHalaman] = useState("beranda");
  const [selesai, setSelesai] = useState({ 0: true });
  const [tambahan, setTambahan] = useState([]);
  const [idKuis, setIdKuis] = useState(0);
  const [salahSoal, setSalahSoal] = useState(null);

  const [mhs, dariCSV] = useMahasiswa();
  const [nama, arg] = halaman.split(":");
  const i = +arg || 0;

  // Sinkronisasi LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem("ruang_user", JSON.stringify(user));
    else localStorage.removeItem("ruang_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("ruang_materi", JSON.stringify(materiList));
  }, [materiList]);

  useEffect(() => {
    localStorage.setItem("ruang_kuis", JSON.stringify(kuisList));
  }, [kuisList]);

  useEffect(() => {
    localStorage.setItem("ruang_pengumuman", JSON.stringify(pengumumanList));
  }, [pengumumanList]);

  const ke = (h) => {
    setHalaman(h);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buka = (n) => ke("lesson:" + n);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "d") ke("dosen");
    else if (userData.role === "dev") ke("dev");
    else ke("beranda");
  };

  const handleLogout = () => {
    setUser(null);
    setHalaman("beranda");
  };

  const handleTambahMateri = (baru) => {
    setMateriList((prev) => [...prev, baru]);
    setPengumumanList((prev) => [
      {
        judul: `Materi Baru: ${baru.t}`,
        isi: `Dosen telah menambahkan materi '${baru.t}' (${baru.f}). Silakan pelajari di katalog materi.`,
        waktu: "Baru saja diterbitkan"
      },
      ...prev
    ]);
  };

  const handleHapusMateri = (id) => {
    setMateriList((prev) => prev.filter((m) => m.id !== id));
  };

  const handleTambahKuis = (modulId, soalBaru) => {
    setKuisList((prev) => ({
      ...prev,
      [modulId]: [...(prev[modulId] || []), soalBaru]
    }));
  };

  const handleTambahPengumuman = (baru) => {
    setPengumumanList((prev) => [baru, ...prev]);
  };

  const handleResetData = () => {
    localStorage.clear();
    setMateriList(MATERI_AWAL);
    setKuisList(KUIS_AWAL);
    setSelesai({ 0: true });
    setTambahan([]);
    alert("Data berhasil direset ke setelan awal.");
    ke("beranda");
  };

  const tandaiSelesai = () => {
    if (!selesai[i]) {
      setSelesai({ ...selesai, [i]: true });
      const modulIni = materiList[i] || MATERI_AWAL[0];
      setTambahan([...tambahan, [modulIni.t, `Selesai · ${modulIni.menit} menit`, "lesson:" + i]]);
    }
    ke("selesai:" + i);
  };

  const ulangKuis = () => {
    setIdKuis(idKuis + 1);
    ke("kuis:" + i);
  };

  // Jika pengguna belum login, arahkan ke Layar Login
  if (!user) {
    return (
      <>
        <style>{CSS}</style>
        <Login onLogin={handleLogin} mhsList={mhs} />
      </>
    );
  }

  const peran = user.role || "m";
  const menuAktif = ["lesson", "kuis", "salah", "hasil", "selesai"].includes(nama) ? "materi" : nama;
  const modulAktif = materiList[i] || materiList[0];

  const halamanIni = {
    beranda: (
      <BerandaMahasiswa
        user={user}
        materiList={materiList}
        selesai={selesai}
        buka={buka}
        ke={ke}
        pengumumanList={pengumumanList}
      />
    ),
    materi: <Materi materiList={materiList} selesai={selesai} buka={buka} filterAwal={arg} />,
    aktivitas: <Aktivitas tambahan={tambahan} ke={ke} />,
    notif: <Notif ke={ke} pengumumanList={pengumumanList} />,
    lesson: (
      <Pelajaran
        m={modulAktif}
        kuisList={kuisList}
        mulaiKuis={() => ke("kuis:" + i)}
        tandai={tandaiSelesai}
        ke={ke}
      />
    ),
    kuis: (
      <Kuis
        key={idKuis + "-" + i}
        m={modulAktif}
        bankSoal={kuisList[modulAktif.id] || kuisList[0]}
        ke={ke}
        selesaiKuis={() => ke("hasil:" + i)}
        onJawabanSalah={(soal) => setSalahSoal(soal)}
      />
    ),
    salah: <Salah i={i} ke={ke} ulang={ulangKuis} soal={salahSoal} />,
    hasil: <Hasil judul="Hasil Kuis Formatif" skor={100} i={i} ke={ke} ulang={ulangKuis} />,
    selesai: <Hasil judul="Materi Selesai Dipelajari" i={i} ke={ke} />,
    dosen: <Dosen ke={ke} />,
    kelola: (
      <KelolaMateri
        materiList={materiList}
        kuisList={kuisList}
        onTambahMateri={handleTambahMateri}
        onHapusMateri={handleHapusMateri}
        onTambahKuis={handleTambahKuis}
        onTambahPengumuman={handleTambahPengumuman}
        ke={ke}
      />
    ),
    log: <AnalisisLog mhs={mhs} dariCSV={dariCSV} />,
    data: <DataMhs mhs={mhs} />,
    dev: <DevPanel user={user} ke={ke} setUser={setUser} onResetData={handleResetData} />
  }[nama] || (
    <BerandaMahasiswa
      user={user}
      materiList={materiList}
      selesai={selesai}
      buka={buka}
      ke={ke}
      pengumumanList={pengumumanList}
    />
  );

  return (
    <div className="app">
      <style>{CSS}</style>
      <aside>
        <div className="logo" onClick={() => ke(peran === "d" ? "dosen" : peran === "dev" ? "dev" : "beranda")}>
          ruang.
        </div>
        <p className="cap">
          {peran === "d" ? "PORTAL DOSEN" : peran === "dev" ? "PORTAL PENGEMBANG" : "RUANG BELAJARMU"}
        </p>
        <nav>
          {(MENU[peran] || MENU.m).map(([k, l]) => (
            <button key={k} className={k === menuAktif ? "on" : ""} onClick={() => ke(k)}>
              {l}
            </button>
          ))}
        </nav>
      </aside>

      <div className="kolom-utama">
        <div className="atas">
          <span>
            Ruang belajar / {nama === "lesson" ? modulAktif.t : menuAktif}
          </span>
          <div className="kanan">
            <span
              className="chip"
              style={{
                background: "var(--lav)",
                padding: "4px 10px",
                borderRadius: "12px",
                color: "var(--ungu)",
                fontWeight: "600"
              }}
            >
              {peran === "d" ? "👨‍🏫 Dosen" : peran === "dev" ? "⚙️ Pengembang" : `🎓 NIM: ${user.nim || "Mahasiswa"}`}
            </span>
            <button className="lonceng" onClick={() => ke("notif")} aria-label="Notifikasi">
              🔔
            </button>
            <span className="ungu" style={{ fontWeight: "700" }}>
              {user.inisial || "MH"}
            </span>
            <button
              onClick={handleLogout}
              className="link"
              style={{ color: "var(--salah)", marginLeft: "4px" }}
              title="Keluar dari akun"
            >
              Keluar
            </button>
          </div>
        </div>

        <main className="isi masuk" key={halaman}>
          {halamanIni}
          <p className="cap">FSLSM × K-Means · Sistem Pembelajaran Adaptif</p>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// 6. GAYA VISUAL & ANIMASI (EMBEDDED CSS)
// ============================================================
const CSS = `
:root {
  --bg: #f7f7fa;
  --kartu: #ffffff;
  --garis: #e9e5f0;
  --lav: #eee8f8;
  --ungu: #7150c9;
  --ungu2: #b9a3ec;
  --teks: #252336;
  --abu: #797183;
  --ok: #2e8b57;
  --salah: #d9644a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #17141f;
    --kartu: #201c2b;
    --garis: #332d42;
    --lav: #2a2340;
    --ungu: #a68ae8;
    --ungu2: #6c58a8;
    --teks: #efecf7;
    --abu: #a39bb3;
    --ok: #5cc08a;
    --salah: #e47b63;
  }
}

* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--teks); font: 13px/1.45 'Plus Jakarta Sans', system-ui, sans-serif; }
h1, h2, h3, h4, p { margin: 0; }
button { font-family: inherit; color: inherit; }
button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid var(--ungu); outline-offset: 2px; }

/* Animasi */
@keyframes masuk { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes isi { from { width: 0; } to { width: var(--lebar); } }
@keyframes tumbuh { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes muncul { from { opacity: 0; transform: scale(.3); } to { opacity: .75; transform: scale(1); } }
@keyframes goyang { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

.masuk { animation: masuk .45s ease both; }
.materi, .baris { animation: masuk .5s ease both; }
.trek i { display: block; height: 100%; background: var(--ungu); border-radius: 5px; width: var(--lebar); animation: isi 1s cubic-bezier(.2, .8, .2, 1) both; }
.batang { background: var(--ungu); border-radius: 3px 3px 0 0; width: 100%; transform-origin: bottom; animation: tumbuh .7s ease both; }
.titik { fill: var(--ungu); transform-box: fill-box; transform-origin: center; animation: muncul .5s ease both; }
.opsi.salah { animation: goyang .4s; }

/* Tata Letak */
.app { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
aside { background: var(--kartu); padding: 24px; display: flex; flex-direction: column; gap: 18px; position: sticky; top: 0; height: 100vh; }
.logo { font-size: 32px; font-weight: 800; color: var(--ungu); cursor: pointer; }
nav { display: flex; flex-direction: column; gap: 6px; }
nav button { height: 44px; text-align: left; padding: 0 12px; border: 0; border-radius: 8px; background: none; color: var(--abu); font-weight: 500; font-size: 12px; cursor: pointer; transition: background .2s, color .2s, transform .2s; }
nav button:hover { background: var(--lav); transform: translateX(3px); }
nav button.on { background: var(--lav); color: var(--ungu); }

.atas { background: var(--kartu); min-height: 84px; padding: 24px; display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; color: var(--abu); border-bottom: 1px solid var(--garis); }
.kanan { display: flex; align-items: center; gap: 14px; }
.chip, .lonceng { border: 0; background: none; cursor: pointer; font-size: 12px; }
.ungu { color: var(--ungu); }
.isi { padding: 32px; display: flex; flex-direction: column; gap: 24px; max-width: 1220px; }

.judul h1 { font-size: 32px; font-weight: 800; line-height: 1.3; }
.judul p { color: var(--abu); margin-top: 6px; }
.cap { font-size: 10px; color: var(--abu); }
.abu { color: var(--abu); }

.dua-kolom { display: grid; grid-template-columns: minmax(0, 1fr) 332px; gap: 24px; align-items: start; }
.tumpuk { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
.dua, .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 14px 0; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* Kartu & Tombol */
.kartu { background: var(--kartu); border: 1px solid var(--garis); border-radius: 12px; padding: 20px; min-width: 0; display: flex; flex-direction: column; gap: 8px; text-align: left; transition: transform .25s, box-shadow .25s; }
.kartu.besar { border-radius: 16px; padding: 24px; }
button.materi { cursor: pointer; width: 100%; }
button.materi:hover, .kartu.materi:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(113, 80, 201, .15); }
.stat b { font-size: 22px; font-weight: 700; color: var(--ungu); }
.stat span { font-size: 11px; font-weight: 500; color: var(--abu); }
.ilustrasi { background: var(--lav); border-radius: 8px; padding: 16px; font-size: 22px; font-weight: 700; color: var(--ungu); min-height: 66px; display: flex; align-items: center; justify-content: center; }
.hero { background: var(--lav); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.hero h2 { font-size: 32px; font-weight: 800; line-height: 1.3; }
.ungu-muda { background: var(--lav); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }

.tombol { background: var(--ungu); color: #fff; border: 1px solid var(--ungu); border-radius: 8px; padding: 10px 16px; font-size: 11px; font-weight: 500; cursor: pointer; transition: transform .2s, box-shadow .2s; }
.tombol:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(113, 80, 201, .3); }
.tombol.alt { background: transparent; color: var(--ungu); }
.tombol.alt:hover { background: var(--lav); }
.tombol-baris { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
.link { border: 0; background: none; color: var(--ungu); font-size: 11px; font-weight: 500; cursor: pointer; }
.baris-judul, .baris { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.baris { padding: 14px 0; border-bottom: 1px solid var(--garis); }
.trek { height: 5px; background: var(--garis); border-radius: 5px; overflow: hidden; }
.skala { margin-top: 14px; }
.lbl { display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; color: var(--abu); margin-bottom: 8px; }
.lbl b { color: var(--ungu); font-weight: 500; }

.chips { display: flex; gap: 8px; flex-wrap: wrap; }
.chips button { border: 1px solid var(--garis); background: var(--kartu); border-radius: 20px; padding: 6px 14px; font-size: 11px; font-weight: 500; cursor: pointer; transition: all .2s; }
.chips button:hover { border-color: var(--ungu); }
.chips button.on { background: var(--lav); color: var(--ungu); border-color: var(--ungu); font-weight: 600; }

.cari { width: 100%; max-width: 360px; padding: 10px 14px; border: 1px solid var(--garis); border-radius: 8px; background: var(--kartu); color: var(--teks); font: inherit; }
textarea.cari { max-width: 100%; resize: vertical; min-height: 80px; font-family: inherit; }
select.cari { cursor: pointer; appearance: auto; }

.alur { background: var(--lav); border-radius: 12px; padding: 28px; font-size: 22px; font-weight: 700; color: var(--ungu); text-align: center; }
.banner { background: var(--lav); color: var(--abu); border-radius: 8px; padding: 10px 14px; font-size: 11px; }
.opsi { display: flex; gap: 10px; width: 100%; text-align: left; border: 1px solid var(--garis); background: var(--kartu); border-radius: 10px; padding: 14px; font-size: 13px; font-weight: 500; cursor: pointer; margin-top: 10px; transition: border-color .2s, background .2s, transform .2s; }
.opsi:not(:disabled):hover { border-color: var(--ungu); transform: translateX(4px); }
.opsi.benar { border-color: var(--ok); background: var(--lav); color: var(--ok); }
.opsi.salah { border-color: var(--salah); color: var(--salah); }
.ok-teks { color: var(--ok); font-weight: 700; margin-top: 10px; }
.angka-besar { font-size: 64px; font-weight: 800; color: var(--ungu); line-height: 1.1; }

/* Grafik & Tabel */
.batang-wadah { display: flex; align-items: flex-end; gap: 3px; height: 200px; margin-top: 10px; }
.kolom { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px; font-size: 9px; color: var(--abu); }
.kolom .batang { flex: none; }
.hbaris { display: grid; grid-template-columns: 140px 1fr 150px; gap: 10px; align-items: center; margin-top: 10px; font-size: 11px; }
.hbaris em { font-style: normal; color: var(--abu); text-align: right; }
.svg-t { fill: var(--abu); font-size: 10px; }
.geser { overflow-x: auto; margin-top: 10px; }
table { border-collapse: collapse; width: 100%; min-width: 600px; font-size: 11px; }
th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--garis); }
th { color: var(--abu); font-weight: 600; cursor: pointer; }
th:hover { color: var(--ungu); }
tbody tr:hover { background: var(--lav); }

/* Form Login & Input */
.login-wadah { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; background: var(--bg); }
.login-kartu { width: 100%; max-width: 460px; background: var(--kartu); border: 1px solid var(--garis); border-radius: 16px; padding: 32px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04); animation: masuk 0.45s ease both; }
.input-grup { display: flex; flex-direction: column; gap: 6px; }
.input-grup label { font-size: 11px; font-weight: 600; color: var(--abu); }

/* Layar Responsif */
@media (max-width: 900px) {
  .app { grid-template-columns: 1fr; }
  aside { position: fixed; z-index: 5; bottom: 0; left: 0; right: 0; top: auto; height: auto; flex-direction: row; padding: 6px 8px; border-top: 1px solid var(--garis); border-right: none; }
  aside .logo, aside > .cap { display: none; }
  nav { flex-direction: row; width: 100%; justify-content: space-around; }
  nav button { height: auto; padding: 8px; font-size: 10px; text-align: center; }
  .kolom-utama { padding-bottom: 80px; }
  .isi { padding: 20px 16px; }
  .dua-kolom, .dua, .grid2, .grid3, .stats { grid-template-columns: 1fr; }
  .judul h1, .hero h2 { font-size: 24px; }
  .hbaris { grid-template-columns: 80px 1fr; }
  .hbaris em { grid-column: 1 / -1; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
`;
