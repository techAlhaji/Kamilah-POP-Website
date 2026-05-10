import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/nysc-anthem-slow.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => { audioRef.current?.pause(); };
  }, []);

  // Auto-pause music while a video is playing, resume when it stops
  useEffect(() => {
    const handlePlay = () => {
      const audio = audioRef.current;
      if (!audio) return;
      wasPlayingRef.current = !audio.paused;
      if (!audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    };
    const handleStop = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (wasPlayingRef.current) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
        wasPlayingRef.current = false;
      }
    };
    window.addEventListener("video:playing", handlePlay);
    window.addEventListener("video:stopped", handleStop);
    return () => {
      window.removeEventListener("video:playing", handlePlay);
      window.removeEventListener("video:stopped", handleStop);
    };
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
