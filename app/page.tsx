import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tasks from "@/components/taskapp/Tasks";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { signIn } from "next-auth/react";
import { redirect } from 'next/navigation';
import SignInButton from '@/components/SignInButton';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Task App</h1>
        <SignInButton />
        <Link href="/loggedin">
          <Button>Login (Skip Google)</Button>
        </Link>
        {/* Other components */}
      </main>
    </div>
  );
}

async function signInAction() {
  'use server'
  
  try {
    // Your Google sign-up logic here
    await signIn("google");

    // After successful sign-up, redirect to the logged-in page
    redirect('/loggedin');
  } catch (error) {
    // Handle any errors
    console.error('Sign-in error:', error);
    // You might want to return an error message or redirect to an error page
  }
}
