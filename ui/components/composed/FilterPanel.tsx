import * as React from "react";
import { useRouter, Router } from "next/router";
import { Label, DateInput } from "../design";
import {
  Filter,
  addFiltersToURLParams,
  removeFilterFromURLParam,
} from "../../utils/filters";

type Props = { filters: Record<Filter, string[] | undefined> };

const releaseTypes = [
  {
    type: "stable-release",
    label: "Release",
  },
  {
    type: "patch-release",
    label: "Patch",
  },
  {
    type: "update",
    label: "Update",
  },
  // {
  //   type: "pre-release",
  //   label: "Coming Soon",
  // },
];

const componentTypes = [
  {
    type: "server",
    label: "Server",
  },
  {
    type: "console",
    label: "Console",
  },
  {
    type: "cli",
    label: "CLI",
  },
];

// const tierTypes = [
//   {
//     type: "cloud-free",
//     label: "Free",
//   },
//   {
//     type: "cloud-standard",
//     label: "Standard",
//   },
//   {
//     type: "cloud-enterprise",
//     label: "Enterprise",
//   },
// ];

export const FilterPanel: React.FC<Props> = ({ filters }) => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-2">
        <label className="block text-xs text-gray-400 font-semibold">
          Advanced Filters
        </label>
      </div>

      <div className="mb-2">
        <label className="block mb-1 text-xs">Core Release Type</label>
        <div className="flex items-center font-semibold text-sm space-x-2">
          {releaseTypes.map(({ type, label }) => {
            const isActive = filters["release-type"]?.includes(type);
            return (
              <Label
                id={`release-type-${type}`}
                key={type}
                onClick={() => {
                  let query: Router["query"] = {};
                  if (isActive) {
                    query = removeFilterFromURLParam(
                      router.query,
                      "release-type",
                      type
                    );
                  } else {
                    query = addFiltersToURLParams(
                      router.query,
                      "release-type",
                      type
                    );
                  }
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }}
                kind={isActive ? "active" : "default"}
                text={label}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-2">
        <label className="block mb-1 text-xs">Components</label>
        <div className="flex items-center font-semibold text-sm space-x-2">
          {componentTypes.map(({ type, label }) => {
            const isActive = filters["component"]?.includes(type);
            return (
              <Label
                id={`component-${type}`}
                key={type}
                onClick={() => {
                  let query: Router["query"] = {};
                  if (isActive) {
                    query = removeFilterFromURLParam(
                      router.query,
                      "component",
                      type
                    );
                  } else {
                    query = addFiltersToURLParams(
                      router.query,
                      "component",
                      type
                    );
                  }
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }}
                kind={isActive ? "active" : "default"}
                text={label}
              />
            );
          })}
        </div>
      </div>

      {/*      <div className="mb-2">
        <label className="block mb-1 text-xs">Cloud Tiers</label>
        <div className="cursor-pointer flex items-center font-semibold text-sm space-x-2">
          {tierTypes.map(({ type, label }) => {
            const isActive = filters["tier"]?.includes(type);
            return (
              <Label
                id={`tier-${type}`}
                key={type}
                onClick={() => {
                  let query: Router["query"] = {};
                  if (isActive) {
                    query = removeFilterFromURLParam(
                      router.query,
                      "tier",
                      type
                    );
                  } else {
                    query = addFiltersToURLParams(router.query, "tier", type);
                  }
                  router.push({
                    pathname: router.pathname,
                    query,
                  });
                }}
                kind={isActive ? "active" : "default"}
                text={label}
              />
            );
          })}
        </div>
      </div>
*/}
      <div>
        <label className="block mb-1 text-xs">Date Filter</label>
        <div className="flex items-center space-x-2">
          <DateInput
            id={"date-from"}
            date={parseInt(filters.from?.join() || "")}
            onChange={(d) => {
              if (!d) {
                router.push({
                  pathname: router.pathname,
                  query: removeFilterFromURLParam(router.query, "from"),
                });
              } else {
                router.push({
                  pathname: router.pathname,
                  query: addFiltersToURLParams(
                    router.query,
                    "from",
                    d.getTime().toString(),
                    true
                  ),
                });
              }
            }}
          />
          <div className="w-6 h-0.5 bg-gray-400 rounded"></div>
          <DateInput
            id={"date-to"}
            date={parseInt(filters.to?.join() || "")}
            onChange={(d) => {
              if (!d) {
                router.push({
                  pathname: router.pathname,
                  query: removeFilterFromURLParam(router.query, "to"),
                });
              } else {
                router.push({
                  pathname: router.pathname,
                  query: addFiltersToURLParams(
                    router.query,
                    "to",
                    d.getTime().toString(),
                    true
                  ),
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
