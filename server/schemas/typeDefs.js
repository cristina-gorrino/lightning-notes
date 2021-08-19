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
  }

   type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
   }
`;

module.exports = typeDefs;
