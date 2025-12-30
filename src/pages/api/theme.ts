import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const theme = formData.get("theme")?.toString() || "system";
  const redirectUrl = formData.get("redirect")?.toString() || "/settings";

  // Validate theme value
  const validThemes = ["light", "dark", "system"];
  const validatedTheme = validThemes.includes(theme) ? theme : "system";

  // Create response with redirect
  const response = redirect(redirectUrl, 303);

  // Set cookie (1 year expiry)
  const maxAge = 60 * 60 * 24 * 365;
  response.headers.set(
    "Set-Cookie",
    `theme=${validatedTheme}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  );

  return response;
};
