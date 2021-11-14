import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDz7Iz2NLIEshslZWeS7nUt8UTzhxIqqJY",
  authDomain: "homeworktrackingapp-753bf.firebaseapp.com",
  projectId: "homeworktrackingapp-753bf",
  storageBucket: "homeworktrackingapp-753bf.appspot.com",
  messagingSenderId: "403569008101",
  appId: "1:403569008101:web:017ca39a8296622e8ba30c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
