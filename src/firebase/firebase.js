// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSgeXdvCUxtlpGdOeH2DEs255c4OuYrKI",
  authDomain: "aisc-hype.firebaseapp.com",
  projectId: "aisc-hype",
  storageBucket: "aisc-hype.firebasestorage.app",
  messagingSenderId: "41431284892",
  appId: "1:41431284892:web:af2e37d950ce2820a88159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);