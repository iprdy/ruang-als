import { useState, useEffect } from "react";

// Hook animasi angka yang berhitung naik dari 0 ke target secara halus
export function useAngka(target) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let id;
    const mulai = performance.now();
    const jalan = (t) => {
      const p = Math.min((t - mulai) / 900, 1);
      // Easing out cubic: 1 - pow(1 - p, 3)
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * ease));
      if (p < 1) id = requestAnimationFrame(jalan);
    };

    id = requestAnimationFrame(jalan);
    return () => cancelAnimationFrame(id);
  }, [target]);

  return n;
}
