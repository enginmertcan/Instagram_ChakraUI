import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5WDk25EZnxl9FiJwAYBfwZGTpzp7Cs9Y",
  authDomain: "insta-clone-a42fb.firebaseapp.com",
  projectId: "insta-clone-a42fb",
  storageBucket: "insta-clone-a42fb.appspot.com",
  messagingSenderId: "722459637449",
  appId: "1:722459637449:web:28745b210d228fcbc33f18",
  measurementId: "G-CMN893WN9B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, fireStore, storage };