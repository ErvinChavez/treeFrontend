import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard";

export default function AdminDashboard() {
    const router = useRouter();

    // protect route
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        const valid = isAuthenticated();

        if (!valid) {
            router.push("/admin/login");
        } else {
        setCheckedAuth(true);
        }
    }, []);

    const { data, loading, error } = useQuery(GET_DASHBOARD, {
        skip: !checkedAuth,
    });


    if (!checkedAuth) return null;
    if (loading) return <p className="p-6">Loading dashboard...</p>
    if (error) return <p className="p-6 text-red-500">Error loading dashboard</p>

    const activeJobs =
    data?.jobsByStatus?.find((s) => s.status === "in_progress")?.count || 0;

    return (
        <AdminLayout>
        <div>
            <h1 className="page-title">Dashboard</h1>
            
            {/* Top Metrics */}
            <div className="grid gap-4 md:grid-cols-4">

                <div className="card">
                    <p className="text-muted">Total Jobs</p>
                    <p className="text-2xl font-bold">{data?.totalJobs || 0}</p>
                </div>

                <div className="card">
                    <p className="text-muted">Total Clients</p>
                    <p className="text-2xl font-bold">{data?.totalClients || 0}</p>
                </div>
               
                <div className="card">
                    <p className="text-muted">Avg Rating</p>
                    <p className="text-2xl font-bold">{data?.averageRating ? data.averageRating.toFixed(1) : "0.0"}</p>
                </div>
               
                <div className="card">
                    <p className="text-muted">Active Jobs</p>
                    <p className="text-2xl font-bold">
                        {activeJobs}
                    </p>
                </div>
            </div>

            {/* Jobs by Status */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-brand-dark mb-3">Jobs by Status</h2>

                <div className="space-y-2">
                    {(data?.jobsByStatus || []).map((item) => (
                        <div key={item.status} className="card flex justify-between items-center">
                            <span className="capitalize text-gray-700">
                                {item.status.replaceAll("_", " ")}
                            </span>
                            <span className="font-semibold text-brand-dark">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    </AdminLayout>
    );
}