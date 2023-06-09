import {
  Box,
  HStack,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// Functions
export const handleLinkCopy = (toast, link) => {
  navigator.clipboard.writeText(link);
  if (!toast.isActive(link)) {
    toast({
      id: link,
      title: "Link copied",
      description: link,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
};

const Suggestion = ({
  setSuggestion,
  suggestion,
  alternators,
  path,
  toast,
}) => {
  const link = "zipo.me/" + alternators[0] + "/" + path;

  return (
    <Popover
      isOpen={suggestion}
      onClose={() => setSuggestion(false)}
      placement="top-start"
      arrowPadding={80}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box></Box>
      </PopoverTrigger>
      <PopoverContent
        bg="zipo.500"
        color="white"
        fontSize="9px"
        width={{ base: "240px", md: "260px" }}
      >
        <PopoverHeader borderBottom="none">Copy this instead?</PopoverHeader>
        <PopoverArrow bg="zipo.500" />
        <PopoverCloseButton color="white" fontSize="6px" />
        <PopoverBody
          fontSize="13px"
          fontWeight={"normal"}
          w="full"
          as={HStack}
          justifyContent="space-between"
        >
          <Text> {link}</Text>
          <Img
            src="/Link.svg"
            w="17px"
            cursor={"pointer"}
            onClick={() => {
              handleLinkCopy(toast, link);
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Suggestion;
