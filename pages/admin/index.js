import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";


//GraphQL query
const GET_DASHBOARD = gql`
    query {
        totalJobs
        totalClients
        averageRating
        jobsByStatus {
        status
        count
        }
    }
`;

export default function AdminDashboard() {
    const router = useRouter();

    // protect route
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/admin/login");
        }
    }, [router]);

    const { data, loading, error } = useQuery(GET_DASHBOARD);

    if (loading) return <p className="p-6">Loading dashboard...</p>
    if (!isAuthenticated()) return null;
    if (error) return <p className="p-6 text-red-500">Error loading dashboard</p>

    return (
        <div className="p-6">
            <h1 className="text-3xl font bold">Dashboard</h1>
            
            {/* Top Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Total Jobs</p>
                    <p className="text-2xl font-bold">{data.totalJobs}</p>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Total Clients</p>
                    <p className="text-2xl font-bold">{data.totalClients}</p>
                </div>
               
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Avg Rating</p>
                    <p className="text-2xl font-bold">{data.averageRating.toFixed(1)}</p>
                </div>
               
                <div className="p-4 bg-white shadow rounded">
                    <p className="text-gray-500">Active Jobs</p>
                    <p className="text-2xl font-bold">
                        {data.jobsByStatus.find(s => s.status === "in_progress")?.count}
                    </p>
                </div>
            </div>

            {/* Jobs by Status */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Jobs by Status</h2>

                <div className="space-y-2">
                    {data.jobsByStatus.map((item) => (
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
    );
}