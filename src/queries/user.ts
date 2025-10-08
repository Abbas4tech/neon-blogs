import { db } from "@/lib/db";
import { NewPost, posts } from "@/schema/Post";
import { NewUser, users, User } from "@/schema/User";
import { eq, desc } from "drizzle-orm";

// CREATE
export async function createUser(userData: NewUser) {
  const [user] = await db.insert(users).values(userData).returning();

  return user;
}

export async function createPost(postData: NewPost) {
  const [post] = await db.insert(posts).values(postData).returning();

  return post;
}

// READ
export async function getUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
}

export async function getUsersWithPagination(
  limit: number = 10,
  offset: number = 0
) {
  return await db
    .select()
    .from(users)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(users.createdAt));
}

// UPDATE
export async function updateUser(id: number, userData: Partial<User>) {
  const [user] = await db
    .update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

  return user;
}

// DELETE
export async function deleteUser(id: number) {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();

  return user;
}
