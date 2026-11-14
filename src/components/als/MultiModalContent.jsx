import React, { useState } from "react";
import { Icon } from "../../assets/icons";

export function MultiModalContent({ modul, preferredFormat = "visual" }) {
  const [activeTab, setActiveTab] = useState(preferredFormat);
  const multiModal = modul.multiModal || {};

  return (
    <div className="kartu besar masuk" style={{ gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h3 style={{ fontSize: "16px" }}>Penyajian Materi Multi-Modal (Adaptive Presentation)</h3>
          <p className="cap">Pilih representasi media yang paling nyaman untuk gaya belajarmu.</p>
        </div>

        {/* Tab Switcher */}
        <div className="chips">
          <button
            className={`chip-btn ${activeTab === "visual" ? "on" : ""}`}
            onClick={() => setActiveTab("visual")}
          >
            <Icon name="layers" size={14} />
            <span>Visual / H5P {preferredFormat === "visual" && "★"}</span>
          </button>
          <button
            className={`chip-btn ${activeTab === "verbal" ? "on" : ""}`}
            onClick={() => setActiveTab("verbal")}
          >
            <Icon name="book" size={14} />
            <span>Teks & Konsep {preferredFormat === "verbal" && "★"}</span>
          </button>
          <button
            className={`chip-btn ${activeTab === "praktis" ? "on" : ""}`}
            onClick={() => setActiveTab("praktis")}
          >
            <Icon name="code" size={14} />
            <span>Lab Praktis {preferredFormat === "praktis" && "★"}</span>
          </button>
        </div>
      </div>

      {/* Tab Konten */}
      <div style={{ padding: "18px", background: "var(--lav-terang)", borderRadius: "var(--radius-lg)", border: "1px solid var(--garis)" }}>
        {activeTab === "visual" && (
          <div className="masuk" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ungu)" }}>
              <Icon name="layers" size={18} />
              <b style={{ fontSize: "13px" }}>{multiModal.visual?.judul || "Visualisasi Diagram Alur"}</b>
            </div>
            <div style={{ background: "var(--kartu)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px dashed var(--ungu2)", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>📊</div>
              <p style={{ fontWeight: 600, color: "var(--teks)" }}>{multiModal.visual?.konten || modul.v}</p>
              <span className="cap" style={{ display: "block", marginTop: "6px" }}>Simulasi modul H5P interaktif pembelajaran visual</span>
            </div>
          </div>
        )}

        {activeTab === "verbal" && (
          <div className="masuk" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ungu)" }}>
              <Icon name="book" size={18} />
              <b style={{ fontSize: "13px" }}>{multiModal.verbal?.judul || "Panduan Konseptual Mendalam"}</b>
            </div>
            <div style={{ background: "var(--kartu)", padding: "18px", borderRadius: "var(--radius-md)", lineHeight: "1.7", fontSize: "12.5px" }}>
              <p>{multiModal.verbal?.konten || modul.d}</p>
            </div>
          </div>
        )}

        {activeTab === "praktis" && (
          <div className="masuk" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ungu)" }}>
              <Icon name="code" size={18} />
              <b style={{ fontSize: "13px" }}>{multiModal.praktis?.judul || "Skenario Kasus & Latihan Terapan"}</b>
            </div>
            <div style={{ background: "var(--kartu)", padding: "18px", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--ok)", fontSize: "12.5px" }}>
              <p>{multiModal.praktis?.konten || "Selesaikan skenario uji coba terapan untuk modul ini."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
