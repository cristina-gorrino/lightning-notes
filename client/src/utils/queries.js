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
    category {
      _id
      name
    }
    dueDate
  }
}
`;
export const NOTES_BY_CATEGORY = gql`
query notesCat ($noteAuthor: String!, $categoryId: ID!) {
  notesCat (noteAuthor:$noteAuthor, category:$categoryId){
    _id
    title
    text
    createdAt
    starred
    category {
      _id
      name
    }
    dueDate
  }
}
`;

export const QUERY_CATEGORIES = gql`
query categories {
  categories{
    _id
    name
  }
}
`;

export const QUERY_SINGLE_CATEGORY = gql`
query category ($categoryId: ID!) {
  category(categoryId:$categoryId) {
    _id
    name
  }
}
`;

export const QUERY_SINGLE_NOTE = gql`
  query note($noteId: ID!) {
    note(noteId: $noteId) {
      _id
      title
      text
      createdAt
      starred
      category {
        _id
        name
      }
      dueDate
    }
  }
`;


// export const  = gql`

// `;
