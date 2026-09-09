import type { MiddlewareHandler } from "astro";
import { BLOCKED_CRAWLERS } from "@modules/crawlers";

const CACHEABLE_PATHS = [/^\/$/, /^\/show$/, /^\/ask$/, /^\/item\/\d+$/];
const PERSONALIZATION_COOKIES = ["theme", "zoom", "bookmarks"];
const BLOCKED_AGENTS = BLOCKED_CRAWLERS.map((agent) => agent.toLowerCase());

const isBlockedAgent = (request: Request) => {
  const agent = request.headers.get("user-agent")?.toLowerCase();
  if (!agent) return false;

  return BLOCKED_AGENTS.some((name) => agent.includes(name));
};

const isCacheable = (request: Request) => {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);
  if (!CACHEABLE_PATHS.some((pattern) => pattern.test(url.pathname))) return false;

  const cookie = request.headers.get("cookie");
  if (!cookie) return true;

  return !PERSONALIZATION_COOKIES.some((name) => cookie.includes(`${name}=`));
};

export const onRequest: MiddlewareHandler = async (context, next) => {
  // RFC 9309: a 4xx on /robots.txt means "no restrictions", so serve it to everyone.
  const isRobots = new URL(context.request.url).pathname === "/robots.txt";

  if (!isRobots && isBlockedAgent(context.request)) {
    return new Response("Not available to this crawler.\n", {
      status: 403,
      headers: { "cache-control": "no-store" },
    });
  }

  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default;
  if (!cache || !isCacheable(context.request)) return next();

  const cacheKey = new Request(context.request.url, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return new Response(cached.body, cached);

  const response = await next();
  if (response.status !== 200 || response.headers.has("set-cookie")) return response;
  if (!(response.headers.get("cache-control") || "").includes("s-maxage")) return response;

  const stored = cache.put(cacheKey, response.clone());
  context.locals.cfContext.waitUntil(stored);

  return response;
};
