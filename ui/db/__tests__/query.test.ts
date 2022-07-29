import { queryStrToFilterFn, stringifyQuery } from "../query";
import { ChangelogDBItem } from "../types";

describe("stringifyQuery", () => {
  it("should strip limit and offset", () => {
    const query = {
      limit: "10",
      offset: "0",
      type: "ce",
      version: "1.0.0",
    };
    expect(stringifyQuery(query)).toBe("type=ce&version=1.0.0");
  });

  it("should handle array values", () => {
    const query = {
      type: ["ce", "ee"],
      version: "1.0.0",
    };
    expect(stringifyQuery(query)).toBe("type=ce&type=ee&version=1.0.0");
  });
});

describe("queryStrToFilterFn", () => {
  const item: ChangelogDBItem = {
    created_at: 12121,
    components: ["server"],
    types: ["bug-fix"],
    short_descriptions: [""],
    long_descriptions: [""],
    version: "1.0.0",
    product: "cloud",
    markdown: "",
  };
  it("should work for basic single param", () => {
    const filterFn = queryStrToFilterFn("product=cloud");
    expect(filterFn(item)).toBe(true);
  });
  it("should work for multiple params", () => {
    const filterFn = queryStrToFilterFn("product=cloud&version=1.0.0");
    expect(filterFn(item)).toBe(true);
  });
  it("is falsy when item doesn't meeting criteria", () => {
    const filterFn = queryStrToFilterFn("product=cloud&version=0.0.0");
    expect(filterFn(item)).toBe(false);
  });
  it("is truthy when param is 'key*=value' and item[key] contains value", () => {
    const filterFn = queryStrToFilterFn("product*=clo");
    expect(filterFn(item)).toBe(true);
  });
  it("is falsy when param is 'key*=value' and item[key] doesn't have value", () => {
    const filterFn = queryStrToFilterFn("product*=ser");
    expect(filterFn(item)).toBe(false);
  });
  it("is truthy when param is 'key|=value1|value2' and item[key] has one of the values ", () => {
    const filterFn = queryStrToFilterFn("product|=cloud|enterprise-edition");
    expect(filterFn(item)).toBe(true);
  });
  it("is falsy when param is 'key|=value1|value2' and item[key] has none of the values ", () => {
    const filterFn = queryStrToFilterFn(
      "product|=enterprise-edition|community-edition"
    );
    expect(filterFn(item)).toBe(false);
  });
  it("should ignore unknown params", () => {
    const filterFn = queryStrToFilterFn("product=cloud&unknown=foo");
    expect(filterFn(item)).toBe(true);
  });
  it("should work for dates:from", () => {
    const filterFn = queryStrToFilterFn("from=12345");
    expect(filterFn(item)).toBe(false);
  });
  it("should work for dates:to", () => {
    const filterFn = queryStrToFilterFn("to=12345");
    expect(filterFn(item)).toBe(true);
  });
  it("| operator should work for array types", () => {
    const filterFn1 = queryStrToFilterFn("types|=bug-fix|enhancement");
    expect(filterFn1(item)).toBe(true);
    const filterFn2 = queryStrToFilterFn("types|=feature");
    expect(filterFn2(item)).toBe(false);
  });
  it("* operator should work for array types", () => {
    const filterFn1 = queryStrToFilterFn("types*=bug-fix");
    expect(filterFn1(item)).toBe(true);
    const filterFn2 = queryStrToFilterFn("types*=feature");
    expect(filterFn2(item)).toBe(false);
  });
});
