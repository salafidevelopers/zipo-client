import { useQuery } from "@apollo/client";
import { HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GET_ORIGINAL_LINK } from "./gql";
import CombinedLinkPage from "./dashboard/CombinedLinkPage";

function getPath(route: string) {
  if (route.startsWith("/aliexpress/")) return route.slice(12);
  if (route.startsWith("/instagram/")) return route.slice(11);
  if (route.startsWith("/pinterest/")) return route.slice(11);
  if (route.startsWith("/snapchat/")) return route.slice(10);
  if (route.startsWith("/linkedin/")) return route.slice(10);
  if (route.startsWith("/facebook/")) return route.slice(10);
  if (route.startsWith("/twitter/")) return route.slice(9);
  if (route.startsWith("/alibaba/")) return route.slice(9);
  if (route.startsWith("/youtube/")) return route.slice(9);
  if (route.startsWith("/tiktok/")) return route.slice(8);
  if (route.startsWith("/amazon/")) return route.slice(8);
  if (route.startsWith("/github/")) return route.slice(8);
  if (route.startsWith("/figma/")) return route.slice(7);
  if (route.startsWith("/jumia/")) return route.slice(7);
  if (route.startsWith("/konga/")) return route.slice(7);
  if (route.startsWith("/vimeo/")) return route.slice(7);
  if (route.startsWith("/aws/")) return route.slice(5);
  return route.slice(1);
}

function Slug() {
  const router = useRouter();
  const { slug, asPath } = router.query;
  const { loading, data, error } = useQuery(GET_ORIGINAL_LINK, {
    variables: { path: getPath(router.asPath) },
  });

  console.log({ slug, asPath });

  if (loading) {
    return <></>;
  }

  if (data) {
    if (data.getOriginalLink.type === "Shortened") {
      const link = data.getOriginalLink.link;
      router.replace(link);
    } else {
      console.log(data);
      return <CombinedLinkPage link={data.getOriginalLink} />;
    }
  }

  if (error) {
    return (
      <HStack w="full" h="full" justify={"center"} alignItems="center">
        <Text>Page not found</Text>
      </HStack>
    );
  }

  return <></>;
}

export default Slug;
