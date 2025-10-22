import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface PostCardSkeletonProps {
  showTags?: boolean;
  showAction?: boolean;
  showFooter?: boolean;
}

const PostCardSkeleton = ({
  showTags = true,
  showAction = true,
  showFooter = true,
}: PostCardSkeletonProps) => {
  return (
    <Card className="hover:shadow-md h-full transition-all">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-3/4 mb-2" />
        </CardTitle>

        {showTags && (
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        )}

        {showAction && (
          <CardAction>
            <Skeleton className="h-5 w-20 rounded-full" />
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>

      {showFooter && (
        <CardFooter className="justify-end gap-2">
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCardSkeleton;
