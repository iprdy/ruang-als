import React from "react";

export function ProgressBar({ persen = 0, delay = 0, height = 7 }) {
  const clamped = Math.min(100, Math.max(0, persen));

  return (
    <div className="trek" style={{ height: `${height}px` }}>
      <i
        style={{
          "--lebar": `${clamped}%`,
          animationDelay: `${delay}ms`
        }}
      />
    </div>
  );
}
