import React from "react";
import { TitleHeader } from "../components/common/TitleHeader";
import { StatCard } from "../components/common/StatCard";
import { HourlyActivityChart } from "../components/charts/HourlyActivityChart";
import { DailyActivityChart } from "../components/charts/DailyActivityChart";
import { ComponentBreakdown } from "../components/charts/ComponentBreakdown";
import { EngagementScatter } from "../components/charts/EngagementScatter";
import { LOG_METRICS } from "../data/logAnalyticsData";

export function AnalyticsLogPage({ students = [], isFromCSV = false }) {
  return (
    <>
      <TitleHeader
        title="Visualisasi Analisis Log Moodle LMS"
        subtitle="Analisis data mining interaksi 128 mahasiswa Keamanan Sistem Informasi sepanjang satu semester."
      />

      <div className="stats-grid">
        <StatCard nilai={LOG_METRICS.totalLogs} label="Total Baris Log LMS Bersih" icon="activity" />
        <StatCard nilai={LOG_METRICS.uniqueStudents} label="Mahasiswa Terklaster (K-Means)" icon="users" />
        <StatCard nilai={LOG_METRICS.averageLogsPerStudent} label="Rata-rata Log per Mahasiswa" icon="bar-chart" />
      </div>

      <div className="dua">
        {/* Hourly Activity */}
        <div className="kartu besar masuk">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ fontSize: "15px" }}>Aktivitas Belajar Berdasarkan Jam (00:00 - 23:00)</h3>
              <p className="cap">Aktivitas memuncak pada malam hari pk 22.00 (9.064 log) dan pagi pk 10.00 (8.117 log).</p>
            </div>
            <span className="badge-prioritas rekomendasi">24 Jam</span>
          </div>
          <HourlyActivityChart data={LOG_METRICS.hourlyCounts} />
        </div>

        {/* Daily Activity */}
        <div className="kartu besar masuk">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ fontSize: "15px" }}>Aktivitas Belajar Berdasarkan Hari (Senin - Minggu)</h3>
              <p className="cap">Hari Selasa (22.681 log) dan Jumat (22.381 log) merupakan hari paling aktif.</p>
            </div>
            <span className="badge-prioritas rekomendasi">7 Hari</span>
          </div>
          <DailyActivityChart data={LOG_METRICS.dailyCounts} />
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="kartu besar masuk">
        <h3 style={{ fontSize: "15px" }}>Komposisi Komponen Modul LMS Moodle</h3>
        <p className="cap">Dominasi komponen H5P (48,2%) membuktikan kecenderungan interaksi mahasiswa terhadap media visual interaktif.</p>
        <ComponentBreakdown data={LOG_METRICS.componentBreakdown} />
      </div>

      {/* Scatter Plot */}
      <div className="kartu besar masuk">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ fontSize: "15px" }}>Aktivitas Materi Teks (Verbal) vs Konten Interaktif (Visual H5P)</h3>
            <p className="cap">
              {isFromCSV
                ? `Menampilkan ${students.length} mahasiswa dari student_clusters.csv.`
                : `Menampilkan ${students.length} data percontohan.`}
            </p>
          </div>
          <span className="badge-prioritas pengayaan">128 Mahasiswa</span>
        </div>
        <EngagementScatter students={students} />
      </div>
    </>
  );
}
