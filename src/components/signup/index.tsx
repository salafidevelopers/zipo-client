import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
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
import { GOOGLE_AUTH, REGISTER } from './gql';
import { isLoggedIn, saveToken, saveUser } from '../../utils/auth';
import PublicRoute from '../PublicRoute';

const inputProps = {
  variant: 'outline',
  h: 10,
  borderRadius: 100,
  borderColor: 'zipo.deep',
  fontSize: '13px',
};

function Main() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [receiveNewsletter, setReceiveNewsletter] = useState(1);
  const [authenticating, setAuthenticating] = useState(false);

  const [register, { data, loading, error, reset }] = useMutation(REGISTER, {
    variables: {
      email,
      password,
      name,
      receiveNewsletter: receiveNewsletter === 1 ? true : false,
    },
  });

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = isLoggedIn();

    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, []);

  if (data) {
    setAuthenticating(false);
    setEmail('');
    setName('');
    setPassword('');
    reset();
    router.push('/login');
    toast({
      id: Math.round(Math.random() * 30),
      title: 'Successful, Check your email box',
      description: 'Please verify your email to complete your registration.',
      status: 'success',
      duration: 10000,
      isClosable: true,
    });
  }

  if (error) {
    setAuthenticating(false);
    toast({
      id: Math.round(Math.random() * 30),
      title: 'Login failed',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    reset();
  }

  const handleCheckbox = () => {
    setReceiveNewsletter(receiveNewsletter === 1 ? 0 : 1);
  };

  return (
    <Box h='100vh' w='100vw'>
      <HeadComponent title='Signup - Zipo' />
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
              Create your Free Account
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
                register();
              }}
            >
              <VStack spacing={4} width='full'>
                <Input
                  placeholder='Full Name'
                  value={name}
                  type='text'
                  isRequired
                  onChange={(e) => setName(e.target.value)}
                  {...inputProps}
                />

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
                  value={password}
                  type='password'
                  isRequired
                  onChange={(e) => setPassword(e.target.value)}
                  {...inputProps}
                />
              </VStack>
              <Box py={4}>
                <Checkbox
                  defaultChecked
                  size={'sm'}
                  value={receiveNewsletter}
                  onChange={handleCheckbox}
                >
                  Receive useful tips and promotions from Zipo.
                </Checkbox>
              </Box>

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
                Create Account
              </Button>
            </form>

            <Text fontSize='13px'>
              Already have a account?{' '}
              <Link
                href='/login'
                as={NextLink}
                color='zipo.500'
                textDecoration={'underline'}
              >
                Log in
              </Link>{' '}
            </Text>

            <Text fontSize='13px'>- OR -</Text>

            <GoogleRegisterButton
              authenticating={authenticating}
              setAuthenticating={setAuthenticating}
            />
          </VStack>
        </Box>
      </Wrapper>
    </Box>
  );
}

const GoogleRegisterButton = ({ setAuthenticating, authenticating }) => {
  const toast = useToast();

  const [registerGoogle, { data, loading, error, reset }] =
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
        setAuthenticating(false);

        const { displayName: name, email, providerData } = result.user;
        registerGoogle({
          variables: { name, email, ssoGoogleId: providerData[0].uid },
        });
      })
      .catch((error) => {
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

const SignupPage = () => {
  return (
    <PublicRoute>
      <Main />
    </PublicRoute>
  );
};

export default SignupPage;
