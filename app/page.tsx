import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tasks from "@/components/taskapp/Tasks";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { signIn } from "next-auth/react";
import { signInAction } from "@/actions/auth-action";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Login</h1>
        <form action={signInAction}>
          <Button>Log in</Button>
        </form>
      </main>
      
    </div>
  );
}
