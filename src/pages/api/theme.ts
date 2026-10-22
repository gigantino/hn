import type { APIRoute } from "astro";
import formRedirect from "@modules/formRedirect";
import { setPreferenceCookie } from "@modules/cookies";

const THEMES = ["light", "dark", "system"];

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const theme = formData.get("theme")?.toString() || "system";
  const redirectUrl = formRedirect(formData, "/settings");

  setPreferenceCookie(cookies, "theme", THEMES.includes(theme) ? theme : "system");

  return redirect(redirectUrl, 303);
};
