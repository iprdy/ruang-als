# ruang. — Dashboard Pembelajaran Adaptif (FSLSM × K-Means)

Sistem dashboard pembelajaran adaptif berbasis React yang memadukan kerangka preferensi belajar **Felder-Silverman Learning Style Model (FSLSM)** dengan pengelompokan pola interaksi aktivitas log LMS menggunakan **K-Means Clustering**.

---

## ✨ Fitur Utama

1. **Sistem Login 3 Hak Akses:**
   - 🎓 **Mahasiswa:** Masuk cukup menggunakan **NIM** (contoh: `2315091043`, `2315091092`, `2415091001`). Jalur belajar adaptif otomatis dipersonalisasi oleh model Machine Learning tanpa perlu mengatur slider profil secara manual.
   - 👨‍🏫 **Dosen:** Masuk via akun dosen (`dosen` / `dosen123`). Memiliki portal khusus untuk mengunggah materi pembelajaran baru, membuat soal kuis formatif, dan menerbitkan tugas/pengumuman ke dashboard mahasiswa.
   - ⚙️ **Pembuat Web (Developer):** Masuk via akun admin (`admin` / `admin123`). Dilengkapi panel pengembang untuk observasi status lingkungan, reset data ke bawaan, dan simulasi beralih peran instan.

2. **Portal Mahasiswa (Otomatis Machine Learning):**
   - Tampilan bersih tanpa slider manual (rekomendasi jalur belajar diatur otomatis oleh model ML).
   - Katalog materi adaptif berdasarkan gaya belajar (Visual, Latihan Interaktif, Bacaan Ringkas, Peta Konsep).
   - Modul pembelajaran interaktif disertai kuis formatif dengan umpan balik langsung.
   - Papan tugas & pengumuman terbaru langsung dari dosen pengampu.
   - Riwayat pencatatan aktivitas pembelajaran.

3. **Portal Dosen & Analisis Log Riset LMS:**
   - Formulir unggah materi baru (judul, alur konsep visual, durasi, kategori FSLSM).
   - Pembuat kuis interaktif per modul materi.
   - Visualisasi aktivitas belajar mahasiswa: distribusi jam, hari, komposisi modul LMS, dan *scatter plot* interaksi materi teks vs konten visual H5P.
   - Tabel data mahasiswa dengan fitur pencarian dan pengurutan dinamis berdasarkan data log nyata (`student_features.csv`).

4. **100% Mandiri (Self-Contained):**
   - Seluruh logika, data, state manajemen, komponen, dan CSS tersaji rapi dalam 1 file `App.jsx`.
   - Tanpa dependensi pihak ketiga yang rumit, hanya membutuhkan React standar.

---

## 🚀 Cara Menjalankan Proyek

### Opsi 1: Menjalankan Repositori Ini Langsung

```bash
# 1. Pasang dependensi React
npm install

# 2. Jalankan server lokal
npm run dev
```

Buka peramban di: **`http://localhost:5173`**

### Opsi 2: Menggunakan File `App.jsx` Saja

Cukup buat proyek Vite React baru dan ganti file `src/App.jsx` dengan file `App.jsx` dari repositori ini:

```bash
npm create vite@latest ruang -- --template react
# Ganti isi file src/App.jsx dengan file App.jsx dari repositori ini
npm run dev
```

---

## 🔑 Akun Demo Pengujian

| Peran | Kredensial / Cara Masuk |
| :--- | :--- |
| **Mahasiswa** | Masukkan NIM (contoh: `2315091043` atau sembarang NIM Anda) |
| **Dosen** | Username: `dosen` · Sandi: `dosen123` |
| **Pembuat Web** | Username: `admin` · Sandi: `admin123` |
