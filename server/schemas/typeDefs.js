const { gql } = require('apollo-server-express');

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
      name: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    notes(username: String!): [Note]
  }

   type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNote(title: String!, text: String!, noteAuthor: String!): Note
    addCategory(name: String!)
   }
`;

module.exports = typeDefs;
