import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/admin/login");
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font bold">Admin AdminDashboard</h1>
            <p>Welcome! You are logged in.</p>
        </div>
    );
}