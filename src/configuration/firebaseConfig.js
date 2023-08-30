// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPuLT5K9gq684MBxvsptcVT4MvQae0vaU",
  authDomain: "prueba-synagro.firebaseapp.com",
  projectId: "prueba-synagro",
  storageBucket: "prueba-synagro.appspot.com",
  messagingSenderId: "491468384514",
  appId: "1:491468384514:web:e64ad289031682a2eaba1b",
  measurementId: "G-QN1QCWNR7W",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
};
