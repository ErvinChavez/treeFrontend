import { gql } from "@apollo/client";

export const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatus($jobId: Int!, $newStatus: String!) {
    updateJobStatus(jobId: $jobId, newStatus: $newStatus) {
      id
      status
    }
  }
`;

//assign employees
export const ASSIGN_EMPLOYEES = gql`
  mutation AssignEmployees($jobId: Int!, $employeeIds: [Int]) {
    assignEmployeesToJob(jobId: $jobId, employeeIds: $employeeIds) {
      id
    }  
  }
`;

//submit feedback
export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($token: String!, $rating: Int!, $comment: String) {
    submitFeedback(token: $token, rating: $rating, comment: $comment) {
      id
      rating
      comment
      googleReviewLink
    }
  }
`;