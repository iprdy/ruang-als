import { useMemo } from "react";
import { CLUSTER_PROFILES } from "../data/clusterProfiles";

export function useAdaptiveEngine(studentCluster = 1, rawModules = []) {
  const profile = CLUSTER_PROFILES[studentCluster] || CLUSTER_PROFILES[1];

  const preferredFormat = useMemo(() => {
    if (studentCluster === 0) return "visual";
    if (studentCluster === 2) return "praktis";
    return "verbal";
  }, [studentCluster]);

  const adaptedModules = useMemo(() => {
    if (!rawModules || rawModules.length === 0) return [];

    // Buat salinan modul dengan penanda prioritas adaptif
    const scored = rawModules.map((m) => {
      let score = 0;
      let badge = "rekomendasi";
      let badgeLabel = "REKOMENDASI";

      if (studentCluster === 0) {
        // Cluster 0: Prioritaskan format visual dan materi esensial
        if (m.kat === "visual") score += 50;
        if (m.id === "MOD-01" || m.id === "MOD-07") score += 30;
        if (m.menit <= 15) score += 20;
        badge = score >= 50 ? "utama" : "rekomendasi";
        badgeLabel = score >= 50 ? "PRIORITAS UTAMA" : "REKOMENDASI";
      } else if (studentCluster === 1) {
        // Cluster 1: Alur kurikulum bertahap seimbang
        const numId = parseInt(m.id.replace("MOD-", ""), 10) || 0;
        score = 100 - numId * 5;
        badge = "rekomendasi";
        badgeLabel = "REKOMENDASI";
      } else if (studentCluster === 2) {
        // Cluster 2: Prioritaskan modul komprehensif, lab terapan, dan studi kasus mendalam
        if (m.kat === "latihan") score += 50;
        if (m.id === "MOD-05" || m.id === "MOD-06" || m.id === "MOD-04") score += 40;
        if (m.menit >= 20) score += 20;
        badge = score >= 50 ? "pengayaan" : "rekomendasi";
        badgeLabel = score >= 50 ? "PENGAYAAN" : "REKOMENDASI";
      }

      return {
        ...m,
        adaptiveScore: score,
        badge,
        badgeLabel
      };
    });

    // Urutkan berdasarkan skor adaptif tertinggi
    return scored.sort((a, b) => b.adaptiveScore - a.adaptiveScore);
  }, [studentCluster, rawModules]);

  return {
    profile,
    preferredFormat,
    adaptedModules,
    nudgeMessage: profile.nudgePesan,
    navigationAdvice: profile.navigasiSaran
  };
}
