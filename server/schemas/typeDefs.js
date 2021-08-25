const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    notes: [Note]
  }

  type Note {
    _id: ID
    title: String!
    text: String!
    noteAuthor: String!
    createdAt: String
    starred: Boolean!
    category: Category
  }

  type Category {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    note(noteId: ID!): Note
    notes(username: String!): [Note]
    notesCat(noteAuthor: String!, category: ID!): [Note]
    categories : [Category]
    category(categoryId: ID!): Category
    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNote(title: String!, text: String!, noteAuthor: String!, category:ID): Note
    addCategory(name: String!): Category
    deleteNote(noteId: ID!): Note
    editNote(noteId:ID! title: String!, text: String!, category:ID, starred:Boolean): Note   
   }
`;

module.exports = typeDefs;
