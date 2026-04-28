import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-20 bg-gradient-green overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-primary-glow rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Heart className="w-8 h-8 text-gold mx-auto mb-6 fill-gold animate-pulse" />
          <p className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight max-w-3xl mx-auto">
            We're proud of you.
            <br />
            <span className="text-gradient-hero italic">This is just the beginning.</span>
            <span className="ml-2">💚</span>
          </p>
          <div className="mt-12 pt-8 border-t border-gold/20 max-w-md mx-auto">
            <p className="text-primary-foreground/60 text-sm">
              Made with love for <span className="text-gold-light font-medium">Kamilah Salahudeen</span>
            </p>
            <p className="text-primary-foreground/40 text-xs mt-2">
              NYSC Passing Out Parade · {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
