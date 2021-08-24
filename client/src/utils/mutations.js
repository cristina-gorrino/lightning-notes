import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($title: String!, $text: String!, $noteAuthor: String!, $category: ID) {
    addNote(title: $title, text: $text, noteAuthor: $noteAuthor, category:$category) {
      _id
      title
      text
      noteAuthor
      createdAt
      starred
      category {
        _id
        name
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_NOTE = gql`

  mutation removeNote($noteId: ID!) {
    removeNote(noteId:$noteId) {
      _id
    }
  }
`;

export const EDIT_NOTE = gql`
mutation editNote( $noteId: ID!, $title: String!, $text: String!, $category: ID, $starred: Boolean) {
  editNote(noteId:$noteId, title:$title, text:$text, category:$category, starred:$starred ) {
    _id
    title
    text
    noteAuthor
    createdAt
    starred
    category {
      _id
      name
    }
  }
}
`;
