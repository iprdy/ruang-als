import React, { useState } from "react";
import { Icon } from "../assets/icons";

export function LoginPage({ onLogin, studentList = [] }) {
  const [role, setRole] = useState("mahasiswa"); // 'mahasiswa' | 'dosen' | 'dev'
  const [nim, setNim] = useState("2315091043");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setErrorMessage("");
    if (selectedRole === "mahasiswa") {
      setNim("2315091043");
    } else if (selectedRole === "dosen") {
      setUsername("dosen");
      setPassword("dosen123");
    } else if (selectedRole === "dev") {
      setUsername("admin");
      setPassword("admin123");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (role === "mahasiswa") {
      const cleanNim = nim.trim();
      if (!cleanNim) {
        setErrorMessage("Silakan masukkan NIM Anda.");
        return;
      }

      const found = studentList.find((m) => String(m.nim) === cleanNim);
      if (found) {
        onLogin({
          role: "m",
          nim: found.nim,
          nama: found.nama,
          cluster: found.cluster !== undefined ? found.cluster : 1,
          profil: found.profil,
          inisial: found.nama
            .split(" ")
            .map((k) => k[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        });
      } else {
        onLogin({
          role: "m",
          nim: cleanNim,
          nama: `Mahasiswa (${cleanNim})`,
          cluster: 1,
          profil: "Pembelajar Konsisten & Teratur",
          inisial: "MH"
        });
      }
    } else if (role === "dosen") {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if ((u === "dosen" || u === "198507122010121002") && (p === "dosen123" || p === "dosen")) {
        onLogin({
          role: "d",
          nama: "Dr. I Gede Dosen Pengampu, M.Kom.",
          nip: "198507122010121002",
          inisial: "DS"
        });
      } else {
        setErrorMessage("Username atau kata sandi dosen belum tepat. (Akun demo: dosen / dosen123)");
      }
    } else if (role === "dev") {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if ((u === "admin" || u === "dev") && (p === "admin123" || p === "admin")) {
        onLogin({
          role: "dev",
          nama: "Pengembang Sistem (Developer)",
          inisial: "DEV"
        });
      } else {
        setErrorMessage("Kredensial developer salah. (Akun demo: admin / admin123)");
      }
    }
  };

  return (
    <div className="login-wadah">
      <div className="login-kartu">
        <div style={{ textAlign: "center" }}>
          <div className="logo" style={{ fontSize: "36px" }}>ruang.</div>
          <span className="portal-tag" style={{ marginTop: "4px", display: "block" }}>
            SISTEM PEMBELAJARAN ADAPTIF (FSLSM × K-MEANS)
          </span>
          <p className="abu" style={{ marginTop: "8px", fontSize: "12px" }}>
            Pilih hak akses di bawah untuk masuk ke dalam portal pembelajaran personalisasi.
          </p>
        </div>

        {/* Tab Role Switcher */}
        <div className="chips" style={{ width: "100%", justifyContent: "center" }}>
          <button
            type="button"
            className={`chip-btn ${role === "mahasiswa" ? "on" : ""}`}
            onClick={() => handleRoleChange("mahasiswa")}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Icon name="award" size={14} />
            <span>Mahasiswa</span>
          </button>
          <button
            type="button"
            className={`chip-btn ${role === "dosen" ? "on" : ""}`}
            onClick={() => handleRoleChange("dosen")}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Icon name="users" size={14} />
            <span>Dosen</span>
          </button>
          <button
            type="button"
            className={`chip-btn ${role === "dev" ? "on" : ""}`}
            onClick={() => handleRoleChange("dev")}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Icon name="settings" size={14} />
            <span>Developer</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {role === "mahasiswa" && (
            <div className="input-grup">
              <label>Nomor Induk Mahasiswa (NIM)</label>
              <input
                type="text"
                className="input-teks"
                placeholder="Masukkan NIM Anda (contoh: 2315091043)"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              <span className="cap">
                💡 Contoh NIM aktif hasil klaster: <code>2315091043</code> (Cluster 1), <code>2315091092</code> (Cluster 2), <code>2415091008</code> (Cluster 0)
              </span>
            </div>
          )}

          {role === "dosen" && (
            <>
              <div className="input-grup">
                <label>Username Dosen</label>
                <input
                  type="text"
                  className="input-teks"
                  placeholder="Username dosen"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Kata Sandi</label>
                <input
                  type="password"
                  className="input-teks"
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="cap">💡 Akun demo: username <code>dosen</code> · sandi <code>dosen123</code></span>
              </div>
            </>
          )}

          {role === "dev" && (
            <>
              <div className="input-grup">
                <label>Username Developer</label>
                <input
                  type="text"
                  className="input-teks"
                  placeholder="Username admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-grup">
                <label>Kata Sandi</label>
                <input
                  type="password"
                  className="input-teks"
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="cap">💡 Akun demo: username <code>admin</code> · sandi <code>admin123</code></span>
              </div>
            </>
          )}

          {errorMessage && (
            <div style={{ color: "var(--salah)", fontSize: "11.5px", fontWeight: "600", padding: "10px 14px", background: "var(--salah-bg)", borderRadius: "var(--radius-md)", border: "1px solid rgba(211,78,52,0.3)" }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <button type="submit" className="tombol" style={{ padding: "12px", fontSize: "13px", width: "100%", marginTop: "4px" }}>
            <span>Masuk ke Portal {role === "mahasiswa" ? "Mahasiswa" : role === "dosen" ? "Dosen" : "Developer"}</span>
            <Icon name="arrow-right" size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
