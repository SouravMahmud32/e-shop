// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV7SkOra6x4CPDmBsIVhoL480ZK7y1ppo",
  authDomain: "e-shop-a7cb2.firebaseapp.com",
  projectId: "e-shop-a7cb2",
  storageBucket: "e-shop-a7cb2.appspot.com",
  messagingSenderId: "840457436903",
  appId: "1:840457436903:web:bc27d9e62a7189b6b22c42"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;