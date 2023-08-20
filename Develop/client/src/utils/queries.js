import { gql } from "@apollo/client";

// Query to get the currently logged-in user's information
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

// Query to search for books based on a search term
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
