import { getUserById } from "@/app/lib/actions";
import EditUserForm from "@/app/ui/admin/EditUserForm";

export default async function EditUserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const userId = params.id;

  const user = await getUserById(userId);

  return (
    <div className="p-10">
      <h1 className="font-semibold text-[80px]">Edit User</h1>

      <EditUserForm user={user} />
    </div>
  );
}