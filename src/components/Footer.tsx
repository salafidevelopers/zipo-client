import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Box>
      <Container maxW="container.lg" bgColor={"white"} bottom={0}>
        <Flex
          width={"100%"}
          alignItems="center"
          justifyContent="center"
          borderRadius={4}
          direction={{ base: "column-reverse", md: "row" }}
          py={4}
          gap={6}
          bg="zipo.500"
          color="white"
          maxW={"container.sm"}
          mx={"auto"}
          style={{
            transform: "translateY(-30px)",
          }}
        >
          <Text
            textAlign="center"
            fontSize="xs"
            fontWeight={500}
            pl={{ base: "none" }}
          >
            Connect with us on social media
          </Text>
          <HStack spacing={3} mb={{ base: 5, md: 0 }}>
            <a href="#">
              <Image
                src="/Facebook_Blue.svg"
                height={30}
                width={30}
                alt="facebook handle"
              />{" "}
            </a>
            <a href="#">
              {" "}
              <Image
                src="/Linkedin_Blue.svg"
                height={30}
                width={30}
                alt="linkedin handle"
              />{" "}
            </a>

            <a href="#">
              {" "}
              <Image
                src="/Twitter_Blue.svg"
                height={30}
                width={30}
                alt="twitter handle"
              />
            </a>
          </HStack>
        </Flex>
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={7}
          >
            <img src={"/Logo_Main.png"} width="120" />
          </Box>
          <Flex
            mx="auto"
            gap={3}
            my={5}
            alignItems="center"
            justifyContent="center"
          >
            <Text color="zipo.300">Email Us</Text>
            <Text color="zipo.300">Privacy Policy</Text>
            <Text color="zipo.300">Term of Use</Text>
            <Text color="zipo.300">FAQ</Text>
          </Flex>
        </Box>
      </Container>
      <Box bgColor="zipo.500" p={3} color={"white"}>
        <Text
          flex={1}
          textAlign="center"
          fontSize="xs"
          fontWeight={500}
          pl={{ base: "none" }}
        >
          Copyright &#169; ZIPO 2022 All right reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
