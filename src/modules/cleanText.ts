/**
 * Clean up HTML text from HN API:
 * - Wrap unwrapped first lines in <p> tags for consistent styling
 * - Remove trailing empty paragraphs, <br> tags, and whitespace
 * - Rewrite HN links to local links
 * - Convert HN-style quotes (> at start of paragraph) to styled blockquotes
 */
export default function cleanText(text: string | undefined): string {
  if (!text) return "";
  let result = text;

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
