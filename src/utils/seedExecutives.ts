import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const executives = [
  { name: "Kevin Kariuki Wamaitha", role: "President", linkedIn: "https://www.linkedin.com/in/kevin-kariuki-wamaitha/", tier: 1, year: "2024/2025" },
  { name: "Hope Mang'eni", role: "Vice President", linkedIn: "", tier: 2, year: "2024/2025" },
  { name: "Trizah Wanjiku", role: "Administrative Secretary", linkedIn: "https://www.linkedin.com/in/trizah-wanjiku-7779b3266/", tier: 2, year: "2024/2025" },
  { name: "Victor Mutemi", role: "Treasurer", linkedIn: "https://www.linkedin.com/in/victor-mutemi-4720b5287/", tier: 3, year: "2024/2025" },
  { name: "Wendy Matara", role: "Organizing Secretary", linkedIn: "https://www.linkedin.com/in/wendy-matara-5a1873293/", tier: 3, year: "2024/2025" },
  { name: "Anakala Michael", role: "Registrar", linkedIn: "https://www.linkedin.com/in/anakala-michael-0b87a2276/", tier: 3, year: "2024/2025" },
  { name: "Collins Kaiyaa", role: "Chief Editor", linkedIn: "https://www.linkedin.com/in/collins-kaiyaa-9a61902a0/", tier: 4, year: "2024/2025" },
  { name: "Meshack Were", role: "QS Chapter Representative", linkedIn: "https://www.linkedin.com/in/meshack-were-105aba282/", tier: 4, year: "2024/2025" },
  { name: "Grivance Otieno", role: "CM Chapter Representative", linkedIn: "", tier: 4, year: "2024/2025" },
  { name: "Hepziphah Chebet", role: "BCT Chapter Representative", linkedIn: "", tier: 4, year: "2024/2025" },
  { name: "Laban Kiarii", role: "Real Estate Chapter Representative", linkedIn: "", tier: 4, year: "2024/2025" },
  { name: "QS Choka", role: "Patron", linkedIn: "", tier: 5, year: "2024/2025" },
  { name: "Madam Pauline", role: "Assistant Patron", linkedIn: "", tier: 5, year: "2024/2025" },
];

export const seedExecutives = async () => {
  try {
    const executivesRef = collection(db, "executives");
    
    for (const exec of executives) {
      await addDoc(executivesRef, exec);
    }
    
    console.log("Executives seeded successfully!");
    return { success: true, message: "Executives seeded successfully!" };
  } catch (error) {
    console.error("Error seeding executives:", error);
    throw error;
  }
};
