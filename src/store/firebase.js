import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXnRk0MERIHZhjaphOYH2aGEq__wk6Pc8",
  authDomain: "friends-c2500.firebaseapp.com",
  projectId: "friends-c2500",
  storageBucket: "friends-c2500.appspot.com",
  messagingSenderId: "962253731987",
  appId: "1:962253731987:web:2e821b2b609a5dc3c0b566",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
