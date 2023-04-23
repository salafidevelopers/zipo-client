import { useLazyQuery, useMutation } from '@apollo/client';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { GET_LINKS, IS_LINK_CUSTOMIZABLE, SHORTEN_LINK_CUSTOM } from './gql';

const inputProps = {
  variant: 'outline',
  h: 12,
  borderRadius: 100,
  borderColor: 'zipo.deep',
  fontSize: '13px',
};

export default function CustomLink({
  finalRef,
  initialRef,
  onClose,
  setModalType,
}) {
  const [shortenedLink, setShortenedLink] = React.useState('');
  const [customLink, setCustomLink] = React.useState('zipo.me/');
  const [longUrl, setLongUrl] = React.useState('');
  const [customizeReady, setCustomizeReady] = React.useState(false);
  const toast = useToast();

  const [shortenCustomLink, { data, loading, error, reset }] = useMutation(
    SHORTEN_LINK_CUSTOM,

    {
      variables: { link: longUrl, path: customLink.slice(8), alternators: [] },
      refetchQueries: [GET_LINKS],
    }
  );

  if (error) {
    toast({
      id: '123',
      title: 'Failed',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    reset();
  }

  const handleLongUrl = (e: any) => {
    setLongUrl(e.target.value);
  };

  return (
    <ModalContent
      p={{ base: 2, md: 8 }}
      rounded={'3xl'}
      w={{ base: '90%' }}
      top={{ base: '4rem', md: 'auto' }}
    >
      <ModalHeader>Custom Link</ModalHeader>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w='full'>
        <InputGroup>
          <Input
            placeholder='https://www.'
            onChange={handleLongUrl}
            isDisabled={data}
            value={longUrl}
            {...inputProps}
          />
        </InputGroup>
        {!data ? (
          <>
            <CustomLinkBox
              customLink={customLink}
              setCustomLink={setCustomLink}
              customizeReady={customizeReady}
              setCustomizeReady={setCustomizeReady}
            />
            <Button
              width='full'
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
              isDisabled={!customizeReady || loading}
              isLoading={loading}
              onClick={() => {
                if (longUrl.length < 3) {
                  toast({
                    id: '123',
                    title: 'Too short',
                    description: 'Link is too short',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
                }
                shortenCustomLink();
              }}
            >
              Customize
            </Button>
          </>
        ) : (
          <ContentTwo
            link={'zipo.me/' + data.link_shortenCustom.data.path}
            reset={reset}
            setLongUrl={setLongUrl}
            setCustomLink={setCustomLink}
          />
        )}
      </ModalBody>

      <ModalFooter justifyContent={'flex-start'}>
        {!shortenedLink ? (
          <Button
            variant={'outline'}
            rounded='3xl'
            color='zipo.black'
            fontSize={'13px'}
            fontWeight={500}
            px={6}
            py={5}
            _focus={{
              bg: 'zipo.200',
              color: 'white',
              borderColor: 'zipo.200',
            }}
            _hover={{
              bg: 'zipo.500',
              color: 'white',
              borderColor: 'zipo.500',
            }}
            borderColor={'zipo.black'}
            onClick={() => {
              setModalType('create_link');
            }}
          >
            Back
          </Button>
        ) : (
          <Button
            variant={'primary'}
            rounded='3xl'
            color='white'
            fontSize={'13px'}
            fontWeight={500}
            px={6}
            py={5}
            bg='zipo.500'
            onClick={() => {
              setModalType('create_link');
              onClose();
            }}
          >
            Done
          </Button>
        )}
      </ModalFooter>
    </ModalContent>
  );
}

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
    <InputGroup>
      <Input
        placeholder='zipo.me/CustomLink'
        onChange={(e) => {
          handleCustomLink(e.target.value);
        }}
        value={customLink}
        {...inputProps}
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

const ContentTwo = ({ link, reset, setLongUrl, setCustomLink }) => {
  const toast = useToast();
  return (
    <>
      <Text
        mt={4}
        w={'full'}
        textAlign='center'
        color='red.500'
        textDecoration={'underline'}
        cursor='pointer'
        onClick={() => {
          reset();
          setLongUrl('');
          setCustomLink('zipo.me/');
        }}
      >
        Reset
      </Text>
      <InputGroup size='sm' mt={2}>
        <Input
          variant={'outline'}
          value={link}
          h={12}
          borderRadius={100}
          borderColor='zipo.deep'
          fontWeight={500}
          readOnly
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
              handleLinkCopy(toast, link);
            }}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>

      <HStack
        flexWrap={'wrap'}
        mt={1}
        justifyContent={{ base: 'center', md: 'flex-end' }}
      >
        <HStack spacing={3}>
          <img src='Share_Black.svg' style={{ display: 'inline' }} width={20} />
          <Text mr={2}>Share link. </Text>
        </HStack>

        <Box pt={{ base: 2, md: 0 }}>
          <WhatsappShareButton
            url={link}
            children={<ShareIcon src='Whatsapp_Black.svg' />}
          />
          <FacebookShareButton
            url={link}
            children={<ShareIcon src='Facebook_Black.svg' />}
          />
          <LinkedinShareButton
            url={link}
            children={<ShareIcon src='Linkedin_Black.svg' />}
          />
          <TwitterShareButton
            url={link}
            children={<ShareIcon src='Twitter_Black.svg' />}
          />
          <img
            width={29}
            style={{ marginLeft: '5px', display: 'inline', cursor: 'pointer' }}
            alt='share'
            src='Copylink_Black.svg'
            onClick={() => {
              handleLinkCopy(toast, link);
            }}
          />
        </Box>
      </HStack>
    </>
  );
};

const ShareIcon = ({ src }) => {
  return (
    <img
      src={src}
      width={29}
      style={{ marginLeft: '5px', display: 'inline' }}
      alt='share'
    />
  );
};

// Functions
const handleLinkCopy = (toast, link) => {
  navigator.clipboard.writeText(link);
  if (!toast.isActive(link)) {
    toast({
      id: link,
      title: 'Link copied',
      description: link,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }
};
