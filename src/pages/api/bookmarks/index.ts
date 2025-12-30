import type { APIRoute } from "astro";

// Helper to parse bookmarks from cookie
const parseBookmarks = (cookieValue: string | undefined): number[] => {
  if (!cookieValue) return [];
  return cookieValue
    .split(",")
    .map((id) => parseInt(id, 10))
    .filter((id) => !isNaN(id));
};

// Helper to serialize bookmarks to cookie value
const serializeBookmarks = (bookmarks: number[]): string => {
  return [...new Set(bookmarks)].join(",");
};

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const contentType = request.headers.get("content-type") || "";
  let action: string | null = null;
  let id: number | null = null;
  let redirectUrl = "/bookmarks";
  let importedBookmarks: number[] | null = null;

  if (contentType.includes("multipart/form-data")) {
    // Handle file import
    const formData = await request.formData();
    action = formData.get("action")?.toString() || null;
    redirectUrl = formData.get("redirect")?.toString() || "/bookmarks";

    if (action === "import") {
      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          if (Array.isArray(data.bookmarks)) {
            importedBookmarks = data.bookmarks
              .map((id: unknown) => (typeof id === "number" ? id : parseInt(String(id), 10)))
              .filter((id: number) => !isNaN(id));
          }
        } catch {
          // Invalid JSON, ignore import
        }
      }
    }
  } else {
    // Handle regular form data
    const formData = await request.formData();
    action = formData.get("action")?.toString() || null;
    const idStr = formData.get("id")?.toString();
    id = idStr ? parseInt(idStr, 10) : null;
    redirectUrl = formData.get("redirect")?.toString() || "/bookmarks";
  }

  // Get current bookmarks
  let bookmarks = parseBookmarks(cookies.get("bookmarks")?.value);

  // Process action
  if (action === "add" && id && !isNaN(id)) {
    if (!bookmarks.includes(id)) {
      bookmarks.unshift(id); // Add to beginning (most recent first)
    }
  } else if (action === "remove" && id && !isNaN(id)) {
    bookmarks = bookmarks.filter((bid) => bid !== id);
  } else if (action === "import" && importedBookmarks) {
    // Merge imported bookmarks (imported first, then existing)
    const existing = new Set(bookmarks);
    const newBookmarks = importedBookmarks.filter((id) => !existing.has(id));
    bookmarks = [...newBookmarks, ...bookmarks];
  } else if (action === "clear") {
    bookmarks = [];
  }

  // Set cookie (1 year expiry)
  cookies.set("bookmarks", serializeBookmarks(bookmarks), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return redirect(redirectUrl, 303);
};
