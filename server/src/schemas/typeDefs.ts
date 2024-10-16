import gql from 'graphql-tag';

const typeDefs = gql`
  type Book {
    _id: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String!
    link: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    saveBook(input: BookInput!): User
    removeBook(id: ID!): User
  }
`;

export default typeDefs;
