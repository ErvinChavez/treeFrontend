import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import  { useRouter } from  "next/router";
import { isAuthenticated } from "@/utils/auth";

import AdminLayout from "@/components/layout/AdminLayout";
import JobCard from "@/components/cards/JobCard";
import { GET_JOBS, GET_EMPLOYEES } from "@/lib/graphql/queries/jobs";
import {
  UPDATE_JOB_STATUS,
  ASSIGN_EMPLOYEES,
  SUBMIT_FEEDBACK
} from "@/lib/graphql/mutations/jobs";
import { GET_EMPLOYEES } from "@/lib/graphql/queries/employees";
import { CREATE_EMPLOYEE } from "@/lib/graphql/mutations/employees";

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
    <AdminLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="grid gap-4">
            {data?.jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                updateStatus={updateStatus}
                submitFeedback={submitFeedback}
                assignEmployees={assignEmployees}
                empData={empData}
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
    </AdminLayout>
  );
}