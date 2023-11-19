// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUpXBkc9m59rHsTbE_XRHfn_cOSvcmdQ8",
  authDomain: "monroo-fe.firebaseapp.com",
  projectId: "monroo-fe",
  storageBucket: "monroo-fe.appspot.com",
  messagingSenderId: "507819862219",
  appId: "1:507819862219:web:b7cba2b228a862bc9c134e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
