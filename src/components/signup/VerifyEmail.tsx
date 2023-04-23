import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { saveToken, saveUser } from '../../utils/auth';
import { VERIFY_EMAIL } from './gql';

function VerifyEmailPage() {
  const [verifyEmail, { loading, data, error }] = useMutation(VERIFY_EMAIL);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    verifyEmail({ variables: { token: window.location.pathname.slice(14) } });
  }, []);

  if (loading) {
    return <div>verifying...</div>;
  }

  if (error) {
    toast({
      id: error.message,
      title: 'Verification failed',
      description: error.message,
      status: 'error',
      duration: 300000,
      isClosable: false,
    });
  }

  if (data) {
    const { token, data: user } = data.auth_verifyEmail;
    saveToken(token);
    saveUser(user);
    toast({
      id: 'Email verified',
      title: 'Email verified',
      description: 'Redirecting you to the dashboard',
      status: 'success',
      duration: 3000,
      isClosable: false,
    });

    router.push(`/dashboard`);
  }

  return <></>;
}

export default VerifyEmailPage;
