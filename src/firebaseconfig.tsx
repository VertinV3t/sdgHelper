import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjULaHl4Q_i3EZWwKBGP0p8jiCfQGpEv0",
  authDomain: "sdghelper.firebaseapp.com",
  projectId: "sdghelper",
  storageBucket: "sdghelper.firebasestorage.app",
  messagingSenderId: "303040902920",
  appId: "1:303040902920:web:a52235ae8b575971565ebd",
  measurementId: "G-79N9P37GQB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);