import { DeleteIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  VStack,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  ModalFooter,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SelectSocials from "./SelectSocials";
import CustomLinkBox from "./CustomLinkBox";
import { inputProps } from "./utils";

const SecondStep = ({
  finalRef,
  initLinks,
  handleLinkEdit,
  handleLinkDelete,
  setInitLinks,
  customLink,
  setCustomLink,
  handleLinkAdd,
  onClose,
  setStep,
}) => {
  const [customizeReady, setCustomizeReady] = useState(false);
  React.useEffect(() => {
    setInitLinks(initLinks.filter((link) => link.url));
  }, []);

  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w="full">
        <VStack w="full" alignItems={"flex-start"} spacing={3}>
          <Box pb={3} w="full">
            <VStack
              w="full"
              alignItems={"flex-start"}
              maxH={"180px"}
              overflowY="auto"
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
                        value={link.url}
                        readOnly
                        {...inputProps}
                      />
                      <InputRightElement
                        children={
                          <DeleteIcon
                            fontSize={"13px"}
                            cursor="pointer"
                            _hover={{ color: "red.500" }}
                            onClick={() => handleLinkDelete(link.id)}
                          />
                        }
                      />
                    </InputGroup>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
          <Box w="95%">
            <CustomLinkBox
              setCustomLink={setCustomLink}
              customLink={customLink}
              customizeReady={customizeReady}
              setCustomizeReady={setCustomizeReady}
            />
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
            onClick={() => setStep("step_3")}
            isDisabled={!customizeReady}
          >
            Continue
          </Button>{" "}
        </VStack>
      </ModalBody>

      <ModalFooter
        justifyContent={"space-between"}
        w={{ base: "80%", md: "62%" }}
      >
        <Button
          variant={"outline"}
          rounded="3xl"
          color="zipo.black"
          fontSize={"13px"}
          fontWeight={500}
          px={6}
          py={5}
          _focus={{
            bg: "white",
            color: "zipo.black",
            borderColor: "zipo.black",
          }}
          borderColor={"zipo.black"}
          onClick={() => setStep("step_1")}
        >
          Back
        </Button>
        <Text fontSize={"13px"}>2 of 3 steps</Text>
      </ModalFooter>
    </>
  );
};

export default SecondStep;
