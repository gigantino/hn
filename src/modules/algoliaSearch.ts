const algoliaSearch = async (query: string) => {
  const searchReq = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

  if (!searchReq.ok) return null;

  const searchJson = await searchReq.json().catch(() => {
    console.log("Couldn't parse search request.");
  });

  if (!searchJson) return null;

  console.log(searchJson);

  type AlgoliaSearchResponse = {
    hits: {
      objectID: string;
      author: string;
      title?: string;
      points: number;
      num_comments: number;
      url: string;
      created_at: string;
    }[];
  };

  return (searchJson as AlgoliaSearchResponse).hits.map((d) => {
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
};

export default algoliaSearch;
