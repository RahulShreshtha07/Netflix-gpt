// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHi09EOEcH5WVg5QoOz3JSFcGQofNm_Xc",
  authDomain: "netflixgpt-f4013.firebaseapp.com",
  projectId: "netflixgpt-f4013",
  storageBucket: "netflixgpt-f4013.firebasestorage.app",
  messagingSenderId: "227735231342",
  appId: "1:227735231342:web:6ef06df3f741a018683f7f",
  measurementId: "G-91GDCJSWYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
