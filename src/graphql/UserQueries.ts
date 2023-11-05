import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            _id
            name
            email
            birthDay
        }
    }
`;