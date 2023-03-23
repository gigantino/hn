export default async function getPosts(data: number[], filter: string | null, page: number) {
  const posts = await Promise.all(
    data.map((id) =>
      fetch(`${import.meta.env.HN_API}/item/${id}.json`).then(async (resp) => await resp.json())
    )
  );

  if (filter == "new") posts.sort((a, b) => b.time - a.time);
  else if (filter == "top") posts.sort((a, b) => b.score - a.score);

  return posts;
}
