"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import Services from "@/components/Services";
import ResiCommSplit from "@/components/ResiCommSplit";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import EstimateModal from "@/components/EstimateModal";
import ReviewModal from "@/components/ReviewModal";
import PolicyModal from "@/components/PolicyModals";

export default function Home() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"privacy" | "terms" | null>(null);

  const handleOpenEstimate = () => setIsEstimateOpen(true);
  const handleCloseEstimate = () => setIsEstimateOpen(false);

  const handleOpenReview = () => setIsReviewOpen(true);
  const handleCloseReview = () => setIsReviewOpen(false);

  const handleOpenPolicy = (type: "privacy" | "terms") => setPolicyType(type);
  const handleClosePolicy = () => setPolicyType(null);

  return (
    <>
      {/* Navbar visible on scroll past hero */}
      <Navbar
        onRequestEstimate={handleOpenEstimate}
        onLeaveReview={handleOpenReview}
      />
      
      <main>
        <Hero onRequestEstimate={handleOpenEstimate} />
        <LogoTicker />
        <Services onRequestEstimate={handleOpenEstimate} />
        <ResiCommSplit onRequestEstimate={handleOpenEstimate} />
        <Testimonials onLeaveReview={handleOpenReview} />
        <Faq />
      </main>

      <Footer
        onOpenPolicy={handleOpenPolicy}
        onLeaveReview={handleOpenReview}
      />

      {/* Global Modals */}
      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={handleCloseEstimate}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={handleCloseReview}
      />

      <PolicyModal
        isOpen={policyType !== null}
        onClose={handleClosePolicy}
        type={policyType}
      />
    </>
  );
}
