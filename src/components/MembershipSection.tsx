
import React, { useState } from "react";
import { BookOpen, Users, Network, HardHat, FileDown, School, GraduationCap, Building2 } from "lucide-react";
import { ExternalLink } from "lucide-react";
import MembershipDialog from "./MembershipDialog";

const benefits = [
  { 
    text: "Site Visits", 
    description: "Learn on-site, not just in class—see real projects in action.",
    icon: Building2
  },
  { 
    text: "Resource Sharing", 
    description: "Get notes, templates, and tools to boost your academic game.",
    icon: FileDown
  },
  { 
    text: "Mentorship Access", 
    description: "Connect with pros for guidance, wisdom, and career direction.",
    icon: GraduationCap
  },
  { 
    text: "Industry Linkages", 
    description: "Build bridges to top firms and industry bodies early on.",
    icon: Network
  },
];

const MembershipSection = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <MembershipDialog open={showDialog} onOpenChange={setShowDialog} />
    <section id="membership" className="py-16 md:py-24 bg-gray-50">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Benefits of Joining CSA
          </h2>
          <p className="text-lg text-csa-gray mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Join a vibrant student body shaping the future of construction
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-csa-navy mb-6">Join CSA Today</h3>
            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start text-slide-in hover:translate-x-2 transition-transform duration-300" 
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <benefit.icon className="h-6 w-6 text-csa-orange mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-csa-navy">{benefit.text}</h4>
                    <p className="text-csa-gray mt-1">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowDialog(true)}
                className="btn-secondary pulse-effect"
              >
                Join CSA
              </button>
              
              <a 
                href="https://docs.google.com/spreadsheets/d/1uv-bzwCwdYdiQJrbUWHcXRaitku8E3oEmXGt2FwUvZs/edit?gid=963869128#gid=963869128" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline pulse-effect"
              >
                Registered Members <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg h-[400px] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-csa-navy to-csa-navy/80"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Become a Member Today!</h3>
              <p className="mb-6">
                Join a community of future construction professionals and start your journey towards a 
                successful career in the construction industry.
              </p>
              <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/015aa4a2-9885-47c7-b5a5-d44e0a8e2778.png" 
                  alt="CSA-TUK Logo" 
                  className="h-16 w-16"
                />
              </div>
              <p className="text-sm text-white/80">
                Membership is open to all students in construction-related courses at TUK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default MembershipSection;
