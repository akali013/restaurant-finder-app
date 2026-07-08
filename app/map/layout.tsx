import Sidebar from "@/app/ui/user/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="ml-18.75">
        {children}
      </div>
    </>
  );
}