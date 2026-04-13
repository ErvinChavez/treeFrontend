import { removeToken } from "@/utils/auth";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
  };

  return (
     <div className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <img src="/chavezLogo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="font-bold text-lg">Chavez Tree Service</h1>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}