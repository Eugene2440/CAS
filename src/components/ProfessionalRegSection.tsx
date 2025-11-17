
import React from 'react';

const ProfessionalRegSection = () => {
  const professionalBodies = [
    {
      name: "IQSK",
      fullName: "Institute of Quantity Surveyors of Kenya",
      logo: "/lovable-uploads/4facb8e7-ab4d-43e7-877d-162fa2cda016.png", 
      url: "https://iqskenya.org/registered/register",
      description: "For Quantity Surveying students"
    },
    {
      name: "ACMK",
      fullName: "Association of Construction Managers of Kenya",
      logo: "/lovable-uploads/0ed2930b-a0d5-4f26-9df4-05e5ee77d4bd.png",
      url: "https://register.acmk.co.ke/student-registration/",
      description: "For Construction Management students"
    },
    {
      name: "RICS",
      fullName: "Royal Institution of Chartered Surveyors",
      logo: "/lovable-uploads/7bdab951-fc9c-4a71-a99a-612774a1df87.png",
      url: "https://www.rics.org/join-rics",
      description: "International professional body for construction personnels"
    },
    {
      name: "KGBS",
      fullName: "Kenya Green Building Society",
      logo: "/lovable-uploads/f0935371-9077-4296-b2d1-da52b28567ea.png",
      url: "https://www.kgbs.co.ke/join-us/",
      description: "For sustainable construction practices"
    },
    {
      name: "AAK",
      fullName: "Architectural Association of Kenya",
      logo: "/lovable-uploads/10e04eab-0d56-4ce4-a367-fd86076de9c8.png",
      url: "https://aak.or.ke/how-to-join/",
      description: "For construction professionals in Kenya"
    },
    {
      name: "BORAQS",
      fullName: "Board of Registration of Architects and Quantity Surveyors",
      logo: "/lovable-uploads/b520b13b-f2a4-435a-ac71-1546e2f18d1a.png",
      url: "https://boraqs.or.ke/registration/",
      description: "For professional registration in Kenya"
    }
  ];

  return (
    <section id="professional-reg" className="py-16 md:py-24 bg-white">
      <div className="csa-container">
        <h2 className="section-title text-center text-csa-orange font-extrabold after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
          Professional Registration
        </h2>
        
        <p className="text-center max-w-4xl mx-auto mb-12 text-csa-gray text-fade-in font-bold" style={{ animationDelay: "0.3s" }}>
          CSA-TUK encourages all construction students to register with relevant professional bodies in 
          their respective fields. This provides networking opportunities, access to industry resources, and 
          sets a foundation for future career development.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalBodies.map((body, index) => (
            <div key={index} className="bg-csa-navy text-white hover:bg-csa-navy/90 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <div className="h-14 w-14 bg-white rounded-md shadow-sm flex items-center justify-center mr-4">
                    <img src={body.logo} alt={`${body.name} logo`} className="h-12 w-12 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">{body.name}</h3>
                    <p className="text-white/80 text-sm">{body.fullName}</p>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-white/90 text-sm mb-4">{body.description}</p>
                </div>
                <div className="p-4 pt-0 mt-auto">
                  <a 
                    href={body.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm inline-flex items-center justify-center w-full"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalRegSection;
