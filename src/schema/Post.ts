import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { users } from "./User";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  published: boolean("published").default(false),
  authorId: integer("author_id").references(() => users.id),
  tags: jsonb("tags").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const insertPostSchema = createInsertSchema(posts, {
  title: z.string().min(1),
  content: z.string().optional(),
});

export const selectPostSchema = createSelectSchema(posts);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
