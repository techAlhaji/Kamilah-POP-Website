import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/kamilah-1.jpg";
import g2 from "@/assets/kamilah-2.jpg";
import g3 from "@/assets/kamilah-4.jpg";
import g4 from "@/assets/kamilah-5.jpg";
import g5 from "@/assets/kamilah-6.jpg";
import g6 from "@/assets/kamilah-7.jpg";
import g7 from "@/assets/kamilah-8.jpg";
import g8 from "@/assets/kamilah-9.jpg";

const photos = [
  { src: g1, caption: "Khaki suits you, Kamilah ✨", span: "md:row-span-2" },
  { src: g2, caption: "The squad — chaos & love", span: "" },
  { src: g3, caption: "That iconic NYSC cap", span: "" },
  { src: g4, caption: "Sports competition winner 🏅", span: "md:row-span-2" },
  { src: g5, caption: "Cool girl behind the shades", span: "" },
  { src: g6, caption: "Sisters in service 🤍", span: "" },
  { src: g7, caption: "Fam vibes on a Lagos road", span: "" },
  { src: g8, caption: "Court side energy 🔥", span: "" },
];

export const Gallery = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold-deep tracking-[0.3em] uppercase text-xs font-semibold mb-4">Captured Moments</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">
            A Year in <em className="text-gradient-gold not-italic">Pictures</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px] max-w-6xl mx-auto">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <p className="text-primary-foreground font-display text-lg italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-primary-foreground hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[active].src} alt={photos[active].caption} className="w-full max-h-[80vh] object-contain rounded-2xl shadow-elegant" />
              <p className="text-center mt-4 text-primary-foreground font-display text-xl italic">{photos[active].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
