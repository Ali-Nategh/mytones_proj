import { Secret } from "jsonwebtoken";

// Making .env usable in typescript
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ACCESS_TOKEN_SECRET: Secret;
            REFRESH_TOKEN_SECRET: Secret;
            DATABASE_URL: string;
        }
    }
}
// converting it into a module by adding an empty export statement.
export {}