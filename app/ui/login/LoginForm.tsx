"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/map";
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form className="flex flex-col items-center" action={formAction}>
      <h1 className="text-mauve-500 italic mt-[10vh] text-9xl mb-[3vh]">
        GoodEats
      </h1>
      <input
        id="email"
        name="email"
        className={`mb-20 w-2xl`}
        placeholder="Email"
      />
      <input
        id="password"
        name="password"
        className={`mb-20 w-2xl`}
        placeholder="Password"
        type="password"
      />

      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button className="w-2xs mb-5" aria-disabled={isPending}>
        Log in
      </button>
      <Link href="/signup">
        <button className="w-2xs mb-5">
          Sign Up
        </button>
      </Link>

      {errorMessage && (
        <>
          <p className="text-rose-500 text-lg">{errorMessage}</p>
        </>
      )}
    </form>
  );
}