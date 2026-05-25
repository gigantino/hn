/**
 * Clean up HTML text from HN API:
 * - Wrap unwrapped first lines in <p> tags for consistent styling
 * - Remove trailing empty paragraphs, <br> tags, and whitespace
 * - Restore full URLs that HN truncates with an ellipsis in link text
 * - Rewrite HN links to local links
 * - Convert HN-style quotes (> at start of paragraph) to styled blockquotes
 */
export default function cleanText(text: string | undefined): string {
  if (!text) return "";
  let result = text;

  // Decode HTML entities for slashes (HN encodes / as &#x2F;)
  result = result.replace(/&#x2F;/gi, "/");

  // HN doesn't wrap first line in <p>, so wrap it for consistent styling
  if (!result.startsWith("<p") && result.includes("<p")) {
    const firstPIndex = result.indexOf("<p");
    const firstLine = result.slice(0, firstPIndex);
    const rest = result.slice(firstPIndex);
    result = "<p>" + firstLine + "</p>" + rest;
  } else if (!result.startsWith("<p") && !result.startsWith("<")) {
    result = "<p>" + result + "</p>";
  }

  // Keep removing trailing empty elements until none left
  let prev = "";
  while (prev !== result) {
    prev = result;
    result = result
      .replace(/(<p>(\s|&nbsp;)*<\/p>\s*)+$/gi, "") // Trailing empty <p> tags
      .replace(/(<br\s*\/?>(\s|&nbsp;)*)+$/gi, "") // Trailing <br> tags
      .replace(/(\s|&nbsp;)+$/gi, ""); // Trailing whitespace
  }

  // HN truncates long link text to ~60 chars and appends "..." while keeping
  // the full URL in href. Restore the full URL as the visible link text.
  result = result.replace(
    /(<a\s+href="([^"]*)"[^>]*>)[^<]*(?:\.\.\.|…)<\/a>/gi,
    "$1$2</a>"
  );

  // Convert plain text URLs to clickable links (URLs with protocol).
  // Match whole anchor tags first so URLs already inside a link aren't
  // double-wrapped, then linkify any remaining bare URLs.
  result = result.replace(
    /<a\b[^>]*>.*?<\/a>|(https?:\/\/[^\s<>"]+)/gis,
    (match, bareUrl) => (bareUrl ? `<a href="${bareUrl}">${bareUrl}</a>` : match)
  );

  // Rewrite HN links to local links
  result = result
    .replace(
      /href="https?:\/\/(www\.)?news\.ycombinator\.com\/item\?id=(\d+)"/gi,
      'href="/item/$2"'
    )
    .replace(
      /href="https?:\/\/(www\.)?news\.ycombinator\.com\/user\?id=([^"]+)"/gi,
      'href="/@$2"'
    );

  // Convert HN-style quotes (> at start of paragraph) to styled blockquotes
  return result
    .replace(/<p>&gt;\s*/gi, '<p class="quote">')
    .replace(/<p>>\s*/gi, '<p class="quote">');
}
