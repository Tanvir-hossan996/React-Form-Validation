import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDgZPafJ6O8SNj0tvEHkHg5uldXQFQhh3o",
  authDomain: "chatting-application-69973.firebaseapp.com",
  projectId: "chatting-application-69973",
  storageBucket: "chatting-application-69973.appspot.com",
  messagingSenderId: "520748474919",
  appId: "1:520748474919:web:974c5fad48af801eaf6402",
  measurementId: "G-L16PF6THV6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
  signInWithEmailAndPassword,
};
