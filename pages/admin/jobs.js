import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import  { useRouter } from  "next/router";
import { isAuthenticated } from "@/utils/auth";
import PhotoUpload from "@/components/forms/PhotoUpload";


//GraphQL query
const GET_JOBS = gql`
  query {
    jobs {
      id
      status
      createdAt
      scheduledDate
      street
      city
      state
      zip
      services {
        id
        name
      }
      employees {
        id
        name
      }
      photos
      feedback {
        rating
        comment
        googleReviewLink
      }
    }
  }
`;

//get all employees
const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
    }
  }
`;

//GraphQL Mutations

//update job status
const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatus($jobId: Int!, $newStatus: String!) {
    updateJobStatus(jobId: $jobId, newStatus: $newStatus) {
      id
      status
    }
  }
`;

//assign employees
const ASSIGN_EMPLOYEES = gql`
  mutation AssignEmployees($jobId: Int!, $employeeIds: [Int]) {
    assignEmployeesToJob(jobId: $jobId, employeeIds: $employeeIds) {
      id
    }  
  }
`;

//submit feedback
const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($jobId: Int!, $rating: Int!, $comment: String) {
    submitFeedback(jobId: $jobId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      googleReviewLink
    }
  }
`;

// //attach photos to Job
// mutation AttachPhotosToJob($jobId: Int!, $photoUrls: [String]) {
//   attachPhotosToJob(jobId: $jobId, photoUrls: $photoUrls) {
//     id
//     photos
//   }
// }

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
    }, [router]);

    //Queries
    const { data, loading, error, refetch } = useQuery(GET_JOBS);
    const { data: empData } = useQuery(GET_EMPLOYEES);

    //local State
    const [selectedEmployees, setSelectedEmployees] = useState({});
    
    //sync backend . local state
    useEffect(()=> {
      if (data?.jobs) {
        const initial = {};

        data.jobs.forEach((job) => {
          initial[job.id] = job.employees?.map((e) => Number(e.id)) || [];
        });

        setSelectedEmployees(initial);
      }
    }, [data]);

    //Mutations
    const [updateStatus] = useMutation(UPDATE_JOB_STATUS, {
      refetchQueries: [{ query: GET_JOBS}],
    });

    const [assignEmployees] = useMutation(ASSIGN_EMPLOYEES, {
      refetchQueries: [{query: GET_JOBS}],
    });

    const [submitFeedback] = useMutation(SUBMIT_FEEDBACK, {
      refetchQueries: [{ query: GET_JOBS }],
    });

    //UI States
    if (loading) return <p className="p-6">Loading jobs...</p>;
    if (!isAuthenticated()) return null;
    if (error) return <p className="p-6 text-red-500">Error loading jobs</p>;

    return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="grid gap-4">
            {data?.jobs?.map((job) => (
                <div key={job.id} className="border p-4 rounded shadow">

                  {/* Status Dropdown */}
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
                    
                  {/* Client Info */}
                    <div className="mt-2">
                        <p><strong>Client:</strong> {job.client?.name}</p>
                        <p>{job.client?.email}</p>
                        <p>{job.client?.phone}</p>
                    </div>

                  {/* Services */}
                    <div className="mt-2">
                        <p className="font-semibold">Services:</p>
                        <ul className="list-disc ml-5">
                             {job.services?.map((service) => (
                                <li key={service.id}>{service.name}</li>
                             ))}
                        </ul>
                    </div>

                  {/* Photos */}
                  <div className="mt-3">
                    <p className="font-semibold">Photos:</p>

                    <div className="flex gap-2 overflow-x-auto mt-2">
                      {job.photos?.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="Job"
                          className="h-24 w-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Upload Photos */}
                  <div className="mt-3">
                      <p className="font-semibold">Upload Before/After Photos:</p>

                      <div className="flex gap-4 mt-2">
                        <PhotoUpload jobId={job.id} type= "before" onUpload={() => refetch()}/>
                        <PhotoUpload jobId={job.id} type= "after" onUpload={() => refetch()}/>

                      </div>
                  </div>

                  {/* Feedback */}
                  {job.status === "completed" && (
                    <div className="mt-4">
                      <p className="font-semibold">Feedback:</p>

                      {/* Rating */}
                      <select
                        defaultValue={job.feedback?.rating || ""}
                        onChange={(e) => 
                          submitFeedback({
                            variables: {
                              jobId: Number(job.id),
                              rating: Number(e.target.value),
                              comment: job.feedback?.comment || "",
                             },
                          })
                        }
                        className="border p-1 rounded mt-1"
                      >
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} Star{r > 1 && "s"}
                          </option>
                        ))}
                      </select>

                      {/* Comment */}
                      <textarea
                      placeholder="Leave a comment..."
                      defaultValue={job.feedback?.comment || ""}
                      onBlur={(e) =>
                        submitFeedback({
                          variables: {
                            jobId: Number(job.id),
                            rating: job.feedback?.rating || 5,
                            comment: e.target.value,
                          },
                        })
                      }
                      className="w-full border p-2 rounded mt-2"
                      />

                      {/* Google Review Link */}
                      {job.feedback?.googleReviewLink && (
                        <a
                          href={job.feedback.googleReviewLink}
                          target="_blank"
                          className="text-blue-600 underline mt-2 block"
                        >
                          Leave a Google Review
                        </a>
                      )}
                    </div>
                  )}

                  {/* Assign Employees */}
                    <div className="mt-3">
                      <p className="font-semibold">Assign Employees:</p>

                      {empData?.employees?.map((emp) => (
                          <label key={emp.id} className="block">
                            <input
                              type="checkbox"
                              checked={
                                selectedEmployees[job.id]?.includes(Number(emp.id)) || false
                              }
                              onChange={() => {
                                const current = selectedEmployees[job.id] || [];

                                let updated;

                                if (current.includes(Number(emp.id))) {
                                  updated = current.filter((id) => id !== Number(emp.id));
                                } else {
                                  updated = [...current, Number(emp.id)];
                                }

                                // Update UI instantly
                                setSelectedEmployees((prev) => ({
                                  ...prev,
                                  [job.id]: updated,
                                }));

                                // sync backend
                                assignEmployees({
                                  variables: {
                                    jobId: Number(job.id),
                                    employeeIds: updated,
                                  },
                                });
                              }}
                            />

                            <span className="ml-2">{emp.name}</span>
                          </label>
                      ))}
                    </div>

                </div>
            ))}
          </div>
        </div>
    );
}