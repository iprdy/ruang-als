import React from "react";

export function DailyActivityChart({ data = [] }) {
  const max = Math.max(...data.map((d) => d[1]), 1);

  return (
    <div className="batang-wadah" style={{ height: "200px" }}>
      {data.map(([dayName, count], idx) => {
        const heightPercent = (count / max) * 100;
        return (
          <div
            key={dayName}
            className="kolom"
            title={`${dayName}: ${count.toLocaleString("id-ID")} aktivitas`}
          >
            <div
              className="batang"
              style={{
                height: `${heightPercent}%`,
                animationDelay: `${idx * 50}ms`
              }}
            />
            <span style={{ fontWeight: 600 }}>{dayName}</span>
          </div>
        );
      })}
    </div>
  );
}
