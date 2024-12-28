// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvm8i4eXamGDc68ddlSLDXMqTJSnxfqBE",
  authDomain: "letschat-18616.firebaseapp.com",
  projectId: "letschat-18616",
  storageBucket: "letschat-18616.firebasestorage.app",
  messagingSenderId: "922056537242",
  appId: "1:922056537242:web:fde8aceee3b32983cf5b23",
  measurementId: "G-X7G0VW698E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
