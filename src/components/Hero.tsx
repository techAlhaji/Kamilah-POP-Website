import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { burstConfetti } from "./Confetti";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" width={1920} height={1280} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/20 blur-3xl"
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-gold-light" />
          <span className="text-sm tracking-widest uppercase text-gold-light font-medium">
            NYSC Passing Out Parade
          </span>
          <Sparkles className="w-4 h-4 text-gold-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 text-primary-foreground"
        >
          Congratulations,
          <br />
          <span className="text-gradient-hero italic">Kamilah Salahudeen</span>
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block ml-3"
          >
            🎉
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto mb-10"
        >
          From NYSC Camp to <span className="text-gold-light italic font-medium">Passing Out Strong</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={burstConfetti}
            className="group relative px-8 py-4 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Celebrate with us <Sparkles className="w-4 h-4" />
            </span>
          </button>
          <a
            href="#journey"
            className="px-8 py-4 rounded-full glass-dark text-primary-foreground font-medium hover:bg-white/10 transition-all"
          >
            See the journey
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary-foreground/70"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
