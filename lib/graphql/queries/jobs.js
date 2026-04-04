import { gql } from "@apollo/client";

export const GET_JOBS = gql`
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