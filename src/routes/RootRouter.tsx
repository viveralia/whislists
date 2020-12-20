import { FC, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import * as authService from "../services/auth";
import AuthRouter from "./AuthRouter";
import PublicRouter from "./PublicRouter";
import { TopBar } from "../components";
import { UserContext, User } from "../context";

const RootRouter: FC = () => {
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    const unsuscribe = authService.suscribeToAuthChanges((authUser) => {
      if (authUser) return setUser(authUser);
      return setUser(null);
    });
    return () => unsuscribe();
  }, []);

  if (user === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <TopBar />
        {user === null ? <PublicRouter /> : <AuthRouter />}
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default RootRouter;
