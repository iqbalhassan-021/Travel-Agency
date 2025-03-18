
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHMYu8mZHAERu0Q3NiHZp9kxQDKioQWYE",
    authDomain: "travelagency-cf9f5.firebaseapp.com",
    projectId: "travelagency-cf9f5",
    storageBucket: "travelagency-cf9f5.firebasestorage.app",
    messagingSenderId: "733434223322",
    appId: "1:733434223322:web:7cd870c1fedc8e5bd463e3",
    measurementId: "G-YN744L04K2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);