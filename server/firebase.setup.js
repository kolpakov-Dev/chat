import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBsapEnPDKAfIfCGoFjAM5cbNI5XkUmcOA",
  authDomain: "chat-b4ddc.firebaseapp.com",
  projectId: "chat-b4ddc",
  storageBucket: "chat-b4ddc.appspot.com",
  messagingSenderId: "311502843482",
  appId: "1:311502843482:web:9e46b9ea15c6c268a8f263",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
