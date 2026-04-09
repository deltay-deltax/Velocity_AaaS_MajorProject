import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatWeAre from "@/components/WhatWeAre";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatWeAre />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
