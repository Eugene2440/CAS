
import React from "react";
import { Users, Ruler, School, HardHat } from "lucide-react";

interface ChapterMember {
  name: string;
  role: string;
}

interface ChapterInfo {
  name: string;
  shortName: string;
  description: string;
  icon: React.ElementType;
  members: ChapterMember[];
  id: string;
}

const chapters: ChapterInfo[] = [
  {
    name: "Quantity Surveying Chapter",
    shortName: "QS",
    description: "These are TUK students pursuing Quantity Surveying, offered under the Department of Construction and Property Studies, dedicated to accurate cost planning and control of construction projects.",
    icon: Ruler,
    id: "qs-chapter",
    members: [
      { name: "Meshack Were", role: "Chair" },
      { name: "Hadassah Kibet", role: "First Year Representative" },
      { name: "Ray Orek", role: "Second Year Representative" },
      { name: "John Mark Kariuki", role: "Third Year Representative" },
      { name: "Kelvin Ekamais", role: "Fourth Year Representative" },
    ]
  },
  {
    name: "Construction Management Chapter",
    shortName: "CM",
    description: "These are TUK students pursuing Construction Management under the same department, preparing to oversee and coordinate complex building projects from start to finish.",
    icon: Users,
    id: "cm-chapter",
    members: [
      { name: "John Nyaito", role: "Chair" },
      { name: "Adrian", role: "First Year Representative" },
      { name: "Ann", role: "Second Year Representative" },
      { name: "Bernard", role: "Third Year Representative" },
      { name: "Ruth", role: "Fourth Year Representative" },
    ]
  },
  {
    name: "Building Construction Technology Chapter",
    shortName: "BCT",
    description: "TUK students in this chapter are training to become hands-on experts in building technologies, materials, and systems – critical players in practical site execution and technical supervision.",
    icon: HardHat,
    id: "bct-chapter",
    members: [
      { name: "Mary Anne", role: "Chair" },
      { name: "Lilian", role: "First Year Representative" },
      { name: "Rigobert", role: "Second Year Representative" },
      { name: "Zachary", role: "Third Year Representative" },
      { name: "Eunice", role: "Fourth Year Representative" },
    ]
  }
];

const ChaptersSection = () => {
  return (
    <section id="chapters" className="py-16 md:py-24 bg-csa-navy text-white">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-center text-white after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            CSA Chapters
          </h2>
          <p className="text-lg text-gray-200 mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            The Construction Students Association is organized into specialized chapters, each focused on a 
            specific discipline within the construction field.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              id={chapter.id}
              className="bg-white rounded-lg p-6 shadow-lg text-csa-navy lift-effect shake-effect text-bounce-in transform-gpu hover:translate-y-[-10px] transition-all duration-500"
              style={{ animationDelay: `${0.5 + 0.2 * index}s` }}
            >
              <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
                <div className="w-14 h-14 bg-csa-navy rounded-full flex items-center justify-center mr-4 shadow-md">
                  <chapter.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{chapter.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                {chapter.description}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-csa-orange text-xl mb-4 border-b border-gray-200 pb-2">Chapter Representatives</h4>
                <ul className="space-y-3">
                  {chapter.members.map((member, mIndex) => (
                    <li key={mIndex} className="flex justify-between items-center hover:bg-gray-100 p-3 rounded-md transition-colors duration-300 border-l-4 border-transparent hover:border-csa-orange">
                      <span className="font-medium text-csa-navy">{member.name}</span>
                      <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{member.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChaptersSection;
