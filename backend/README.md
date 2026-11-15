# Backend REST API - Sistem Pembelajaran Adaptif (ruang.)

Layanan backend mandiri berbasis **FastAPI** untuk inferensi real-time klaster gaya belajar mahasiswa baru menggunakan model **Random Forest Classifier** (akurasi uji 92,31%) dan pemetaan batas **K-Means Clustering ($k=3$)**.

## 1. Persiapan & Instalasi Dependensi
Pastikan Python 3.9+ telah terpasang, lalu jalankan:

```bash
pip install -r requirements.txt
```

## 2. Menjalankan Server API
Jalankan server menggunakan uvicorn atau python:

```bash
python api_server.py
```
atau
```bash
uvicorn api_server:app --reload --host 127.0.0.1 --port 8000
```

Server akan aktif pada: `http://127.0.0.1:8000`

## 3. Dokumentasi Endpoint Interaktif (Swagger UI)
Akses dokumentasi OpenAPI interaktif pada browser:
- Swagger UI: `http://127.0.0.1:8000/docs`
- Redoc: `http://127.0.0.1:8000/redoc`

## 4. Endpoint Utama
- `GET /` : Cek status API & metadata model
- `POST /api/predict-cluster` : Menerima 8 nilai variabel log mahasiswa baru, melakukan normalisasi Z-score, memprediksi klaster FSLSM, dan mengembalikan rekomendasi adaptif ALS.
