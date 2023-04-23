import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Auth_register(
    $name: String!
    $email: String!
    $password: String!
    $receiveNewsletter: Boolean!
  ) {
    auth_register(
      name: $name
      email: $email
      password: $password
      receiveNewsletter: $receiveNewsletter
    ) {
      code
      success
      error
      token
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation Auth_verifyEmail($token: String!) {
    auth_verifyEmail(token: $token) {
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
