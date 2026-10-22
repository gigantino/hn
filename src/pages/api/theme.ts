import type { APIRoute } from "astro";
import formRedirect from "@modules/formRedirect";
import { setPreferenceCookie } from "@modules/cookies";
import validateTheme from "@modules/theme";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const redirectUrl = formRedirect(formData, "/settings");

  setPreferenceCookie(cookies, "theme", validateTheme(formData.get("theme")?.toString()));

  return redirect(redirectUrl, 303);
};
