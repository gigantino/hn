/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly HN_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
