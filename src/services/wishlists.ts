import firebase from "firebase/app";

import { db, serverTimestamp, storage } from "../firebase";
import { getImage, uploadImage } from "../firebase/helpers";

export const wishListsRef = db.collection("wishlists");

export interface WishList {
  id: string;
  name: string;
  description: string;
  coverImg: string;
  coverImgUrl: string;
  createdAt: firebase.firestore.Timestamp;
  createdBy: {
    id: string;
    name: string;
  };
  members: string[];
}

export interface NewWishList extends Pick<WishList, "name" | "description"> {
  coverImg?: File;
}

export async function createWishList(
  { coverImg, ...restOfTheWishlist }: NewWishList,
  user: firebase.User,
  onUploadProgress?: (progress: firebase.storage.UploadTaskSnapshot) => void
) {
  return await wishListsRef.add({
    ...restOfTheWishlist,
    coverImg: coverImg ? await uploadImage(coverImg, onUploadProgress) : null,
    createdBy: {
      name: user.displayName,
      id: user.uid,
    },
    members: [user.uid],
    createdAt: serverTimestamp(),
  });
}

export async function joinWishList(
  newMember: firebase.User,
  wishList: WishList
) {
  return await wishListsRef.doc(wishList.id).update({
    members: firebase.firestore.FieldValue.arrayUnion(newMember.uid),
  });
}

export function suscribeToUserWishLists(
  user: firebase.User,
  saveCallback: (wishLists: WishList[]) => void
) {
  return wishListsRef
    .where("members", "array-contains", user.uid)
    .onSnapshot((snap) => {
      const wishLists = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<WishList, "id">),
      }));
      saveCallback(wishLists);
    });
}

export async function getWishList(wishListId: string) {
  const doc = await wishListsRef.doc(wishListId).get();

  if (!doc.exists) throw Error("This wishlist doesn't exist");

  const coverImgUrl = !doc.data()?.coverImg
    ? null
    : await getImage(`/images/${doc.data()?.coverImg}`);

  return {
    id: doc.id,
    coverImgUrl,
    ...(doc.data() as Omit<WishList, "id" | "coverImgUrl">),
  };
}

export async function deleteWishList(wishList: WishList) {
  if (wishList.coverImg) {
    await storage.ref(`/images/${wishList.coverImg}`).delete();
  }

  return await wishListsRef.doc(wishList.id).delete();
}
