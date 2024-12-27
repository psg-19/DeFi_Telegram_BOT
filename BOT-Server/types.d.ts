// types.d.ts
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ALGORITHM: string;
        ENCRYPTION_KEY: string;
        ENCRYPTION_IV: string;
      }
    }
  }
  
  export {}; // This line is necessary to treat this file as a module
  