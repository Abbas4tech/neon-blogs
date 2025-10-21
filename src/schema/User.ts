import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { posts } from "./Post";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const insertUserSchema = createInsertSchema(users, {
  email: z.email(),
  name: z.string().min(1),
});

export const selectUserSchema = createSelectSchema(users);

// Type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
