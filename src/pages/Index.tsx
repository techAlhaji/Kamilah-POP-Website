import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Timeline } from "@/components/Timeline";
import { KenBurnsCarousel } from "@/components/KenBurnsCarousel";
import { Gallery } from "@/components/Gallery";
import { Tributes } from "@/components/Tributes";
import { VideoSection } from "@/components/VideoSection";
import { Surprise } from "@/components/Surprise";
import { Footer } from "@/components/Footer";
import { Confetti } from "@/components/Confetti";
import { MusicToggle } from "@/components/MusicToggle";
import { FloatingHearts } from "@/components/FloatingHearts";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (unlocked) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [unlocked]);

  const handleUnlock = () => {
    setUnlocked(true);
    requestAnimationFrame(() => {
      document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Confetti />
      <FloatingHearts />
      <MusicToggle />
      <Hero onUnlock={handleUnlock} />
      {unlocked && (
        <>
          <Countdown />
          <Timeline />
          <KenBurnsCarousel />
          <Gallery />
          <VideoSection />
          <Tributes />
          <Surprise />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Index;
