import { useEffect } from "react";
import  { useRouter } from  "next/router";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { isAuthenticated } from "@/utils/auth";

//GraphQL query
const GET_JOBS = gql`
  query {
    jobs {
      id
      status
      createdAt

      client {
        name
        email
        phone
      }

      services {
        id
        name
      }
    }
  }
`;

export default function Jobs() {
    const router = useRouter();

    //protect route
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/admin/login");
        }
    }, []);

    const { data, loading, error } = useQuery(GET_JOBS, {
      skip: !isAuthenticated,
    });

    if (!isAuthenticated || loading) return <p className="p-6">Loading jobs...</p>;
    if (error) return <p className="p-6">Error loading jobs</p>;

    return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="grid gap-4">
            {data.jobs.map((job) => (
                <div key={job.id} className="border p-4 rounded shadow">

                    <p className="font-semibold">Status: {job.status}</p>

                    <div className="mt-2">
                        <p><strong>Client:</strong> {job.client.name}</p>
                        <p>{job.client.email}</p>
                        <p>{job.client.phone}</p>
                    </div>

                    <div className="mt-2">
                        <p className="font-semibold">Services:</p>
                        <ul className="list-disc ml-5">
                             {job.services.map((service) => (
                                <li key={service.id}>{service.name}</li>
                             ))}
                        </ul>
                    </div>
                </div>
            ))}

          </div>
        </div>
    );
}