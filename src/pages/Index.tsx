import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Tributes } from "@/components/Tributes";
import { VideoSection } from "@/components/VideoSection";
import { Surprise } from "@/components/Surprise";
import { Footer } from "@/components/Footer";
import { Confetti } from "@/components/Confetti";
import { MusicToggle } from "@/components/MusicToggle";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Confetti />
      <MusicToggle />
      <Hero />
      <Timeline />
      <Gallery />
      <Tributes />
      <VideoSection />
      <Surprise />
      <Footer />
    </main>
  );
};

export default Index;
