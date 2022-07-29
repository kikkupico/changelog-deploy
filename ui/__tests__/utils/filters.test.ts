import {
  addFiltersToURLParams,
  getFilters,
  removeFilterFromURLParam,
} from "../../utils/filters";

describe("getFilters", () => {
  it("picks up known filters correctly and ignores unknown filters", () => {
    const params = new URLSearchParams(
      "?foo=bar&component=server,console&release-type=stable-release,patch-release&anotherfoo=anotherbar&to=0&from=1&tier=cloud-free,cloud-standard"
    );
    expect(
      getFilters("cloud", {
        component: "server,console",
        to: ["0"],
        from: ["1"],
        tier: "cloud-free,cloud-standard",
        "release-type": "stable-release,patch-release",
      })
    ).toEqual({
      component: ["server", "console"],
      "release-type": ["stable-release", "patch-release"],
      to: ["0"],
      from: ["1"],
      tier: ["cloud-free", "cloud-standard"],
    });
  });
});

describe("addFiltersToURLParams", () => {
  it("correctly modifies a URL param without modifying an existing state", () => {
    expect(
      addFiltersToURLParams(
        { search: "some-search", component: "server" },
        "component",
        "cli"
      )
    ).toEqual({ search: "some-search", component: "server,cli" });

    expect(
      addFiltersToURLParams(
        { search: "some-search", component: "server" },
        "tier",
        "cloud-free"
      )
    ).toEqual({
      search: "some-search",
      component: "server",
      tier: "cloud-free",
    });

    expect(
      addFiltersToURLParams(
        { search: "some-search", component: "server" },
        "component",
        "server"
      )
    ).toEqual({ search: "some-search", component: "server" });
  });

  it("replaces the URL param state if replace=true", () => {
    expect(
      addFiltersToURLParams(
        { search: "some-search", component: "server" },
        "component",
        "cli",
        true
      )
    ).toEqual({ search: "some-search", component: "cli" });
    expect(
      addFiltersToURLParams({ search: "some-search", to: "0" }, "to", "5", true)
    ).toEqual({ search: "some-search", to: "5" });
  });
});

describe("removeFilterFromURLParams", () => {
  it("correctly modifies a URL param without modifying an existing state", () => {
    expect(
      removeFilterFromURLParam(
        { search: "some-search", component: "server" },
        "component",
        "server"
      )
    ).toEqual({ search: "some-search" });
  });
  it("does nothing if the param does not exist", () => {
    expect(
      removeFilterFromURLParam(
        { search: "some-search", component: "server" },
        "component",
        "cli"
      )
    ).toEqual({ search: "some-search", component: "server" });

    expect(
      removeFilterFromURLParam(
        { search: "some-search", component: "server" },
        "tier",
        "cloud-free"
      )
    ).toEqual({ search: "some-search", component: "server" });
  });
});
