const purifyHtml = (input: string) => {
  // Regular expression to match either an HTML tag or entity
  const regex = /<[^>]*(>|$)|&#(x?[0-9a-fA-F]{2,4});/gi;

  // Use the replace() function with a callback to handle the matches
  const output = input.replace(regex, (match, tag, entity) => {
    // If the match is an entity, convert it to the corresponding character
    if (entity) {
      // Extract the code from the entity string
      const code = entity.startsWith("x") ? parseInt(entity.substring(1), 16) : parseInt(entity);
      // Convert the code to a character and return it
      return String.fromCharCode(code);
    }
    // If the match is a tag, remove it by returning an empty string
    return "";
  });

  // Return the purified HTML string
  return output;
};

const getMetaTags = (rawTitle: string, rawDescription?: string) => {
  const title = `${rawTitle} - HN`;
  const description = rawDescription
    ? purifyHtml(rawDescription)
    : "Hacker News is a social news website that provides the latest updates on technology and computer science. Stay informed about the latest news and discussions from the tech industry.";
  return { title, description };
};

export default getMetaTags;
