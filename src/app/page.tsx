import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import StatementSection from "@/components/home/StatementSection";
import ProblemSection from "@/components/home/ProblemSection";
import ServicesSection from "@/components/home/ServicesSection";
import StickyShowcase from "@/components/home/StickyShowcase";
import PrivateAISection from "@/components/home/PrivateAISection";
import OperationsPipeline from "@/components/shared/OperationsPipeline";
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
      <StatementSection />
      <ProblemSection />
      <ServicesSection />
      <StickyShowcase />
      <PrivateAISection />
      <OperationsPipeline />
      <DeploymentSection />
      <IndustriesSection />
      <ProcessSection />
      <ROISection />
      <CTASection />
    </>
  );
}
