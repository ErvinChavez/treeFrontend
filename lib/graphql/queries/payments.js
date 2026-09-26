import { gql } from "@apollo/client";

//public confirmation query used by the /pay/success page
export const GET_PAYMENT_STATUS = gql`
  query PaymentStatus($sessionId: String!) {
    paymentStatus(sessionId: $sessionId) {
      paid
      amountTotal
      jobId
    }
  }
`;

//public invoice summary used by the /pay page
export const GET_JOB_PAYMENT_INFO = gql`
  query JobPaymentInfo($token: String!) {
    jobPaymentInfo(token: $token) {
      jobId
      clientName
      serviceAddress
      totalAmount
      amountPaid
      balanceRemaining
      paid
    }
  }
`;

//admin: existing-client hint while filling out the Add Job form
export const GET_CLIENT_BY_EMAIL = gql`
  query ClientByEmail($email: String!) {
    clientByEmail(email: $email) {
      id
      name
      phone
      jobs {
        id
        status
        totalAmount
        street
        city
        createdAt
      }
    }
  }
`;
