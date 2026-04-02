import { useState } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
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
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-3">
            <h2 className="text-xl font-bold">Admin Login</h2>

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

            <button type="submit" className="bg-green-600 text-white w-full py-2 rounded">
                {loading ? "Logging in..." : " Login"}
            </button>
          </form>
        </div>
    );
}