import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      notes {
        _id
        noteText
        createdAt
      }
    }
  }
`;

export const QUERY_NOTES = gql`
query notes ($username: String!) {
  notes (username: $username){
    _id
    title
    text
    createdAt
    starred
  }
}
`;

export const QUERY_SINGLE_NOTE = gql`
  query getSingleNote($noteId: ID!) {
    note(noteId: $noteId) {
      _id
      text
      noteAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      notes {
        _id
        text
        noteAuthor
        createdAt
      }
    }
  }
`;

// export const  = gql`

// `;
