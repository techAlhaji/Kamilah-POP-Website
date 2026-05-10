import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Heart, Send, Quote, Loader2, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Tribute = {
  id: string;
  name: string;
  relationship: string;
  message: string;
  created_at: string;
};

const OWNER_TOKEN_KEY = "kamilah.tribute.owner_token";
const OWNED_IDS_KEY = "kamilah.tribute.owned_ids";

const getOwnerToken = () => {
  let token = localStorage.getItem(OWNER_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID() + "-" + crypto.randomUUID();
    localStorage.setItem(OWNER_TOKEN_KEY, token);
  }
  return token;
};

const getOwnedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(OWNED_IDS_KEY) || "[]");
  } catch {
    return [];
  }
};

const addOwnedId = (id: string) => {
  const ids = getOwnedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(OWNED_IDS_KEY, JSON.stringify(ids));
  }
};

const removeOwnedId = (id: string) => {
  localStorage.setItem(
    OWNED_IDS_KEY,
    JSON.stringify(getOwnedIds().filter((x) => x !== id))
  );
};

export const Tributes = () => {
  const [messages, setMessages] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", relationship: "", message: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", relationship: "", message: "" });
  const [ownedIds, setOwnedIds] = useState<string[]>(() => getOwnedIds());

  const ownedSet = useMemo(() => new Set(ownedIds), [ownedIds]);

  useEffect(() => {
    let active = true;
    supabase
      .from("tributes")
      .select("id,name,relationship,message,created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) toast.error("Couldn't load tributes");
        else setMessages(data ?? []);
        setLoading(false);
      });

    const channel = supabase
      .channel("tributes-stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tributes" },
        (payload) => {
          const next = payload.new as Tribute;
          setMessages((prev) =>
            prev.some((m) => m.id === next.id) ? prev : [next, ...prev]
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tributes" },
        (payload) => {
          const next = payload.new as Tribute;
          setMessages((prev) => prev.map((m) => (m.id === next.id ? { ...m, ...next } : m)));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "tributes" },
        (payload) => {
          const old = payload.old as { id: string };
          setMessages((prev) => prev.filter((m) => m.id !== old.id));
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const relationship = form.relationship.trim();
    const message = form.message.trim();
    if (!name || !relationship || !message) {
      toast.error("Please fill in your name, relationship, and message");
      return;
    }
    setSubmitting(true);
    const owner_token = getOwnerToken();
    const { data, error } = await supabase
      .from("tributes")
      .insert({ name, relationship, message, owner_token })
      .select("id,name,relationship,message,created_at")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast.error("Couldn't send tribute. Try again?");
      return;
    }
    addOwnedId(data.id);
    setOwnedIds(getOwnedIds());
    setMessages((prev) =>
      prev.some((m) => m.id === data.id) ? prev : [data as Tribute, ...prev]
    );
    setForm({ name: "", relationship: "", message: "" });
    toast.success("Your tribute has been added 💚");
  };

  const startEdit = (msg: Tribute) => {
    setEditingId(msg.id);
    setEditForm({ name: msg.name, relationship: msg.relationship, message: msg.message });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", relationship: "", message: "" });
  };

  const saveEdit = async (id: string) => {
    const name = editForm.name.trim();
    const relationship = editForm.relationship.trim();
    const message = editForm.message.trim();
    if (!name || !relationship || !message) {
      toast.error("All fields are required");
      return;
    }
    const { data, error } = await supabase.rpc("update_tribute", {
      p_id: id,
      p_token: getOwnerToken(),
      p_name: name,
      p_relationship: relationship,
      p_message: message,
    });
    if (error) {
      toast.error("Couldn't update tribute");
      return;
    }
    if (data) {
      const updated = data as Tribute;
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
    }
    cancelEdit();
    toast.success("Tribute updated 💚");
  };

  const deleteTribute = async (id: string) => {
    if (!confirm("Delete this tribute? This can't be undone.")) return;
    const { error } = await supabase.rpc("delete_tribute", {
      p_id: id,
      p_token: getOwnerToken(),
    });
    if (error) {
      toast.error("Couldn't delete tribute");
      return;
    }
    removeOwnedId(id);
    setOwnedIds(getOwnedIds());
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("Tribute removed");
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
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every message left here is saved forever — visible to Kamilah and everyone she shares this with.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {messages.map((msg, i) => {
              const isOwner = ownedSet.has(msg.id);
              const isEditing = editingId === msg.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group glass rounded-2xl p-7 hover:shadow-elegant hover:-translate-y-2 transition-all duration-500 relative"
                >
                  <Quote className="absolute top-5 right-5 w-8 h-8 text-gold/30" />

                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        value={editForm.name}
                        maxLength={60}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editForm.relationship}
                        maxLength={60}
                        onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                        placeholder="Relationship"
                      />
                      <textarea
                        value={editForm.message}
                        maxLength={600}
                        rows={4}
                        onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                        placeholder="Message"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(msg.id)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-green text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
                        >
                          <Check className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-background border border-border text-sm font-medium hover:bg-secondary/50 transition"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-foreground/80 leading-relaxed mb-6 italic font-display text-lg">
                      "{msg.message}"
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-bold">
                      {msg.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary truncate">{msg.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{msg.relationship}</p>
                    </div>
                    {isOwner && !isEditing && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEdit(msg)}
                          aria-label="Edit tribute"
                          className="p-2 rounded-full hover:bg-primary/10 text-primary transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTribute(msg.id)}
                          aria-label="Delete tribute"
                          className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

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
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your name"
              maxLength={60}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-background/50 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
            />
            <input
              type="text"
              placeholder="Your relationship (e.g. Mum, Best Friend, PPA Boss)"
              maxLength={60}
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-background/50 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
            />
          </div>
          <textarea
            placeholder="Write something heartfelt for Kamilah..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={600}
            rows={4}
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 mb-5 transition-all resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-green text-primary-foreground font-semibold shadow-soft hover:shadow-elegant transition-all hover:scale-105 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? (
              <>Sending… <Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <>Send Tribute <Send className="w-4 h-4" /></>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};
