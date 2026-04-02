import SideBar from "./Sidebar";
import NavBar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1">
        <NavBar />

        <main className="p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}