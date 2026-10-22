import { SITE_NAME } from "@modules/seo";

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

const purifyHtml = (input: string) =>
  input
    .replace(/<[^>]*(>|$)/g, " ")
    .replace(/&#(x?[0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : parseInt(code)),
    )
    .replace(/&([a-z]+);/gi, (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, " ")
    .trim();

const getMetaTags = (rawTitle?: string, rawDescription?: string) => {
  const title = rawTitle ? `${rawTitle} - ${SITE_NAME}` : `${SITE_NAME}: Hacker News reader`;
  const description = rawDescription
    ? purifyHtml(rawDescription)
    : "Hacker News is a social news website that provides the latest updates on technology and computer science. Stay informed about the latest news and discussions from the tech industry.";
  return { title, description };
};

export default getMetaTags;
