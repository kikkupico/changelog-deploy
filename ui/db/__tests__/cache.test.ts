import { cached } from "../cache";

describe("cache", () => {
  it("should call the function on cache miss", async () => {
    const fn = jest.fn(() => Promise.resolve(7));
    const cachedFn = cached(fn);
    const result = await cachedFn();
    expect(result).toBe(7);
    await cachedFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("should not call the function on cache hit", async () => {
    const fn = jest.fn((num: number) => Promise.resolve(num));
    const cachedFn = cached(fn);
    await cachedFn(7);
    await cachedFn(7);
    await cachedFn(7);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
