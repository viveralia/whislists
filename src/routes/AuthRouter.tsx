import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { WishListsPage, WishListDetailsPage, NotFoundPage } from "../pages";

const AuthRouter: FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/wishlists" />
      <Route path="/wishlists/:wishListId" component={WishListDetailsPage} />
      <Route path="/wishlists" component={WishListsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AuthRouter;
