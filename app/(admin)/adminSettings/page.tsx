import { getCredentials } from "@/app/lib/actions";
import AdminCredentialsForm from "@/app/ui/admin/AdminCredentialsForm";


export default async function AdminSettingsPage() {
  const email = await getCredentials();

  return (
    <div className="p-5">
      <h1 className="font-bold text-[80px] md-max:text-[35px]">Settings</h1>
      <AdminCredentialsForm email={email} />
    </div>
  );
}