import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnPzDKK5GASPh7fXmc6HRZjAk6Ja_Qh7o",
  authDomain: "construction-students.firebaseapp.com",
  projectId: "construction-students",
  storageBucket: "construction-students.firebasestorage.app",
  messagingSenderId: "61362862824",
  appId: "1:61362862824:web:9a009c58fe96dba401275d",
  measurementId: "G-NL2WHLWRWB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;