import { FC } from "react";
import { Link } from "react-router-dom";

import { WishList } from "../../services/wishlists";

export interface WishListCardProps {
  wishList: WishList;
}

const WishListCard: FC<WishListCardProps> = ({ wishList }) => {
  return (
    <article>
      <h3>
        <Link to={`/wishlists/${wishList.id}`}>{wishList.name}</Link>
      </h3>
      <p>{wishList.description}</p>
    </article>
  );
};

export default WishListCard;
