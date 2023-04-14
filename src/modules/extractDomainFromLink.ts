const extractDomainFromLink = (link: string) => {
  try {
    const url = new URL(link);
    const hostnameParts = url.hostname.split(".");
    if (hostnameParts.length >= 3) {
      hostnameParts.shift();
    }
    return hostnameParts.join(".");
  } catch (error) {
    return undefined;
  }
};

export default extractDomainFromLink;
