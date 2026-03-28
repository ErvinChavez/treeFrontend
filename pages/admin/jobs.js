import { useEffect } from "react";
import  { useRouter } from  "next/router";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
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

//Mutation
const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatus($jobId: Int!, $newStatus: String!) {
    updateJobStatus(jobId: $jobId, newStatus: $newStatus) {
      id
      status
    }
  }
`;

//format status strings for display
const formatStatus = (status) =>
  status.replaceAll("_"," ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function Jobs() {
    const router = useRouter();

    //protect route
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/admin/login");
        }
    }, []);

    const { data, loading, error } = useQuery(GET_JOBS);
    const [updateStatus] = useMutation(UPDATE_JOB_STATUS, {
      refetchQueries: [{ query: GET_JOBS}],
    });



    if (!isAuthenticated || loading) return <p className="p-6">Loading jobs...</p>;
    if (error) return <p className="p-6">Error loading jobs</p>;

    return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="grid gap-4">
            {data.jobs.map((job) => (
                <div key={job.id} className="border p-4 rounded shadow">

                    <div className="mt-2">
                      <strong>Status:</strong>

                      <select
                        value={job.status}
                        onChange={(e) => 
                          updateStatus({
                            variables: {
                              jobId: Number(job.id),
                              newStatus: e.target.value,
                            },
                          })
                        }
                        className="ml-2 border p-1 rounded"
                      >
                        <option value="pending_quote">Pending Quote</option>
                        <option value="quote_scheduled">Quote Scheduled</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

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