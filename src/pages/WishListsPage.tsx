import { FC, useContext, useEffect, useState } from "react";
import WishListCard from "../components/organisms/WishListCard";

import * as wishListService from "../services/wishlists";
import useForm from "../hooks/useForm";
import { Seo } from "../components";
import { UserContext } from "../context";
import { handleServerError } from "../utils";
import { WishList } from "../services/wishlists";

const INITIAL_FORM_VALUES = {
  name: "",
  description: "",
  coverImg: undefined,
};

const WishListsPage: FC = () => {
  const user = useContext(UserContext);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [wishLists, setWishLists] = useState<WishList[] | undefined>(undefined);

  useEffect(() => {
    const unsuscribe = wishListService.suscribeToUserWishLists(
      user!,
      setWishLists
    );
    return () => unsuscribe();
  }, [user]);

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useForm(INITIAL_FORM_VALUES, async (newWishList) => {
    try {
      await wishListService.createWishList(newWishList, user!, (progress) => {
        console.log(progress);
        setUploadProgress(progress.bytesTransferred / progress.totalBytes);
      });
      resetForm();
    } catch (error) {
      handleServerError(error);
    }
  });

  return (
    <div>
      <Seo pageTitle="Your wishlists" />
      <h3>Welcome {user?.displayName}</h3>
      <h1>Create a wishlist</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name="name"
          minLength={5}
          maxLength={50}
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          className="block"
        />
        <input
          required
          type="text"
          name="description"
          minLength={5}
          maxLength={140}
          placeholder="Short description"
          onChange={handleChange}
          value={values.description}
          className="block"
        />
        <input
          type="file"
          name="coverImg"
          onChange={handleChange}
          className="block"
          accept="image/*"
          multiple={false}
        />
        {uploadProgress > 0 && uploadProgress < 1 && (
          <p>{uploadProgress * 100}%</p>
        )}
        <button className="block" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Create"}
        </button>
      </form>
      {!wishLists && <p>Loading wishlists...</p>}
      {wishLists?.length === 0 && (
        <p>You don't have any wishlist. Try adding one.</p>
      )}
      {wishLists && wishLists.length > 0 && (
        <ul>
          {wishLists?.map((wishList) => (
            <li key={wishList.id}>
              <WishListCard wishList={wishList} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishListsPage;
