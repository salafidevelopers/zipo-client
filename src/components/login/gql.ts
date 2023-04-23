import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Auth_login($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      code
      success
      error
      data {
        _id
        email
        name
        ssoGoogleId
      }
      token
    }
  }
`;

export const GOOGLE_AUTH = gql`
  mutation Auth_google(
    $name: String!
    $email: String!
    $ssoGoogleId: String!
    $receiveNewsletter: Boolean
  ) {
    auth_google(
      name: $name
      email: $email
      ssoGoogleId: $ssoGoogleId
      receiveNewsletter: $receiveNewsletter
    ) {
      code
      success
      error
      data {
        _id
        email
        name
        ssoGoogleId
      }
      token
    }
  }
`;
