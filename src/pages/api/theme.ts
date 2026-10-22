import type { APIRoute } from "astro";
import { setPreferenceCookie } from "@modules/cookies";

const THEMES = ["light", "dark", "system"];

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const theme = formData.get("theme")?.toString() || "system";
  const redirectUrl = formData.get("redirect")?.toString() || "/settings";

  setPreferenceCookie(cookies, "theme", THEMES.includes(theme) ? theme : "system");

  return redirect(redirectUrl, 303);
};
