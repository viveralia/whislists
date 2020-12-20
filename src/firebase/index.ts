import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "../config/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseApp = firebase.app();

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const { serverTimestamp } = firebase.firestore.FieldValue;

export default firebaseApp;
