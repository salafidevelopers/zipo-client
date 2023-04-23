import { gql } from '@apollo/client';

export const GET_LINKS = gql`
  query Links {
    links {
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

export const IS_LINK_CUSTOMIZABLE = gql`
  query Query($path: String!) {
    link_isCustomizable(path: $path)
  }
`;

export const SHORTEN_LINK_CUSTOM = gql`
  mutation Link_shortenCustom(
    $link: String!
    $path: String!
    $alternators: [String!]
  ) {
    link_shortenCustom(link: $link, path: $path, alternators: $alternators) {
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

export const EDIT_CUSTOM_LINK = gql`
  mutation Link_Shortened_Edit($link: String!, $id: ID!) {
    link_shortened_edit(link: $link, id: $id) {
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

export const EDIT_COMBINE_LINK = gql`
  mutation Link_Shortened_Edit($combinedLink: CombinedLinkInput!, $id: ID!) {
    link_combined_edit(combinedLink: $combinedLink, id: $id) {
      code
      success
      error
      data {
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
  }
`;

export const COMBINE_LINK = gql`
  mutation Link_combineCustom(
    $path: String!
    $combinedLink: CombinedLinkInput!
  ) {
    link_combineCustom(path: $path, combinedLink: $combinedLink) {
      code
      success
      error
      data {
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
  }
`;
