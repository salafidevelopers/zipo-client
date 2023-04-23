import { AddIcon, DeleteIcon, TriangleDownIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { socialLinks } from './utils';
import { randomCh } from '../../utils/misc';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { COMBINE_LINK, GET_LINKS, IS_LINK_CUSTOMIZABLE } from './gql';
import { useLazyQuery, useMutation } from '@apollo/client';

const inputProps = {
  variant: 'outline',
  h: 12,
  borderRightRadius: 100,
  borderColor: 'zipo.deep',
  fontSize: '13px',
  borderLeft: 'none',
  color: '#222222',
};

const inputProps2 = {
  variant: 'outline',
  h: 12,
  borderRadius: 100,
  borderColor: 'zipo.deep',
  fontSize: '13px',
  color: '#222222',
};

const initialLinks = [
  { title: 'facebook', id: randomCh(8), url: '' },
  { title: 'twitter', id: randomCh(8), url: '' },
];

export default function CombineLink({
  finalRef,
  initialRef,
  onClose,
  setModalType,
}) {
  const toast = useToast();
  const [initLinks, setInitLinks] = React.useState(initialLinks);
  const [step, setStep] = React.useState('step_1');
  const [customLink, setCustomLink] = React.useState('zipo.me/');

  const handleLinkDelete = (id) => {
    if (initLinks.length <= 2) {
      toast({
        id: '26480',
        title: 'Links cannot be less than 2',
        description: '',
        status: 'error',
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
      { title: 'others', id: randomCh(8), url: undefined },
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
      rounded={'3xl'}
      w={{ base: '90%' }}
      top={{ base: '4rem', md: 'auto' }}
    >
      <ModalHeader>Combine Links</ModalHeader>
      {step === 'step_1' ? (
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
          setModalType={setModalType}
          setInitLinks={setInitLinks}
        />
      ) : step === 'step_2' ? (
        <SecondStep
          finalRef={finalRef}
          initLinks={initLinks}
          setInitLinks={setInitLinks}
          handleLinkEdit={handleLinkEdit}
          handleLinkDelete={handleLinkDelete}
          handleLinkAdd={handleLinkAdd}
          customLink={customLink}
          setCustomLink={setCustomLink}
          setStep={setStep}
          onClose={onClose}
        />
      ) : (
        <ThirdStep
          finalRef={finalRef}
          initLinks={initLinks}
          handleLinkEdit={handleLinkEdit}
          setStep={setStep}
          onClose={onClose}
          customLink={customLink}
          setModalType={setModalType}
          setInitLinks={setInitLinks}
          setCustomLink={setCustomLink}
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
        leftIcon={<Image src={src} w='20px' />}
        h={12}
        pr={4}
        pl={4}
        borderLeftRadius={100}
        borderColor='#222222'
        borderRightColor='#22222220'
        variant='outline'
      >
        <TriangleDownIcon color='#22222230' fontSize={'11px'} ml={1} />
      </MenuButton>

      <MenuList>
        {socialLinks.map((link) => {
          return (
            <MenuItem
              icon={<Image src={link.src} w='20px' />}
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
  setModalType,
  setInitLinks,
}) => {
  React.useEffect(() => {
    console.log('turning on');
    return () => {
      console.log('shutting down');
    };
  }, []);

  const handleContinue = () => {
    if (initLinks.filter((link) => link.url !== undefined).length < 2) {
      toast({
        id: '26480',
        title: 'Please add at least 2 links',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setStep('step_2');
    }
  };
  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w='full'>
        <VStack w='full' alignItems={'flex-start'}>
          <Box pb={3} w='full'>
            <VStack
              w='full'
              alignItems={'flex-start'}
              maxH={'180px'}
              overflowY='auto'
            >
              {initLinks.map((link) => {
                return (
                  <HStack spacing={0} w='95%' key={link.id}>
                    <SelectSocials
                      title={link.title}
                      id={link.id}
                      handleLinkEdit={handleLinkEdit}
                    />
                    <InputGroup>
                      <Input
                        placeholder='Paste link here'
                        value={link.url}
                        {...inputProps}
                        onChange={(e) => {
                          handleLinkUrl(e.target.value, link.id);
                        }}
                      />
                      <InputRightElement
                        children={
                          <DeleteIcon
                            fontSize={'13px'}
                            cursor='pointer'
                            _hover={{ color: 'red.500' }}
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
            width='95%'
            variant='outline'
            fontSize='14px'
            fontWeight={400}
            color={'zipo.deep'}
            borderColor='#222222'
            rounded='3xl'
            fontFamily={'montserrat'}
            rightIcon={<AddIcon fontSize={'10px'} />}
            h={12}
            _hover={{
              opacity: 0.9,
            }}
            onClick={() => handleLinkAdd()}
          >
            Add more links
          </Button>{' '}
          <Button
            width='95%'
            variant='solid'
            bgColor={'zipo.500'}
            fontSize='14px'
            fontWeight={500}
            color={'white'}
            rounded='3xl'
            fontFamily={'montserrat'}
            h={12}
            _hover={{
              opacity: 0.9,
            }}
            onClick={() => {
              handleContinue();
            }}
          >
            Continue
          </Button>{' '}
        </VStack>
      </ModalBody>

      <ModalFooter
        justifyContent={'space-between'}
        w={{ base: '80%', md: '62%' }}
      >
        <Button
          variant={'outline'}
          rounded='3xl'
          color='zipo.black'
          fontSize={'13px'}
          fontWeight={500}
          px={6}
          py={5}
          _focus={{
            bg: 'white',
            color: 'zipo.black',
            borderColor: 'zipo.black',
          }}
          borderColor={'zipo.black'}
          onClick={() => {
            console.log('clicked');
            setInitLinks(initialLinks);
            setModalType('create_link');
          }}
        >
          Back
        </Button>
        <Text fontSize={'13px'}>1 of 3 steps</Text>
      </ModalFooter>
    </>
  );
};

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
  const [linkTitle, setLinkTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

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
        id: '26480',
        title: 'Title too short',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (description.length > 100) {
      toast({
        id: '26481',
        title: 'Description must not exceed 100 characters',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    combineLink();
  };

  return (
    <>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w='full'>
        <VStack w='full' alignItems={'flex-start'} spacing={3}>
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
        justifyContent={'space-between'}
        w={{ base: '80%', md: '62%' }}
      >
        {data ? (
          <Button
            variant={'solid'}
            rounded='3xl'
            color='white'
            bg='zipo.500'
            fontSize={'13px'}
            fontWeight={500}
            px={6}
            py={5}
            _hover={{
              bg: 'zipo.400',
              // color: 'zipo.black',
            }}
            borderColor={'zipo.black'}
            onClick={() => {
              reset();
              onClose();
              setLinkTitle('');
              setDescription('');
              setInitLinks(initialLinks);
              setCustomLink('zipo.me/');
              setModalType('create_link');
            }}
          >
            Done
          </Button>
        ) : (
          <Button
            variant={'outline'}
            rounded='3xl'
            color='zipo.black'
            fontSize={'13px'}
            fontWeight={500}
            px={6}
            py={5}
            _focus={{
              bg: 'white',
              color: 'zipo.black',
              borderColor: 'zipo.black',
            }}
            borderColor={'zipo.black'}
            onClick={() => setStep('step_2')}
            isDisabled={loading}
          >
            Back
          </Button>
        )}

        <Text fontSize={'13px'}>3 of 3 steps</Text>
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
      <Box pb={3} w='full'>
        <VStack
          w='full'
          alignItems={'flex-start'}
          maxH={'180px'}
          overflowY='auto'
          spacing={3}
        >
          {initLinks.map((link) => {
            return (
              <HStack spacing={0} w='95%' key={link.id}>
                <SelectSocials
                  title={link.title}
                  id={link.id}
                  handleLinkEdit={handleLinkEdit}
                />
                <InputGroup>
                  <Input
                    placeholder='Paste link here'
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
      <Box w='95%'>
        <InputGroup>
          <Input
            placeholder='zipo.me/CustomLink'
            readOnly
            value={customLink}
            {...inputProps2}
          />
          <InputRightElement width='4.5rem'>
            <Button
              variant={'text'}
              size='sm'
              color={'zipo.500'}
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
          flexWrap={'wrap'}
          mt={4}
          justifyContent={{ base: 'center', md: 'flex-end' }}
        >
          <HStack spacing={3}>
            <img
              src='Share_Black.svg'
              style={{ display: 'inline' }}
              width={20}
            />
            <Text mr={2}>Click any icon to share. </Text>
          </HStack>

          <Box pt={{ base: 2, md: 0 }}>
            <WhatsappShareButton
              url={combinedLink}
              children={<ShareIcon src='Whatsapp_Black.svg' />}
            />
            <FacebookShareButton
              url={combinedLink}
              children={<ShareIcon src='Facebook_Black.svg' />}
            />
            <LinkedinShareButton
              url={combinedLink}
              children={<ShareIcon src='Linkedin_Black.svg' />}
            />
            <TwitterShareButton
              url={combinedLink}
              children={<ShareIcon src='Twitter_Black.svg' />}
            />
            <img
              width={29}
              style={{
                marginLeft: '5px',
                display: 'inline',
                cursor: 'pointer',
              }}
              alt='share'
              src='Copylink_Black.svg'
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
}) => {
  const DESCRIPTION_MAX = 100;

  return (
    <>
      <Box w='full'>
        <InputGroup w='95%' mb={3}>
          <Input
            placeholder='Link Title'
            {...inputProps2}
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
          />
        </InputGroup>
        <Box position={'relative'} w='95%' mb={8}>
          <Textarea
            placeholder={`Description (${DESCRIPTION_MAX} characters max)`}
            onChange={(e) => setDescription(e.target.value)}
            borderColor='zipo.deep'
            fontSize={'13px'}
            borderRadius='2xl'
            isInvalid={description.length > DESCRIPTION_MAX ? true : false}
            ringColor={description.length > DESCRIPTION_MAX && 'red.500'}
          />
          <Text
            fontSize={'10px'}
            fontWeight={600}
            position='absolute'
            bottom={-4}
            right={0}
            opacity={0.5}
            color={description.length > DESCRIPTION_MAX && 'red.500'}
          >
            {description.length} / {DESCRIPTION_MAX}
          </Text>
        </Box>

        <Box w='95%'>
          <InputGroup>
            <Input
              placeholder='zipo.me/CustomLink'
              readOnly
              value={customLink}
              {...inputProps2}
            />
            <InputRightElement
              children={<Image src='Link_Correct.svg' w='16px' />}
            />
          </InputGroup>
        </Box>
      </Box>

      <Button
        width='95%'
        variant='solid'
        bgColor={'zipo.500'}
        fontSize='14px'
        fontWeight={500}
        color={'white'}
        rounded='3xl'
        fontFamily={'montserrat'}
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
      <ModalBody ref={finalRef} as={VStack} spacing={7} w='full'>
        <VStack w='full' alignItems={'flex-start'} spacing={3}>
          <Box pb={3} w='full'>
            <VStack
              w='full'
              alignItems={'flex-start'}
              maxH={'180px'}
              overflowY='auto'
            >
              {initLinks.map((link) => {
                return (
                  <HStack spacing={0} w='95%' key={link.id}>
                    <SelectSocials
                      title={link.title}
                      id={link.id}
                      handleLinkEdit={handleLinkEdit}
                    />
                    <InputGroup>
                      <Input
                        placeholder='Paste link here'
                        value={link.url}
                        readOnly
                        {...inputProps}
                      />
                      <InputRightElement
                        children={
                          <DeleteIcon
                            fontSize={'13px'}
                            cursor='pointer'
                            _hover={{ color: 'red.500' }}
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
          <Box w='95%'>
            <CustomLinkBox
              setCustomLink={setCustomLink}
              customLink={customLink}
              customizeReady={customizeReady}
              setCustomizeReady={setCustomizeReady}
            />
          </Box>
          <Button
            width='95%'
            variant='solid'
            bgColor={'zipo.500'}
            fontSize='14px'
            fontWeight={500}
            color={'white'}
            rounded='3xl'
            fontFamily={'montserrat'}
            h={12}
            _hover={{
              opacity: 0.9,
            }}
            onClick={() => setStep('step_3')}
            isDisabled={!customizeReady}
          >
            Continue
          </Button>{' '}
        </VStack>
      </ModalBody>

      <ModalFooter
        justifyContent={'space-between'}
        w={{ base: '80%', md: '62%' }}
      >
        <Button
          variant={'outline'}
          rounded='3xl'
          color='zipo.black'
          fontSize={'13px'}
          fontWeight={500}
          px={6}
          py={5}
          _focus={{
            bg: 'white',
            color: 'zipo.black',
            borderColor: 'zipo.black',
          }}
          borderColor={'zipo.black'}
          onClick={() => setStep('step_1')}
        >
          Back
        </Button>
        <Text fontSize={'13px'}>2 of 3 steps</Text>
      </ModalFooter>
    </>
  );
};

const CustomLinkBox = ({
  setCustomLink,
  customLink,
  customizeReady,
  setCustomizeReady,
}) => {
  const [isLinkCustomizable, { loading, data, error }] =
    useLazyQuery(IS_LINK_CUSTOMIZABLE);

  const handleCustomLink = (value) => {
    setCustomizeReady(false);
    // Make sure zipo.me/ preceeds any input by the user
    if (value.length >= 8 && value.startsWith('zipo.me/')) {
      setCustomLink(value);

      // Make sure that only links above 10 characters are sorted for
      if (value.length > 10 && !loading) {
        isLinkCustomizable({
          variables: { path: value.slice(8) },
          onCompleted: (data) => {
            if (data?.link_isCustomizable) {
              setCustomizeReady(true);
            }
          },
          fetchPolicy: 'network-only',
        });
      }
    }
  };
  return (
    <InputGroup w='full'>
      <Input
        placeholder='zipo.me/CustomLink'
        onChange={(e) => {
          handleCustomLink(e.target.value);
        }}
        value={customLink}
        {...inputProps2}
      />
      <InputRightElement
        children={
          loading ? (
            <Spinner size='xs' />
          ) : customizeReady ? (
            <Image src='Link_Correct.svg' />
          ) : (
            <Image src='Link_Wrong.svg' />
          )
        }
      />
    </InputGroup>
  );
};

const ShareIcon = ({ src }) => {
  return (
    <img
      src={src}
      width={25}
      style={{ marginLeft: '3px', display: 'inline' }}
      alt='share'
    />
  );
};

// Functions
const handleLinkCopy = (toast, link) => {
  navigator.clipboard.writeText(link);
  if (!toast.isActive(link)) {
    toast({
      id: Math.random(),
      title: 'Link copied',
      description: link,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }
};
