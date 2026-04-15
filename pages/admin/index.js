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
        <div className="p-6">
            <h1 className="text-3xl font bold">Dashboard</h1>
            
            {/* Top Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Total Jobs</p>
                    <p className="text-2xl font-bold">{data?.totalJobs || 0}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Total Clients</p>
                    <p className="text-2xl font-bold">{data?.totalClients || 0}</p>
                </div>
               
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Avg Rating</p>
                    <p className="text-2xl font-bold">{data?.averageRating ? data.averageRating.toFixed(1) : "0.0"}</p>
                </div>
               
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Active Jobs</p>
                    <p className="text-2xl font-bold">
                        {activeJobs}
                    </p>
                </div>
            </div>

            {/* Jobs by Status */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Jobs by Status</h2>

                <div className="space-y-2">
                    {(data?.jobsByStatus || []).map((item) => (
                        <div key={item.status} className="flex justify-between border p-2 rounded">
                            <span className="capitalize">
                                {item.status.replaceAll("_", " ")}
                            </span>
                            <span className="font-bold">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    </AdminLayout>
    );
}