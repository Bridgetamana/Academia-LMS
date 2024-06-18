import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz5vj7SB7bkYFgG1yfa3561Q2q6V-yJCg",
  authDomain: "academia-lms-f936e.firebaseapp.com",
  projectId: "academia-lms-f936e",
  storageBucket: "academia-lms-f936e.appspot.com",
  messagingSenderId: "278821787486",
  appId: "1:278821787486:web:ca4e720512f17c03e661cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  doc,
  setDoc,
  getDoc,
};
