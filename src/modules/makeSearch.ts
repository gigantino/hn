import type { HNItem } from "@/types/hn";

const ITEMS_PER_PAGE = 20;

interface AlgoliaHit {
  objectID: string;
  author: string;
  title: string | null;
  points: number | null;
  num_comments: number | null;
  url: string | null;
  created_at: string;
}

interface AlgoliaResponse {
  hits: AlgoliaHit[];
  nbHits: number;
  nbPages: number;
}

const makeSearch = async (query: string, page: number = 1) => {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&page=${page - 1}&hitsPerPage=${ITEMS_PER_PAGE}`
  );

  const data: AlgoliaResponse = await res.json();

  const hits: HNItem[] = data.hits.map((d) => ({
    id: Number(d.objectID),
    type: "story",
    by: d.author,
    title: d.title ?? undefined,
    score: d.points ?? undefined,
    descendants: d.num_comments ?? undefined,
    url: d.url ?? undefined,
    time: new Date(d.created_at).getTime() / 1000,
  }));

  return {
    hits,
    totalResults: data.nbHits,
    totalPages: data.nbPages,
    currentPage: page,
  };
};

export default makeSearch;
