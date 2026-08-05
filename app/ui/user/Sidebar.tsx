import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/auth";

// Navigational sidebar for users that offers the map page, saved restaurants page, settings page, and log out button.
export default function Sidebar() {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-18.75 bg-mauve-400 flex flex-col items-center justify-between">
      <div>
        <div>
          <Link href="/map">
            <Image
              src="/icons/map.png"
              alt="Go to map page"
              width={100}
              height={100}
              loading="eager"
              className="bg-mauve-300 mt-3"
            />
          </Link>
        </div>

        <Link href="/saved">
          <Image
            src="/icons/save.png"
            alt="Go to saved restaurants page"
            width={100}
            height={100}
            className="bg-mauve-300 mt-3"
          />
        </Link>

        <Link href="/settings">
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
    </div >
  );
}