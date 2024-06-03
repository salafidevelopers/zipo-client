import {
  InputGroup,
  Input,
  Textarea,
  InputRightElement,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { inputProps2 } from "./utils";

const DescriptionAndTitle = ({
  linkTitle,
  setLinkTitle,
  description,
  setDescription,
  customLink,
  setStep,
  handleCombineLink,
  loading,
}) => {
  const DESCRIPTION_MAX = 100;

  return (
    <>
      <Box w="full">
        <InputGroup w="95%" mb={3}>
          <Input
            placeholder="Link Title"
            {...inputProps2}
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
          />
        </InputGroup>
        <Box position={"relative"} w="95%" mb={8}>
          <Textarea
            placeholder={`Description (${DESCRIPTION_MAX} characters max)`}
            onChange={(e) => setDescription(e.target.value)}
            borderColor="zipo.deep"
            fontSize={"13px"}
            borderRadius="2xl"
            isInvalid={description.length > DESCRIPTION_MAX ? true : false}
            ringColor={description.length > DESCRIPTION_MAX && "red.500"}
          />
          <Text
            fontSize={"10px"}
            fontWeight={600}
            position="absolute"
            bottom={-4}
            right={0}
            opacity={0.5}
            color={description.length > DESCRIPTION_MAX && "red.500"}
          >
            {description.length} / {DESCRIPTION_MAX}
          </Text>
        </Box>

        <Box w="95%">
          <InputGroup>
            <Input
              placeholder="zipo.me/CustomLink"
              readOnly
              value={customLink}
              {...inputProps2}
            />
            <InputRightElement
              children={<Image src="Link_Correct.svg" w="16px" />}
            />
          </InputGroup>
        </Box>
      </Box>

      <Button
        width="95%"
        variant="solid"
        bgColor={"zipo.500"}
        fontSize="14px"
        fontWeight={500}
        color={"white"}
        rounded="3xl"
        fontFamily={"montserrat"}
        h={12}
        _hover={{
          opacity: 0.9,
        }}
        isDisabled={loading}
        isLoading={loading}
        onClick={() => handleCombineLink()}
      >
        Combine
      </Button>
    </>
  );
};

export default DescriptionAndTitle;
