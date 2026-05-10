import SideBar from "./Sidebar";
import NavBar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-light">
      <SideBar />

      <div className="flex-1 flex flex-col min-w-0">
        <NavBar />

        <main className="page-padding app-container">
          {children}
        </main>
      </div>
    </div>
  );
}