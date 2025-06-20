import { Button } from "@/components/ui/button";
import HeroSection from "./_components/hero-section";
import CarListing from "./_components/carlisting-section";


export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <CarListing />
    </div>
  );
}
