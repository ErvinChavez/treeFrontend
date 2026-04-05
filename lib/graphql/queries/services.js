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

export const CREATE_SERVICE = gql`
  mutation($name: String!, $description: String) {
    createService(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation($id: Int!, $name: String, $description: String) {
    updateService(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation($id: Int!) {
    deleteService(id: $id)
  }
`;