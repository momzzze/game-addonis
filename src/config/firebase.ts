// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCU3eFnnBtpx154IpJjL_s8HhvcvzyKuPI",
  authDomain: "game-adonis.firebaseapp.com",
  projectId: "game-adonis",
  storageBucket: "game-adonis.appspot.com",
  messagingSenderId: "703235856612",
  appId: "1:703235856612:web:85786d0da026a531a534f1"
};

// Initialize Firebase
const app =getApps()?.length ? getApp() : initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);
const storage= getStorage(app);

export {app, auth, db, storage}