import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ProblemSection from "@/components/home/ProblemSection";
import ServicesSection from "@/components/home/ServicesSection";
import StickyShowcase from "@/components/home/StickyShowcase";
import PrivateAISection from "@/components/home/PrivateAISection";
import DeploymentSection from "@/components/home/DeploymentSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ROISection from "@/components/home/ROISection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ServicesSection />
      <StickyShowcase />
      <PrivateAISection />
      <DeploymentSection />
      <IndustriesSection />
      <ProcessSection />
      <ROISection />
      <CTASection />
    </>
  );
}
