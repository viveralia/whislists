import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { ForgotPasswordPage, LogInPage, SignUpPage } from "../pages";

const PublicRouter: FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/forgot" component={ForgotPasswordPage} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default PublicRouter;
