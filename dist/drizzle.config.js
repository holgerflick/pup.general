import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./db/schema.ts",
    dialect: "sqlite",
    out: "./db/migrations",
    dbCredentials: {
        url: "./db/polls.db",
    },
    verbose: true,
    strict: true,
});
//# sourceMappingURL=drizzle.config.js.map