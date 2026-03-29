import { useEffect, useState } from "react";
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
      employees {
        id
        name
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

    //Queries
    const { data, loading, error } = useQuery(GET_JOBS);
    const { data: empData } = useQuery(GET_EMPLOYEES);

    //local State
    const [selectedEmployees, setSelectedEmployess] = useState({});
    
    //sync backend . local state
    useEffect(()=> {
      
    })

    //Mutations
    const [updateStatus] = useMutation(UPDATE_JOB_STATUS, {
      refetchQueries: [{ query: GET_JOBS}],
    });

    const [assignEmployees] = useMutation(ASSIGN_EMPLOYEES, {
      refetchQueries: [{query: GET_EMPLOYEES}],
    })

    //UI States
    if (!isAuthenticated || loading) return <p className="p-6">Loading jobs...</p>;
    if (error) return <p className="p-6">Error loading jobs</p>;

    return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="grid gap-4">
            {data.jobs.map((job) => (
                <div key={job.id} className="border p-4 rounded shadow">

                  //Status Dropdown
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
                    
                  //Client Info
                    <div className="mt-2">
                        <p><strong>Client:</strong> {job.client?.name}</p>
                        <p>{job.client?.email}</p>
                        <p>{job.client?.phone}</p>
                    </div>

                  //Services
                    <div className="mt-2">
                        <p className="font-semibold">Services:</p>
                        <ul className="list-disc ml-5">
                             {job.services.map((service) => (
                                <li key={service.id}>{service.name}</li>
                             ))}
                        </ul>
                    </div>

                    //Assign Employees
                    <div className="mt-3">
                      <p className="font-semibond">Assign Employees:</p>

                      {empData?.employees.map((emp) => {
                        const isAssigned = job.employees.some(
                          (e) => e.id === emp.id
                        );

                        return (
                          <label key={emp.id} className="block">
                            <input
                              type="checkbox"
                              checked={isAssigned}
                              onChange={() => {
                                let updated;

                                if (isAssigned) {
                                  updated = job.employees
                                    .filter((e) => e.id !== emp.id)
                                    .map((e) => Number(e.id));
                                } else {
                                  updated = [
                                    ...job.employees.map((e) => Number(e.id)),
                                    Number(emp.id),
                                  ];
                                }

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
                        );
                      })}
                    </div>

                </div>
            ))}

          </div>
        </div>
    );
}