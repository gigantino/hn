// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), icon()],
});
