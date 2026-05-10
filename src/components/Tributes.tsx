import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Send, Quote } from "lucide-react";
import { toast } from "sonner";

const initialMessages = [
  { name: "TechAlhaji", role: "Your Guy 💻", message: "Kamilah, see ehn — I built a whole website just to say congrats. That's the level. POP no be beans, you survived camp, PPA wahala, and that endless CDS. Ex-corper for life, boss lady loading. Proud of you, always. 💚" },
];

export const Tributes = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [form, setForm] = useState({ name: "", relationship: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.relationship.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, relationship, and message");
      return;
    }
    setMessages([
      { name: form.name.trim(), role: form.relationship.trim(), message: form.message.trim() },
      ...messages,
    ]);
    setForm({ name: "", relationship: "", message: "" });
    toast.success("Your tribute has been added 💚");
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-secondary/40 to-background overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold-deep tracking-[0.3em] uppercase text-xs font-semibold mb-4">From Loved Ones</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Words from the <em className="text-gradient-gold not-italic">Heart</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group glass rounded-2xl p-7 hover:shadow-elegant hover:-translate-y-2 transition-all duration-500 relative"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-gold/30" />
              <p className="text-foreground/80 leading-relaxed mb-6 italic font-display text-lg">
                "{msg.message}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-bold">
                  {msg.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-primary">{msg.name}</p>
                  <p className="text-xs text-muted-foreground">{msg.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-gold-deep fill-gold" />
            <h3 className="font-display text-2xl font-bold text-primary">Leave your own tribute</h3>
          </div>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 mb-4 transition-all"
          />
          <textarea
            placeholder="Write something heartfelt..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 mb-5 transition-all resize-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-green text-primary-foreground font-semibold shadow-soft hover:shadow-elegant transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            Send Tribute <Send className="w-4 h-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};
