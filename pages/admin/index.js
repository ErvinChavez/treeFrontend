import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard";

export default function AdminDashboard() {
    const router = useRouter();

    // protect route
    const [auth, setAuth] = useState(null);

    useEffect(() => {
         setAuth(isAuthenticated());
    }, []);

    useEffect(() => {
        if (auth === false) {
            router.replace("/admin/login");
        }
    }, [auth, router]);

    const { data, loading, error } = useQuery(GET_DASHBOARD, {
        skip: !auth,
        fetchPolicy: "cache-first",
    });


    if (auth !== true) return null;
    if (loading) return <p className="p-6">Loading dashboard...</p>
    if (error) return <p className="p-6 text-red-500">Error loading dashboard</p>

    const activeJobs =
    data?.jobsByStatus?.find((s) => s.status === "in_progress")?.count || 0;

    return (
        <AdminLayout>
        <div className="stack">
            <h1 className="page-title">Dashboard</h1>
            
            {/* Top Metrics */}
            <div className="grid gap-4 md:grid-cols-4">

                <div className="card">
                    <p className="text-muted">Total Jobs</p>
                    <p className="text-title">{data?.totalJobs || 0}</p>
                </div>

                <div className="card">
                    <p className="text-muted">Total Clients</p>
                    <p className="text-title">{data?.totalClients || 0}</p>
                </div>
               
                <div className="card">
                    <p className="text-muted">Avg Rating</p>
                    <p className="text-title">{data?.averageRating ? data.averageRating.toFixed(1) : "0.0"}</p>
                </div>
               
                <div className="card">
                    <p className="text-muted">Active Jobs</p>
                    <p className="text-title">
                        {activeJobs}
                    </p>
                </div>
            </div>

            {/* Jobs by Status */}
            <div className="section">
                <h2 className="section-title">Jobs by Status</h2>

                <div className="section-body">
                    {(data?.jobsByStatus || []).map((item) => (
                        <div key={item.status} className="card flex justify-between items-center">
                            <span className="text-body capitalize">
                                {item.status.replaceAll("_", " ")}
                            </span>
                            <span className="text-subtitle">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    </AdminLayout>
    );
}