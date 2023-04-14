const purifyHtml = (input: string): string => {
  const regex = /(<([^>]+)>)/gi;
  const output = input.replace(regex, "");
  return output;
};

const getMetaTags = (rawTitle: string, rawDescription?: string) => {
  const title = `${rawTitle} - HN`;
  const description = rawDescription
    ? purifyHtml(rawDescription)
    : "Stay informed about the latest news and discussions from the tech industry.";
  return { title, description };
};

export default getMetaTags;
