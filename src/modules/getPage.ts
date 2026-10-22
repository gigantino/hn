const getPage = (url: URL) => {
  const page = parseInt(url.searchParams.get("page") ?? "", 10);
  return isNaN(page) || page < 1 ? 1 : page;
};

export default getPage;
