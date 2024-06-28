import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RawHeader from "../RawHeader";
import { socialLinks } from "./utils";

function CombinedLinkPage({ link }) {
  const content = link.combinedLink;

  return (
    <VStack justify={"space-between"} minH="100vh">
      <RawHeader fixed={false} />

      <VStack spacing={2} maxW={{ base: "250px", md: "500px" }} pb={14}>
        <Box mb={3}>
          <Image alt="zipo" src="Link_Blue.svg" width={100} height={100} />
        </Box>
        <Heading fontWeight={400}>{content.title}</Heading>
        <Text fontSize={"13px"}>{content.description}</Text>
        <VStack>
          <HStack spacing={4}>
            {content.links.map((link) => {
              const socialLink = socialLinks.find(
                (socialLink) =>
                  socialLink.title === link.title &&
                  socialLink.title !== "others"
              );
              if (socialLink) {
                return (
                  <a
                    href={link.url}
                    key={link.id}
                    style={{ cursor: "pointer" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={35}
                      height={35}
                      alt={link.title}
                      src={socialLink.src}
                    />
                  </a>
                );
              }
            })}
          </HStack>
          <VStack spacing={4} mt={4}>
            {content.links.map((link) => {
              const isOtherLink = link.title === "others";
              if (isOtherLink) {
                return (
                  <Card
                    key={link.id}
                    maxW="fit-content"
                    boxShadow="lg"
                    borderRadius="md"
                    direction={"row"}
                    bg={"zipo.500"}
                  >
                    <CardBody p={2}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <a href={link.url} target="_blank">
                          <Image
                            width={35}
                            height={35}
                            alt={link.title}
                            src={socialLinks[socialLinks.length - 1].src}
                          />
                        </a>
                        <Text fontSize="sm" color="white" fontWeight="bold">
                          <a href={link.url} target="_blank">
                            {link.url}
                          </a>
                        </Text>
                      </div>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </VStack>
        </VStack>
      </VStack>
      <Text fontSize="13px">
        You can also customize and combine your links{" "}
        <Link
          href="/dashboard"
          style={{ textDecoration: "underline", color: "#313EF7" }}
        >
          here
        </Link>
      </Text>
    </VStack>
  );
}

export default CombinedLinkPage;
