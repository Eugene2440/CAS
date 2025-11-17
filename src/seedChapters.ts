import { collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

const chapters = [
  {
    name: "Quantity Surveying Chapter",
    shortName: "QS",
    description: "These are TUK students pursuing Quantity Surveying, offered under the Department of Construction and Property Studies, dedicated to accurate cost planning and control of construction projects.",
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
    members: [
      { name: "Mary Anne", role: "Chair" },
      { name: "Lilian", role: "First Year Representative" },
      { name: "Rigobert", role: "Second Year Representative" },
      { name: "Zachary", role: "Third Year Representative" },
      { name: "Eunice", role: "Fourth Year Representative" },
    ]
  }
];

const seedChapters = async () => {
  try {
    for (const chapter of chapters) {
      await addDoc(collection(db, "chapters"), chapter);
      console.log(`Added: ${chapter.name}`);
    }
    console.log("All chapters seeded successfully!");
  } catch (error) {
    console.error("Error seeding chapters:", error);
  }
};

seedChapters();
