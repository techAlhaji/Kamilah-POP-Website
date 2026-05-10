import { motion } from "framer-motion";
import { Tent, HeartHandshake, Briefcase, Wallet, Award } from "lucide-react";

const stages = [
  { icon: Tent, title: "Orientation Camp", desc: "Three weeks of drills, parades, and unforgettable mornings. Where it all began.", color: "from-primary to-primary-glow" },
  { icon: HeartHandshake, title: "Community Development", desc: "Giving back through CDS — making a difference one project at a time.", color: "from-primary-glow to-gold" },
  { icon: Briefcase, title: "Place of Primary Assignment", desc: "Stepping into purpose. Growing in skill, character, and confidence.", color: "from-gold to-gold-deep" },
  { icon: Wallet, title: "Monthly Clearance", desc: "That sweet end-of-month ritual — signatures, smiles, and the famous alowee alert. 💸", color: "from-gold-light to-gold" },
  { icon: Award, title: "Passing Out Parade", desc: "The crown jewel. A year of service complete. A new chapter begins.", color: "from-gold to-primary" },
];

export const Timeline = () => {
  return (
    <section id="journey" className="relative py-24 md:py-32 bg-secondary/40 overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold-deep tracking-[0.3em] uppercase text-xs font-semibold mb-4">The Journey</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            One Year. <em className="text-gradient-gold not-italic">Countless Memories.</em>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every step from camp to POP shaped the woman we celebrate today.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-gold to-primary md:-translate-x-1/2" />

          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex items-start mb-12 md:mb-16 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Icon node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-elegant ring-4 ring-background`}
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`pl-28 md:pl-0 w-full md:w-[calc(50%-3rem)] ${isRight ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 md:p-7 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-gold-deep tracking-widest">STAGE 0{i + 1}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">{stage.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
