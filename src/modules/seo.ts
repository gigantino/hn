import getPage from "@modules/getPage";

export const SITE_NAME = "HN";
export const SITE_URL = "https://hn.ggtn.ch";

const FILTER_LABELS = new Map([
  ["top", "Most upvoted"],
  ["new", "Newest"],
]);

export const getListingTitle = (section: string | undefined, url: URL) => {
  const page = getPage(url);
  const title = section ?? FILTER_LABELS.get(url.searchParams.get("filter") ?? "");
  if (page > 1) return `${title ?? "Hacker News"} (page ${page})`;
  return title;
};

export const isIndexable = (url: URL) => {
  const page = getPage(url);
  return !url.searchParams.has("filter") && page === 1;
};

export const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["HN reader", "hn.ggtn.ch"],
  url: `${SITE_URL}/`,
});
