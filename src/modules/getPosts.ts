const getPosts = async (data: number[], filter: string | null, page: number) => {
  if (filter == "new" || filter == "top") {
    const posts = await Promise.all(
      data.map((id) =>
        fetch(`${import.meta.env.HN_API}/item/${id}.json`).then(async (resp) => await resp.json())
      )
    );
    if (filter == "new") posts.sort((a, b) => b.time - a.time);
    else if (filter == "top") posts.sort((a, b) => b.score - a.score);
    return posts.splice(20 * (page - 1), 20);
  } else {
    const posts = await Promise.all(
      data
        .splice(20 * (page - 1), 20)
        .map((id) =>
          fetch(`${import.meta.env.HN_API}/item/${id}.json`).then(async (resp) => await resp.json())
        )
    );
    return posts;
  }
};

export default getPosts;
