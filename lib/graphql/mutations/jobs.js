import { gql } from "@apollo/client";

export const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatus($jobId: Int!, $newStatus: String!) {
    updateJobStatus(jobId: $jobId, newStatus: $newStatus) {
      id
      status
      totalAmount
      reviewRequested
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

export const UPDATE_JOB_TOTAL_AMOUNT = gql`
  mutation UpdateTotalAmount($jobId: Int!, $totalAmount: Float!) {
    updateTotalAmount(jobId: $jobId, totalAmount: $totalAmount) {
      id
      totalAmount
      status
    }
  }
`;

//send the combined receipt + ways-to-pay + review email for a completed job
export const SEND_RECEIPT_EMAIL = gql`
  mutation SendReceiptEmail($jobId: Int!) {
    sendReceiptEmail(jobId: $jobId) {
      id
      status
      totalAmount
      paymentRequested
      paymentLink
      reviewRequested
      paidAt
      amountPaid
      balanceRemaining
    }
  }
`;

//admin: log a payment collected by any method (check/Zelle/Venmo/Cash App/cash/card)
export const RECORD_PAYMENT = gql`
  mutation RecordPayment($jobId: Int!, $method: String!, $amount: Float!, $note: String) {
    recordPayment(jobId: $jobId, method: $method, amount: $amount, note: $note) {
      payment {
        id
        method
        amount
        note
        createdAt
      }
      job {
        id
        status
        paidAt
        amountPaid
        balanceRemaining
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJob(
    $clientName: String!
    $clientEmail: String!
    $clientPhone: String!
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $serviceIds: [Int]
    $initialStatus: String
    $totalAmount: Float
  ) {
    createQuoteRequest(
      clientName: $clientName
      clientEmail: $clientEmail
      clientPhone: $clientPhone
      street: $street
      city: $city
      state: $state
      zip: $zip
      serviceIds: $serviceIds
      initialStatus: $initialStatus
      totalAmount: $totalAmount
    ) {
      id
      status
    }
  }
`;

export const SEND_QUOTE_EMAIL = gql`
  mutation SendQuoteEmail($jobId: Int!) {
    sendQuoteEmail(jobId: $jobId) {
      id
      status
      totalAmount
      quoteSent
      quoteSentAt
    }
  }
`;
