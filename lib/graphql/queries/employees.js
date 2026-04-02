import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      email
      phone
    }
  }
`;