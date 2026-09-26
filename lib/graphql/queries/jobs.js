import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query {
    jobs {
      id
      status
      reviewRequested
      paymentRequested
      paidAt
      paymentLink
      quoteSent
      quoteSentAt
      amountPaid
      balanceRemaining
      createdAt
      scheduledDate
      street
      city
      state
      zip
      totalAmount
      payments {
        id
        method
        amount
        note
        createdAt
      }
      client {
        id
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
      photos {
        id
        url
        featured
      }
      feedback {
        rating
        comment
        googleReviewLink
      }
    }
  }
`;