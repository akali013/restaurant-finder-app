"use client";

import { User } from "@/app/lib/data";
import Link from "next/link";

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <table className="table-fixed w-full bg-mauve-200 lg:text-2xl">
      <thead>
        <tr className="border-b-2 border-b-sky-700 pt-5">
          <th className="max-md:w-[45%]">User ID</th>
          <th>Email</th>
          <th>Edit?</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.userid} className="border-b-2 border-b-sky-700">
            <td><div className="flex justify-center">{user.userid}</div></td>
            <td><div className="flex justify-center">{user.email}</div></td>
            <td>
              <div className="flex justify-center">
                <Link
                  href={`/users/${user.userid}/edit`}
                  className="bg-sky-200 p-5 m-2"
                >
                  Edit
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
}

