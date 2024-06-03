import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import React, { useState } from "react";

import Suggestion, { handleLinkCopy } from "./suggestion";
import ShareIcon from "./ShareIcon";

// Components
export const ContentOne = ({ loading, setLongLink, longLink, shortenLink }) => {
  const toast = useToast();
  return (
    <InputGroup size="sm" mt={10}>
      <Input
        variant={"outline"}
        placeholder="Paste link here"
        type="text"
        value={longLink}
        onChange={(e) => setLongLink(e.target.value)}
        h={12}
        borderLeftRadius={100}
        borderColor="zipo.deep"
      />
      <InputRightAddon
        children={
          loading ? (
            <Button isLoading={loading} color="white" bg="none" />
          ) : (
            "Shorten"
          )
        }
        h={12}
        borderRightRadius={100}
        cursor="pointer"
        bgColor={"zipo.500"}
        color="white"
        px={{ base: 4, md: 8 }}
        fontWeight={500}
        _hover={{ opacity: 0.9 }}
        onClick={() => {
          if (longLink.length < 3) {
            toast({
              id: "123",
              title: "Too short",
              description: "Link is too short",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          shortenLink();
        }}
      />
    </InputGroup>
  );
};

export const ContentTwo = ({ reset, setLongLink, alternators, path }) => {
  const toast = useToast();
  const [suggestion, setSuggestion] = useState(true);
  const isSuggestionShowing = alternators.length > 0 && suggestion === true;
  const link = "zipo.me/" + path;

  console.log(alternators);
  return (
    <>
      <Text
        mt={5}
        w={"full"}
        textAlign={isSuggestionShowing ? "right" : "center"}
        color="red.500"
        textDecoration={"underline"}
        cursor="pointer"
        onClick={() => {
          reset();
          setLongLink("");
        }}
      >
        Reset
      </Text>
      <InputGroup size="sm" position="relative" mt={2}>
        <Box left={2}>
          {alternators.length > 0 && (
            <Suggestion
              path={path}
              suggestion={suggestion}
              setSuggestion={setSuggestion}
              alternators={alternators}
              toast={toast}
            />
          )}
        </Box>
        <Input
          variant={"outline"}
          value={link}
          h={12}
          borderRadius={100}
          borderColor="zipo.deep"
          fontWeight={500}
          readOnly
        />
        <InputRightElement width="4.5rem">
          <Button
            variant={"text"}
            size="sm"
            color={"zipo.500"}
            top={1.5}
            right={1}
            fontWeight={500}
            onClick={() => {
              handleLinkCopy(toast, link);
            }}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>

      <HStack
        flexWrap={"wrap"}
        mt={4}
        justifyContent={{ base: "center", md: "flex-end" }}
      >
        <HStack spacing={3}>
          <img src="Share_Black.svg" style={{ display: "inline" }} width={20} />
          <Text mr={2}>Click any icon to share. </Text>
        </HStack>

        <Box pt={{ base: 2, md: 0 }}>
          <WhatsappShareButton
            url={link}
            children={<ShareIcon src="Whatsapp_Black.svg" />}
          />
          <FacebookShareButton
            url={link}
            children={<ShareIcon src="Facebook_Black.svg" />}
          />
          <LinkedinShareButton
            url={link}
            children={<ShareIcon src="Linkedin_Black.svg" />}
          />
          <TwitterShareButton
            url={link}
            children={<ShareIcon src="Twitter_Black.svg" />}
          />
          <img
            width={29}
            style={{ marginLeft: "5px", display: "inline", cursor: "pointer" }}
            alt="share"
            src="Copylink_Black.svg"
            onClick={() => {
              handleLinkCopy(toast, link);
            }}
          />
        </Box>
      </HStack>
    </>
  );
};
