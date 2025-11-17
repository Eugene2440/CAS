import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function importMembersFromCSV(csvText: string) {
  // Parse CSV
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const members = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const member: any = {};
    
    headers.forEach((header, index) => {
      member[header] = values[index];
    });
    
    members.push(member);
  }
  
  // Import to Firestore
  let successCount = 0;
  let errorCount = 0;
  
  for (const member of members) {
    try {
      await addDoc(collection(db, "members"), member);
      successCount++;
      console.log(`Imported: ${member.fullName || member.name}`);
    } catch (error) {
      errorCount++;
      console.error(`Failed to import:`, member, error);
    }
  }
  
  return { successCount, errorCount, total: members.length };
}
