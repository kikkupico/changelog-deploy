import { ChangelogDBItem } from "./types";

/*

Implements the query DSL. Takes a query string and returns a filter function.

*/
export function queryStrToFilterFn(
  searchStr: string
): (item: ChangelogDBItem) => boolean {
  const urlp = new URLSearchParams(searchStr);

  return function (item: any) {
    for (const [key, val] of (urlp as any).entries()) {
      if (key === "to" || key === "from") {
        const date = Number(val);
        if (key === "to") {
          if (item.created_at > date) {
            return false;
          }
        } else {
          if (item.created_at < date) {
            return false;
          }
        }
      } else {
        if (key.endsWith("*")) {
          const trueKey = key.substring(0, key.length - 1);
          if (trueKey in item && !item[trueKey].includes(val)) return false;
        } else if (key.endsWith("|")) {
          const trueKey = key.substring(0, key.length - 1);
          if (trueKey in item) {
            const filterValues = val.split("|");
            const itemValue = item[trueKey];
            if (Array.isArray(itemValue)) {
              const itemSet = new Set(itemValue);
              const filterSet = new Set(filterValues);
              const combinedSet = new Set([...itemValue, ...filterValues]);
              if (combinedSet.size === itemSet.size + filterSet.size)
                return false;
            } else if (!filterValues.includes(itemValue)) return false;
          }
        } else if (key in item && item[key] !== val) return false;
      }
    }
    return true;
  };
}

export function stringifyQuery(
  query: Record<string, string | string[]>
): string {
  return Object.entries(query)
    .filter(([key, _]) => key !== "limit" && key !== "offset")
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        return val.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${query[key]}`;
    })
    .join("&");
}
