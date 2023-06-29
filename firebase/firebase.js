import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAxufWtTBq7vIFWM6o6FLaFqXHT8JwsoSw",
  authDomain: "chat-sphere-c7d35.firebaseapp.com",
  projectId: "chat-sphere-c7d35",
  storageBucket: "chat-sphere-c7d35.appspot.com",
  messagingSenderId: "872954260428",
  appId: "1:872954260428:web:10961251d1fa79393e4b69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);