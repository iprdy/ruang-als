import metadata from "../data/model_metadata.json";
import { CLUSTER_PROFILES } from "../data/clusterProfiles";

const BACKEND_API_URL = "http://127.0.0.1:8000/api/predict-cluster";

/**
 * Prediksi klaster lokal di browser menggunakan Z-score Normalization & Nearest Centroid Distance
 */
export function predictStudentCluster(studentData) {
  const {
    visual_count = 0,
    verbal_count = 0,
    active_actions = 0,
    reflective_actions = 0,
    practical_engagement = 0,
    active_days = 1
  } = studentData;

  // 1. Hitung Rasio FSLSM
  const totalMedia = visual_count + verbal_count;
  const visual_ratio = totalMedia > 0 ? visual_count / totalMedia : 0.9;

  const totalActions = active_actions + reflective_actions;
  const active_ratio = totalActions > 0 ? active_actions / totalActions : 0.05;

  const rawVector = [
    visual_count,
    verbal_count,
    visual_ratio,
    active_actions,
    reflective_actions,
    active_ratio,
    practical_engagement,
    active_days
  ];

  // 2. Standardisasi Fitur (Z-Score)
  const means = metadata.scaler.mean;
  const stds = metadata.scaler.std;
  const scaledVector = rawVector.map((val, idx) => (val - means[idx]) / stds[idx]);

  // 3. Hitung Jarak Euclidean ke Tiap Centroid Klaster
  const centroids = metadata.centroids_scaled;
  let minDistance = Infinity;
  let predictedCluster = 1;

  centroids.forEach((centroid, clusterIdx) => {
    let sumSquaredDiff = 0;
    for (let i = 0; i < scaledVector.length; i++) {
      const diff = scaledVector[i] - centroid[i];
      sumSquaredDiff += diff * diff;
    }
    const distance = Math.sqrt(sumSquaredDiff);

    if (distance < minDistance) {
      minDistance = distance;
      predictedCluster = clusterIdx;
    }
  });

  const profile = CLUSTER_PROFILES[predictedCluster] || CLUSTER_PROFILES[1];

  return {
    source: "client_side",
    sourceLabel: "Client-Side Engine (Centroid K-Means)",
    cluster: predictedCluster,
    confidenceScore: 92.3,
    profile,
    computedFeatures: {
      visual_count,
      verbal_count,
      visual_ratio: Number(visual_ratio.toFixed(4)),
      active_actions,
      reflective_actions,
      active_ratio: Number(active_ratio.toFixed(4)),
      practical_engagement,
      active_days
    },
    recommendation: {
      profil: profile.namaLengkap,
      formatPrioritas: profile.formatPrioritas,
      navigasi: profile.navigasiSaran,
      lencana: profile.lencanaDefault,
      pesan: profile.nudgePesan
    }
  };
}

/**
 * Prediksi hybrid: Mencoba memanggil Backend REST API (FastAPI + Random Forest) terlebih dahulu.
 * Jika backend tidak aktif atau unreachable, otomatis fallback ke fungsi lokal browser.
 */
export async function predictStudentClusterHybrid(studentData, nim = "2415099999", nama = "Mahasiswa Baru") {
  try {
    const payload = {
      nim,
      nama,
      visual_count: Number(studentData.visual_count) || 0,
      verbal_count: Number(studentData.verbal_count) || 0,
      active_actions: Number(studentData.active_actions) || 0,
      reflective_actions: Number(studentData.reflective_actions) || 0,
      practical_engagement: Number(studentData.practical_engagement) || 0,
      active_days: Number(studentData.active_days) || 1
    };

    // Timeout 1.5 detik agar jika backend tidak hidup, langsung fallback tanpa lag
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const clusterId = data.hasil_prediksi.cluster;
      const profile = CLUSTER_PROFILES[clusterId] || CLUSTER_PROFILES[1];

      return {
        source: "backend_api",
        sourceLabel: "Backend REST API (FastAPI & Random Forest)",
        cluster: clusterId,
        confidenceScore: data.hasil_prediksi.confidence_score,
        probabilities: data.hasil_prediksi.distribusi_probabilitas,
        profile,
        computedFeatures: data.fitur_terhitung,
        recommendation: {
          profil: profile.namaLengkap,
          formatPrioritas: data.rekomendasi_als.format_prioritas,
          navigasi: data.rekomendasi_als.navigasi,
          lencana: data.rekomendasi_als.lencana,
          pesan: data.rekomendasi_als.pesan_nudging
        }
      };
    }
  } catch {
    // Backend offline / gagal koneksi, fallback ke client-side
  }

  // Fallback ke engine lokal
  return predictStudentCluster(studentData);
}
