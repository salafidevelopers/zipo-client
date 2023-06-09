import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Tooltip } from "recharts";

import Footer from "../Footer";
import { SHORTEN_LINK } from "../gql";
import HeadComponent from "../Head";
import Header from "../Header";
import Wrapper from "../Wrapper";
import { ContentOne, ContentTwo } from "./contents";

const getAlternators = () => {
  return [];
};

function HomePage() {
  const [longLink, setLongLink] = useState("");

  const [shortenLink, { data, loading, error, reset }] = useMutation(
    SHORTEN_LINK,
    {
      variables: { link: longLink, alternators: getAlternators() },
    }
  );

  return (
    <Box w="100vw">
      <HeadComponent title="Zipo" />
      <Header fixed={false} isAuthenticated={false} />
      <Wrapper>
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Box w={{ base: "full", md: "50vw" }} p={4}>
            <VStack spacing={2}>
              <Heading
                textAlign={"center"}
                maxW="450px"
                size={"lg"}
                lineHeight={1.4}
                position={"relative"}
              >
                Get your Link shortened in Just A Click
                <Image
                  src="/Pattern_1.svg"
                  alt="pattern 1"
                  width={15}
                  height={15}
                  style={{ position: "absolute", right: -10, top: -10 }}
                />
              </Heading>
              <Text fontSize="sm" fontWeight={500} textAlign="center">
                Insert your link below to shorten or{" "}
                <Link
                  href="/login"
                  as={NextLink}
                  color="zipo.500"
                  textDecoration={"underline"}
                >
                  login
                </Link>{" "}
                to customize and combine links
              </Text>
            </VStack>
            {data ? (
              <ContentTwo
                setLongLink={setLongLink}
                reset={reset}
                alternators={data.link_shorten.data.alternators}
                path={data.link_shorten.data.path}
              />
            ) : (
              <ContentOne
                loading={loading}
                setLongLink={setLongLink}
                longLink={longLink}
                shortenLink={shortenLink}
              />
            )}

            <Box w="full" h="200px" position={"relative"}>
              <Image fill alt="Homepage pattern" src="/Homepage_Pattern.svg" />
            </Box>
          </Box>
        </Box>
      </Wrapper>

      <Footer />
    </Box>
  );
}

export default HomePage;
