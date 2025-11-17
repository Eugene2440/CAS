import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf8AbGmDj1X94RWeQpayoI4y3yo8zloXM",
  authDomain: "cas-tuk.firebaseapp.com",
  projectId: "cas-tuk",
  storageBucket: "cas-tuk.firebasestorage.app",
  messagingSenderId: "906636569134",
  appId: "1:906636569134:web:27a549470cf812df73cdbf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;