import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigAuth = {
  apiKey: "AIzaSyAhWD9Td7zqNEMbYZsL-ooLr7TEI7E_agU",
  authDomain: "recipes-bf354.firebaseapp.com",
  projectId: "recipes-bf354",
  storageBucket: "recipes-bf354.appspot.com",
  messagingSenderId: "364546363079",
  appId: "1:364546363079:web:98c723fccceb1ed004b8e2",
  measurementId: "G-Z3PLBQKK2D",
};

const app = firebase.initializeApp(firebaseConfigAuth);

export const auth = app.auth();
export const db = app.firestore();
export const storage = getStorage(app);
export default app;
