import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(user: { email: $email, password: $password })
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterAsUser(
    $name: String!
    $email: String!
    $password: String!
    $birthDay: String
  ) {
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

export const CREATE_HABIT = gql`
  mutation MyMutation(
    $name: String!
    $description: String!
    $is_favorite: Boolean!
    $is_yn: Boolean!
    $color: String!
    $units: String!
    $goal: Float!
    $frequency_type: String!
    $category: String!
  ) {
    addHabit(
      habit: {
        name: $name
        description: $description
        is_favorite: $is_favorite
        is_yn: $is_yn
        color: $color
        units: $units
        goal: $goal
        frequency_type: $frequency_type
        category: $category
      }
    ) {
      id
    }
  }
`;
