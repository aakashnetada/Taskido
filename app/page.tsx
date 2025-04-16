"use client";
import { signInAction } from "@/actions/auth-action";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  return (
    <main className="bg-gradient-to-r from-purple-200 to-orange-200 h-full min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-dark lg:text-6xl mb-10">
        <br /> AUTOMATED TASK GENERATION FOR EFFICIENT WORKFLOW 
       MANAGEMENT
        </h1>
        <form action={signInAction}>
          <GoogleSignInButton />
        </form>
      </div>
    </main>
  );
}

function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span
        className={clsx(
          "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
          pending && "px-16"
        )}
      >
        {pending ? (
          <Loader className="w-5 h-5" />
        ) : (
          "Sign in with Google"
        )}
      </span>
    </button>
  );
}