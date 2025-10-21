import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function Home() {
  return (
    <div className="font-sans items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="grid gap-8 grid-cols-3">
        <Button asChild>
          <Link href={"/posts"}>Posts</Link>
        </Button>
      </main>
    </div>
  );
}
