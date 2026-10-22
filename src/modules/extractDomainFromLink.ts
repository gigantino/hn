const extractDomainFromLink = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

export default extractDomainFromLink;
