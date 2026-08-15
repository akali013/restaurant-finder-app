import { signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

// Sidebar for admins that provides access to the users and settings pages. It also provides a sign out button.
export default function AdminSidebar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-18.75 bg-mauve-400 flex flex-col items-center justify-between">
      <div className="w-full">
          <Link href="/users">
            <Image
              src="/icons/users.png"
              alt="Go to users page"
              width={100}
              height={100}
              loading="eager"
              className="bg-mauve-300 mt-3"
            />
          </Link>

          <Link href="/adminSettings">
            <Image
              src="/icons/settings.png"
              alt="Go to settings page"
              width={100}
              height={100}
              className="bg-mauve-300 mt-3"
            />
          </Link>
      </div>

      <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}>
        <button className="bg-rose-100 w-15 h-15 p-0">
          <Image
            src="/icons/logout.png"
            alt="Log out"
            width={100}
            height={100}
          />
        </button>
      </form>
    </div>
  );
}