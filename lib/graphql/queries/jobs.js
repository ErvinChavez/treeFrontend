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

//get all employees
export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
    }
  }
`;