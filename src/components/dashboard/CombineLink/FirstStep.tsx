import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  VStack,
  HStack,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Button,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import SelectSocials from "./SelectSocials";
import { initialLinks, inputProps } from "./utils";

const FirstStep = ({
  finalRef,
  initLinks,
  handleLinkEdit,
  handleLinkDelete,
  handleLinkAdd,
  onClose,
  setStep,
  handleLinkUrl,
  toast,
  setModalType,
  setInitLinks,
}) => {
  useEffect(() => {
    console.log("turning on");
    return () => {
      console.log("shutting down");
    };
  }, []);

  const handleContinue = () => {
    if (initLinks.filter((link) => link.url !== undefined).length < 2) {
      toast({
        id: "26480",
        title: "Please add at least 2 links",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setStep("step_2");
    }
  };
  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w="full">
        <VStack w="full" alignItems={"flex-start"}>
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
                        {...inputProps}
                        onChange={(e) => {
                          handleLinkUrl(e.target.value, link.id);
                        }}
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
          <Button
            width="95%"
            variant="outline"
            fontSize="14px"
            fontWeight={400}
            color={"zipo.deep"}
            borderColor="#222222"
            rounded="3xl"
            fontFamily={"montserrat"}
            rightIcon={<AddIcon fontSize={"10px"} />}
            h={12}
            _hover={{
              opacity: 0.9,
            }}
            onClick={() => handleLinkAdd()}
          >
            Add more links
          </Button>{" "}
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
            onClick={() => {
              handleContinue();
            }}
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
          onClick={() => {
            console.log("clicked");
            setInitLinks(initialLinks);
            setModalType("create_link");
          }}
        >
          Back
        </Button>
        <Text fontSize={"13px"}>1 of 3 steps</Text>
      </ModalFooter>
    </>
  );
};

export default FirstStep;
