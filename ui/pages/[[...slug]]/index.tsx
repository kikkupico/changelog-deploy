import * as React from "react";
import useSWRInfinite from "swr/infinite";
import { useSearch, getSearchValue } from "../../utils/search";
import { useRouter } from "next/router";
import {
  useFilters,
  transformUserFacingFiltersToAPIFilters,
} from "../../utils/filters";
import { useOffering } from "../../utils/useOfferings";
import { fetcher } from "../../common";
import { ChangelogItem } from "../../components/composed/ChangelogItem";
import { SearchBar } from "../../components/composed/SearchBar";
import { FilterPanel } from "../../components/composed/FilterPanel";
import { FilterButton } from "../../components/composed/FilterButton";
import { OfferingPanel } from "../../components/composed/OfferingsPanel";
import { ChangelogDBItem } from "../../db/types";

export default function Index() {
  const router = useRouter();
  const { search, onSearchChange, onSearch } = useSearch(
    getSearchValue(router.query)
  );
  const filters = useFilters("cloud");

  const { offering, setOffering } = useOffering();

  const getSWRKey = (
    pageIndex: number,
    previousPageData: string | ChangelogDBItem[]
  ): string | null => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/items?offset=${
      pageIndex * 10
    }&product=${offering}&limit=10&${Object.entries(
      transformUserFacingFiltersToAPIFilters(router.query)
    )
      .map(([key, val]) => `${key}=${String(val)}`)
      .join("&")}`; // SWR key
  };

  const { data, size, setSize, error } = useSWRInfinite(getSWRKey, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data || !data[0]) return <div>Loading...</div>;

  let itemList: ChangelogDBItem[] = [];
  data.forEach((d) => {
    itemList = [...itemList, ...d];
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold">The Changelog</h1>
          <h2 className="text-xl text-gray-600">
            Learn more about the latest Hasura releases!
          </h2>
        </div>
        <div className="w-2/3">
          <div id="search" className="mb-8">
            <div className="mb-2">
              <SearchBar
                id="search-changelog"
                onSearchChange={onSearchChange}
                placeholder="Search Changelog..."
                search={search}
                onSearch={onSearch}
              />
            </div>
            <div className="flex items-center mb-2 justify-between">
              <div>
                <OfferingPanel
                  onSelectOffering={(o) => setOffering(o)}
                  selectedOffering={offering}
                />
              </div>
              <FilterButton
                onToggle={() => filters.toggle()}
                filterActive={filters.active}
              />
            </div>
            {filters.active && (
              <div className="mb-2">
                <FilterPanel filters={filters.state} />
              </div>
            )}
          </div>
          <div id="entry-items">
            {itemList.map((e: ChangelogDBItem, i: number) => {
              if (e.kind === "pre-release") {
                return null;
              }

              return (
                <div className="flex w-full" key={i}>
                  <ChangelogItem
                    index={i}
                    kind={e.kind}
                    types={e.types}
                    date={new Date(e.release_date)}
                    metadata={
                      e.markdown
                        ? {
                            kind: "versioned",
                            markdown: e.markdown,
                            version: e.version,
                          }
                        : {
                            kind: "update",
                            version: e.version,
                            shortDescription:
                              e.short_descriptions[0] ||
                              "description of release",
                            longDescription:
                              e.long_descriptions[0] ||
                              "long description of this change",
                          }
                    }
                    isLast={itemList.length === i + 1}
                    product={offering}
                  />
                </div>
              );
            })}
            <div className="flex justify-center">
              <button
                onClick={() => setSize(size + 1)}
                className="flex items-center h-12 sm:h-9 px-4 border border-brandBlue-400 rounded text-brandBlue-400 hover:bg-brandBlue-100 focus:outline-none"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
