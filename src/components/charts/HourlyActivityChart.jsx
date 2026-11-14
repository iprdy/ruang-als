import React from "react";

export function HourlyActivityChart({ data = [] }) {
  const max = Math.max(...data, 1);

  return (
    <div className="batang-wadah" style={{ height: "200px" }}>
      {data.map((val, hour) => {
        const heightPercent = (val / max) * 100;
        return (
          <div
            key={hour}
            className="kolom"
            title={`Pukul ${String(hour).padStart(2, "0")}:00 - ${val.toLocaleString("id-ID")} aktivitas`}
          >
            <div
              className="batang"
              style={{
                height: `${heightPercent}%`,
                animationDelay: `${hour * 20}ms`
              }}
            />
            <span>{hour % 3 === 0 ? String(hour).padStart(2, "0") : ""}</span>
          </div>
        );
      })}
    </div>
  );
}
