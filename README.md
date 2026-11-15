# ruang. - Sistem Pembelajaran Adaptif (Adaptive Learning System)

Sistem dashboard pembelajaran adaptif berbasis web yang memadukan kerangka preferensi belajar **Felder-Silverman Learning Style Model (FSLSM)** dengan pengelompokan pola interaksi aktivitas log Moodle LMS menggunakan **K-Means Clustering** dan validasi klasifikasi **Random Forest**.

Proyek ini dikembangkan dalam rangka Kerja Praktek (KP) Program Studi S1 Informatika, memanfaatkan dataset aktivitas log nyata sebanyak 120.290 baris data dari mata kuliah SIFS124407 (Keamanan Sistem Informasi).

---

## Daftar Isi

- Ikhtisar Proyek
- Arsitektur Sistem
- Struktur Direktori
- 8 Komponen Log Moodle LMS
- 3 Profil Klaster Gaya Belajar
- Alur Inferensi Klaster Hybrid
- Panduan Instalasi dan Menjalankan Proyek
- Spesifikasi REST API Backend
- Kredensial Akun Pengujian
- Metrik Model Machine Learning

---

## Ikhtisar Proyek

Sistem ini dirancang untuk mengatasi permasalahan *one-size-fits-all* dalam pembelajaran daring dengan menghadirkan personalisasi pembelajaran secara otomatis:

1. **Adaptive Content Presentation:** Menyesuaikan format penyajian materi (konten visual interaktif H5P vs bacaan konsep mendalam) berdasarkan profil klaster mahasiswa.
2. **Adaptive Navigation Support:** Memberikan rekomendasi modul, urutan belajar, dan penanda materi prioritas sesuai kecenderungan gaya belajar.
3. **Adaptive Nudging:** Menampilkan pesan motivasi dan rekomendasi aksi proaktif yang dipersonalisasi untuk menjaga keterlibatan mahasiswa.
4. **Analisis Log Komprehensif untuk Pengajar:** Dashboard dosen dilengkapi visualisasi distribusi aktivitas waktu belajar, komposisi modul, dan keterlibatan mahasiswa.

---

## Arsitektur Sistem

Proyek ini menggunakan arsitektur modular terpisah antara antarmuka pengguna (Frontend) dan layanan inferensi cerdas (Backend):

- **Frontend:** Dibangun menggunakan React 18, Vite, arsitektur berbasis komponen modular, desain token CSS kustom (tanpa dependensi framework CSS eksternal), pustaka ikon vektor SVG native, dan Hash Router (`window.location.hash`) untuk navigasi deep-linking.
- **Backend:** Layanan REST API berbasis FastAPI (Python), memuat pipeline Machine Learning Scikit-Learn yang telah dilatih (`RandomForestClassifier`, `KMeans`, dan `StandardScaler`).
- **Hybrid Inference Engine:** Frontend memprioritaskan inferensi ke Backend FastAPI secara asinkron. Jika koneksi backend tidak tersedia, sistem secara otomatis beralih (*fallback*) ke kalkulasi jarak centroid Euclidean sisi klien (*client-side nearest centroid*), sehingga aplikasi tetap berjalan 100% tanpa gangguan.

---

## Struktur Direktori

