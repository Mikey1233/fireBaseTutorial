import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//Auththentication and googleAuthentication provider
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlgtMG5bc3GunYnhHQ6RfSGj-QdXDcZGk",
  authDomain: "fir-course-22e74.firebaseapp.com",
  projectId: "fir-course-22e74",
  storageBucket: "fir-course-22e74.appspot.com",
  messagingSenderId: "927181900285",
  appId: "1:927181900285:web:01f1ac0781cfcb52777194",
  measurementId: "G-4HYEZK54R5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
