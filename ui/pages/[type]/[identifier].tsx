import * as React from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { flatten } from "../../common";
import { ReleaseCircle } from "../../components/design/atoms/ReleaseCircle";
import { ChangelogDBItem } from "../../db/types";
import db from "../../db";

export default function Details({ data }: { data: ChangelogDBItem[] }) {
  const router = useRouter();

  // type: cloud/enterprise-edition/community-edition
  // identifier: v1.0.0/sha1-hash
  const [identifier] = [router.query.identifier];

  const productTitle: Record<string, string> = {
    cloud: "Cloud",
    "enterprise-edition": "EE",
    "community-edition": "CE",
  };

  const kindTitle: Record<string, string> = {
    update: "Update",
    "stable-release": "Stable Release",
    "pre-release": "Pre-Release",
    "patch-release": "Patch Release",
  };

  return (
    <>
      <div className="flex">
        <div className="max-w-screen-lg lg:w-8/12 mx-auto">
          <div className="lg:text-center mb-12">
            <h1 className="text-4xl font-medium">{identifier}</h1>
          </div>

          <div className="flex items-start  mx-auto">
            <div>
              <div className="block lg:flex">
                <div>
                  <div className="w-full">
                    {data.map((item, index) => {
                      const {
                        release_date,
                        markdown,
                        kind,
                        product,
                        short_descriptions,
                        long_descriptions,
                      } = item;

                      const dateString = new Date(release_date)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ");

                      return (
                        <React.Fragment key={index}>
                          <div className="block lg:flex">
                            <div className="w-32 mb-4 lg:mb-0 lg:mr-6">
                              <ReleaseCircle />
                              <p className="font-semibold text-xs mb-1">
                                {dateString}
                              </p>
                              <p className="text-xs">
                                {kind &&
                                  (kindTitle as Record<string, string>)[kind]}
                                <span className="mx-1">•</span>
                                <br />
                                {`Hasura ${
                                  product &&
                                  (productTitle as Record<string, string>)[
                                    flatten(product)
                                  ]
                                }`}
                              </p>
                            </div>
                            {markdown ? (
                              <>
                                <div className="prose">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {markdown || ""}
                                  </ReactMarkdown>
                                </div>
                                <div className="mb-2"></div>
                              </>
                            ) : (
                              <>
                                <div className="w-2/3">
                                  {short_descriptions.map(
                                    (entry: string, i: number) => {
                                      return (
                                        <React.Fragment key={i}>
                                          <div>
                                            <p className="w-2/3 mb-2 font-medium text-lg text-gray-700">
                                              {entry}
                                            </p>
                                            <p className="w-2/3 mb-2 text-base text-gray-700">
                                              {long_descriptions[i]}
                                            </p>
                                          </div>
                                          <div className="mb-2"></div>
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="mb-8"></div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8"></div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [type, identifier] = [params?.type || "", params?.identifier || ""];

  const results = await db.query(`product=${type}&version=${identifier}`);
  return {
    props: {
      data: results || [],
    },
  };
};

export async function getStaticPaths() {
  const items = await db.read();
  return {
    paths: items.map(({ product, version }) => {
      return {
        params: {
          type: product,
          identifier: version,
        },
      };
    }),
    fallback: false,
  };
}
