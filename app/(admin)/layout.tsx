import AdminSidebar from "../ui/admin/AdminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <main className="ml-18.75">
        {children}
      </main>
    </>
  );
}