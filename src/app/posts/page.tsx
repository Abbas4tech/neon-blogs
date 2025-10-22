import React from "react";

import { getAllPosts } from "@/queries/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Podcast } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/post-actions";
import { Switch } from "@/components/ui/switch";
import PostCard from "@/components/PostCard";

const PostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="font-sans items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <div className="flex w-full mb-4 justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              <Podcast /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={createPost}>
              <DialogHeader>
                <DialogTitle>Add Post</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 mt-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input id="name-1" name="name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Content</Label>
                  <Textarea name="content" />
                </div>
              </div>

              <div className="flex items-center gap-2 py-4 rounded-lg">
                <label
                  htmlFor="accept-messages"
                  className="text-base font-medium cursor-pointer"
                >
                  Published:
                </label>
                <Switch name="published" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <main className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </main>
    </div>
  );
};

export default PostsPage;
