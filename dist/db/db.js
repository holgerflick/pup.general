import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
const sqlite = new Database('./db/polls.db');
export const db = drizzle(sqlite);
//# sourceMappingURL=db.js.map