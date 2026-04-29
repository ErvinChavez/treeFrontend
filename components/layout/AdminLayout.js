import SideBar from "./Sidebar";
import NavBar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="page">
          {children}
        </main>
      </div>
    </div>
  );
}