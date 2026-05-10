import SideBar from "./Sidebar";
import NavBar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-brand-light">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="page-padding w-full">
          {children}
        </main>
      </div>
    </div>
  );
}