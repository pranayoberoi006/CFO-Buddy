
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAZXbHimcLRHLk1utNhNzkk1JZ_h1RXNko",
    authDomain: "cfo-buddy-5d589.firebaseapp.com",
    projectId: "cfo-buddy-5d589",
    storageBucket: "cfo-buddy-5d589.appspot.com",
    messagingSenderId: "733557836974",
    appId: "1:733557836974:web:7be5d2ec302cb44174f13f",
    measurementId: "G-JNRSM1002C"
};

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let database: Database;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
  database = getDatabase(app);
} else if (getApps().length) {
  app = getApp();
  auth = getAuth(app);
  firestore = getFirestore(app);
  database = getDatabase(app);
}

// @ts-ignore
export { app, auth, firestore, database };
