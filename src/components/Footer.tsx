import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <Container maxW='container.lg' bgColor={'white'} bottom={0}>
      <Flex
        width={'100%'}
        alignItems='center'
        direction={{ base: 'column-reverse', md: 'row' }}
        py={4}
      >
        <Text
          flex={1}
          textAlign='center'
          fontSize='xs'
          fontWeight={500}
          pl={{ base: 'none', md: '200px' }}
        >
          Copyright &#169; ZIPO 2022 All right reserved
        </Text>
        <HStack spacing={3} mb={{ base: 5, md: 0 }}>
          <a href='#'>
            <Image
              src='/Facebook_Blue.svg'
              height={30}
              width={30}
              alt='facebook handle'
            />{' '}
          </a>
          <a href='#'>
            {' '}
            <Image
              src='/Linkedin_Blue.svg'
              height={30}
              width={30}
              alt='linkedin handle'
            />{' '}
          </a>

          <a href='#'>
            {' '}
            <Image
              src='/Twitter_Blue.svg'
              height={30}
              width={30}
              alt='twitter handle'
            />
          </a>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Footer;
