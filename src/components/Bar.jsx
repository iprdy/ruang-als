import React from "react";

export const Bar = ({ persen, delay = 0 }) => (
  <div className="trek">
    <i style={{ "--lebar": Math.min(100, Math.max(0, persen)) + "%", animationDelay: delay + "ms" }} />
  </div>
);
