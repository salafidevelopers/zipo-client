import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  LinkIcon,
  AtSignIcon,
  LockIcon,
  ExternalLinkIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import FeaturesCard from "./FeaturesCard";
import Wrapper from "../Wrapper";
import Link from "next/link";

const featureData = [
  {
    icon: LinkIcon,
    description:
      "Keep your links organized and easily accessible. Categorize, tag, and create custom folders to streamline your link management process.",
    title: "Link Management",
  },
  {
    icon: LockIcon,
    description:
      "Rest easy knowing that your links are in safe hands. LinkSwift employs cutting-edge security measures to protect your data and ensure seamless performance. Our rock-solid infrastructure guarantees 99.9% uptime, so you can focus on what matters most - your success.",
    title: "Security",
  },
  {
    icon: ExternalLinkIcon,
    description:
      "Target your customers to increase your reach and redirect them to a relevant page. Add a pixel to retarget them in your social media ad campaign to capture them.",
    title: "Multiple Links",
  },
  {
    icon: ViewIcon,
    description:
      "Gain valuable insights into your link performance. Measure clicks, engagement, and conversion rates to optimize your marketing campaigns and make data-driven decisions.",
    title: "Performance Tracking",
  },
  {
    icon: AtSignIcon,
    description:
      "Zipo Link-in-bio, powered by Zipo Link Management, to help you curate, package and track your best links.",
    title: "Link-in-bio",
  },
];

const FeatureList = () => {
  return (
    <Box bgColor="#313EF70F" py="6">
      <Wrapper>
        <Heading
          w="fit-content"
          mx="auto"
          size="lg"
          color="zipo.500"
          textAlign="center"
          lineHeight={1.4}
          position={"relative"}
        >
          Features
          <Image
            src="/Pattern_1.svg"
            alt="pattern 1"
            width={15}
            height={15}
            style={{ position: "absolute", right: -15, top: -10 }}
          />
        </Heading>
        <Container>
          <Text textAlign="center" pt="2" fontSize="md">
            With Zipo, you can transform those lengthy URLs into short,
            memorable, and powerful links that make a lasting impact. Our
            platform offers a range of features designed to enhance your link
            management process and streamline your online presence. Say goodbye
            to cluttered links and hello to a sleek, professional image.
          </Text>
        </Container>
      </Wrapper>
      <Container maxW="container.xl">
        <Box display="flex" gap="5" justifyContent="center" flexWrap="wrap">
          {featureData.map(({ icon, description, title }) => (
            <FeaturesCard
              key={title}
              icon={icon}
              description={description}
              title={title}
            />
          ))}
        </Box>
        <Stack my={4} direction={"column"} align="center">
          <Link href="/login">
            <Button
              width="fit-content"
              variant="outline"
              color={"white"}
              backgroundColor={"zipo.500"}
              fontFamily={"montserrat"}
              _hover={{
                bgColor: "zipo.500",
                borderColor: "zipo.500",
                color: "white",
              }}
            >
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button
              width="fit-content"
              variant="link"
              color={"zipo.500"}
              fontFamily={"montserrat"}
              _hover={{
                bgColor: "zipo.500",
                borderColor: "zipo.500",
                color: "white",
              }}
            >
              Login
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default FeatureList;
