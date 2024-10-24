import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9kJ1nEbIKg8ShpH85LPcAyuTEMJ9lWeo",
    authDomain: "betta-project-96f88.firebaseapp.com",
    projectId: "betta-project-96f88",
    storageBucket: "betta-project-96f88.appspot.com",
    messagingSenderId: "1068992849922",
    appId: "1:1068992849922:web:68a1ac4563949b280f9f1b",
    measurementId: "G-BMQYQC8219"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
