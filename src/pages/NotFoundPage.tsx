import { FC } from "react";

import { Seo } from "../components";

const NotFoundPage: FC = () => {
  return (
    <div>
      <Seo pageTitle="Not Found" />
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
