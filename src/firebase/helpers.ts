import firebase from "firebase/app";
import { v4 as uuid } from "uuid";

import { storage } from "./index";

export async function uploadImage(
  image: File,
  onUploadProgress?: (progress: firebase.storage.UploadTaskSnapshot) => void
) {
  const fileName = uuid();
  const uploadTask = storage.ref(`images/${fileName}`).put(image);
  return new Promise((resolve, reject) => {
    uploadTask.on("state_changed", onUploadProgress, reject, () =>
      resolve(fileName)
    );
  });
}

export async function getImage(path: string) {
  try {
    return await storage.ref(path).getDownloadURL();
  } catch (error) {
    console.error(error);
    return null;
  }
}
