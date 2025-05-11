import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJxJ80Rc7wjvkA55Bp6_2RmHSpIGQZWS4",
  authDomain: "nwitter-reloaded-43819.firebaseapp.com",
  projectId: "nwitter-reloaded-43819",
  storageBucket: "nwitter-reloaded-43819.firebasestorage.app",
  messagingSenderId: "798930996990",
  appId: "1:798930996990:web:a2be1db7206ab0b8a71faf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);