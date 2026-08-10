import type { MiddlewareHandler } from "astro";

const CACHEABLE_PATHS = [/^\/$/, /^\/show$/, /^\/ask$/, /^\/item\/\d+$/];
const PERSONALIZATION_COOKIES = ["theme", "zoom", "bookmarks"];

const isCacheable = (request: Request) => {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);
  if (!CACHEABLE_PATHS.some((pattern) => pattern.test(url.pathname))) return false;

  const cookie = request.headers.get("cookie");
  if (!cookie) return true;

  return !PERSONALIZATION_COOKIES.some((name) => cookie.includes(`${name}=`));
};

export const onRequest: MiddlewareHandler = async (context, next) => {
  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default;
  if (!cache || !isCacheable(context.request)) return next();

  const cacheKey = new Request(context.request.url, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const response = await next();
  if (response.status !== 200 || response.headers.has("set-cookie")) return response;
  if (!(response.headers.get("cache-control") || "").includes("s-maxage")) return response;

  const stored = cache.put(cacheKey, response.clone());
  context.locals.cfContext.waitUntil(stored);

  return response;
};
