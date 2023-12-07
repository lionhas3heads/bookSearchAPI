import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
        bookCount
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
        bookCount
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SAVE_BOOK(
    $description: String!
    $title: String!
    $bookId: String!
    $authors: [String]
    $image: String
    $link: String
  ) {
    saveBook(
      description: $description
      title: $title
      bookId: $bookId
      authors: $authors
      image: $image
      link: $link
    ) {
      _id
      username
      email
      password
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation REMOVE_BOOK($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      bookCount
    }
  }
`;