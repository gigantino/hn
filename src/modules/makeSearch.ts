const ITEMS_PER_PAGE = 20;

const makeSearch = async (query: string, page: number = 1) => {
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&page=${page - 1}&hitsPerPage=${ITEMS_PER_PAGE}`
  );

  const data = await res.json();

  const hits = data.hits.map((d) => {
    return {
      id: d.objectID,
      by: d.author,
      title: d.title,
      score: d.points,
      descendants: d.num_comments,
      url: d.url,
      time: new Date(d.created_at).getTime() / 1000,
    };
  });

  return {
    hits,
    totalResults: data.nbHits,
    totalPages: data.nbPages,
    currentPage: page,
  };
};

export default makeSearch;
