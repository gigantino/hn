const KEEP_PARAMS = ["page", "filter"];

export const getCanonicalUrl = (url: URL) => {
  const canonical = new URL(url.pathname, url.origin);

  for (const param of KEEP_PARAMS) {
    const value = url.searchParams.get(param);
    if (!value) continue;
    if (param === "page" && value === "1") continue;
    canonical.searchParams.set(param, value);
  }

  return canonical.toString();
};
