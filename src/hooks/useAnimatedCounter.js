import { useState, useEffect } from "react";

export function useAnimatedCounter(target, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    const startValue = 0;
    const endValue = Number(target) || 0;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Easing out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (endValue - startValue) * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
}
