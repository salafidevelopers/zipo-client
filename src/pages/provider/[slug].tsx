import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { HStack, Text } from "@chakra-ui/react";
import { GET_ORIGINAL_LINK } from "../../components/gql";
import CombinedLinkPage from "../../components/dashboard/CombinedLinkPage";

const validProviders = [
  "alibaba",
  "facebook",
  "instagram",
  "pinterest",
  "snapchat",
  "linkedin",
  "twitter",
  "youtube",
  "tiktok",
  "amazon",
  "github",
  "figma",
  "jumia",
  "konga",
  "vimeo",
  "aws",
];

function SlugPage() {
  const router = useRouter();
  const { provider, slug } = router.query;

  const { loading, data, error } = useQuery(GET_ORIGINAL_LINK, {
    variables: { path: provider + "/" + slug }, // Construct your query path dynamically
    skip: !slug, // Skip query until slug is available
  });

  //    // Validate provider against the list of valid providers
  //    useEffect(() => {
  //     if (provider && !validProviders.includes(provider as string)) {
  //       // Redirect to a 404 page or handle invalid provider scenario
  //       router.push('/404'); // Redirect to a custom 404 page
  //     }
  //   }, [provider]);

  //   const { loading, data, error } = useQuery(GET_ORIGINAL_LINK, {
  //     variables: { path: `${provider}/${slug}` }, // Construct your query path dynamically
  //     skip: !slug || !validProviders.includes(provider as string), // Skip query if slug or provider is invalid
  //   });

  if (loading) {
    return <></>; // Consider using a loading indicator
  }

  if (data && data.getOriginalLink) {
    const { type, link } = data.getOriginalLink;
    if (type === "Shortened") {
      // Redirect if the link type is 'Shortened'
      window.location.replace(link);
      return null; // Prevent rendering anything further
    } else {
      // Render CombinedLinkPage for other types
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

  return null; // Render nothing if neither loading, data, nor error
}

export default SlugPage;
