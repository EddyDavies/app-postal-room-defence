/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_REGION: string
  readonly VITE_APP_BUCKET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}