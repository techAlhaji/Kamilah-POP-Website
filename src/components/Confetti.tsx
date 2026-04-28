import { useEffect } from "react";
import confetti from "canvas-confetti";

export const fireConfetti = () => {
  const colors = ["#1a7a3e", "#2db862", "#e8b73a", "#f5d76e", "#ffffff"];
  const end = Date.now() + 1500;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};

export const burstConfetti = () => {
  const colors = ["#1a7a3e", "#2db862", "#e8b73a", "#f5d76e", "#ffffff"];
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors, scalar: 1.2 });
};

export const Confetti = () => {
  useEffect(() => {
    const t = setTimeout(() => fireConfetti(), 400);
    return () => clearTimeout(t);
  }, []);
  return null;
};
