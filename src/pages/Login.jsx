import React, { useState } from "react";

export function Login({ onLogin, mhsList = [] }) {
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

      // Cari mahasiswa dari data CSV / default
      const ditemukan = mhsList.find((m) => String(m.nim) === bersihNim);

      if (ditemukan) {
        onLogin({
          role: "m",
          nim: ditemukan.nim,
          nama: ditemukan.nama,
          ratio: ditemukan.ratio,
          cluster: ditemukan.cluster,
          h5p: ditemukan.h5p,
          teks: ditemukan.teks,
          aktif: ditemukan.aktif,
          reflektif: ditemukan.reflektif,
          hari: ditemukan.hari,
          inisial: ditemukan.nama
            .split(" ")
            .map((k) => k[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        });
      } else {
        // Jika NIM baru belum ada di daftar log, tetap bisa masuk sebagai mahasiswa baru
        onLogin({
          role: "m",
          nim: bersihNim,
          nama: `Mahasiswa (${bersihNim})`,
          ratio: 0.912,
          cluster: 0,
          h5p: 400,
          teks: 40,
          aktif: 35,
          reflektif: 500,
          hari: 20,
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
        setPesanError("NIP / Username atau kata sandi dosen belum tepat. (Demo: dosen / dosen123)");
      }
    } else if (role === "dev") {
      const u = username.trim().toLowerCase();
      const p = password.trim();

      if ((u === "admin" || u === "dev" || u === "pembuat") && (p === "admin123" || p === "dev123" || p === "admin")) {
        onLogin({
          role: "dev",
          nama: "Pengembang Web (Developer)",
          id: "DEV-SYS-01",
          inisial: "DEV"
        });
      } else {
        setPesanError("Akun pengembang atau kata sandi belum tepat. (Demo: admin / admin123)");
      }
    }
  };

  return (
    <div className="login-wadah">
      <div className="login-kartu">
        <div>
          <div className="logo" style={{ cursor: "default" }}>
            ruang.
          </div>
          <p className="cap" style={{ marginTop: "2px" }}>
            RUANG BELAJARMU · SISTEM PEMBELAJARAN ADAPTIF
          </p>
          <p className="abu" style={{ marginTop: "8px", fontSize: "12px" }}>
            Pilih hak akses dan masuk untuk melanjutkan ke portal sistem.
          </p>
        </div>

        {/* 3 Tab Akses Peran */}
        <div className="input-grup">
          <label>PILIH HAK AKSES SISTEM</label>
          <div className="chips">
            <button
              type="button"
              className={role === "mahasiswa" ? "on" : ""}
              onClick={() => handlePilihRole("mahasiswa")}
            >
              Mahasiswa
            </button>
            <button
              type="button"
              className={role === "dosen" ? "on" : ""}
              onClick={() => handlePilihRole("dosen")}
            >
              Dosen
            </button>
            <button
              type="button"
              className={role === "dev" ? "on" : ""}
              onClick={() => handlePilihRole("dev")}
            >
              Pembuat Web
            </button>
          </div>
        </div>

        {pesanError && (
          <div className="banner" style={{ color: "var(--salah)", border: "1px solid var(--salah)" }}>
            {pesanError}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {role === "mahasiswa" && (
            <>
              <div className="input-grup">
                <label>NOMOR INDUK MAHASISWA (NIM)</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Masukkan NIM Anda (contoh: 2315091043)"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <p className="cap" style={{ marginBottom: "6px" }}>PILIHAN CONTOH NIM MAHASISWA:</p>
                <div className="chips">
                  {[
                    ["2315091043", "Aldi (Cluster 1)"],
                    ["2315091092", "Very (Cluster 0)"],
                    ["2415091002", "Luh Indah (Cluster 2)"],
                    ["2415091003", "Kadek (Cluster 1)"]
                  ].map(([n, l]) => (
                    <button
                      key={n}
                      type="button"
                      className={nim === n ? "on" : ""}
                      onClick={() => setNim(n)}
                      style={{ fontSize: "10px", padding: "4px 10px" }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {role === "dosen" && (
            <>
              <div className="input-grup">
                <label>NIP ATAU USERNAME DOSEN</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Masukkan NIP atau username 'dosen'"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="input-grup">
                <label>KATA SANDI</label>
                <input
                  type="password"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="cap">Demo dosen: NIP/Username: <b>dosen</b> · Sandi: <b>dosen123</b></p>
            </>
          )}

          {role === "dev" && (
            <>
              <div className="input-grup">
                <label>AKUN PENGEMBANG WEB</label>
                <input
                  type="text"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Masukkan akun 'admin' atau 'dev'"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="input-grup">
                <label>KATA SANDI DEVELOPER</label>
                <input
                  type="password"
                  className="cari"
                  style={{ maxWidth: "100%" }}
                  placeholder="Masukkan kata sandi pengembang"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="cap">Demo pembuat web: Akun: <b>admin</b> · Sandi: <b>admin123</b></p>
            </>
          )}

          <div style={{ marginTop: "6px" }}>
            <button type="submit" className="tombol" style={{ width: "100%", padding: "12px", fontSize: "12px" }}>
              {role === "mahasiswa"
                ? "Masuk sebagai Mahasiswa →"
                : role === "dosen"
                ? "Masuk sebagai Dosen →"
                : "Buka Panel Pembuat Web →"}
            </button>
          </div>
        </form>

        <div className="banner" style={{ fontSize: "10px" }}>
          Sistem autentikasi adaptif ruang. mengidentifikasi data log dan gaya belajar individual sesuai NIM Anda.
        </div>
      </div>
    </div>
  );
}
