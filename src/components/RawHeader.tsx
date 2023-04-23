import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Container,
} from '@chakra-ui/react';


export default function RawHeader({ fixed }) {
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
        </Flex>
      </Container>
    </Box>
  );
}