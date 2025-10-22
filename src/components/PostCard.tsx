"use client";
import React, { useTransition } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { NewPost } from "@/schema/Post";
import { Badge } from "./ui/badge";
import Link from "next/link";
import PostCardSkeleton from "./PostCardSkeleton";
import { deletePost } from "@/actions/post-actions";
import { toast } from "sonner";

interface PostCardProps {
  post: Required<NewPost>;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isPending, startTransition] = useTransition();

  const deleteSinglePost = async (id: number) => {
    startTransition(async () => {
      //   await new Promise((res) => setTimeout(() => res(deletePost(id)), 2000));
      await deletePost(id);
      toast.success("Deleted Successfully");
    });
  };

  if (isPending) {
    return (
      <PostCardSkeleton showAction={!!post.published} showTags={!!post.tags} />
    );
  }

  return (
    <Card className="hover:shadow-md h-full transition-all">
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
          {post.published && <Badge variant={"default"}>Published</Badge>}
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.content}</CardDescription>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant={"outline"} asChild>
          <Link href={`/posts/${post.id}`}>View</Link>
        </Button>
        <form action={deleteSinglePost.bind(null, post.id)}>
          <Button variant={"destructive"}>Delete</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
