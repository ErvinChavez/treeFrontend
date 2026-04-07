import { gql } from "@apollo/client";

export const SEND_REVIEW_REQUEST = gql`
  mutation SendReviewRequest($jobId: Int!) {
    sendReviewRequest(jobId: $jobId) {
      success
      message
    }
  }
`;