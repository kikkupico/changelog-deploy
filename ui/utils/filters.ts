import React from "react";
import { Offering } from "./offerings";
import { useRouter, Router } from "next/router";

export type Filter = "component" | "release-type" | "to" | "from" | "tier";

const recognisedFilters: Filter[] = [
  "component",
  "release-type",
  "to",
  "from",
  "tier",
];

export const getFilters = (product: Offering, urlQuery: Router["query"]) => {
  const filtersStrMap = {} as Record<Filter, string | undefined>;

  Object.entries(urlQuery).forEach(([param, values]) => {
    if (recognisedFilters.includes(param as Filter)) {
      filtersStrMap[param as Filter] = String(values);
    }
  });

  const filters = {} as Record<Filter, string[] | undefined>;
  Object.entries(filtersStrMap).forEach(([param, value]) => {
    filters[param as Filter] = (value || "").split(",").map((f) => f.trim());
  });

  return filters;
};

export const useFilters = (product: Offering) => {
  const [isActive, setIsActive] = React.useState(false);

  const router = useRouter();

  const urlSearchString = Object.entries(router.query)
    .map(([key, value]) => {
      return `${key}: ${String(value)}`;
    })
    .join("&");
  const filters = getFilters(product, router.query);

  if (Object.keys(filters).length > 0 && !isActive) {
    setIsActive(true);
  }

  return {
    active: isActive,
    toggle: () =>
      setIsActive((a) => {
        if (a) {
          router.push({
            query: removeAllFilters(router.query),
          });
        }
        console.log("returning");
        return !a;
      }),
    state: filters,
  };
};

export const addFiltersToURLParams = (
  urlQuery: Router["query"],
  filter: string,
  value: string,
  replace = false
): Router["query"] => {
  const existingFilterValues = replace
    ? []
    : String(urlQuery[filter] || "")
        .split(",")
        .filter((v) => !!v);
  return {
    ...urlQuery,
    [filter]: [...existingFilterValues.filter((v) => v !== value), value].join(
      ","
    ),
  };
};

export const removeFilterFromURLParam = (
  urlQuery: Router["query"],
  filter: string,
  value?: string
) => {
  const existingFilterValues = String(urlQuery[filter] || "")
    .split(",")
    .filter((v) => !!v);
  const newFilterValue = [
    ...existingFilterValues.filter((v) => v !== value),
  ].join(",");
  const returnQuery = {
    ...urlQuery,
  };
  if (newFilterValue && !!value) {
    returnQuery[filter] = newFilterValue;
  } else {
    delete returnQuery[filter];
  }
  return returnQuery;
};

const removeAllFilters = (urlQuery: Router["query"]): Router["query"] => {
  const query = {
    ...urlQuery,
  };
  recognisedFilters.forEach((f) => {
    delete query[f];
  });
  return query;
};

export const transformUserFacingFiltersToAPIFilters = (
  query: Router["query"]
) => {
  const nameMap: Record<Filter, string> = {
    component: "components",
    to: "to",
    from: "from",
    "release-type": "kind",
    tier: "tier",
  };

  const filters: Router["query"] = {};

  recognisedFilters.forEach((f) => {
    if (query[f]) {
      const mappedFilterName = nameMap[f];
      const vals = String(query[f])
        .split(",")
        .filter((v) => !!v);
      if (vals.length === 0) {
        return;
      } else {
        filters[`${mappedFilterName}|`] = vals.join("|");
      }
    }
  });

  return filters;
};
