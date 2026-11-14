import React from "react";
import { ProgressBar } from "../common/ProgressBar";

export function ComponentBreakdown({ data = [] }) {
  const max = Math.max(...data.map((d) => d[1]), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {data.map(([name, count, percent], idx) => (
        <div className="hbaris" key={name}>
          <span style={{ fontWeight: 600 }}>{name}</span>
          <ProgressBar persen={(count / max) * 100} delay={idx * 60} height={8} />
          <em>
            {count.toLocaleString("id-ID")} ({percent}%)
          </em>
        </div>
      ))}
    </div>
  );
}
