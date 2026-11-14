import metadata from "../data/model_metadata.json";
import { CLUSTER_PROFILES } from "../data/clusterProfiles";

/**
 * Prediksi klaster gaya belajar mahasiswa baru menggunakan Z-score Normalization & Nearest Centroid Distance
 * Menggunakan parameter exact dari hasil pemodelan K-Means & Random Forest
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
    cluster: predictedCluster,
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
