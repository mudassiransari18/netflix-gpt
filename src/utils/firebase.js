// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGyZugRkdKoLBl9_ON05Zzlj7qOh9DhbA",
  authDomain: "netflixgpt-89f2e.firebaseapp.com",
  projectId: "netflixgpt-89f2e",
  storageBucket: "netflixgpt-89f2e.appspot.com",
  messagingSenderId: "597593061662",
  appId: "1:597593061662:web:dd65c9c88e3b3a0a20b10f",
  measurementId: "G-MZ1VN9D087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();  // this will be used for a lot of firebase related operation, hence keeping it in a central place where it will be called only once and used throught the app.