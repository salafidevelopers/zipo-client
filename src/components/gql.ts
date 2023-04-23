import { gql } from '@apollo/client';

export const SHORTEN_LINK = gql`
  mutation Link_shorten($alternators: [String!]!, $link: String!) {
    link_shorten(alternators: $alternators, link: $link) {
      code
      success
      error
      data {
        _id
        path
        alternators
        type
        link
        
        id
      }
    }
  }
`;

export const GET_ORIGINAL_LINK = gql`
  query GetOriginalLink($path: String!) {
    getOriginalLink(path: $path) {
      _id
      path
      alternators
      type
      link
      combinedLink {
        links {
          title
          id
          url
        }
        description
        title
      }
      id
    }
  }
`;
