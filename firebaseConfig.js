import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("NEXT_PUBLIC")) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    auth = {};
    db = {};
    storage = {};
  }
} catch (error) {
  console.error("Firebase initialization failed:", error.message);
  app = {};
  auth = {};
  db = {};
  storage = {};
}

export { app, auth, db, storage };