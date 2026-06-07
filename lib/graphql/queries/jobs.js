import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query {
    jobs {
      id
      status
      reviewRequested
      createdAt
      scheduledDate
      street
      city
      state
      zip
      totalAmount
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
      photos
      feedback {
        rating
        comment
        googleReviewLink
      }
    }
  }
`;
