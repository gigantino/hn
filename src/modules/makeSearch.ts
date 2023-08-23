const makeSearch = async (query: string) => {
  const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

  return (await res.json()).hits.map((d) => {
    return {
      id: d.objectID,
      by: d.author,
      title: d.title,
      score: d.points,
      descendants: d.num_comments,
      url: d.url,
      time: new Date(d.created_at).getTime() / 1000,
    }
  });
};

export default makeSearch;
