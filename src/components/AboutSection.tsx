
import React, { useState, useEffect, useRef } from "react";
import { Users, Award, Briefcase, BookOpen } from "lucide-react";

// Core values content
const coreValues = [
  {
    title: "Integrity",
    icon: <Award className="h-10 w-10 text-csa-orange" />,
    description: "We uphold honesty, transparency, and ethical behavior in every action, ensuring trust and respect within CSA and the broader community."
  },
  {
    title: "Sustainability",
    icon: <BookOpen className="h-10 w-10 text-csa-orange" />,
    description: "We promote environmentally responsible construction practices that benefit both people and the planet."
  },
  {
    title: "Inclusivity",
    icon: <Users className="h-10 w-10 text-csa-orange" />,
    description: "We foster a diverse and welcoming environment where every member is valued and empowered to thrive."
  },
  {
    title: "Excellence",
    icon: <Briefcase className="h-10 w-10 text-csa-orange" />,
    description: "We commit to excellence in academics and professional conduct, striving for the highest standards in all endeavors."
  }
];

const AboutSection = () => {
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [typedValueDescription, setTypedValueDescription] = useState("");
  const [isTypingValue, setIsTypingValue] = useState(true);
  
  const [typedMission, setTypedMission] = useState("");
  const [typedVision, setTypedVision] = useState("");
  const [typedMotto, setTypedMotto] = useState("");
  
  const [isTypingMission, setIsTypingMission] = useState(true);
  const [isTypingVision, setIsTypingVision] = useState(false);
  const [isTypingMotto, setIsTypingMotto] = useState(false);
  const [mottoColorIndex, setMottoColorIndex] = useState(0);
  
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);
  
  const mission = "To unify construction students, promoting professional development, academic excellence, and industry collaboration.";
  const vision = "To be the leading student organization that shapes future construction professionals for impactful industry contributions.";
  const motto = "Pooling Construction Students Together";
  
  const mottoColors = ["text-csa-orange", "text-csa-navy", "text-green-500", "text-purple-500"];

  useEffect(() => {
    // Animate core values descriptions
    if (isTypingValue) {
      const valueToType = coreValues[currentValueIndex].description;
      if (typedValueDescription.length < valueToType.length) {
        const timeoutId = setTimeout(() => {
          setTypedValueDescription(valueToType.substring(0, typedValueDescription.length + 1));
        }, 30);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingValue(false);
        // Wait before changing to next value
        setTimeout(() => {
          setIsTypingValue(true);
          setTypedValueDescription("");
          setCurrentValueIndex((prevIndex) => (prevIndex + 1) % coreValues.length);
        }, 5000);
      }
    }
  }, [typedValueDescription, currentValueIndex, isTypingValue]);

  // Mission typing effect
  useEffect(() => {
    if (isTypingMission) {
      if (typedMission.length < mission.length) {
        const timeoutId = setTimeout(() => {
          setTypedMission(mission.substring(0, typedMission.length + 1));
        }, 40);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingMission(false);
        setTimeout(() => {
          setIsTypingVision(true);
        }, 1000);
      }
    }
  }, [typedMission, isTypingMission]);

  // Vision typing effect
  useEffect(() => {
    if (isTypingVision) {
      if (typedVision.length < vision.length) {
        const timeoutId = setTimeout(() => {
          setTypedVision(vision.substring(0, typedVision.length + 1));
        }, 40);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingVision(false);
        setTimeout(() => {
          setIsTypingMotto(true);
        }, 1000);
      }
    }
  }, [typedVision, isTypingVision]);

  // Motto typing effect with color alternating
  useEffect(() => {
    if (isTypingMotto) {
      if (typedMotto.length < motto.length) {
        const timeoutId = setTimeout(() => {
          setTypedMotto(motto.substring(0, typedMotto.length + 1));
        }, 40);
        return () => clearTimeout(timeoutId);
      } else {
        setIsTypingMotto(false);
        // Change color and restart the typing cycle after a pause
        setTimeout(() => {
          setMottoColorIndex((prevIndex) => (prevIndex + 1) % mottoColors.length);
          setTypedMission("");
          setTypedVision("");
          setTypedMotto("");
          setIsTypingMission(true);
        }, 3000);
      }
    }
  }, [typedMotto, isTypingMotto]);

  return (
    <section id="about" className="py-16 md:py-24 bg-csa-navy text-white">
      <div className="csa-container">
        <div className="max-w-4xl mx-auto">
          {/* About CSA-TUK - Add border */}
          <div className="text-center border-4 border-csa-orange rounded-lg p-8 mb-16 animate-on-scroll shadow-lg bg-white text-csa-gray">
            <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-csa-navy">
              About CSA-TUK
            </h2>
            <p className="text-lg mt-6 mb-6">
              The Construction Students Association (CSA) at the Technical University of Kenya (TUK) is a vibrant student-led organization 
              that brings together students from Quantity Surveying, Construction Management, and Building and Civil Engineering Technology programs.
            </p>
            <p className="text-lg">
              Founded in 2018, CSA has grown to become a pivotal platform for students to connect with the construction industry, enhance their 
              academic experience, and develop professional skills essential for their future careers.
            </p>
          </div>

          {/* Mission, Vision, and Motto with typing effect */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div ref={missionRef} className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-on-scroll text-csa-gray">
              <h3 className="text-xl font-semibold text-csa-navy mb-3">Our Mission</h3>
              <div className="h-32">
                {typedMission}
                {isTypingMission && <span className="inline-block w-1 h-4 bg-csa-orange animate-pulse ml-1"></span>}
              </div>
            </div>
            
            <div ref={visionRef} className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-on-scroll text-csa-gray">
              <h3 className="text-xl font-semibold text-csa-navy mb-3">Our Vision</h3>
              <div className="h-32">
                {typedVision}
                {isTypingVision && <span className="inline-block w-1 h-4 bg-csa-orange animate-pulse ml-1"></span>}
              </div>
            </div>
            
            <div ref={mottoRef} className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <h3 className="text-xl font-semibold text-csa-navy mb-3">Our Motto</h3>
              <div className={`font-bold text-xl h-32 ${mottoColors[mottoColorIndex]}`}>
                {typedMotto}
                {isTypingMotto && <span className="inline-block w-1 h-4 bg-csa-navy animate-pulse ml-1"></span>}
              </div>
            </div>
          </div>

          {/* Core Values - Animated text and boxes */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-10">Our Core Values</h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((value, index) => (
                <div 
                  key={index}
                  className={`value-card group bg-white hover:bg-csa-navy transition-all duration-300 animate-on-scroll ${
                    index === currentValueIndex ? "ring-4 ring-csa-orange" : ""
                  }`}
                >
                  <div className="mb-4">{value.icon}</div>
                  <h4 className="text-lg font-bold text-csa-orange group-hover:text-white transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-csa-gray group-hover:text-blue-300 transition-colors duration-300 text-sm h-24 flex items-center justify-center">
                    {index === currentValueIndex ? (
                      <>
                        {typedValueDescription}
                        <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1"></span>
                      </>
                    ) : (
                      value.description
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slogan - Increased font and repeated */}
          <div className="text-center mb-8 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-csa-orange animate-pulse mb-6">
              Pooling Construction Students Together
            </h2>
            <p className="text-lg text-white italic">
              Connecting students, professionals, and academics to build a stronger construction community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
