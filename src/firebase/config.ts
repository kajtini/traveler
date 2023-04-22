import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBspQeVE4sG5AgIkv0tGZbNODTUHyo8a00",
  authDomain: "traveler-2d7b4.firebaseapp.com",
  projectId: "traveler-2d7b4",
  storageBucket: "traveler-2d7b4.appspot.com",
  messagingSenderId: "1082639224253",
  appId: "1:1082639224253:web:dc37d3c36f696100d596d4",
  measurementId: "G-KFJDWXLLV6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
