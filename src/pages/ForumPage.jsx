import React, { useState } from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { Icon } from "../assets/icons";

export function ForumPage({
  threads = [],
  user,
  onAddThread,
  onAddReply
}) {
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("all");
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  // Form State: Buat Topik Baru
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [judulBaru, setJudulBaru] = useState("");
  const [kategoriBaru, setKategoriBaru] = useState("Keamanan Sistem Informasi");
  const [isiBaru, setIsiBaru] = useState("");

  // Form State: Kirim Balasan
  const [isiBalasan, setIsiBalasan] = useState("");

  const selectedThread = threads.find((t) => t.id === selectedThreadId);

  const filteredThreads = threads.filter((t) => {
    const matchesSearch = (t.judul + " " + t.isi + " " + t.penulis).toLowerCase().includes(search.toLowerCase());
    const matchesCat = kategoriFilter === "all" || t.kategori === kategoriFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateThreadSubmit = (e) => {
    e.preventDefault();
    if (!judulBaru.trim() || !isiBaru.trim()) {
      alert("Harap lengkapi judul topik dan isi pesan diskusi.");
      return;
    }

    const payload = {
      id: `TH-${String(threads.length + 1).padStart(2, "0")}`,
      modulId: "MOD-01",
      kategori: kategoriBaru,
      judul: judulBaru.trim(),
      penulis: user?.nama || "Mahasiswa",
      rolePenulis: user?.role === "d" ? "dosen" : "mahasiswa",
      inisial: user?.inisial || "MH",
      waktu: "Baru saja",
      isi: isiBaru.trim(),
      dilihat: 1,
      balasan: []
    };

    onAddThread(payload);
    setJudulBaru("");
    setIsiBaru("");
    setShowCreateModal(false);
    setSelectedThreadId(payload.id);
    alert("✓ Topik diskusi baru berhasil diterbitkan!");
  };

  const handleSendReplySubmit = (e) => {
    e.preventDefault();
    if (!isiBalasan.trim()) return;

    const replyPayload = {
      id: `BAL-${Date.now()}`,
      penulis: user?.nama || "Mahasiswa",
      role: user?.role === "d" ? "dosen" : "mahasiswa",
      nim: user?.nim || "-",
      inisial: user?.inisial || "MH",
      waktu: "Baru saja",
      isi: isiBalasan.trim()
    };

    onAddReply(selectedThread.id, replyPayload);
    setIsiBalasan("");
  };

  return (
    <>
      <TitleHeader
        title="Forum Diskusi Akademik (Open Forum)"
        subtitle="Komponen LMS Moodle: Ruang kolaborasi interaktif antar-mahasiswa dan dosen pengampu (7.262 baris interaksi log)."
      />

      <div className="dua-kolom">
        {/* Kolom Kiri: Daftar Thread Diskusi */}
        <div className="tumpuk">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
              <input
                type="text"
                className="cari"
                placeholder="⌕ Cari topik atau kata kunci diskusi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="tombol" onClick={() => setShowCreateModal(!showCreateModal)}>
              <Icon name="plus-circle" size={15} />
              <span>{showCreateModal ? "Tutup Form" : "Buat Topik Baru"}</span>
            </button>
          </div>

          {/* Form Buat Topik Baru (Collapsible) */}
          {showCreateModal && (
            <div className="kartu besar masuk" style={{ border: "2px solid var(--ungu)", background: "var(--lav-terang)" }}>
              <h3 style={{ fontSize: "14px" }}>Buat Topik Diskusi Baru</h3>
              <p className="cap">Diskusikan pertanyaan analisis, lab keamanan, atau materi kuliah bersama rekan dan dosen.</p>

              <form onSubmit={handleCreateThreadSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                <div className="input-grup">
                  <label>Judul Diskusi:</label>
                  <input
                    type="text"
                    className="input-teks"
                    placeholder="Contoh: Pertanyaan seputar integrasi OpenSSL dengan TLS 1.3"
                    value={judulBaru}
                    onChange={(e) => setJudulBaru(e.target.value)}
                  />
                </div>
                <div className="input-grup">
                  <label>Kategori Forum:</label>
                  <select className="input-teks" value={kategoriBaru} onChange={(e) => setKategoriBaru(e.target.value)}>
                    <option value="Keamanan Sistem Informasi">Keamanan Sistem Informasi</option>
                    <option value="Tanya Jawab Lab">Tanya Jawab Lab</option>
                    <option value="Diskusi Teori">Diskusi Teori & Regulasi</option>
                  </select>
                </div>
                <div className="input-grup">
                  <label>Isi Pertanyaan / Argumen Diskusi:</label>
                  <textarea
                    className="input-teks"
                    rows={4}
                    placeholder="Tuliskan ulasan pertanyaan Anda secara terperinci..."
                    value={isiBaru}
                    onChange={(e) => setIsiBaru(e.target.value)}
                  />
                </div>
                <div className="tombol-baris">
                  <button type="submit" className="tombol">
                    <Icon name="send" size={14} />
                    <span>Terbitkan ke Forum</span>
                  </button>
                  <button type="button" className="tombol alt" onClick={() => setShowCreateModal(false)}>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filter Kategori */}
          <div className="chips">
            {["all", "Keamanan Sistem Informasi", "Tanya Jawab Lab", "Diskusi Teori"].map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${kategoriFilter === cat ? "on" : ""}`}
                onClick={() => setKategoriFilter(cat)}
              >
                {cat === "all" ? `Semua Topik (${threads.length})` : cat}
              </button>
            ))}
          </div>

          {/* Feed Diskusi */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              return (
                <div
                  key={thread.id}
                  className="kartu interaktif masuk"
                  style={{
                    cursor: "pointer",
                    borderColor: isSelected ? "var(--ungu)" : "var(--garis)",
                    background: isSelected ? "var(--lav-terang)" : "var(--kartu)"
                  }}
                  onClick={() => setSelectedThreadId(thread.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="cap" style={{ background: "var(--lav)", color: "var(--ungu)", padding: "2px 8px", borderRadius: "8px", fontWeight: 600 }}>
                      {thread.kategori}
                    </span>
                    <span className="cap">{thread.waktu}</span>
                  </div>

                  <h4 style={{ fontSize: "14px", fontWeight: 700, marginTop: "4px" }}>{thread.judul}</h4>
                  <p className="abu" style={{ fontSize: "12px", lineHeight: "1.5", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {thread.isi}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", marginTop: "6px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <b style={{ color: thread.rolePenulis === "dosen" ? "var(--ungu)" : "var(--teks)" }}>
                        {thread.rolePenulis === "dosen" ? "👨‍🏫 " : "🎓 "} {thread.penulis}
                      </b>
                    </span>
                    <span className="cap" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span>👁️ {thread.dilihat} x</span>
                      <span>💬 {thread.balasan?.length || 0} Balasan</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Rincian Thread & Balasan */}
        <div className="tumpuk">
          {selectedThread ? (
            <div className="kartu besar masuk" style={{ gap: "16px" }}>
              <div>
                <span className="cap" style={{ background: "var(--lav)", color: "var(--ungu)", padding: "2px 8px", borderRadius: "8px", fontWeight: 600 }}>
                  {selectedThread.kategori}
                </span>
                <h3 style={{ fontSize: "16px", marginTop: "6px", lineHeight: "1.3" }}>{selectedThread.judul}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", fontSize: "11.5px" }}>
                  <b style={{ color: selectedThread.rolePenulis === "dosen" ? "var(--ungu)" : "var(--teks)" }}>
                    {selectedThread.rolePenulis === "dosen" ? "👨‍🏫 Dosen Pengampu" : "🎓 " + selectedThread.penulis}
                  </b>
                  <span className="abu">• {selectedThread.waktu}</span>
                </div>
              </div>

              {/* Isi Postingan Utama */}
              <div style={{ background: "var(--lav-terang)", padding: "16px", borderRadius: "var(--radius-md)", fontSize: "12.5px", lineHeight: "1.6", border: "1px solid var(--garis)" }}>
                {selectedThread.isi}
              </div>

              {/* Feed Balasan */}
              <div>
                <b style={{ fontSize: "13px" }}>💬 Tanggapan & Balasan ({selectedThread.balasan?.length || 0})</b>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  {selectedThread.balasan && selectedThread.balasan.length > 0 ? (
                    selectedThread.balasan.map((balasan) => (
                      <div key={balasan.id} style={{ background: "var(--kartu)", border: "1px solid var(--garis)", padding: "12px 14px", borderRadius: "var(--radius-md)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
                          <span style={{ fontWeight: 700, color: balasan.role === "dosen" ? "var(--ungu)" : "var(--teks)" }}>
                            {balasan.role === "dosen" ? "👨‍🏫 " : "🎓 "} {balasan.penulis}
                          </span>
                          <span className="cap">{balasan.waktu}</span>
                        </div>
                        <p style={{ marginTop: "6px", fontSize: "12px", lineHeight: "1.5", color: "var(--teks)" }}>
                          {balasan.isi}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="abu" style={{ fontSize: "11.5px" }}>Belum ada tanggapan pada topik ini. Jadilah yang pertama menjawab!</p>
                  )}
                </div>
              </div>

              {/* Form Kirim Balasan */}
              <form onSubmit={handleSendReplySubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--garis)", paddingTop: "14px" }}>
                <label className="cap" style={{ fontWeight: 700 }}>Tulis Tanggapan Anda:</label>
                <textarea
                  className="input-teks"
                  rows={3}
                  placeholder="Ketik tanggapan atau analisis Anda..."
                  value={isiBalasan}
                  onChange={(e) => setIsiBalasan(e.target.value)}
                />
                <button type="submit" className="tombol" style={{ alignSelf: "flex-end", padding: "8px 16px" }}>
                  <Icon name="send" size={14} />
                  <span>Kirim Tanggapan</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="kartu besar" style={{ textAlign: "center", padding: "40px 20px" }}>
              <Icon name="message-square" size={36} color="var(--abu)" />
              <h3 style={{ fontSize: "14px", marginTop: "8px" }}>Pilih Topik Diskusi di Sebelah Kiri</h3>
              <p className="abu" style={{ fontSize: "11.5px", marginTop: "4px" }}>
                Klik salah satu topik untuk membaca utas diskusi, melihat tanggapan rekan mahasiswa & dosen, serta mengirimkan argumen Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
