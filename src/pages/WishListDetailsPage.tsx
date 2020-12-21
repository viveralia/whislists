import useSWR from "swr";
import { FC, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";

import * as wishListService from "../services/wishlists";
import { ProductsList, Seo } from "../components";
import { handleServerError } from "../utils";
import { UserContext } from "../context";

interface WishListPageParams {
  wishListId: string;
}

const WishListDetailsPage: FC<RouteComponentProps<WishListPageParams>> = ({
  match,
  history,
}) => {
  const { wishListId } = match.params;
  const user = useContext(UserContext);

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

  async function handleJoin() {
    try {
      await wishListService.joinWishList(user!, wishList!);
      history.go(0);
    } catch (error) {
      handleServerError(error);
    }
  }

  if (!wishList.members.includes(user?.uid!)) {
    return (
      <div>
        <h1>Congrats {user?.displayName}!</h1>
        <p>
          You are invited to join the wishlist "{wishList.name}" created by{" "}
          {wishList.createdBy.name}{" "}
        </p>
        <button onClick={handleJoin}>Join now</button>
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
