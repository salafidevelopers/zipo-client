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

const Wrapper = ({ children }) => {
  return <Container maxW='container.lg' pt={4} pb="7rem">{children}</Container>;
};

export default Wrapper;
