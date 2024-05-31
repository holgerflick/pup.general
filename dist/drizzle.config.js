import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./drizzle/schema.ts",
    dialect: "sqlite",
    out: "./drizzle/migrations",
    dbCredentials: {
        url: "./db/polls.db",
    },
    verbose: true,
    strict: true,
});
//# sourceMappingURL=drizzle.config.js.map