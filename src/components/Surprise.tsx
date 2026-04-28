import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Gift, X, Heart } from "lucide-react";
import { burstConfetti } from "./Confetti";

export const Surprise = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    burstConfetti();
  };

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold-deep tracking-[0.3em] uppercase text-xs font-semibold mb-4">Just for You</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            A Little <em className="text-gradient-gold not-italic">Surprise</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            Tap the gift below — there's something waiting just for you.
          </p>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            className="relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-gold shadow-gold hover:shadow-glow group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-gold animate-ping opacity-30" />
            <Gift className="w-14 h-14 md:w-16 md:h-16 text-gold-foreground relative z-10" strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-background rounded-3xl p-8 md:p-12 shadow-elegant ring-1 ring-gold/30 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-primary" />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4">
                  <Heart className="w-7 h-7 text-gold-foreground fill-gold-foreground" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary">A Letter for Kamilah</h3>
              </div>

              <div className="prose prose-lg max-w-none font-display text-foreground/90 leading-relaxed space-y-4 italic">
                <p>My dear Kamilah,</p>
                <p>
                  When you got that NYSC call-up letter, we knew the year ahead would change you — but we couldn't have imagined just how beautifully it would shape you.
                </p>
                <p>
                  You showed up. To the early-morning parades. To the long bus rides. To the unfamiliar town that slowly became home. To the children whose lives you touched. To every single moment that asked something of you, you said <span className="text-gold-deep font-semibold not-italic">"yes."</span>
                </p>
                <p>
                  And now you stand here, certificate in hand, head held high, ready for whatever comes next. We are so unbelievably proud — not just of what you've accomplished, but of who you've become along the way.
                </p>
                <p>
                  This is more than the end of service. This is the beginning of everything.
                </p>
                <p className="text-primary font-semibold not-italic pt-4">
                  Go forward and shine, our girl. The world is waiting. 💚✨
                </p>
                <p className="text-right text-muted-foreground not-italic text-sm">— With all our love</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
