import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "cas@admin.com",
      "CasAdmin1"
    );
    console.log("Admin user created successfully:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};