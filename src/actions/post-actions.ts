"use server";

import { NewPost, posts } from "@/schema/Post";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("name") as string;
    const content = formData.get("content") as string;
    const published = Boolean(formData.get("published"));

    const post: NewPost = {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["New"],
      authorId: 11,
      id: Math.round(Math.random() * 10000),
      published,
    };

    await db.insert(posts).values(post);
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/posts");
  }
}

export async function deletePost(id: number) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/posts");
  }
}
