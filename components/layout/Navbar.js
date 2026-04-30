import { removeToken } from "@/utils/auth";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
  };

  return (
     <div className="bg-white border-b border-brand-wood-secondary/20">

      <div className="app-container flex justify-between items-center py-3">
      
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/chavezLogo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-subtitle">Chavez Tree Service</h1>
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