import type { AstroCookies } from "astro";
import { setPreferenceCookie } from "@modules/cookies";

export const getBookmarks = (cookies: AstroCookies): number[] => {
  const value = cookies.get("bookmarks")?.value;
  if (!value) return [];
  return value
    .split(",")
    .map((id) => parseInt(id, 10))
    .filter((id) => !isNaN(id));
};

export const getBookmarkedIds = (cookies: AstroCookies) => new Set(getBookmarks(cookies));

export const saveBookmarks = (cookies: AstroCookies, bookmarks: number[]) =>
  setPreferenceCookie(cookies, "bookmarks", [...new Set(bookmarks)].join(","));
