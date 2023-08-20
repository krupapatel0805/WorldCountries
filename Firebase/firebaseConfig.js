import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP_-Wc9bO8CMlZTQIXxvv_GLC3pEllsmI",
  authDomain: "worldcountries-1dea0.firebaseapp.com",
  projectId: "worldcountries-1dea0",
  storageBucket: "worldcountries-1dea0.appspot.com",
  messagingSenderId: "884722349429",
  appId: "1:884722349429:web:ed1b07b3c9b6f715b6cf3c",
  measurementId: "G-QNBRT4PE0X"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}