```text
ruang-als/
├── backend/                               # Layanan Backend Machine Learning
│   ├── api_server.py                      # REST API Server FastAPI
│   ├── requirements.txt                   # Dependensi pustaka Python
│   ├── README.md                          # Panduan backend API
│   ├── random_forest_model.pkl            # Model terlatih Random Forest (245 KB)
│   ├── kmeans_model.pkl                   # Model terlatih K-Means (1.4 KB)
│   ├── scaler.pkl                         # Objek StandardScaler (1.1 KB)
│   └── model_metadata.json                # Metadata fitur, klaster, dan centroid
├── public/                                # Berkas statis publik
├── src/                                   # Kode Sumber Frontend React
│   ├── assets/
│   │   └── icons.jsx                      # Pustaka ikon vektor SVG native
│   ├── components/
│   │   ├── als/                           # Komponen Adaptive Learning System
│   │   │   ├── AdaptiveNudge.jsx          # Notifikasi adaptif berbasis klaster
│   │   │   └── MultiModalContent.jsx      # Penyaji materi multi-modal (H5P/Page)
│   │   ├── charts/                        # Komponen visualisasi data grafik
│   │   │   ├── ComponentBreakdownChart.jsx
│   │   │   ├── DailyActivityChart.jsx
│   │   │   ├── EngagementScatterPlot.jsx
│   │   │   └── HourlyActivityChart.jsx
│   │   ├── common/                        # Komponen antarmuka dasar yang dapat digunakan ulang
│   │   │   ├── AdaptiveBadge.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── TitleHeader.jsx
│   │   └── layout/                        # Kerangka tata letak aplikasi
│   │       ├── Sidebar.jsx                # Navigasi samping berbasis peran
│   │       └── TopNavbar.jsx              # Bilah navigasi atas dan status pengguna
│   ├── data/                              # State awal dan data tiruan Moodle LMS
│   │   ├── assignmentsData.js             # Data penugasan dan kriteria penilaian
│   │   ├── clusterProfiles.js             # Metadata karakteristik klaster FSLSM
│   │   ├── courseModules.js               # Silabus modul materi multi-modal
│   │   ├── forumData.js                   # Data utas dan balasan forum diskusi
│   │   ├── logAnalyticsData.js            # Agregasi data analitik log pembelajaran
│   │   ├── model_metadata.json            # Salinan metadata klaster untuk fallback
│   │   └── quizBank.js                    # Bank soal kuis formatif
│   ├── hooks/                             # Custom React Hooks
│   │   ├── useAdaptiveEngine.js           # Logika engine adaptif FSLSM
│   │   ├── useAnimatedCounter.js          # Animasi angka statistik
│   │   └── useStudentData.js              # Manajemen data profil dan aktivitas mahasiswa
│   ├── pages/                             # Halaman antarmuka aplikasi
│   │   ├── AnalyticsLogPage.jsx           # Analisis grafik log LMS (Dosen/Admin)
│   │   ├── AssignmentPage.jsx             # Portal penugasan dan pengumpulan berkas
│   │   ├── CourseCatalog.jsx              # Katalog modul materi pembelajaran
│   │   ├── DeveloperPanel.jsx             # Panel pengembang dan status backend
│   │   ├── ForumPage.jsx                  # Forum diskusi terbuka (Open Forum)
│   │   ├── LessonDetailPage.jsx           # Halaman materi multi-modal (H5P/Page)
│   │   ├── LoginPage.jsx                  # Autentikasi multi-peran
│   │   ├── QuizRunnerPage.jsx             # Runner pengerjaan kuis formatif
│   │   ├── StudentDashboard.jsx           # Dashboard utama mahasiswa adaptif
│   │   ├── StudentTablePage.jsx           # Tabel data mahasiswa dan distribusi klaster
│   │   ├── TeacherDashboard.jsx           # Dashboard manajemen materi pengajar
│   │   └── UserReportPage.jsx             # Transkrip nilai dan rekapitulasi progres
│   ├── services/
│   │   └── clusterPredictor.js            # Engine inferensi klaster hybrid (REST + Fallback)
│   ├── styles/                            # Arsitektur CSS modular
│   │   ├── components.css                 # Gaya komponen antarmuka
│   │   ├── layout.css                     # Gaya tata letak grid dan flexbox
│   │   └── variables.css                  # Token warna, tipografi, dan spasi CSS
│   ├── App.jsx                            # Router aplikasi dan pengatur state global
│   └── main.jsx                           # Entry point React DOM
├── .gitignore                             # Konfigurasi pengabaian Git
├── index.html                             # Berkas HTML utama
├── package.json                           # Konfigurasi dependensi npm
└── vite.config.js                         # Konfigurasi build Vite
```

---

## 8 Komponen Log Moodle LMS

Seluruh komponen aktivitas yang terdapat pada data log nyata Moodle LMS telah diimplementasikan ke dalam antarmuka sistem:

