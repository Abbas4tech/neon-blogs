import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/queries/user";
import Link from "next/link";

const PostsPage = async () => {
  const posts = await getAllPosts();
  return (
    <div className="font-sans items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="grid gap-8 grid-cols-3">
        {posts.map((post, i) => (
          <Link key={i} href={`/posts/${post.id}`}>
            <Card className="hover:shadow-md hover:scale-105 cursor-pointer h-full transition-all">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <div className="flex gap-2">
                  {post.tags?.map((tag, i) => (
                    <Badge variant={"secondary"} key={i}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <CardAction>
                  {post.published && (
                    <Badge variant={"default"}>Published</Badge>
                  )}
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.content}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default PostsPage;
