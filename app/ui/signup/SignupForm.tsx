"use client";

import Link from "next/link";
import { createAccount } from "@/app/lib/actions";
import { useActionState } from "react";


export default function SignUpForm() {
  const [errorMessage, formAction] = useActionState(createAccount, undefined);

  return (
    <form className="flex flex-col items-center" action={formAction}>
      <h1 className="text-6xl font-bold mt-[5vh] mb-[7vh]">
        Create an Account
      </h1>
      <input id="email" name="email" className="mb-20 w-2xl" placeholder="Email" />
      <input id="password" name="password" className="mb-20 w-2xl" placeholder="Password" type="password" />
      <input id="retypePassword" name="retypePassword" className="mb-20 w-2xl" placeholder="Confirm Password" type="password" />

      <button className="w-2xs mb-5" type="submit">
        Create Account
      </button>

      <Link href="/">
        <button className="w-2xs mb-5">
          Back to Login
        </button>
      </Link>

      {errorMessage &&
        <p className="text-rose-500 text-sm">{errorMessage}</p>
      }
    </form>
  );
}