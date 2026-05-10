import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
  const router = useRouter();

  const linkClasses = (path) =>
    `block px-3 py-2 rounded-lg text-sm transition-base ${
      router.pathname === path
        ? "bg-brand-accent text-white font-medium"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="w-full md:w-64 bg-brand-dark text-white md:min-h-screen p-4 flex flex-col">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-title-dark">Chavez Admin</h2>
        <p className="text-caption-dark">Dashboard Panel</p>
      </div>
      
      {/* Nav */}
      <nav className="space-y-1">
        <Link href="/admin" className={linkClasses("/admin")}>
          Dashboard
        </Link>
        <Link href="/admin/jobs" className={linkClasses("/admin/jobs")}>
          Jobs
        </Link>
        <Link href="/admin/employees" className={linkClasses("/admin/employees")}>
          Employees
        </Link>
        <Link href="/admin/services" className={linkClasses("/admin/services")}>
        Services
        </Link>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 text-caption text-white/40">
        © Chavez Tree Service
      </div>
      
    </div>
  );
}