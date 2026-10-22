import type { HNItem } from "@/types/hn";

const STORY_MAX_AGE = 60;
const COMMENT_MAX_AGE = 300;

interface Options {
  signal?: AbortSignal;
  ctx?: { waitUntil(promise: Promise<unknown>): void };
}

const getItem = async (id: number, { signal, ctx }: Options = {}): Promise<HNItem | null> => {
  const url = `${import.meta.env.HN_API}/item/${id}.json`;
  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default;

  const cached = await cache?.match(url);
  if (cached) return cached.json();

  const response = await fetch(url, { signal });
  const item: HNItem | null = await response.json();
  if (!item || !cache) return item;

  const maxAge = item.type === "comment" ? COMMENT_MAX_AGE : STORY_MAX_AGE;
  const stored = cache.put(
    url,
    new Response(JSON.stringify(item), { headers: { "cache-control": `max-age=${maxAge}` } }),
  );

  if (ctx) ctx.waitUntil(stored);
  else await stored;

  return item;
};

export default getItem;
