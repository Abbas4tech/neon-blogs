import { db } from "@/lib/db";
import { posts } from "@/schema/Post";
import { users } from "@/schema/User";
import { eq, desc, like, count, sql } from "drizzle-orm";

async function runTestQueries() {
  console.log("🧪 Running test queries...\n");

  // 1. Get all users
  console.log("1. 👥 All Users:");
  const allUsers = await db.select().from(users).orderBy(users.id);
  console.log(allUsers);

  // 2. Get all published posts with authors
  console.log("\n2. 📝 Published Posts with Authors:");
  const publishedPosts = await db
    .select({
      postId: posts.id,
      title: posts.title,
      published: posts.published,
      authorName: users.name,
      tags: posts.tags,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .where(eq(posts.published, true))
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
  console.log(publishedPosts);

  // 3. Search posts by keyword
  console.log('\n3. 🔍 Posts containing "Next.js":');
  const nextjsPosts = await db
    .select()
    .from(posts)
    .where(like(posts.title, "%Next.js%"));
  console.log(nextjsPosts);

  // 4. Get user statistics - FIXED: Remove filterWhere and use conditional counting
  console.log("\n4. 📊 User Statistics:");
  const userStats = await db
    .select({
      userId: users.id,
      userName: users.name,
      totalPosts: count(posts.id),
      // Use SQL expressions for conditional counting
      publishedPosts: sql<number>`sum(case when ${posts.published} = true then 1 else 0 end)`,
      draftPosts: sql<number>`sum(case when ${posts.published} = false then 1 else 0 end)`,
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .groupBy(users.id, users.name);
  console.log(userStats);

  // 5. Get posts with specific tags
  console.log('\n5. 🏷️ Posts with "tutorial" tag:');
  const tutorialPosts = await db
    .select()
    .from(posts)
    .where(sql`${posts.tags} ? 'tutorial'`);
  console.log(tutorialPosts);

  // 6. Update a post
  console.log("\n6. ✏️ Updating a post...");
  const [updatedPost] = await db
    .update(posts)
    .set({
      title: "Updated: Getting Started with Next.js",
      updatedAt: new Date(),
    })
    .where(eq(posts.title, "Getting Started with Next.js"))
    .returning();
  console.log("Updated post:", updatedPost);

  // 7. Complex query: Get users who have published posts
  console.log("\n7. 🎯 Users with published posts:");
  const activeUsers = await db
    .selectDistinct({
      userId: users.id,
      userName: users.name,
      email: users.email,
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .where(eq(posts.published, true));
  console.log(activeUsers);
}

runTestQueries().catch(console.error);
