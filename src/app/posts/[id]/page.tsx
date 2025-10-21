import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostById } from "@/queries/user";
import React from "react";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const paths = await getAllPosts();
  return paths.map((p) => ({ id: `${p.id}` }));
};

const PostDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <section className="container mx-auto my-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">{post.title}</h2>
          <section className="flex gap-2 my-2">
            {post.tags?.map((tag) => (
              <Badge className="capitalize" variant={"secondary"} key={tag}>
                {tag}
              </Badge>
            ))}
          </section>
        </div>
        <p>Created at {new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <Separator className="mt-6" />

      <div className="content my-6">{post.content}</div>
    </section>
  );
};

export default PostDetails;
