import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// NYSC service: ~365 days. Approximate POP date: today (May 10, 2026).
// Counter shows days served (animates up on mount).
const TOTAL_DAYS = 365;

export const Countdown = () => {
  const [n, setN] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * TOTAL_DAYS));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stats = [
    { value: n, label: "Days of Service", suffix: "" },
    { value: Math.round((n / TOTAL_DAYS) * 52), label: "Weeks Lived in Khaki", suffix: "" },
    { value: Math.round((n / TOTAL_DAYS) * 12), label: "Months of Growth", suffix: "" },
    { value: 1, label: "Incredible Woman", suffix: "" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-green overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-glow rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold-light tracking-[0.3em] uppercase text-xs font-semibold mb-4">By the Numbers</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">
            One Year. <em className="text-gradient-hero not-italic">Counted.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-5 md:p-7 text-center ring-1 ring-gold/20"
            >
              <p className="font-display text-4xl md:text-6xl font-bold text-gradient-hero leading-none mb-2">
                {s.value}
                {s.suffix}
              </p>
              <p className="text-primary-foreground/70 text-xs md:text-sm uppercase tracking-wider mt-3">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
