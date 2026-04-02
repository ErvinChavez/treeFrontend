import Link from "next/link";

export default function SideBar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Chavez Admin</h2>

      <nav className="space-y-2">
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/admin/jobs" className="block hover:bg-gray-700 p-2 rounded">
          Jobs
        </Link>
        <Link href="/admin/employees" className="block hover:bg-gray-700 p-2 rounded">
          Employees
        </Link>
      </nav>
    </div>
  );
}