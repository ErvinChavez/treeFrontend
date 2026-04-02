import { gql } from "@apollo/client";
//this fetches the services data from the backend
export const GET_SERVICES = gql`
  query {
    services {
      id
      name
      description
    }
  }
`;