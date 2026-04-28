import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=inspiring-cinematic-ambient-116199.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass shadow-elegant flex items-center justify-center hover:scale-110 transition-transform"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
          <Music className="w-5 h-5 text-primary" />
        </motion.div>
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
};
