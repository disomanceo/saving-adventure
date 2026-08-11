import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA2feua_zkrDxcOs5p1S7ZK2b3wJwST28A",
  authDomain: "saving-adventure-school.firebaseapp.com",
  projectId: "saving-adventure-school",
  storageBucket: "saving-adventure-school.firebasestorage.app",
  messagingSenderId: "40282527968",
  appId: "1:40282527968:web:a352a28fcfbd13028f9885",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
