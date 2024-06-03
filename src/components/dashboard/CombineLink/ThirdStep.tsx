import { useMutation } from "@apollo/client";
import {
  Button,
  ModalBody,
  ModalFooter,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { COMBINE_LINK, GET_LINKS } from "../gql";
import LinkCombined from "./LinkCombined";
import { initialLinks } from "./utils";
import DescriptionAndTitle from "./DescriptionAndTitle";

const ThirdStep = ({
  finalRef,
  initLinks,
  handleLinkEdit,
  onClose,
  setStep,
  customLink,
  setModalType,
  setInitLinks,
  setCustomLink,
}) => {
  const combinedLink = false;
  const toast = useToast();
  const [linkTitle, setLinkTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [combineLink, { loading, error, data, reset }] = useMutation(
    COMBINE_LINK,
    {
      variables: {
        path: customLink.slice(8),
        combinedLink: { description, title: linkTitle, links: initLinks },
      },
      refetchQueries: [GET_LINKS],
    }
  );

  const handleCombineLink = () => {
    if (linkTitle.length === 0) {
      toast({
        id: "26480",
        title: "Title too short",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (description.length > 100) {
      toast({
        id: "26481",
        title: "Description must not exceed 100 characters",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    combineLink();
  };

  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w="full">
        <VStack w="full" alignItems={"flex-start"} spacing={3}>
          {data ? (
            <LinkCombined
              initLinks={initLinks}
              customLink={customLink}
              combinedLink={combinedLink}
              handleLinkEdit={handleLinkEdit}
              data={data}
              reset={reset}
            />
          ) : (
            <DescriptionAndTitle
              description={description}
              setDescription={setDescription}
              linkTitle={linkTitle}
              setLinkTitle={setLinkTitle}
              setStep={setStep}
              customLink={customLink}
              handleCombineLink={handleCombineLink}
              loading={loading}
            />
          )}
        </VStack>
      </ModalBody>

      <ModalFooter
        justifyContent={"space-between"}
        w={{ base: "80%", md: "62%" }}
      >
        {data ? (
          <Button
            variant={"solid"}
            rounded="3xl"
            color="white"
            bg="zipo.500"
            fontSize={"13px"}
            fontWeight={500}
            px={6}
            py={5}
            _hover={{
              bg: "zipo.400",
              // color: 'zipo.black',
            }}
            borderColor={"zipo.black"}
            onClick={() => {
              reset();
              onClose();
              setLinkTitle("");
              setDescription("");
              setInitLinks(initialLinks);
              setCustomLink("zipo.me/");
              setModalType("create_link");
            }}
          >
            Done
          </Button>
        ) : (
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
            onClick={() => setStep("step_2")}
            isDisabled={loading}
          >
            Back
          </Button>
        )}

        <Text fontSize={"13px"}>3 of 3 steps</Text>
      </ModalFooter>
    </>
  );
};

export default ThirdStep;
