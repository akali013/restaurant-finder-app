import { getUsers } from "@/app/lib/actions";
import UsersTable from "@/app/ui/admin/UsersTable";
import { Metadata } from "next";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-10">
      <h1 className="font-semibold text-[80px]">Users</h1>

      <UsersTable users={users} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Users"
};