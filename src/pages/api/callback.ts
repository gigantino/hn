import type { APIRoute } from "astro";
import cookie from "cookie";

export const POST: APIRoute = async ({ cookies, request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (!username || !password)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?state=1",
      },
    });

  const FormData = new URLSearchParams();
  FormData.append("acct", String(username));
  FormData.append("pw", String(password));
  FormData.append("goto", "news");

  const req = await fetch("https://news.ycombinator.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "HN by gigantino.dev",
    },
    body: FormData.toString(),
    redirect: "manual", // don't follow the redirect to the /news page or you won't be able to catch the set-cookie header!
  });

  const auth = req.headers.getSetCookie()[0];
  if (!auth)
    // if no cookie is returned the login failed
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?state=1",
      },
    });

  // parse the cookie from news.ycombinator.com and set a new cookie to hn
  const token = cookie.parse(auth);
  cookies.set("auth_user", token["user"], {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
    expires: new Date(token["Expires"]),
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/me",
    },
  });
};
