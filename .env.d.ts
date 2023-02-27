/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VTIE_PROJECT_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
