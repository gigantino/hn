import type { AstroCookies } from "astro";

export const PERSONALIZATION_COOKIES = ["theme", "zoom", "bookmarks"] as const;

export const setPreferenceCookie = (
  cookies: AstroCookies,
  name: (typeof PERSONALIZATION_COOKIES)[number],
  value: string,
) => cookies.set(name, value, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
