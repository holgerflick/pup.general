import { sql } from 'drizzle-orm';
import { db } from '../db/db.js';
import { PollsTable } from '../db/schema.js';
export async function getPollsters() {
    return await db.selectDistinct({ pollster: PollsTable.pollster }).from(PollsTable);
}
export async function groupByPollsters() {
    return await db.select({
        pollster: PollsTable.pollster,
        count: sql `cast(count(${PollsTable.pollster}) as int)`
    })
        .from(PollsTable)
        .groupBy(PollsTable.pollster);
}
//# sourceMappingURL=queries.js.map