import firebase from "firebase/app";

import { auth } from "../firebase";

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export type UserCredentials = Omit<NewUser, "name">;

export async function registerUser(newUser: NewUser) {
  const { email, name: displayName, password } = newUser;
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  return await user?.updateProfile({ displayName });
}

export async function logInUser(userCredentials: UserCredentials) {
  const { email, password } = userCredentials;
  return await auth.signInWithEmailAndPassword(email, password);
}

export async function logOut() {
  return await auth.signOut();
}

export function suscribeToAuthChanges(
  callback: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)
) {
  return auth.onAuthStateChanged(callback);
}

export async function logInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}

export async function resetPassword(email: string) {
  return auth.sendPasswordResetEmail(email);
}
