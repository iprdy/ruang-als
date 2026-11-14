# ruang. — Dashboard Pembelajaran Adaptif (React)

Aplikasi web dashboard pembelajaran adaptif berbasis model gaya belajar **FSLSM** (Felder-Silverman Learning Style Model) dan klastering log aktivitas LMS **K-Means**.

Proyek ini telah direstrukturisasi secara rapi dan modular, dilengkapi dengan **Sistem Login 3 Hak Akses** (Mahasiswa dengan NIM, Dosen, dan Pembuat Web), **Fitur Dosen untuk Mengunggah Materi, Kuis, dan Tugas**, serta **Sisi Mahasiswa yang Otomatis Dipersonalisasi oleh Machine Learning** dengan tetap **mempertahankan 100% gaya visual, warna, tata letak, dan animasi aslinya**.

---

## 🚀 Cara Menjalankan

1. Masuk ke direktori proyek:
   ```bash
   cd "C:\Users\KADEK\.gemini\antigravity\scratch\ruang-adaptive-learning"
   ```

2. Jalankan server pengembangan (Dev server):
   ```bash
   npm run dev
   ```
   Akses di peramban pada alamat **`http://localhost:5173`**.

3. Build untuk produksi:
   ```bash
   npm run build
   ```

---

## 🎓 Sisi Mahasiswa (Personalisasi Otomatis Machine Learning)

Sesuai rancangan riset, mahasiswa tidak lagi perlu mengisi atau melihat profil belajar manual:
- **Menu Bersih & Sederhana:** Mahasiswa hanya mengakses menu penting: **Beranda**, **Materi belajar**, dan **Aktivitas**.
- **Otomatisasi Penuh:** Urutan kurikulum materi, alur rekomendasi, dan kuis telah diatur secara otomatis di belakang layar oleh model machine learning clustering berdasarkan riwayat interaksi log LMS.
- **Beranda Cerdas:** Menampilkan rekomendasi materi terpersonalisasi, statistik progres belajar, dan papan pengumuman/tugas langsung dari dosen pengampu.

---

## 👨‍🏫 Fitur Khusus Dosen: Kelola Materi, Kuis & Tugas

Pada menu **"Kelola materi & kuis"** di Portal Dosen, dosen dapat mengelola seluruh komponen pembelajaran:

1. **+ Unggah Materi Baru:**
   - Memasukkan Judul Materi, Kategori Gaya Belajar FSLSM (Visual / Latihan / Bacaan), Durasi (menit), Ringkasan Konsep, Representasi Alur Visual, dan Contoh Baris Kode.
   - Materi yang diunggah akan **langsung terbit di katalog materi mahasiswa** dan otomatis terintegrasi ke algoritma rekomendasi adaptif.
2. **+ Buat Soal Kuis:**
   - Memilih modul materi target.
   - Menambahkan pertanyaan, opsi pilihan (A, B, C), menentukan kunci jawaban yang benar, dan ulasan penjelasan jawaban.
   - Soal kuis baru langsung aktif pada sesi kuis evaluasi formatif mahasiswa.
3. **+ Kirim Tugas & Pengumuman LMS:**
   - Menerbitkan tugas pemrograman (Assignment), pengumuman kuliah, atau jadwal kuis baru.
   - Pemberitahuan ini langsung masuk ke pusat notifikasi (🔔) seluruh akun mahasiswa secara seketika.
4. **Daftar Materi Aktif:**
   - Melihat pratinjau seluruh materi yang aktif, mengecek jumlah soal kuis yang terpasang pada tiap modul, atau menghapus materi tambahan.

---

## 🔐 Akun & Hak Akses Sistem Login

### 1. Akses Mahasiswa (Login dengan NIM)
- **Kredensial:** Masukkan Nomor Induk Mahasiswa (NIM).
- **Contoh NIM Demo:**
  - `2315091043` — Putu Aldi Rama Pradika Yasa (Klaster 1 · Praktik)
  - `2315091092` — VERY IRAWAN SIMBOLON (Klaster 0 · Visual)
  - `2415091002` — LUH INDAH SRI PUSPA DEWI (Klaster 2 · Teks & Reflektif)
  - `2415091003` — Kadek Sukadarma (Klaster 1 · Praktik)
- **Menu Akses:** Beranda, Materi belajar, Aktivitas.

### 2. Akses Dosen
- **Username / NIP:** `dosen` atau `198507122010121002`
- **Kata Sandi:** `dosen123`
- **Profil:** Dr. I Gede Dosen, M.Kom.
- **Menu Akses:** Dashboard dosen (simulasi K-Means), **Kelola materi & kuis**, Analisis log LMS, Data mahasiswa.

### 3. Akses Pembuat Web (Web Developer)
- **Akun Developer:** `admin` atau `dev` atau `pembuat`
- **Kata Sandi:** `admin123`
- **Menu Akses:** Seluruh akses Dosen ditambah **Panel Pengembang** (`DevPanel.jsx`) untuk diagnostik data, simulasi peran (*user impersonation*), dan reset data.
