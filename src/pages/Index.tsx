
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import PartnerSection from "@/components/PartnerSection";
import ProfessionalRegSection from "@/components/ProfessionalRegSection";
import MerchandiseSection from "@/components/MerchandiseSection";

const Index = () => {
  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
          element.classList.add("is-visible");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    // Initial check for elements already in viewport on load
    animateOnScroll();
    
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <MerchandiseSection />
      <ProfessionalRegSection />
      <ContactSection />
      <PartnerSection />
    </Layout>
  );
};

export default Index;
