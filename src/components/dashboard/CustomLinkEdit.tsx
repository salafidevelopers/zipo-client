import { useMutation } from "@apollo/client";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  Image,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import { GET_LINKS, EDIT_CUSTOM_LINK } from "./gql";

const inputProps = {
  variant: "outline",
  h: 12,
  borderRadius: 100,
  borderColor: "zipo.deep",
  fontSize: "13px",
};

export default function CustomLinkEdit({
  finalRef,
  initialRef,
  onClose,
  link,
  setLinkToEdit,
  setEditMode,
}) {
  const [longUrl, setLongUrl] = React.useState(link.link);
  const toast = useToast();

  const [editCustomLink, { data, loading, error, reset }] = useMutation(
    EDIT_CUSTOM_LINK,

    {
      variables: { link: longUrl, id: link._id },
      refetchQueries: [GET_LINKS],
    }
  );

  if (error) {
    toast({
      id: "123",
      title: "Failed",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    reset();
  }

  if (data) {
    toast({
      id: "123",
      title: "Link Edited",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // setEditMode(false);
    // setLinkToEdit({});
    reset();
    // onClose();
  }

  const handleLongUrl = (e: any) => {
    setLongUrl(e.target.value);
  };

  return (
    <ModalContent
      p={{ base: 2, md: 8 }}
      rounded={"3xl"}
      w={{ base: "90%" }}
      top={{ base: "4rem", md: "auto" }}
    >
      <ModalHeader>Custom Link</ModalHeader>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w="full">
        <InputGroup>
          <Input
            placeholder="https://www."
            onChange={handleLongUrl}
            isDisabled={data}
            value={longUrl}
            {...inputProps}
          />
        </InputGroup>

        <>
          {/* Custom Link  */}
          <InputGroup>
            <Input
              value={"zipo.netlify.app/" + link.path}
              readOnly
              isDisabled
              {...inputProps}
            />
            {/* <InputRightElement children={<Image src='Link_Correct.svg' />} /> */}
          </InputGroup>

          {/* Edit Button  */}
          <Button
            width="full"
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
            isDisabled={loading || link.link === longUrl}
            isLoading={loading}
            onClick={() => {
              if (longUrl.length < 3) {
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
              editCustomLink();
            }}
          >
            Edit
          </Button>
        </>
      </ModalBody>

      <ModalFooter justifyContent={"flex-start"}>
        <Button
          variant={"primary"}
          rounded="3xl"
          color="white"
          fontSize={"13px"}
          fontWeight={500}
          px={6}
          py={5}
          bg="zipo.500"
          onClick={() => {
            setLinkToEdit({});
            setEditMode(false);
            onClose();
          }}
        >
          Done
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
