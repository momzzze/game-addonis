// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export {app, auth, db}