| No | Komponen Moodle LMS | Halaman Implementasi | Fitur dan Fungsi pada Sistem |
| :--- | :--- | :--- | :--- |
| 1 | **H5P** | `#/materi/:id` | Konten interaktif visual, diagram arsitektur keamanan, simulasi praktis, dan video interaktif. |
| 2 | **Page** | `#/materi/:id` | Bacaan konsep teoritis komprehensif, ringkasan materi tekstual, dan dokumentasi mendalam. |
| 3 | **Quiz** | `#/kuis/:id` | Kuis formatif interaktif per topik materi dengan kalkulasi skor otomatis dan pembahasan langsung. |
| 4 | **Assignment** | `#/tugas` | Daftar penugasan terstruktur, instruksi pengerjaan tugas, tenggat waktu, dan kriteria penilaian. |
| 5 | **Online text submissions** | `#/tugas` | Form pengumpulan jawaban teks daring, unggah berkas tugas, serta riwayat penyerahan tugas. |
| 6 | **Open Forum** | `#/forum` | Forum diskusi kolaboratif antar-mahasiswa dan pengajar, pembuatan utas baru, serta balasan komentar. |
| 7 | **User report** | `#/nilai` | Buku nilai akademik pribadi, rekapitulasi persentase progres materi, skor kuis, dan evaluasi tugas. |
| 8 | **System** | Seluruh Sistem | Autentikasi multi-peran, navigasi rute hash, pencatatan interaksi, dan observasi Developer Panel. |

---

## 3 Profil Klaster Gaya Belajar

Berdasarkan hasil pemodelan K-Means ($k=3$) dan kerangka Felder-Silverman Learning Style Model (FSLSM), mahasiswa dikelompokkan ke dalam 3 profil karakteristik belajar:

### 1. Cluster 0: Practical Explorer
- **Karakteristik FSLSM:** Aktif, Visual, dan Berorientasi Praktik.
- **Pola Perilaku LMS:** Dominan berinteraksi dengan konten interaktif H5P, langsung mengerjakan kuis formatif, dan menyelesaikan tugas berbasis praktik.
- **Rekomendasi Adaptif:** Konten visual dan simulasi interaktif ditampilkan sebagai tab utama pada materi pembelajaran.

### 2. Cluster 1: Balanced Collaborator
- **Karakteristik FSLSM:** Seimbang, Komunikatif, dan Reflektif.
- **Pola Perilaku LMS:** Menunjukkan partisipasi tinggi pada forum diskusi (Open Forum), waktu belajar teratur, dan proporsi interaksi seimbang antara bacaan dan kuis.
- **Rekomendasi Adaptif:** Navigasi disarankan menuju diskusi studi kasus kelompok dan penyelesaian modul terstruktur.

### 3. Cluster 2: Deep Reader
- **Karakteristik FSLSM:** Intuitif, Verbal, dan Analitis.
- **Pola Perilaku LMS:** Dominan membaca modul teks teknis (Page), membaca silabus materi secara menyeluruh sebelum melakukan kuis atau tugas.
- **Rekomendasi Adaptif:** Modul bacaan teknis mendalam dan referensi komprehensif diprioritaskan pada bagian awal.

---

## Alur Inferensi Klaster Hybrid

Sistem menggunakan pendekatan hibrida untuk penentuan klaster gaya belajar:

1. **Pengambilan Nilai Variabel:** Saat mahasiswa baru masuk atau melakukan aktivitas, 8 variabel interaksi dihitung dari log aktivitas pengguna.
2. **Koneksi REST API Utama:** Frontend mengirim permintaan `POST` berisi 8 variabel fitur ke endpoint `/api/predict-cluster` pada server backend FastAPI.
3. **Prediksi Backend:** Backend melakukan standardisasi data dengan `StandardScaler` dan memprediksi klaster menggunakan model `RandomForestClassifier` (probabilitas klaster) serta `KMeans`.
4. **Fallback Otomatis:** Apabila backend berstatus offline atau terjadi kendala jaringan, frontend secara instan mengkalkulasi jarak Euclidean terdekat (*Nearest Centroid*) ke titik pusat klaster yang tersimpan di `src/data/model_metadata.json`.
5. **Penyajian Adaptif:** Hasil klaster diterapkan langsung ke state global antarmuka tanpa perlu memuat ulang halaman (*zero page reload*).

---

## Panduan Instalasi dan Menjalankan Proyek

### Prasyarat Sistem

- **Node.js:** Versi 18.0.0 atau lebih baru
- **npm:** Versi 9.0.0 atau lebih baru
- **Python:** Versi 3.9 atau lebih baru (untuk menjalankan Backend API)

---

### Langkah 1: Menjalankan Backend Machine Learning (FastAPI)

1. Buka terminal atau konsol perintah, lalu navigasikan ke direktori backend:
   ```bash
   cd backend
   ```

