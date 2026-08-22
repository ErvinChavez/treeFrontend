import { gql } from "@apollo/client";

//Mutation
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $email: String, $phone: String) {
    createEmployee(name: $name, email: $email, phone: $phone) {
      id
      name
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: Int!, $name: String, $email: String, $phone: String) {
    updateEmployee(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;

export const REACTIVATE_EMPLOYEE = gql`
  mutation ReactivateEmployee($id: Int!) {
    reactivateEmployee(id: $id) {
      id
      name
      active
    }
  }
`;