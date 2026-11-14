// ============================================================
// ruang. — Dashboard Pembelajaran Adaptif (React)
// Dilengkapi Sistem Login 3 Akses & Fitur Dosen Kelola Materi, Kuis & Tugas
// Sisi Mahasiswa Bersih & Otomatis dari Model Machine Learning (Tanpa Profil Manual)
// Gaya & estetika 100% konsisten dengan rancangan asli
// ============================================================

import React, { useState, useEffect } from "react";
import "./styles/style.css";

// Data & Hooks
import { MATERI, KUIS_PER_MODUL, PROFIL_DEFAULT } from "./data/learningData";
import { useMahasiswa } from "./hooks/useMahasiswa";

// Halaman-halaman
import { Login } from "./pages/Login";
import { Beranda } from "./pages/Beranda";
import { Materi } from "./pages/Materi";
import { Pelajaran } from "./pages/Pelajaran";
import { Kuis } from "./pages/Kuis";
import { Salah } from "./pages/Salah";
import { Hasil } from "./pages/Hasil";
import { Aktivitas } from "./pages/Aktivitas";
import { Notif } from "./pages/Notif";
import { ProfilHal } from "./pages/ProfilHal";
import { Dosen } from "./pages/Dosen";
import { KelolaMateri } from "./pages/KelolaMateri";
import { AnalisisLog } from "./pages/AnalisisLog";
import { DataMhs } from "./pages/DataMhs";
import { DevPanel } from "./pages/DevPanel";

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
  // State Autentikasi Pengguna (3 Akses: Mahasiswa, Dosen, Pembuat Web)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State Kurikulum Materi (Dapat Ditambah/Dikelola oleh Dosen)
  const [materiList, setMateriList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_materi");
      return saved ? JSON.parse(saved) : MATERI;
    } catch {
      return MATERI;
    }
  });

  // State Bank Soal Kuis (Dapat Ditambah oleh Dosen per Modul)
  const [kuisList, setKuisList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_kuis");
      return saved ? JSON.parse(saved) : KUIS_PER_MODUL;
    } catch {
      return KUIS_PER_MODUL;
    }
  });

  // State Pengumuman & Tugas dari Dosen
  const [pengumumanList, setPengumumanList] = useState(() => {
    try {
      const saved = localStorage.getItem("ruang_pengumuman");
      return saved
        ? JSON.parse(saved)
        : [
            {
              judul: "Tugas Mandiri 01: Analisis Alur Algoritma & Flowchart",
              isi: "Pelajari modul 'Algoritma & Logika', lalu selesaikan kuis formatif sebelum hari Selasa pk 23.59 WIB.",
              tipe: "Tugas Pemrograman",
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
  const [profil, setProfil] = useState(PROFIL_DEFAULT);

  const [mhs, dariCSV] = useMahasiswa();
  const [nama, arg] = halaman.split(":");
  const i = +arg || 0;

  // Menentukan peran aktif: 'm' (mahasiswa), 'd' (dosen), atau 'dev' (pembuat web)
  const peran = user ? user.role : "m";
  const menuAktif = ["lesson", "kuis", "salah", "hasil", "selesai"].includes(nama) ? "materi" : nama;

  // Simpan status ke localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("ruang_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ruang_user");
    }
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
    if (userData.role === "d") {
      ke("dosen");
    } else if (userData.role === "dev") {
      ke("dev");
    } else {
      ke("beranda");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHalaman("beranda");
  };

  // Fungsi Dosen: Tambah Materi Baru
  const handleTambahMateri = (baru) => {
    setMateriList((prev) => [...prev, baru]);
    // Buat kuis default untuk modul baru
    setKuisList((prev) => ({
      ...prev,
      [baru.id]: [
        {
          q: `Konsep apa yang paling ditekankan pada modul ${baru.t}?`,
          opsi: [baru.d.slice(0, 50), "Penggantian perangkat keras CPU", "Penghapusan memori komputer"],
          benar: 0,
          ulasan: `Tepat sekali. Modul ini berfokus pada: ${baru.d}`
        }
      ]
    }));
    // Buat notifikasi otomatis ke mahasiswa
    setPengumumanList((prev) => [
      {
        judul: `Materi Baru: ${baru.t}`,
        isi: `Dosen telah menambahkan materi baru '${baru.t}' (${baru.f}, durasi ${baru.menit} menit). Segera pelajari di katalog materi.`,
        tipe: "Materi Baru",
        waktu: "Baru saja diterbitkan"
      },
      ...prev
    ]);
  };

  // Fungsi Dosen: Hapus Materi
  const handleHapusMateri = (id) => {
    setMateriList((prev) => prev.filter((m) => m.id !== id));
  };

  // Fungsi Dosen: Tambah Soal Kuis
  const handleTambahKuis = (modulId, soalBaru) => {
    setKuisList((prev) => ({
      ...prev,
      [modulId]: [...(prev[modulId] || []), soalBaru]
    }));
  };

  // Fungsi Dosen: Tambah Pengumuman / Tugas
  const handleTambahPengumuman = (pengumumanBaru) => {
    setPengumumanList((prev) => [pengumumanBaru, ...prev]);
  };

  const tandai = () => {
    const target = materiList[i] || materiList[0] || MATERI[0];
    if (!selesai[i]) {
      setSelesai({ ...selesai, [i]: true });
      setTambahan([
        [target.t, `Selesai · ${target.menit} menit`, "lesson:" + i],
        ...tambahan
      ]);
    }
    ke("selesai:" + i);
  };

  const selesaiKuis = () => {
    const target = materiList[i] || materiList[0] || MATERI[0];
    if (!selesai[i]) {
      setSelesai({ ...selesai, [i]: true });
    }
    setTambahan([
      [`Kuis: ${target.t}`, "Nilai 100 · Selesai dipelajari", "lesson:" + i],
      ...tambahan
    ]);
    ke("hasil:" + i);
  };

  const ulang = () => {
    setIdKuis(idKuis + 1);
    setSalahSoal(null);
    ke("kuis:" + i);
  };

  const onUbahProfil = (idx, nilaiBaru) => {
    setProfil((prev) => {
      const salin = [...prev];
      salin[idx] = [salin[idx][0], salin[idx][1], nilaiBaru];
      return salin;
    });
  };

  const onResetData = () => {
    setSelesai({ 0: true });
    setTambahan([]);
    setProfil(PROFIL_DEFAULT);
    setMateriList(MATERI);
    setKuisList(KUIS_PER_MODUL);
    localStorage.removeItem("ruang_materi");
    localStorage.removeItem("ruang_kuis");
    localStorage.removeItem("ruang_pengumuman");
    alert("Data materi, kuis, dan progres pembelajaran berhasil di-reset ke data bawaan.");
  };

  const onSimulasikanUser = (targetNim) => {
    const target = mhs.find((m) => String(m.nim) === String(targetNim));
    if (target) {
      handleLogin({
        role: "m",
        nim: target.nim,
        nama: target.nama,
        ratio: target.ratio,
        cluster: target.cluster,
        h5p: target.h5p,
        teks: target.teks,
        aktif: target.aktif,
        reflektif: target.reflektif,
        hari: target.hari,
        inisial: target.nama.slice(0, 2).toUpperCase()
      });
    }
  };

  // Jika belum login, tampilkan halaman Login
  if (!user) {
    return <Login onLogin={handleLogin} mhsList={mhs} />;
  }

  const halamanIni = {
    beranda: (
      <Beranda
        selesai={selesai}
        buka={buka}
        ke={ke}
        user={user}
        materiList={materiList}
        pengumumanList={pengumumanList}
      />
    ),
    materi: (
      <Materi
        selesai={selesai}
        buka={buka}
        filterAwal={arg}
        materiList={materiList}
      />
    ),
    profil: (
      <ProfilHal
        ke={ke}
        profil={profil}
        onUbahProfil={onUbahProfil}
        user={user}
      />
    ),
    aktivitas: <Aktivitas tambahan={tambahan} ke={ke} />,
    notif: <Notif ke={ke} pengumumanList={pengumumanList} />,
    lesson: (
      <Pelajaran
        i={i}
        mulaiKuis={() => ke("kuis:" + i)}
        tandai={tandai}
        ke={ke}
        materiList={materiList}
      />
    ),
    kuis: (
      <Kuis
        key={idKuis}
        i={i}
        ke={ke}
        selesaiKuis={selesaiKuis}
        onSetSalahSoal={setSalahSoal}
        kuisList={kuisList}
        materiList={materiList}
      />
    ),
    salah: (
      <Salah
        i={i}
        ke={ke}
        ulang={ulang}
        salahSoal={salahSoal}
        materiList={materiList}
      />
    ),
    hasil: (
      <Hasil
        judul="Hasil kuis"
        skor={100}
        i={i}
        ke={ke}
        ulang={ulang}
        materiList={materiList}
      />
    ),
    selesai: (
      <Hasil
        judul="Materi selesai"
        i={i}
        ke={ke}
        materiList={materiList}
      />
    ),
    dosen: <Dosen ke={ke} mhs={mhs} />,
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
    dev: (
      <DevPanel
        mhs={mhs}
        dariCSV={dariCSV}
        onResetData={onResetData}
        onSimulasikanUser={onSimulasikanUser}
        ke={ke}
      />
    )
  }[nama] || (
    <Beranda
      selesai={selesai}
      buka={buka}
      ke={ke}
      user={user}
      materiList={materiList}
      pengumumanList={pengumumanList}
    />
  );

  return (
    <div className="app">
      <aside>
        <div className="logo" onClick={() => ke(peran === "m" ? "beranda" : peran === "d" ? "dosen" : "dev")}>
          ruang.
        </div>
        <p className="cap">
          {peran === "m"
            ? "RUANG MAHASISWA"
            : peran === "d"
            ? "PORTAL DOSEN"
            : "PANEL PENGEMBANG"}
        </p>
        <nav>
          {(MENU[peran] || MENU.m).map(([k, l]) => (
            <button
              key={k}
              className={k === menuAktif ? "on" : ""}
              onClick={() => ke(k)}
            >
              {l}
            </button>
          ))}
        </nav>
      </aside>

      <div className="kolom-utama">
        <div className="atas">
          <span>
            Ruang belajar / {nama === "lesson" ? (materiList[i]?.t || "Materi") : menuAktif}
          </span>
          <div className="kanan">
            <span
              className="chip"
              style={{ cursor: "default", userSelect: "none" }}
            >
              {peran === "m"
                ? "Mahasiswa"
                : peran === "d"
                ? "Dosen"
                : "Pembuat Web"}
            </span>

            <span className="cap" style={{ fontWeight: 600 }}>
              {user.nama}
            </span>

            <button
              className="lonceng"
              onClick={() => ke("notif")}
              aria-label="Notifikasi"
            >
              🔔
            </button>

            <span className="ungu">{user.inisial || "AP"}</span>

            <button
              className="tombol alt"
              style={{ padding: "5px 12px", fontSize: "11px" }}
              onClick={handleLogout}
              title="Keluar dari akun"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* key={halaman} membuat halaman dibuat ulang → animasi masuk (.masuk) diputar setiap pindah halaman */}
        <main className="isi masuk" key={halaman}>
          {halamanIni}
          <p className="cap">
            FSLSM × K-Means · Prototipe visual adaptif untuk riset analitik pembelajaran
          </p>
        </main>
      </div>
    </div>
  );
}
