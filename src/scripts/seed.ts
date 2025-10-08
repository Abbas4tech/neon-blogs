import { db } from "@/lib/db";
import { posts } from "@/schema/Post";
import { users } from "@/schema/User";
import { eq, count } from "drizzle-orm";
import { samplePosts, sampleUsers } from "./data";

async function clearDatabase() {
  console.log("🗑️ Clearing existing data...");

  // Delete posts first (due to foreign key constraints)
  await db.delete(posts);
  // Then delete users
  await db.delete(users);

  console.log("✅ Database cleared");
}

async function seedUsers() {
  console.log("👥 Seeding users...");

  const insertedUsers = await db.insert(users).values(sampleUsers).returning();

  console.log(`✅ ${insertedUsers.length} users inserted`);
  return insertedUsers;
}

async function seedPosts(userIds: number[]) {
  console.log("📝 Seeding posts...");

  // Distribute posts among users
  const postsWithAuthors = samplePosts.map((post, index) => ({
    ...post,
    authorId: userIds[index % userIds.length], // Round-robin assignment
  }));

  const insertedPosts = await db
    .insert(posts)
    .values(postsWithAuthors)
    .returning();

  console.log(`✅ ${insertedPosts.length} posts inserted`);
  return insertedPosts;
}

async function verifyData() {
  console.log("\n🔍 Verifying seeded data...");

  // Count users
  const userCount = await db.select({ count: count() }).from(users);
  console.log(`📊 Total users: ${userCount[0].count}`);

  // Count posts
  const postCount = await db.select({ count: count() }).from(posts);
  console.log(`📊 Total posts: ${postCount[0].count}`);

  // Count published posts
  const publishedPosts = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.published, true));
  console.log(`📊 Published posts: ${publishedPosts[0].count}`);

  // Get users with their post counts
  const usersWithPostCounts = await db
    .select({
      userId: users.id,
      userName: users.name,
      postCount: count(posts.id),
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .groupBy(users.id, users.name);

  console.log("\n👥 Users with post counts:");
  usersWithPostCounts.forEach((user) => {
    console.log(`   ${user.userName}: ${user.postCount} posts`);
  });
}

async function main() {
  try {
    console.log("🚀 Starting database seeding...\n");

    // Clear existing data
    await clearDatabase();

    // Seed users and get their IDs
    const insertedUsers = await seedUsers();
    const userIds = insertedUsers.map((user) => user.id);

    // Seed posts with author IDs
    await seedPosts(userIds);

    // Verify the data
    await verifyData();

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Sample data overview:");
    console.log("   - 5 users");
    console.log("   - 7 posts (5 published, 2 drafts)");
    console.log("   - Posts distributed among users");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding
main();
