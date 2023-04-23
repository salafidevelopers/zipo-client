import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  Text,
  Box,
  Flex,
  Button,
  Container,
  HStack,
  Img,
} from '@chakra-ui/react';
import Link from 'next/link';
import { isLoggedIn, logoutTask } from '../utils/auth';
import { Router, useRouter } from 'next/router';

export default function Header({ fixed, isAuthenticated }) {
  return (
    <Box
      position={fixed ? 'sticky' : 'relative'}
      top={0}
      width='100vw'
      zIndex={'1000'}
      background='white'
      fontFamily='lato'
      fontSize={'md'}
    >
      <Container maxWidth={'container.lg'}>
        <Flex
          minH={'60px'}
          py={5}
          align={'center'}
          justifyContent='space-between'
          width={'100%'}
        >
          <NextLink href='/'>
            <img src={'/Logo_Main.png'} width='120' />
          </NextLink>

          <HStack alignItems={'center'} spacing={6}>
            {isAuthenticated ? (
              <LogoutComponent />
            ) : (
              <Link href='/login'>
                <Button
                  width='fit-content'
                  variant='outline'
                  color={'zipo.deep'}
                  borderColor={'zipo.deep'}
                  rounded='3xl'
                  fontFamily={'montserrat'}
                  _hover={{
                    bgColor: 'zipo.500',
                    borderColor: 'zipo.500',
                    color: 'white',
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

// - Projects
const LogoutComponent = () => {
  const router = useRouter();

  return (
    <HStack
      cursor={'pointer'}
      spacing={4}
      onClick={() => {
        logoutTask();
        router.push('/login');
      }}
    >
      <Img src='Logout_Icon.svg' />
      <Text color='#EB4335' fontFamily={'montserrat'} fontWeight={500}>
        Logout
      </Text>
    </HStack>
  );
};
