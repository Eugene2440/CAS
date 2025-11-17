
import React, { useState } from "react";
import { Linkedin, User, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExecutiveMember {
  name: string;
  role: string;
  linkedIn?: string;
  tier: number;
}

const executives: ExecutiveMember[] = [
  { name: "Kevin Kariuki Wamaitha", role: "President", linkedIn: "https://www.linkedin.com/in/kevin-kariuki-wamaitha/", tier: 1 },
  { name: "Hope Mang'eni", role: "Vice President", tier: 2 },
  { name: "Trizah Wanjiku", role: "Administrative Secretary", linkedIn: "https://www.linkedin.com/in/trizah-wanjiku-7779b3266/", tier: 2 },
  { name: "Victor Mutemi", role: "Treasurer", linkedIn: "https://www.linkedin.com/in/victor-mutemi-4720b5287/", tier: 3 },
  { name: "Wendy Matara", role: "Organizing Secretary", linkedIn: "https://www.linkedin.com/in/wendy-matara-5a1873293/", tier: 3 },
  { name: "Anakala Michael", role: "Registrar", linkedIn: "https://www.linkedin.com/in/anakala-michael-0b87a2276/", tier: 3 },
  { name: "Collins Kaiyaa", role: "Chief Editor", linkedIn: "https://www.linkedin.com/in/collins-kaiyaa-9a61902a0/", tier: 4 },
  { name: "Meshack Were", role: "QS Chapter Representative", linkedIn: "https://www.linkedin.com/in/meshack-were-105aba282/", tier: 4 },
  { name: "Grivance Otieno", role: "CM Chapter Representative", tier: 4 },
  { name: "Hepziphah Chebet", role: "BCT Chapter Representative", tier: 4 },
  { name: "Laban Kiarii", role: "Real Estate Chapter Representative", tier: 4 },
  { name: "QS Choka", role: "Patron", tier: 5 },
  { name: "Madam Pauline", role: "Assistant Patron", tier: 5 },
];

// Define tier colors with CSA logo colors
const tierColors = {
  1: "bg-gradient-to-b from-csa-orange to-csa-navy",
  2: "bg-gradient-to-b from-csa-orange/90 to-csa-navy/90",
  3: "bg-gradient-to-b from-csa-orange/80 to-csa-navy/80",
  4: "bg-gradient-to-b from-csa-orange/70 to-csa-navy/70",
  5: "bg-gradient-to-b from-csa-orange/60 to-csa-navy/60"
};

const ExecutiveSection = () => {
  // Placeholder for future navigation to former councils page
  const [showFormDialog, setShowFormDialog] = useState(false);
  const navigate = useNavigate();
  
  // Group executives by tier
  const tierGroups: Record<number, ExecutiveMember[]> = {};
  
  executives.forEach(exec => {
    if (!tierGroups[exec.tier]) {
      tierGroups[exec.tier] = [];
    }
    tierGroups[exec.tier].push(exec);
  });

  return (
    <section id="executive" className="py-16 md:py-24 bg-white">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Executive Council
          </h2>
          <div className="text-xl font-bold text-csa-orange mb-6 text-fade-in" style={{ animationDelay: "0.2s" }}>
            2024/2025 Council
          </div>
          <p className="text-lg text-csa-gray mt-2 mb-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Meet the dedicated team leading the Construction Students Association at TUK.
          </p>
          <button 
            onClick={() => setShowFormDialog(true)} 
            className="btn-outline mb-10 items-center inline-flex transform transition-transform duration-300 hover:scale-110 hover:shadow-lg"
          >
            <History className="mr-2 h-5 w-5" />
            View Former Councils
          </button>
        </div>

        {/* Tier 1 - President (Centered and Larger) */}
        {tierGroups[1] && (
          <div className="mb-16">
            <div className="flex justify-center">
              {tierGroups[1].map((exec, index) => (
                <div 
                  key={index} 
                  className={`team-card max-w-xs w-full shadow-lg hover:shadow-xl relative overflow-hidden group text-bounce-in ${tierColors[1]}`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-36 h-36 bg-gray-200 rounded-full mb-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {exec.linkedIn ? (
                      <a href={exec.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center justify-center">
                        {exec.name} <Linkedin className="h-5 w-5 ml-2 text-white" />
                      </a>
                    ) : (
                      exec.name
                    )}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-csa-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-csa-orange font-medium mb-2 text-xl">{exec.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2 - Vice President and Secretary */}
        {tierGroups[2] && (
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-8">
              {tierGroups[2].map((exec, index) => (
                <div 
                  key={index} 
                  className={`team-card max-w-xs w-full shadow-lg hover:shadow-xl relative overflow-hidden group text-bounce-in ${tierColors[2]}`}
                  style={{ animationDelay: `${0.6 + 0.1 * index}s` }}
                >
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {exec.linkedIn ? (
                      <a href={exec.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center justify-center">
                        {exec.name} <Linkedin className="h-4 w-4 ml-2 text-white" />
                      </a>
                    ) : (
                      exec.name
                    )}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-csa-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-csa-orange font-medium mb-2">{exec.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 3 - Treasurer, Organizing Secretary, and Registrar */}
        {tierGroups[3] && (
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-8">
              {tierGroups[3].map((exec, index) => (
                <div 
                  key={index} 
                  className={`team-card max-w-xs w-full shadow-lg hover:shadow-xl relative overflow-hidden group text-bounce-in ${tierColors[3]}`}
                  style={{ animationDelay: `${0.8 + 0.1 * index}s` }}
                >
                  <div className="w-28 h-28 bg-gray-200 rounded-full mb-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <User className="h-14 w-14 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {exec.linkedIn ? (
                      <a href={exec.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center justify-center">
                        {exec.name} <Linkedin className="h-4 w-4 ml-2 text-white" />
                      </a>
                    ) : (
                      exec.name
                    )}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-csa-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-csa-orange font-medium mb-2">{exec.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 4 - Chief Editor and Representatives */}
        {tierGroups[4] && (
          <div className="mb-16">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tierGroups[4].map((exec, index) => (
                <div 
                  key={index} 
                  className={`team-card shadow-lg hover:shadow-xl relative overflow-hidden group text-bounce-in ${tierColors[4]}`}
                  style={{ animationDelay: `${1.1 + 0.1 * index}s` }}
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {exec.linkedIn ? (
                      <a href={exec.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center justify-center">
                        {exec.name} <Linkedin className="h-3 w-3 ml-1 text-white" />
                      </a>
                    ) : (
                      exec.name
                    )}
                  </h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-csa-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-csa-orange font-medium text-sm mb-2">{exec.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 5 - Patrons */}
        {tierGroups[5] && (
          <div>
            <h3 className="text-xl font-semibold text-center mb-8 text-fade-in" style={{ animationDelay: "1.5s" }}>Patrons</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {tierGroups[5].map((exec, index) => (
                <div 
                  key={index} 
                  className={`team-card max-w-xs w-full shadow-lg hover:shadow-xl relative overflow-hidden group text-bounce-in ${tierColors[5]}`}
                  style={{ animationDelay: `${1.6 + 0.1 * index}s` }}
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{exec.name}</h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-csa-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-csa-orange font-medium text-sm">{exec.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dialog for Former Councils (placeholder) */}
        {showFormDialog && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
              <h3 className="text-xl font-bold text-csa-navy mb-4">Former Councils</h3>
              <p className="mb-4 text-csa-gray">This feature is coming soon. Check back for information about former CSA-TUK councils.</p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowFormDialog(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExecutiveSection;
