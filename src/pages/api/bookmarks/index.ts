import type { APIRoute } from "astro";
import formRedirect from "@modules/formRedirect";
import { getBookmarks, saveBookmarks } from "@modules/bookmarks";

const parseImport = async (file: File | null): Promise<number[] | null> => {
  if (!file || file.size === 0) return null;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.bookmarks)) return null;
    return data.bookmarks
      .map((id: unknown) => (typeof id === "number" ? id : parseInt(String(id), 10)))
      .filter((id: number) => !isNaN(id));
  } catch {
    return null;
  }
};

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const isUpload = (request.headers.get("content-type") || "").includes("multipart/form-data");
  const formData = await request.formData();
  const action = formData.get("action")?.toString() || null;
  const redirectUrl = formRedirect(formData, "/bookmarks");
  const idStr = isUpload ? undefined : formData.get("id")?.toString();
  const id = idStr ? parseInt(idStr, 10) : NaN;

  let bookmarks = getBookmarks(cookies);

  if (action === "add" && id) {
    if (!bookmarks.includes(id)) bookmarks.unshift(id);
  } else if (action === "remove" && id) {
    bookmarks = bookmarks.filter((bid) => bid !== id);
  } else if (action === "import") {
    const imported = isUpload ? await parseImport(formData.get("file") as File | null) : null;
    if (imported) {
      const existing = new Set(bookmarks);
      bookmarks = [...imported.filter((bid) => !existing.has(bid)), ...bookmarks];
    }
  } else if (action === "clear") {
    bookmarks = [];
  }

  saveBookmarks(cookies, bookmarks);

  return redirect(redirectUrl, 303);
};
