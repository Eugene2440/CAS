
import React, { useState, useEffect } from "react";
import { Users, Ruler, School, HardHat } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

const iconMap: Record<string, React.ElementType> = {
  QS: Ruler,
  CM: Users,
  BCT: HardHat
};

const ChaptersSection = () => {
  const [chapters, setChapters] = useState<ChapterInfo[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const snapshot = await getDocs(collection(db, "chapters"));
      const data = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        icon: iconMap[doc.data().shortName] || Users
      })) as ChapterInfo[];
      setChapters(data);
    };
    fetchChapters();
  }, []);
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
