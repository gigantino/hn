import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const theme = formData.get("theme")?.toString() || "system";
  const redirectUrl = formData.get("redirect")?.toString() || "/settings";

  // Validate theme value
  const validThemes = ["light", "dark", "system"];
  const validatedTheme = validThemes.includes(theme) ? theme : "system";

  // Set cookie using Astro's cookies API (1 year expiry)
  cookies.set("theme", validatedTheme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return redirect(redirectUrl, 303);
};
