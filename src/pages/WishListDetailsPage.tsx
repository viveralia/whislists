import useSWR from "swr";
import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import * as wishListService from "../services/wishlists";
import { ProductsList, Seo } from "../components";
import { handleServerError } from "../utils";

interface WishListPageParams {
  wishListId: string;
}

const WishListDetailsPage: FC<RouteComponentProps<WishListPageParams>> = ({
  match,
  history,
}) => {
  const { wishListId } = match.params;

  const { data: wishList, error } = useSWR(
    wishListId,
    wishListService.getWishList
  );

  if (!wishList) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <button onClick={() => history.push("/wishlists")}>
          Go to all wishlists
        </button>
      </div>
    );
  }

  async function handleDelete() {
    try {
      await wishListService.deleteWishList(wishList!);
      history.push("/wishlists");
    } catch (error) {
      handleServerError(error);
    }
  }

  return (
    <>
      <Seo pageTitle={wishList.name} />
      <div>
        <h1>{wishList.name}</h1>
        <p>{wishList.description}</p>
        <button className="block" onClick={handleDelete}>
          Delete this wishlist
        </button>
        {wishList.coverImgUrl && (
          <img
            src={wishList.coverImgUrl}
            alt={`${wishList.name} wishlist cover`}
          />
        )}
        <ProductsList wishList={wishList!} />
      </div>
    </>
  );
};

export default WishListDetailsPage;
