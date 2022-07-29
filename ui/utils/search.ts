import * as React from "react";
import { useRouter, Router } from "next/router";

export const getSearchValue = (urlQuery: Router["query"]) => {
  return String(urlQuery.search || "");
};

export const useSearch = (init?: string) => {
  const [search, setSearch] = React.useState(init || "");
  const router = useRouter();
  return {
    search,
    onSearchChange: (s: string) => setSearch(s),
    onSearch: () => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          search: search,
        },
      });
    },
  };
};
