// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB55pC7C7Yak-jkksiO0cQSYjbWOdTPtHk",
  authDomain: "greenmint-5aa44.firebaseapp.com",
  projectId: "greenmint-5aa44",
  storageBucket: "greenmint-5aa44.appspot.com",
  messagingSenderId: "290448389945",
  appId: "1:290448389945:web:334386c1bc3ff4369edae8",
  measurementId: "G-VN2BCNXVEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;