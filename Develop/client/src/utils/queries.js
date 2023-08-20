import { gql } from "@apollo/client";

export const QUERY_GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

export const QUERY_SEARCH_BOOKS = gql`
  query searchBooks($searchInput: String!) {
    searchBooks(searchInput: $searchInput) {
      bookId
      authors
      description
      image
      link
      title
    }
  }
`;
