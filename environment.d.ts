// Making .env usable in typescript
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ACCESS_TOKEN_SECRET: string | undefined;
            REFRESH_TOKEN_SECRET: string | undefined;
            DATABASE_URL: string;
        }
    }
}
// converting it into a module by adding an empty export statement.
export {}