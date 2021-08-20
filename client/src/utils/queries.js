import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_NOTES = gql`
  query notes ($username: String!) {
    notes(username: $username) {
      _id
      title
      text
      createdAt
      starred
    }
  }
`;
// export const  = gql`

// `;
