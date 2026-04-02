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
