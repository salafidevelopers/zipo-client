import {
  Text,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import { handleLinkCopy } from "../../home/suggestion";
import ShareIcon from "../ShareIcon";
import SelectSocials from "./SelectSocials";
import { inputProps, inputProps2 } from "./utils";

const LinkCombined = ({
  initLinks,
  handleLinkEdit,
  combinedLink,
  customLink,
  data,
  reset,
}) => {
  const toast = useToast();
  return (
    <>
      <Box pb={3} w="full">
        <VStack
          w="full"
          alignItems={"flex-start"}
          maxH={"180px"}
          overflowY="auto"
          spacing={3}
        >
          {initLinks.map((link) => {
            return (
              <HStack spacing={0} w="95%" key={link.id}>
                <SelectSocials
                  title={link.title}
                  id={link.id}
                  handleLinkEdit={handleLinkEdit}
                />
                <InputGroup>
                  <Input
                    placeholder="Paste link here"
                    {...inputProps}
                    value={link.url}
                    readOnly
                  />
                </InputGroup>
              </HStack>
            );
          })}
        </VStack>
      </Box>
      <Box w="95%">
        <InputGroup>
          <Input
            placeholder="zipo.me/CustomLink"
            readOnly
            value={customLink}
            {...inputProps2}
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
                handleLinkCopy(toast, combinedLink);
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
            <img
              src="Share_Black.svg"
              style={{ display: "inline" }}
              width={20}
            />
            <Text mr={2}>Click any icon to share. </Text>
          </HStack>

          <Box pt={{ base: 2, md: 0 }}>
            <WhatsappShareButton
              url={combinedLink}
              children={<ShareIcon src="Whatsapp_Black.svg" />}
            />
            <FacebookShareButton
              url={combinedLink}
              children={<ShareIcon src="Facebook_Black.svg" />}
            />
            <LinkedinShareButton
              url={combinedLink}
              children={<ShareIcon src="Linkedin_Black.svg" />}
            />
            <TwitterShareButton
              url={combinedLink}
              children={<ShareIcon src="Twitter_Black.svg" />}
            />
            <img
              width={29}
              style={{
                marginLeft: "5px",
                display: "inline",
                cursor: "pointer",
              }}
              alt="share"
              src="Copylink_Black.svg"
              onClick={() => {
                handleLinkCopy(toast, combinedLink);
              }}
            />
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default LinkCombined;
