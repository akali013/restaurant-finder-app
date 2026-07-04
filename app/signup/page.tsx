import Link from "next/link";

export default function SignUpPage() {
  return (
    <form className="flex flex-col items-center">
      <h1 className="text-6xl font-bold mt-[5vh] mb-[7vh]">
        Create an Account
      </h1>
      <input className="mb-20 w-2xl" placeholder="Email" />
      <input className="mb-20 w-2xl" placeholder="Password" type="password" />
      <input className="mb-20 w-2xl" placeholder="Confirm Password" type="password" />

      <Link href="/">
        <button className="w-2xs mb-5">
          Create Account
        </button>
      </Link>

      <Link href="/">
        <button className="w-2xs mb-5">
          Back to Login
        </button>
      </Link>
    </form>
  );
}