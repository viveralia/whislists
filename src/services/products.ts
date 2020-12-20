import firebase from "firebase/app";

import { serverTimestamp } from "../firebase";
import { getScreenshot } from "./screenshot";
import { wishListsRef, WishList } from "./wishlists";

export interface Product {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  createdBy: {
    name: string;
    id: string;
  };
}

export type NewProduct = Pick<Product, "name" | "url">;

export async function addProductToWishList(
  wishList: WishList,
  user: firebase.User,
  newProduct: NewProduct
) {
  return await wishListsRef
    .doc(wishList.id)
    .collection("products")
    .add({
      ...newProduct,
      imageUrl: await getScreenshot(newProduct.url),
      createdBy: {
        name: user.displayName,
        id: user.uid,
      },
      createdAt: serverTimestamp(),
    });
}

export function suscribeToProductsInAWishList(
  wishList: WishList,
  saveCallback: (wishLists: Product[]) => void
) {
  return wishListsRef
    .doc(wishList.id)
    .collection("products")
    .onSnapshot((snap) => {
      const products = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      saveCallback(products);
    });
}

export function removeProductFromAWishList(
  wishList: WishList,
  product: Product
) {
  return wishListsRef
    .doc(wishList.id)
    .collection("products")
    .doc(product.id)
    .delete();
}

export async function updateProductInAWishlist(
  wishList: WishList,
  product: Product
) {
  const productRef = wishListsRef
    .doc(wishList.id)
    .collection("products")
    .doc(product.id);

  const doc = await productRef.get();

  if (!doc.exists) throw Error("Can't update a non existing product");

  const isUrlTheSame = doc.data()?.url === product.url;

  return await productRef.update({
    name: product.name,
    url: product.url,
    imageUrl: isUrlTheSame
      ? product.imageUrl
      : await getScreenshot(product.url),
  });
}
