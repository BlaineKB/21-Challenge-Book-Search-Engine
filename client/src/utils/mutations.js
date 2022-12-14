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

export const SAVE_BOOK = gql`
  mutation saveBook($book: SavedBookInput!) {
    saveBook(book: $book) {
      username
      email
      bookCount
      savedBooks {
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      username
      email
      bookCount
      savedBooks {
        title
        authors
        description
        bookId
        image
        link
      }
    }
  }
`;