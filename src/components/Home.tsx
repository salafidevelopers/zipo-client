import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { Tooltip } from 'recharts';

import Footer from './Footer';
import { SHORTEN_LINK } from './gql';
import HeadComponent from './Head';
import Header from './Header';
import Wrapper from './Wrapper';

const getAlternators = () => {
  return [];
};

function HomePage() {
  const [longLink, setLongLink] = useState('');

  const [shortenLink, { data, loading, error, reset }] = useMutation(
    SHORTEN_LINK,
    {
      variables: { link: longLink, alternators: getAlternators() },
    }
  );

  return (
    <Box w='100vw'>
      <HeadComponent title='Zipo' />
      <Header fixed={false} isAuthenticated={false} />
      <Wrapper>
        <Box display={'flex'} justifyContent='center' alignItems={'center'}>
          <Box w={{ base: 'full', md: '50vw' }} p={4}>
            <VStack spacing={2}>
              <Heading
                textAlign={'center'}
                maxW='450px'
                size={'lg'}
                lineHeight={1.4}
                position={'relative'}
              >
                Get your Link shortened in Just A Click
                <Image
                  src='/Pattern_1.svg'
                  alt='pattern 1'
                  width={15}
                  height={15}
                  style={{ position: 'absolute', right: -10, top: -10 }}
                />
              </Heading>
              <Text fontSize='sm' fontWeight={500} textAlign='center'>
                Insert your link below to shorten or{' '}
                <Link
                  href='/login'
                  as={NextLink}
                  color='zipo.500'
                  textDecoration={'underline'}
                >
                  login
                </Link>{' '}
                to customize and combine links
              </Text>
            </VStack>
            {data ? (
              <ContentTwo
                setLongLink={setLongLink}
                reset={reset}
                alternators={data.link_shorten.data.alternators}
                path={data.link_shorten.data.path}
              />
            ) : (
              <ContentOne
                loading={loading}
                setLongLink={setLongLink}
                longLink={longLink}
                shortenLink={shortenLink}
              />
            )}

            <Box w='full' h='200px' position={'relative'}>
              <Image fill alt='Homepage pattern' src='/Homepage_Pattern.svg' />
            </Box>
          </Box>
        </Box>
      </Wrapper>

      <Footer />
    </Box>
  );
}

// Components
const ContentOne = ({ loading, setLongLink, longLink, shortenLink }) => {
  const toast = useToast();
  return (
    <InputGroup size='sm' mt={10}>
      <Input
        variant={'outline'}
        placeholder='Paste link here'
        type='text'
        value={longLink}
        onChange={(e) => setLongLink(e.target.value)}
        h={12}
        borderLeftRadius={100}
        borderColor='zipo.deep'
      />
      <InputRightAddon
        children={
          loading ? (
            <Button isLoading={loading} color='white' bg='none' />
          ) : (
            'Shorten'
          )
        }
        h={12}
        borderRightRadius={100}
        cursor='pointer'
        bgColor={'zipo.500'}
        color='white'
        px={{ base: 4, md: 8 }}
        fontWeight={500}
        _hover={{ opacity: 0.9 }}
        onClick={() => {
          if (longLink.length < 3) {
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
          shortenLink();
        }}
      />
    </InputGroup>
  );
};

const ContentTwo = ({ reset, setLongLink, alternators, path }) => {
  const toast = useToast();
  const [suggestion, setSuggestion] = useState(true);
  const isSuggestionShowing = alternators.length > 0 && suggestion === true;
  const link = 'zipo.me/' + path;

  console.log(alternators);
  return (
    <>
      <Text
        mt={5}
        w={'full'}
        textAlign={isSuggestionShowing ? 'right' : 'center'}
        color='red.500'
        textDecoration={'underline'}
        cursor='pointer'
        onClick={() => {
          reset();
          setLongLink('');
        }}
      >
        Reset
      </Text>
      <InputGroup size='sm' position='relative' mt={2}>
        <Box left={2}>
          {alternators.length > 0 && (
            <Suggestion
              path={path}
              suggestion={suggestion}
              setSuggestion={setSuggestion}
              alternators={alternators}
              toast={toast}
            />
          )}
        </Box>
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
        mt={4}
        justifyContent={{ base: 'center', md: 'flex-end' }}
      >
        <HStack spacing={3}>
          <img src='Share_Black.svg' style={{ display: 'inline' }} width={20} />
          <Text mr={2}>Click any icon to share. </Text>
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

const Suggestion = ({
  setSuggestion,
  suggestion,
  alternators,
  path,
  toast,
}) => {
  const link = 'zipo.me/' + alternators[0] + '/' + path;

  return (
    <Popover
      isOpen={suggestion}
      onClose={() => setSuggestion(false)}
      placement='top-start'
      arrowPadding={80}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box></Box>
      </PopoverTrigger>
      <PopoverContent
        bg='zipo.500'
        color='white'
        fontSize='9px'
        width={{ base: '240px' , md: "260px"}}
      >
        <PopoverHeader borderBottom='none'>Copy this instead?</PopoverHeader>
        <PopoverArrow bg='zipo.500' />
        <PopoverCloseButton color='white' fontSize='6px' />
        <PopoverBody
          fontSize='13px'
          fontWeight={'normal'}
          w='full'
          as={HStack}
          justifyContent='space-between'
        >
          <Text> {link}</Text>
          <Img
            src='/Link.svg'
            w='17px'
            cursor={'pointer'}
            onClick={() => {
              handleLinkCopy(toast, link);
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
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

export default HomePage;
