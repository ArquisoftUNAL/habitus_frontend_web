import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(user: { email: $email, password: $password })
  }
`;

export const REGISTER_USER = gql`
mutation RegisterAsUser($name: String!, $email: String!, $password: String!, $birthDay: String) {
  createUser(
    user: {
      name: $name
      email: $email
      password: $password
      birthDay: $birthDay
    }
  ) {
    _id
    jwt
  }
}
`;