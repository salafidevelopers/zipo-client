import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import HeadComponent from '../Head';
import Header from '../Header';
import Wrapper from '../Wrapper';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { provider } from '../../utils/firebase';
import { isLoggedIn, saveToken, saveUser } from '../../utils/auth';
import { GOOGLE_AUTH, LOGIN } from './gql';
import PublicRoute from '../PublicRoute';

const inputProps = {
  variant: 'outline',
  h: 10,
  borderRadius: 100,
  borderColor: 'zipo.deep',
  fontSize: '13px',
};

function Main() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  const toast = useToast();

  const [login, { data, loading, error, reset }] = useMutation(LOGIN, {
    variables: { email, password },
  });

  const router = useRouter();

  // Handle Auth Persistence
  useEffect(() => {
    const isAuthenticated = isLoggedIn();

    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, []);

  if (data) {
    setAuthenticating(false);
    const { token, data: user } = data.auth_login;
    saveToken(token);
    saveUser(user);
    router.push(`/dashboard`);
  }

  if (error) {
    toast({
      id: Math.round(Math.random() * 30),
      title: 'Login failed',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    reset();
    setAuthenticating(false);

  }
  return (
    <Box h='100vh' w='100vw'>
      <HeadComponent title='Login - Zipo' />
      <Header fixed={true} isAuthenticated={false} />
      <Wrapper>
        <Box
          display={'flex'}
          justifyContent='center'
          alignItems={'flex-start'}
          //   minH='70vh'
          h={'100%'}
          fontSize={'sm'}
        >
          <VStack minW='320px' spacing={4}>
            <Heading
              textAlign={'center'}
              maxW='450px'
              size={'lg'}
              lineHeight={1.4}
              position={'relative'}
              fontSize='lg'
              fontWeight={600}
              mb={6}
            >
              Login to your Account
              <Image
                src='/Pattern_1.svg'
                alt='pattern 1'
                width={15}
                height={15}
                style={{ position: 'absolute', right: -15, top: -7 }}
              />
            </Heading>

            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                setAuthenticating(true);
                login();
              }}
            >
              <VStack spacing={4} width='full'>
                <Input
                  placeholder='Email'
                  value={email}
                  type='email'
                  isRequired
                  onChange={(e) => setEmail(e.target.value)}
                  {...inputProps}
                />

                <Input
                  placeholder='Password'
                  type='password'
                  value={password}
                  isRequired
                  onChange={(e) => setPassword(e.target.value)}
                  {...inputProps}
                />

                <Button
                  width='full'
                  variant='solid'
                  bgColor={'zipo.500'}
                  fontSize='12px'
                  fontWeight={500}
                  color={'white'}
                  rounded='3xl'
                  fontFamily={'montserrat'}
                  _hover={{
                    opacity: 0.9,
                  }}
                  isLoading={loading}
                  isDisabled={authenticating}
                  type='submit'
                >
                  Sign in
                </Button>
              </VStack>
            </form>

            <Text fontSize='13px'>
              Don't have an account?{' '}
              <Link
                href='/signup'
                as={NextLink}
                color='zipo.500'
                textDecoration={'underline'}
              >
                Sign up
              </Link>{' '}
            </Text>

            <Text fontSize='13px'>- OR -</Text>

            <GoogleLoginButton
              authenticating={authenticating}
              setAuthenticating={setAuthenticating}
            />
          </VStack>
        </Box>
      </Wrapper>
    </Box>
  );
}

const GoogleLoginButton = ({ setAuthenticating, authenticating }) => {
  const toast = useToast();

  const [loginGoogle, { data, loading, error, reset }] =
    useMutation(GOOGLE_AUTH);

  const router = useRouter();
  const auth = getAuth();

  if (data) {
    setAuthenticating(false);
    const { token, data: user } = data.auth_google;
    saveToken(token);
    saveUser(user);
    router.push(`/dashboard`);
  }

  if (error) {
    setAuthenticating(false);
    reset();
    toast({
      id: error.message,
      title: 'Login failed',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }

  function handleGoogleAuth() {
    setAuthenticating(true);
    // SigninWithPopup
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setAuthenticating(false);

        const { displayName: name, email, providerData } = result.user;
        loginGoogle({
          variables: { name, email, ssoGoogleId: providerData[0].uid },
        });
      })
      .catch((error) => {
        console.log(error);
        setAuthenticating(false);
        const errorMessage = error.message;
        setAuthenticating(false);
        toast({
          id: errorMessage,
          title: 'Login failed',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }

  return (
    <Button
      width='full'
      variant='outline'
      color={'zipo.deep'}
      borderColor={'zipo.deep'}
      rounded='3xl'
      fontSize='12px'
      fontWeight={500}
      fontFamily={'montserrat'}
      _hover={{
        bgColor: 'zipo.500',
        borderColor: 'zipo.500',
        color: 'white',
      }}
      leftIcon={
        <Image src='/google.svg' alt='pattern 1' width={15} height={15} />
      }
      isLoading={loading}
      isDisabled={authenticating}
      onClick={handleGoogleAuth}
    >
      Continue with Google
    </Button>
  );
};

const LoginPage = () => {
  return (
    <PublicRoute>
      <Main />
    </PublicRoute>
  );
};

export default LoginPage;
