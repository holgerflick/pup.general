import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";

export const PollsTable = sqliteTable('polls', {    
    pollster: text('pollster').notNull(),
    range: text('range').notNull(),
    starts: text('starts').notNull(),
    ends: text('ends').notNull(),
    sample: text('sample').notNull(),
    sampleNumber: integer('sampleNumber'),
    sampleGroup: text('sampleGroup').notNull(),
    registeredOnly: integer('registeredOnly', {mode: "boolean"}).notNull(), 
    likelyOnly: integer('likelyOnly', {mode: "boolean"}).notNull(),
    allPolled: integer('allPolled', {mode: "boolean"}).notNull(),
    margin: text('margin').notNull(),
    trump: text('trump').notNull(),
    biden: text('biden').notNull(),
    leading: text('leading').notNull(),
    leadingBy: integer('leadingBy').notNull(),
}, (table) => {
    return {
        pk: primaryKey({columns: [table.pollster, table.range]}),
    };
});