import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import  { useRouter } from  "next/router";
import { isAuthenticated } from "@/utils/auth";

import AdminLayout from "@/components/layout/AdminLayout";
import JobCard from "@/components/cards/JobCard";

import { GET_JOBS} from "@/lib/graphql/queries/jobs";
import { GET_EMPLOYEES } from "@/lib/graphql/queries/employees";
import { SEND_REVIEW_REQUEST } from "@/lib/graphql/mutations/reviews";
import {
  UPDATE_JOB_STATUS,
  ASSIGN_EMPLOYEES,
  SUBMIT_FEEDBACK,
} from "@/lib/graphql/mutations/jobs";

export default function Jobs() {
  const router = useRouter();
  
  //protect route
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const valid = isAuthenticated();

    if (!valid) {
      router.push("/admin/login");
    } else {
    setCheckedAuth(true);
    }
  }, []);

  const { data, loading, error, refetch } = useQuery(GET_JOBS, {
    skip: !checkedAuth,
  });
    

  const { data: empData } = useQuery(GET_EMPLOYEES, {
    skip: !checkedAuth,
  });

  //local State
  const [selectedEmployees, setSelectedEmployees] = useState({});

  const [sendReviewRequest] = useMutation(SEND_REVIEW_REQUEST, {
    onCompleted: (data) => {
      if (data.sendReviewRequest) {
        console.log("Review request sent successfully!");
      } else {
        console.warn("Review request was already sent or failed.");
      }
    },
    onError: (err) => {
      console.error("Error sending review request:", err);
    },
  });

  const [updateStatus] = useMutation(UPDATE_JOB_STATUS, {
    onCompleted: (res) => {
      const updated = res?.updateJobStatus;

      if (updated?.status === "completed") {
        sendReviewRequest({
          variables: { jobId: updated.id },
        });
      }
    },

    update(cache, { data }) {
      const updateJobStatus = data?.updateJobStatus;
      if (!updateJobStatus) return;

      //Read existing jobs from cache
      const existing = cache.readQuery({ query: GET_JOBS });
      if(!existing?.jobs) return;

      // Map over jobs and update the one that changed
      const updatedJobs = existing.jobs.map((job) =>
        job.id === updateJobStatus.id
          ? { ...job, status: updateJobStatus.status }
          : job
      );

      // Write updated jobs back to cache
      cache.writeQuery({
        query: GET_JOBS,
        data: { jobs: updatedJobs },
      });

      // Find the job we just updated in cache
      const updatedJob = updatedJobs.find((job) => job.id === updateJobStatus.id);

      //Trigger review request if completed and not already requested
      if (updateJobStatus.status === "completed" && !updatedJob?.reviewRequested) {
        sendReviewRequest({ variables: { jobId: updateJobStatus.id } });
      }
    },
  });

  const [assignEmployees] = useMutation(ASSIGN_EMPLOYEES, {
    update(cache, { data }) {
    },
  });

  const [submitFeedback] = useMutation(SUBMIT_FEEDBACK, {
    update(cache, { data: { submitFeedback } }) {
      const existing = cache.readQuery({ query: GET_JOBS });

      if (!existing) return;

      const updatedJobs = existing.jobs.map((job) =>
        job.id === submitFeedback.id
          ? { ...job, feedback: submitFeedback }
          : job
      );

      cache.writeQuery({
        query: GET_JOBS,
        data: { jobs: updatedJobs },
      });
    },
  });

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

//UI States
  if (!checkedAuth) return null;
  if (loading) return <p className="p-6">Loading jobs...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading jobs</p>;  

  const jobs = data?.jobs || [];

  // Group jobs by status
  const groupedJobs = {
    pending_quote: [],
    quote_scheduled: [],
    scheduled: [],
    in_progress: [],
    completed: [],
    paid: [],
    cancelled: [],
  };

  jobs.forEach((job) => {
    if (groupedJobs[job.status]) {
      groupedJobs[job.status].push(job);
    }
  });

  

  

  return (
    <AdminLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Jobs</h1>

          <div className="space-y-8">
          {Object.entries(groupedJobs).map(([status, jobs]) => {
            if (jobs.length === 0) return null;

            return (
              <div key={status}>
                <h2 className="text-xl font-bold mb-3">
                  {status.replaceAll("_", " ").toUpperCase()}
                </h2>

                <div className="grid gap-4">
                  {jobs.map((job) => (
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
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}