2. (Opsional namun disarankan) Buat dan aktifkan lingkungan virtual:
   - Pada Windows (PowerShell):
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - Pada Linux / macOS:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Pasang paket dependensi Python:
   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan server FastAPI:
   ```bash
   python api_server.py
   ```
   Server backend akan aktif di: **`http://127.0.0.1:8000`**
   Dokumentasi interaktif Swagger UI tersedia di: **`http://127.0.0.1:8000/docs`**

---

### Langkah 2: Menjalankan Frontend Web (React + Vite)

1. Buka terminal baru, pastikan berada di direktori utama `ruang-als`:
   ```bash
   cd website_project/ruang-als
   ```

2. Pasang dependensi Node.js:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```

4. Buka peramban web pada alamat:
   **`http://localhost:5173`**

---

### Langkah 3: Kompilasi Produksi (Production Build)

Untuk menghasilkan bundel produksi teroptimasi:

```bash
npm run build
```

Hasil kompilasi akan tersimpan di direktori `dist/` dan siap dideploy ke server web statis seperti Nginx, Vercel, Netlify, atau Apache.

---

## Spesifikasi REST API Backend

### 1. Health Check
- **Metode:** `GET`
- **Endpoint:** `/api/health`
- **Respons:**
  ```json
  {
    "status": "healthy",
    "service": "Adaptive Learning System - ML Prediction Engine",
    "version": "1.0.0",
    "models_loaded": {
      "random_forest": true,
      "scaler": true,
      "kmeans": true,
      "metadata": true
    }
  }
  ```

### 2. Prediksi Klaster Mahasiswa
- **Metode:** `POST`
- **Endpoint:** `/api/predict-cluster`
- **Header:** `Content-Type: application/json`
- **Body Permintaan:**
  ```json
  {
    "h5p_interactions": 38,
    "page_views": 15,
    "quiz_attempts": 6,
    "assignment_actions": 12,
    "forum_posts": 4,
    "user_report_views": 8,
    "system_actions": 50,
    "active_days": 18
  }
  ```
- **Respons Sukses (200 OK):**
  ```json
  {
    "success": true,
    "cluster": 0,
    "cluster_name": "Practical Explorer",
    "fslsm_profile": "Visual & Active",
    "description": "Cenderung dominan pada konten visual interaktif dan aktivitas praktik langsung.",
    "model_used": "Random Forest Classifier (Validated against K-Means)",
    "confidence": 0.94,
    "probabilities": {
      "cluster_0": 0.94,
      "cluster_1": 0.04,
      "cluster_2": 0.02
    }
  }
  ```

---

## Kredensial Akun Pengujian

Sistem menyediakan 3 hak akses dengan alur pengalaman yang berbeda:

| Peran | Kredensial / Cara Masuk | Hak Akses dan Fungsi Utama |
| :--- | :--- | :--- |
| **Mahasiswa** | Masukkan NIM (contoh: `2315091043`, `2315091092`, `2415091001`, atau sembarang NIM baru) | Akses dashboard adaptif, katalog materi berorientasi klaster, pengerjaan kuis formatif, portal tugas, forum diskusi, dan buku nilai pribadi. |
| **Dosen** | Username: `dosen`<br>Sandi: `dosen123` | Akses dashboard pengajar, pengunggahan materi baru, manajemen penugasan, analisis grafik log aktivitas LMS, dan tabel distribusi mahasiswa. |
| **Pengembang** | Username: `admin`<br>Sandi: `admin123` | Akses penuh seluruh modul, pemantauan status kesehatan Backend API, pengujian simulasi inferensi klaster, dan beralih peran instan. |

---

## Metrik Model Machine Learning

Pemodelan Machine Learning dilatih pada data log aktivitas Moodle LMS yang telah dibersihkan dan diolah:

- **Jumlah Sampel Log LMS Bersih:** 120.290 baris data
- **Jumlah Mahasiswa Dianalisis:** 39 mahasiswa unik
- **Jumlah Fitur Input:** 8 fitur interaksi agregat per mahasiswa
- **Algoritma Klastering:** K-Means ($k=3$)
- **Metrik Klastering:** Silhouette Score = 0.526, Davies-Bouldin Index = 0.697
- **Algoritma Klasifikasi Validasi:** Random Forest Classifier (`n_estimators=100`, `random_state=42`)
- **Akurasi Validasi Model:** 92.31%
- **Rata-rata Precision (Macro Avg):** 0.91
- **Rata-rata Recall (Macro Avg):** 0.92
- **Rata-rata F1-Score (Macro Avg):** 0.91
