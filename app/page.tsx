// "use client";
// import { signInAction } from "@/actions/auth-action";
// import { Loader } from "lucide-react";
// import clsx from "clsx";
// import { useFormStatus } from "react-dom";

// export default function LoginForm() {
//   return (
//     <main className="bg-gradient-to-r from-purple-200 to-orange-200 h-full min-h-screen flex items-center justify-center px-4">
//       <div className="text-center max-w-2xl">
//         <h1 className="text-4xl font-semibold tracking-tight text-dark lg:text-6xl mb-10">
//         <br /> Adaptive Automation of Workflow from Sequential Descriptions
//         </h1>
//         <form action={signInAction}>
//           <GoogleSignInButton />
//         </form>
//       </div>
//     </main>
//   );
// }

// function GoogleSignInButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       disabled={pending}
//       className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
//     >
//       <span
//         className={clsx(
//           "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
//           pending && "px-16"
//         )}
//       >
//         {pending ? (
//           <Loader className="w-5 h-5" />
//         ) : (
//           "Sign in with Google"
//         )}
//       </span>
//     </button>
//   );
// }

"use client";

import { signInAction } from "@/actions/auth-action";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  return (
    <main className="bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 min-h-screen flex items-center justify-center px-4 py-8 animate-fadeIn">
      <div className="text-center max-w-3xl p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 lg:text-6xl mb-8 leading-tight">
          Adaptive Automation of Workflow
          <br />
          from Sequential Descriptions
        </h1>
        <form action={signInAction} className="mt-10">
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
      className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <span className={clsx("flex items-center gap-3", pending && "px-10")}>
        {pending ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {/* Google logo */}
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Sign in with Google</span>
          </>
        )}
      </span>
    </button>
  );
}
