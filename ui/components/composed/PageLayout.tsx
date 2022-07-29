import * as React from "react";
import { Page, Header, Body, Footer, Button } from "../design";
import Image from "next/image";
import HasuraLogo from "../../public/images/hasura.svg";
import HasuraArtwork from "../../public/images/hasura-artwork.png";

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Page>
      <Header>
        <div
          className={`
                        flex items-center
                        flex-col md:flex-row
                        justify-start md:justify-between 
                        w-full
                    `}
        >
          <div className="flex items-center mb-1 lg:mb-0">
            <Image
              src={HasuraLogo}
              className="w-28"
              width={"112px"}
              height={"33px"}
              alt="Hasura Logo"
            />
          </div>
          <Button kind="secondary" size="md" id="hasura-cloud-link">
            Create Your API with Hasura Cloud
          </Button>
        </div>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <div className="w-full flex flex-col">
          <Image
            src={HasuraArtwork}
            className="md:w-8/12 mx-auto mb-4"
            alt="Hasura Artwork"
          />
          <div
            className={`
                        flex items-center
                        flex-col md:flex-row
                        justify-start md:justify-between 
                        w-full
                    `}
          >
            <div className="flex items-center mb-1 lg:mb-0">
              <Image src={HasuraLogo} alt="Hasura Logo" />
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hasura Inc. All rights reserved
            </p>
          </div>
        </div>
      </Footer>
    </Page>
  );
};
