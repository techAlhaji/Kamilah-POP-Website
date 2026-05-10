import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const VideoSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-green overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-glow/30 rounded-full blur-3xl" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold-light tracking-[0.3em] uppercase text-xs font-semibold mb-4">Watch the Story</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Kamilah, in <em className="text-gradient-hero not-italic">Motion</em>
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Press play and catch a glimpse of the energy she brought to this whole year.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-gold/30 bg-primary group">
            <video
              className="w-full h-auto max-h-[80vh] bg-black"
              src="/videos/kamilah.mp4"
              controls
              playsInline
              preload="metadata"
            />
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold rounded-br-lg pointer-events-none" />
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-primary-foreground/70 text-sm">
            <Play className="w-4 h-4 fill-gold text-gold" />
            <span>A tiny tribute reel — from TechAlhaji, with love</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
