import { removeToken } from "@/utils/auth";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">Admin Panel</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}