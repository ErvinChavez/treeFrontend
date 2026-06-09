import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query {
    services {
      id
      name
      description
    }
  }
`;

