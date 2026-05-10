import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import k1 from "@/assets/kamilah-1.jpg";
import k3 from "@/assets/kamilah-3.jpg";
import k6 from "@/assets/kamilah-6.jpg";
import k8 from "@/assets/kamilah-8.jpg";
import k9 from "@/assets/kamilah-9.jpg";

const slides = [
  { src: k3, caption: "Standing tall on the parade ground." },
  { src: k1, caption: "Kitted up. Ready for service." },
  { src: k8, caption: "Squad goals — khaki sisters." },
  { src: k6, caption: "Smiling through it all." },
  { src: k9, caption: "Game face on. Sports day champion." },
];

export const KenBurnsCarousel = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length);

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold-deep tracking-[0.3em] uppercase text-xs font-semibold mb-4">Cinematic Memories</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">
            The <em className="text-gradient-gold not-italic">Highlight</em> Reel
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elegant ring-1 ring-gold/30 aspect-[16/10] md:aspect-[16/9] bg-primary">
          <AnimatePresence mode="sync">
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <motion.img
                src={slides[i].src}
                alt={slides[i].caption}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.25, x: i % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 6, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute bottom-8 left-8 right-8 md:left-12 font-display italic text-2xl md:text-4xl text-primary-foreground max-w-2xl"
              >
                "{slides[i].caption}"
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:bg-white/15 z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-dark text-primary-foreground flex items-center justify-center hover:bg-white/15 z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute top-5 right-5 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-3 bg-white/40"}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
