# ==============================================================================
# REST API INFERENSI MODEL ALS (FastAPI)
# Endpoint untuk Klasifikasi Otomatis Mahasiswa Baru ke Profil Gaya Belajar FSLSM
# ==============================================================================

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import json
import os

app = FastAPI(
    title="ALS Dynamic Clustering & Classification API",
    description="API untuk inferensi real-time klaster gaya belajar mahasiswa baru berbasis Random Forest & K-Means",
    version="1.0.0"
)

# Izinkan CORS untuk akses dari frontend React/Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Load Model & Scaler
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
rf_model = joblib.load(os.path.join(MODEL_DIR, "random_forest_model.pkl"))

with open(os.path.join(MODEL_DIR, "model_metadata.json"), "r") as f:
    METADATA = json.load(f)

# 2. Schema Input Data Mahasiswa Baru
class StudentLogInput(BaseModel):
    nim: str = Field(..., example="2415091099")
    nama: str = Field(..., example="Mahasiswa Baru 2026")
    visual_count: float = Field(..., ge=0, example=450.0, description="Frekuensi akses H5P / video / visual")
    verbal_count: float = Field(..., ge=0, example=45.0, description="Frekuensi akses dokumen modul teks / PDF")
    active_actions: float = Field(..., ge=0, example=35.0, description="Jumlah tindakan aktif: kirim tugas, kuis, posting forum")
    reflective_actions: float = Field(..., ge=0, example=550.0, description="Jumlah tindakan reflektif: baca materi, telaah modul")
    practical_engagement: float = Field(..., ge=0, example=60.0, description="Frekuensi pengerjaan latihan & kuis terapan")
    active_days: float = Field(..., ge=1, example=25.0, description="Jumlah hari aktif belajar dalam semester")

# 3. Rekomendasi ALS per Klaster
CLUSTER_DETAILS = {
    0: {
        "profil": "Pembelajar Selektif / Minimalis (Low-Engagement)",
        "format_prioritas": "Visual & Ringkasan Infografis",
        "navigasi": "Direct Guidance (Fokus Esensial)",
        "lencana": "[PRIORITAS UTAMA]",
        "modul_prioritas": "MOD-01 - Prinsip Dasar Keamanan Informasi & CIA Triad",
        "pesan_nudging": "Perhatian Keterlibatan: Tingkat aktivitas Anda relatif selektif. Selesaikan modul prioritas singkat secara berkala untuk menghindari penumpukan tugas."
    },
    1: {
        "profil": "Pembelajar Konsisten & Teratur (Moderate-Regular)",
        "format_prioritas": "Panduan Modul Terstruktur & Kuis Formatif Bertahap",
        "navigasi": "Sequential Guidance (Alur Bertahap Terstruktur)",
        "lencana": "[REKOMENDASI]",
        "modul_prioritas": "MOD-02 - Anatomi Serangan DDoS & Mitigasi Traffic Flooding",
        "pesan_nudging": "Kemajuan Belajar Baik: Ritme belajar Anda teratur dan stabil. Pertahankan pengerjaan latihan kuis secara berkala."
    },
    2: {
        "profil": "Pembelajar Intensif & Reflektif (High-Intensity Reflective)",
        "format_prioritas": "Modul Teori Mendalam, Skenario Kasus Riil & Lab Praktik Tingkat Lanjut",
        "navigasi": "Hierarchical Guidance (Eksplorasi Mendalam)",
        "lencana": "[PENGAYAAN]",
        "modul_prioritas": "MOD-05 - Analisis Malware & Deteksi Ransomware",
        "pesan_nudging": "Keterlibatan Sangat Tinggi: Refleksi materi Anda mendalam. Tantang diri Anda dengan analisis skenario studi kasus pengayaan tingkat lanjut."
    }
}

@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "Adaptive Learning System Inference API",
        "model": "Random Forest Classifier (Accuracy: 92.31%)",
        "clusters": METADATA["cluster_labels"]
    }

@app.post("/api/predict-cluster")
def predict_student_cluster(student: StudentLogInput):
    try:
        # Hitung rasio derivatif FSLSM
        total_media = student.visual_count + student.verbal_count
        visual_ratio = student.visual_count / total_media if total_media > 0 else 0.90

        total_actions = student.active_actions + student.reflective_actions
        active_ratio = student.active_actions / total_actions if total_actions > 0 else 0.05

        # Susun vektor 8 fitur sesuai urutan model pelatihan
        features_raw = [
            student.visual_count,
            student.verbal_count,
            visual_ratio,
            student.active_actions,
            student.reflective_actions,
            active_ratio,
            student.practical_engagement,
            student.active_days
        ]

        X_input = np.array([features_raw])

        # Prediksi menggunakan Random Forest
        predicted_cluster = int(rf_model.predict(X_input)[0])
        probabilities = rf_model.predict_proba(X_input)[0].tolist()

        recommendation = CLUSTER_DETAILS.get(predicted_cluster, CLUSTER_DETAILS[1])

        return {
            "status": "success",
            "nim": student.nim,
            "nama": student.nama,
            "fitur_terhitung": {
                "visual_count": student.visual_count,
                "verbal_count": student.verbal_count,
                "visual_ratio": round(visual_ratio, 4),
                "active_actions": student.active_actions,
                "reflective_actions": student.reflective_actions,
                "active_ratio": round(active_ratio, 4),
                "practical_engagement": student.practical_engagement,
                "active_days": student.active_days
            },
            "hasil_prediksi": {
                "cluster": predicted_cluster,
                "profil_gaya_belajar": recommendation["profil"],
                "confidence_score": round(probabilities[predicted_cluster] * 100, 2),
                "distribusi_probabilitas": {
                    "Cluster 0 (Selektif)": f"{round(probabilities[0] * 100, 1)}%",
                    "Cluster 1 (Konsisten)": f"{round(probabilities[1] * 100, 1)}%",
                    "Cluster 2 (Intensif)": f"{round(probabilities[2] * 100, 1)}%"
                }
            },
            "rekomendasi_als": recommendation
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
