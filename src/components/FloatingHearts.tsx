import { useEffect, useState } from "react";

type Heart = { id: number; x: number; y: number; emoji: string; drift: number };

const EMOJIS = ["💚", "💛", "✨", "🎉", "💫", "🤍"];

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      // Ignore clicks on interactive elements so we don't fight with buttons
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, label, select")) return;

      const id = Date.now() + Math.random();
      const h: Heart = {
        id,
        x: e.clientX,
        y: e.clientY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        drift: (Math.random() - 0.5) * 80,
      };
      setHearts((prev) => [...prev, h]);
      setTimeout(() => setHearts((prev) => prev.filter((x) => x.id !== id)), 1600);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none text-3xl will-change-transform"
          style={
            {
              left: h.x,
              top: h.y,
              transform: "translate(-50%, -50%)",
              animation: "floatUp 1.5s ease-out forwards",
              ["--drift" as never]: `${h.drift}px`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          15% { opacity: 1; transform: translate(-50%, -60%) scale(1.2); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--drift)), -180%) scale(0.9); }
        }
      `}</style>
    </div>
  );
};
