import firebase from "firebase/app";
import { createContext } from "react";

export type User = undefined | null | firebase.User;

const UserContext = createContext<User>(undefined);

export default UserContext;
