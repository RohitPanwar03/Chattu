import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-lunLCt_ZdZzvSTAbhsD0DnR1q2TD-uU",
  authDomain: "chattu-68f2f.firebaseapp.com",
  projectId: "chattu-68f2f",
  storageBucket: "chattu-68f2f.firebasestorage.app",
  messagingSenderId: "359677256342",
  appId: "1:359677256342:web:d484c7424f2d72249a98b7",
};

export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
