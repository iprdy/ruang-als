// Data Statistik Log Hasil Analisis Riset Machine Learning
// Sumber: cleaned_logs.csv (120.290 baris) dan student_clusters.csv (128 mahasiswa)

export const LOG_METRICS = {
  totalLogs: 120290,
  uniqueStudents: 128,
  totalAccounts: 130,
  averageLogsPerStudent: 940,
  hourlyCounts: [
    3656, 1936, 1172, 730, 335, 466, 1273, 5026, 6790, 5695,
    8117, 8034, 6083, 6971, 5510, 6033, 4987, 4477, 5510, 6202,
    7288, 8165, 9064, 6770
  ],
  dailyCounts: [
    ["Sen", 12243],
    ["Sel", 22681],
    ["Rab", 14176],
    ["Kam", 17044],
    ["Jum", 22381],
    ["Sab", 15542],
    ["Min", 16223]
  ],
  componentBreakdown: [
    ["H5P (Visual/Interaktif)", 58022, 48.2],
    ["System Core (Akses Sistem)", 26880, 22.3],
    ["Assignment (Tugas)", 14124, 11.7],
    ["Open Forum (Diskusi)", 7262, 6.0],
    ["Page (Teks Modul)", 5435, 4.5],
    ["User Report (Pantauan Nilai)", 2906, 2.4],
    ["Online Text Submissions", 1932, 1.6],
    ["Quiz Formatif", 1828, 1.5]
  ],
  clusterSummary: {
    cluster0: { label: "Cluster 0 · Selektif / Minimalis", mhs: 26, persen: 20.3 },
    cluster1: { label: "Cluster 1 · Konsisten & Teratur", mhs: 68, persen: 53.1 },
    cluster2: { label: "Cluster 2 · Intensif & Reflektif", mhs: 34, persen: 26.6 }
  }
};
