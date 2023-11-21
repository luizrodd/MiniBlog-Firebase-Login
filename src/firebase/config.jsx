import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDxmdgU_ZOnIcsL713ptoVoia0zRr9hvRM",
  authDomain: "miniblog-7f7b7.firebaseapp.com",
  projectId: "miniblog-7f7b7",
  storageBucket: "miniblog-7f7b7.appspot.com",
  messagingSenderId: "702363799612",
  appId: "1:702363799612:web:1679bf87c7979aa6b33339",
  measurementId: "G-3NZ5WX5KLK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export {db};