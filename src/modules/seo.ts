import getPage from "@modules/getPage";

export const SITE_NAME = "HN";
export const SITE_URL = "https://hn.ggtn.ch";

const FILTER_LABELS: Record<string, string> = {
  top: "Most upvoted",
  new: "Newest",
};

export const getListingTitle = (section: string | undefined, url: URL) => {
  const filter = url.searchParams.get("filter");
  const page = getPage(url);
  const parts = [section, filter ? FILTER_LABELS[filter] : undefined].filter(Boolean);
  const title = parts.length ? parts.join(" · ") : undefined;
  if (page > 1) return `${title ?? "Hacker News"} (page ${page})`;
  return title;
};

export const isIndexable = (url: URL) => {
  const page = getPage(url);
  return !url.searchParams.has("filter") && !(page > 1);
};

export const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["HN reader", "hn.ggtn.ch"],
  url: `${SITE_URL}/`,
});
