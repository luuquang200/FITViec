// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTfjTv2Lvpm5brYeQxSr2R5Uqy-HE2CCs",
    authDomain: "auth-service-ba5b4.firebaseapp.com",
    projectId: "auth-service-ba5b4",
    storageBucket: "auth-service-ba5b4.appspot.com",
    messagingSenderId: "745854117246",
    appId: "1:745854117246:web:1d4af43389ef803adbff2f",
    measurementId: "G-QTBMGJ5H0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
