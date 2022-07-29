/*

Caching is implemented by memoizing the function. The cache key is the stringified args.
Closures are used to avoid the need for a global cache.

*/

interface GenericAsyncFunction<Input, Output> {
  (...args: Input[]): Promise<Output>;
}

export function cached<Input, Output>(
  fn: GenericAsyncFunction<Input, Output>
): GenericAsyncFunction<Input, Output> {
  const cache = new Map<string, Output>();
  return async function (...args: Input[]): Promise<Output> {
    const argStr = JSON.stringify(args);
    if (!cache.has(argStr)) {
      const result = await fn(...args);
      cache.set(argStr, result);
      return result;
    } else {
      console.log("cache hit for ", fn.name, "with args", argStr);
      return cache.get(argStr)!; // non-null assertion to make typescript happy
    }
  };
}
