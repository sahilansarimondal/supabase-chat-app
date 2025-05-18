import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center w-full p-16 gap-16 space-y-16">
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
