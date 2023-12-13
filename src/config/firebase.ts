// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCU3eFnnBtpx154IpJjL_s8HhvcvzyKuPI",
//   authDomain: "game-adonis.firebaseapp.com",
//   projectId: "game-adonis",
//   storageBucket: "game-adonis.appspot.com",
//   messagingSenderId: "703235856612",
//   appId: "1:703235856612:web:85786d0da026a531a534f1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBa5xTdGLWMo17jVJ7svLXAgIhEId-VY00",
  authDomain: "game-addonis.firebaseapp.com",
  projectId: "game-addonis",
  storageBucket: "game-addonis.appspot.com",
  messagingSenderId: "373933296119",
  appId: "1:373933296119:web:355cb6e95c939c2c0246f2"
};

// Initialize Firebase
const app =getApps()?.length ? getApp() : initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);
const storage= getStorage(app);

export {app, auth, db, storage}