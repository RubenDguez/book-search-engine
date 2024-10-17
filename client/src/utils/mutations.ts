import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($input: BookInput!) {
  saveBook(input: $input) {
    _id
    email
    username
    savedBooks {
      _id
      authors
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(id: $bookId) {
      savedBooks {
        _id
        authors
        image
        link
        title
      }
    }
  }
`;
