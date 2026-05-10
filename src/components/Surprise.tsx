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
            Tap the gift, Kamilah — there's a small letter from me waiting inside.
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
                <p className="text-xs uppercase tracking-[0.3em] text-gold-deep mt-2">From TechAlhaji</p>
              </div>

              <div className="prose prose-lg max-w-none font-display text-foreground/90 leading-relaxed space-y-4 italic">
                <p>Kamilah,</p>
                <p>
                  First of all — <span className="not-italic font-semibold text-primary">YOU DID IT.</span> Service done. Khaki retired. Cap on the shelf. Look at God. 🙌🏽
                </p>
                <p>
                  I'll be honest, I had to build a whole website to gist you because a regular "congrats babe" text just wasn't going to cut it this time. You served Nigeria for a full year — Nigeria! — so the least I could do was stay up writing CSS.
                </p>
                <p>
                  Watching you go through this year has been something else. Camp stories, parade complaints, that one PPA wahala you swore you'd never recover from, the random voice notes at odd hours, the medals, the pictures where your smile basically lights up the whole frame — I saw it all, and I'm so, so proud of you.
                </p>
                <p>
                  You're stubborn (in the best way), brilliant, kind, and somehow always have snacks. Whatever comes after this chapter — the job hunt, the master's plan, the soft life agenda, the world domination — I'm in your corner. Loud. Front row. Probably embarrassing you.
                </p>
                <p className="text-primary font-semibold not-italic pt-2">
                  Otondo days are over. Boss lady era loading. 💚✨
                </p>
                <p>P.S. If you cry, I'm not responsible. Refunds not available.</p>
                <p className="text-right text-gold-deep not-italic font-semibold text-base pt-4">
                  — Your guy, <span className="text-primary">TechAlhaji</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
