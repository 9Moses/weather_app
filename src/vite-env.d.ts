
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEATHER_KEY: string;
    readonly VITE_WEATHER_API: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  