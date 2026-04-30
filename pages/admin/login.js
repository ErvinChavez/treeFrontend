import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client/react";
import { setToken } from "@/utils/auth";
import { LOGIN_ADMIN } from "@/lib/graphql/mutations/auth";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();

    const [loginAdmin, { loading }] = useMutation(LOGIN_ADMIN, {
        onCompleted: (data) => {
            setToken(data.loginAdmin); //save JWT
            router.push("/admin"); //redirect
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginAdmin({ variables: form });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light">
          <form onSubmit={handleSubmit} className="card w-80 stack-sm">

            {/* Logo */}
            <div className="flex justify-center">
              <img src="/chavezLogo.png" className="h-12" />
            </div>

            <h2 className="text-title text-center">
              Admin Login
            </h2>

            <input 
              type="email"
              placeholder="Email"
              className="input"
              onChange={(e) => setForm({...form, email: e.target.value })}
            />

            <input 
              type="password"
              placeholder="Password"
              className="input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="btn btn-primary w-full">
                {loading ? "Logging in..." : " Login"}
            </button>
          </form>
        </div>
    );
}