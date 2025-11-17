
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Construction-themed hero images with the uploaded images
const heroImages = [
  "/lovable-uploads/7dcd27fa-8509-4c03-9874-c10958154458.png",
  "/lovable-uploads/22195a85-1c84-4d09-ac1c-7fe186725238.png",
  "/lovable-uploads/cffc196d-364c-4332-a718-c48ad727810c.png",
  "/lovable-uploads/af60b8f9-e186-4bb5-97f9-d3ffbd092627.png",
  "/lovable-uploads/4ac0d51d-4cc3-41de-b426-4e0005746389.png",
  "/lovable-uploads/0e6918ec-fbc9-4788-b258-1b8707bfa4d8.png",
  "/lovable-uploads/d1adbd6d-3671-47d3-9050-278b7837c21b.png",
  "/lovable-uploads/0b1fdc2e-7af2-42c7-a860-2342db35e09b.png",
  "/lovable-uploads/207d27f8-1efe-4d48-880d-d1ceded6e846.png",
  "/lovable-uploads/d4da1337-e6d5-4ca6-b93c-bb99c6eaa8fa.png",
  "/lovable-uploads/b84bda89-4373-40b5-8d0d-26f9f759fa6e.png",
  "/lovable-uploads/31c86763-543b-4311-a2c9-3e8a25e1718b.png",
  "/lovable-uploads/6d64e9b8-3150-436e-b55c-8bb7c5eb7980.png",
  "/lovable-uploads/a23698e4-911b-44b3-9f39-b27381da71ea.png",
  "/lovable-uploads/2a4a6fb8-df91-405b-b9a6-63440ffdba62.png"
];

// Overlay texts as per requirements
const overlayTexts = [
  "Welcome to the Builders of Tomorrow – CSA at TUK",
  "Bridging Classrooms and Construction Sites",
  "CSA – Where Vision Meets Concrete",
  "Built on Purpose, Driven by Passion",
  "Creating Foundations, Crafting Legacies",
  "Construction is More Than Bricks – It's Brotherhood",
  "Your Journey to Professional Greatness Starts Here",
  "Join the Movement, Lead the Industry",
  "Blueprints of the Future – Designed by CSA",
  "Knowledge. Action. Impact.",
  "Not Just Students – We're the Future Professionals",
  "Paving the Way for Sustainable Progress",
  "From Lecture Halls to Landmark Projects",
  "CSA – Building Student Power",
  "Empowered Minds. Constructed Dreams.",
];

// CSA Motto to alternate with typing effect
const csaMottos = [
  "Pooling Construction Students Together",
  "Building the Future Today",
  "Excellence in Construction Education",
  "Creating Tomorrow's Builders"
];

// Background colors for alternating overlays
const overlayBgColors = [
  "from-csa-navy/70 to-csa-navy/50",
  "from-csa-orange/70 to-csa-orange/50",
  "from-gray-800/70 to-gray-800/50",
  "from-csa-navy/70 to-csa-orange/50",
];

// Text colors for alternating motto
const mottoColors = [
  "text-white",
  "text-csa-orange",
  "text-blue-300",
  "text-yellow-300"
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentMottoIndex, setCurrentMottoIndex] = useState(0);
  const [typedMotto, setTypedMotto] = useState("");
  const [isTypingMotto, setIsTypingMotto] = useState(true);
  const [currentMottoColor, setCurrentMottoColor] = useState(0);

  useEffect(() => {
    // Typing animation effect for main text
    if (isTyping) {
      const textToType = overlayTexts[currentTextIndex];
      if (typedText.length < textToType.length) {
        const timeoutId = setTimeout(() => {
          setTypedText(textToType.substring(0, typedText.length + 1));
        }, 50); // Speed of typing
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
      }
    }
  }, [typedText, currentTextIndex, isTyping]);

  useEffect(() => {
    // Typing animation effect for motto
    if (isTypingMotto) {
      const mottoToType = csaMottos[currentMottoIndex];
      if (typedMotto.length < mottoToType.length) {
        const timeoutId = setTimeout(() => {
          setTypedMotto(mottoToType.substring(0, typedMotto.length + 1));
        }, 70); // Speed of typing
        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingMotto(false);
        // Wait before starting to erase
        setTimeout(() => {
          setIsTypingMotto(true);
          // Start erasing
          const eraseInterval = setInterval(() => {
            setTypedMotto(prev => {
              if (prev.length === 0) {
                clearInterval(eraseInterval);
                // Change to next motto and color
                setCurrentMottoIndex((prevIndex) => (prevIndex + 1) % csaMottos.length);
                setCurrentMottoColor((prevColor) => (prevColor + 1) % mottoColors.length);
                return "";
              }
              return prev.substring(0, prev.length - 1);
            });
          }, 50);
        }, 3000); // Wait 3 seconds before erasing
      }
    }
  }, [typedMotto, currentMottoIndex, isTypingMotto]);

  useEffect(() => {
    // Set up image rotation
    const imageInterval = setInterval(() => {
      setFadeState(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % overlayTexts.length);
        setCurrentBgIndex((prevIndex) => (prevIndex + 1) % overlayBgColors.length);
        setTypedText("");
        setIsTyping(true);
        setFadeState(true);
      }, 500); // Wait for fade out before changing image
      
    }, 7000); // Change every 7 seconds to allow time for typing animation

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          fadeState ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${heroImages[currentImageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay with alternating colors */}
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayBgColors[currentBgIndex]}`}></div>
      </div>

      {/* Overlay Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
        <img 
          src="/lovable-uploads/c8c68b22-285b-430f-a653-19099c309574.png" 
          alt="CSA-TUK Logo" 
          className="w-20 h-20 mb-4 animate-pulse"
        />
        <div className={`transition-all duration-1000 ${fadeState ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold font-heading mb-6 text-white">
            Construction Students Association
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl font-semibold max-w-3xl mx-auto mb-6 leading-tight min-h-16">
            {typedText}
            <span className="inline-block w-1 h-6 bg-white animate-pulse ml-1"></span>
          </p>
          
          {/* Animated motto with changing colors */}
          <p className={`text-base md:text-xl lg:text-2xl font-bold mb-8 ${mottoColors[currentMottoColor]} min-h-12`}>
            {typedMotto}
            <span className="inline-block w-1 h-5 bg-current animate-pulse ml-1"></span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#membership" 
              className="btn-secondary"
            >
              Join CSA <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#about" 
              className="btn-outline border-white text-white hover:bg-white hover:text-csa-navy"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFadeState(false);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setCurrentTextIndex(index % overlayTexts.length);
                setCurrentBgIndex(index % overlayBgColors.length);
                setTypedText("");
                setIsTyping(true);
                setFadeState(true);
              }, 500);
            }}
            className={`h-2 rounded-full transition-all ${
              currentImageIndex === index 
                ? "w-8 bg-csa-orange" 
                : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
