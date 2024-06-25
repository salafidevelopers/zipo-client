import { AddIcon, DeleteIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Box,
  useToast,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { socialLinks } from "./utils";
import { randomCh } from "../../utils/misc";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { EDIT_COMBINE_LINK, GET_LINKS } from "./gql";
import { useLazyQuery, useMutation } from "@apollo/client";

const inputProps = {
  variant: "outline",
  h: 12,
  borderRightRadius: 100,
  borderColor: "zipo.deep",
  fontSize: "13px",
  borderLeft: "none",
  color: "#222222",
};

const inputProps2 = {
  variant: "outline",
  h: 12,
  borderRadius: 100,
  borderColor: "zipo.deep",
  fontSize: "13px",
  color: "#222222",
};

const initialLinks = [
  { title: "facebook", id: randomCh(8), url: undefined },
  { title: "twitter", id: randomCh(8), url: undefined },
];

export default function CombineLinkEdit({
  finalRef,
  onClose,
  link,
  setLinkToEdit,
  setEditMode,
  deleteLink,
}) {
  const toast = useToast();
  const [initLinks, setInitLinks] = React.useState(
    link.combinedLink.links.map((li) => {
      return {
        id: li.id,
        title: li.title,
        url: li.url,
      };
    })
  );
  const [step, setStep] = React.useState("step_1");
  const [customLink, setCustomLink] = React.useState("zipo.me/");

  const handleLinkDelete = (id) => {
    if (initLinks.length <= 2) {
      toast({
        id: "26480",
        title: "Links cannot be less than 2",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }
    setInitLinks(initLinks.filter((link) => link.id !== id));
  };

  const handleLinkAdd = () => {
    setInitLinks([
      ...initLinks,
      { title: "others", id: randomCh(8), url: undefined },
    ]);
  };

  const handleLinkEdit = (title, id) => {
    setInitLinks(
      initLinks.map((link) => {
        if (link.id === id) {
          link.title = title;
          return link;
        }
        return link;
      })
    );
  };

  const handleLinkUrl = (url, id) => {
    setInitLinks(
      initLinks.map((link) => {
        if (link.id === id) {
          link.url = url;
          return link;
        }
        return link;
      })
    );
  };

  return (
    <ModalContent
      p={{ base: 2, md: 8 }}
      rounded={"3xl"}
      w={{ base: "90%" }}
      top={{ base: "4rem", md: "auto" }}
    >
      <ModalHeader
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <p>Combine Links</p>{" "}
        <DeleteIcon
          onClick={() => {
            deleteLink();
            setLinkToEdit({});
            setEditMode(false);
          }}
          color={"red"}
          cursor={"pointer"}
        />
      </ModalHeader>
      {step === "step_1" ? (
        <FirstStep
          toast={toast}
          finalRef={finalRef}
          initLinks={initLinks}
          handleLinkEdit={handleLinkEdit}
          handleLinkDelete={handleLinkDelete}
          handleLinkAdd={handleLinkAdd}
          handleLinkUrl={handleLinkUrl}
          setStep={setStep}
          onClose={onClose}
          setInitLinks={setInitLinks}
          setLinkToEdit={setLinkToEdit}
          setEditMode={setEditMode}
        />
      ) : (
        <SecondStep
          finalRef={finalRef}
          initLinks={initLinks}
          setStep={setStep}
          onClose={onClose}
          customLink={customLink}
          setInitLinks={setInitLinks}
          setCustomLink={setCustomLink}
          setLinkToEdit={setLinkToEdit}
          setEditMode={setEditMode}
          link={link}
        />
      )}
    </ModalContent>
  );
}

const SelectSocials = ({ title, id, handleLinkEdit }) => {
  const getLinkSrc = (title) => {
    return (
      socialLinks.find((link) => link.title === title)?.src ||
      socialLinks[socialLinks.length - 1].src
    );
  };
  const [src, setSrc] = React.useState(getLinkSrc(title));
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Image src={src} w="20px" />}
        // leftIcon={<Image src={src} w='20px' />}
        h={12}
        pr={4}
        pl={4}
        borderLeftRadius={100}
        borderColor="#222222"
        borderRightColor="#22222220"
        variant="outline"
      >
        <TriangleDownIcon color="#22222230" fontSize={"11px"} ml={1} />
      </MenuButton>

      <MenuList>
        {socialLinks.map((link) => {
          return (
            <MenuItem
              icon={<Image src={link.src} w="20px" />}
              onClick={() => {
                setSrc(getLinkSrc(link.title));
                handleLinkEdit(link.title, id);
              }}
            >
              {link.title}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

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
  setInitLinks,
  setEditMode,
  setLinkToEdit,
}) => {
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
                      key={link.id}
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
            setInitLinks(initialLinks);
            setLinkToEdit({});
            setEditMode(false);
            onClose();
          }}
        >
          Back
        </Button>
        <Text fontSize={"13px"}>1 of 2 steps</Text>
      </ModalFooter>
    </>
  );
};

const SecondStep = ({
  finalRef,
  initLinks,
  onClose,
  setStep,
  customLink,
  setInitLinks,
  setCustomLink,
  setLinkToEdit,
  setEditMode,
  link,
}) => {
  const toast = useToast();
  const [linkTitle, setLinkTitle] = React.useState(link.combinedLink.title);
  const [description, setDescription] = React.useState(
    link.combinedLink.description
  );

  const [edit, { loading, error, data, reset }] = useMutation(
    EDIT_COMBINE_LINK,
    {
      variables: {
        id: link._id,
        combinedLink: { description, title: linkTitle, links: initLinks },
      },
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
    setEditMode(false);
    setLinkToEdit({});
    reset();
    onClose();
  }

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
    edit();
  };

  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w="full">
        <VStack w="full" alignItems={"flex-start"} spacing={3}>
          <DescriptionAndTitle
            description={description}
            setDescription={setDescription}
            linkTitle={linkTitle}
            setLinkTitle={setLinkTitle}
            setStep={setStep}
            customLink={customLink}
            handleCombineLink={handleCombineLink}
            loading={loading}
            link={link}
          />
        </VStack>
      </ModalBody>

      <ModalFooter justifyContent={"space-between"} w="full">
        <VStack w="full">
          <HStack w="full" justify="space-between">
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
                setLinkToEdit({});
                setEditMode(false);
              }}
            >
              Done
            </Button>
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
              isDisabled={loading}
            >
              Back
            </Button>
          </HStack>
          <Text fontSize={"13px"}>2 of 2 steps</Text>
        </VStack>
      </ModalFooter>
    </>
  );
};

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

const DescriptionAndTitle = ({
  linkTitle,
  setLinkTitle,
  description,
  setDescription,
  customLink,
  setStep,
  handleCombineLink,
  loading,
  link,
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
            value={description}
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
              isDisabled
              value={"zipo.me/" + link.path}
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
        Edit
      </Button>
    </>
  );
};

const ShareIcon = ({ src }) => {
  return (
    <img
      src={src}
      width={25}
      style={{ marginLeft: "3px", display: "inline" }}
      alt="share"
    />
  );
};

// Functions
const handleLinkCopy = (toast, link) => {
  navigator.clipboard.writeText(link);
  if (!toast.isActive(link)) {
    toast({
      id: Math.random(),
      title: "Link copied",
      description: link,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
};
