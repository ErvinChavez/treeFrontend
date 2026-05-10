import { removeToken } from "@/utils/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
  };

  return (
     <div className="bg-white border-b border-brand-wood-secondary/20">

      <div className="w-full px-4 md:px-6 flex justify-between items-center py-3">
      
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img src="/chavezLogo.png" alt="Chavez Tree Logo" className="h-8 w-8" />
            <h1 className="text-subtitle">Chavez Tree Service</h1>
          </Link>
        </div>
     

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
    </div> 
    </div>
  );
}