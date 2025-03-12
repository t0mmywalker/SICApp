import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Vervang onderstaande waarden met die uit jouw Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDB8gA0qMW3K-7F5hTgyjyuX1vB59OYzEM",
  authDomain: "school-webapp.firebaseapp.com",
  projectId: "school-webapp",
  storageBucket: "school-webapp.appspot.com",
  messagingSenderId: "396294988357",
  appId: "school-webap"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);Í