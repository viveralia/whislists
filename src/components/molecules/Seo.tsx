import { FC } from "react";
import { Helmet } from "react-helmet";

import { SITE_NAME, SITE_DESCRIPTION } from "../../config/metadata";

export interface SeoProps {
  pageTitle: string;
  pageDescription?: string;
}

const Seo: FC<SeoProps> = ({ pageTitle, pageDescription }) => {
  return (
    <Helmet>
      <title>
        {pageTitle} | {SITE_NAME}
      </title>
      <meta name="description" content={pageDescription || SITE_DESCRIPTION} />
    </Helmet>
  );
};

export default Seo;
