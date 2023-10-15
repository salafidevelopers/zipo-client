import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
  useToast,
  VStack,
  Image,
  SimpleGrid,
  Divider,
  Modal,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import HeadComponent from '../Head';
import Header from '../Header';
import Wrapper from '../Wrapper';
import CombineLink from './CombineLink';
import CustomLink from './CustomLink';
import CreateLink from './CreateLink';
import { isLoggedIn } from '../../utils/auth';
import { useRouter } from 'next/router';
import PrivateRoute from '../PrivateRoute';
import { GET_LINKS } from './gql';
import { useQuery } from '@apollo/client';
import CustomLinkEdit from './CustomLinkEdit';
import CombineLinkEdit from './CombineLinkEdit';

function Main() {
  const [editMode, setEditMode] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mediumScreenAbove] = useMediaQuery('(min-width: 768px)');
  const { data, error, loading } = useQuery(GET_LINKS);

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  return (
    <VStack h='100vh' w='100vw' justify={'space-between'}>
      <HeadComponent title='Dashboard - Zipo' />
      <Box>
        <Header fixed={false} isAuthenticated={true} />
        <Wrapper>
          <Box
            display={'flex'}
            justifyContent='center'
            alignItems={'flex-start'}
            //   minH='70vh'
            h={'100%'}
            fontSize={'sm'}
          >
            <VStack w='full' spacing={8}>
              <HStack w='full' justify={'space-between'}>
                <Text fontSize={'md'} fontWeight={600}>
                  Dashboard
                </Text>

                {data?.links.length &&
                  (mediumScreenAbove ? (
                    <Button
                      color='zipo.black'
                      fontSize={'12px'}
                      fontWeight={500}
                      leftIcon={<AddIcon />}
                      variant='outline'
                      rounded='xl'
                      _focus={{
                        bg: 'zipo.300',
                        color: 'white',
                        borderColor: 'zipo.300',
                      }}
                      borderColor={'zipo.black'}
                      _hover={{
                        bg: 'zipo.500',
                        color: 'white',
                        borderColor: 'zipo.500',
                      }}
                      onClick={onOpen}
                    >
                      Create New Link
                    </Button>
                  ) : (
                    <IconButton
                      color='zipo.black'
                      variant={'outline'}
                      textColor='zipo.black'
                      border='1px'
                      _hover={{
                        bgColor: 'zipo.500',
                        color: 'white',
                        border: 'none',
                      }}
                      borderRadius={'100%'}
                      borderColor={'zipo.black'}
                      aria-label='Create new link'
                      icon={<AddIcon />}
                      onClick={onOpen}
                    />
                  ))}
              </HStack>
              {loading && (
                <VStack w='full' h='50vh' justify={'center'}>
                  <Spinner size={'lg'} />
                </VStack>
              )}
              {data && data.links.length === 0 ? (
                <Box w='full'>
                  <HStack justify={'flex-start'} spacing={4}>
                    {' '}
                    <IconButton
                      color='zipo.black'
                      variant={'outline'}
                      border='1px'
                      _hover={{
                        bgColor: 'zipo.500',
                        color: 'white',
                        borderColor: 'zipo.500',
                        opacity: 1,
                      }}
                      rounded='lg'
                      h={'60px'}
                      w={'60px'}
                      fontSize='xl'
                      size={'lg'}
                      borderColor={'zipo.black'}
                      aria-label='Create new link'
                      icon={<AddIcon />}
                      opacity={0.7}
                      onClick={onOpen}
                    />
                    <Text fontSize='13px' opacity={0.7}>
                      Create New Link
                    </Text>
                  </HStack>
                  <Text
                    fontSize={'13px'}
                    w='full'
                    textAlign={'center'}
                    mt={28}
                    opacity={0.4}
                  >
                    No link yet. Click on the plus icon to get started
                  </Text>
                </Box>
              ) : (
                <Links
                  links={data?.links || []}
                  setLinkToEdit={setLinkToEdit}
                  setEditMode={setEditMode}
                  onOpen={onOpen}
                />
              )}
            </VStack>
          </Box>
        </Wrapper>
      </Box>

      {/* Create link modal  */}

      {editMode && (
        <LinkEditHandlerModal
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          link={linkToEdit}
          setLinkToEdit={setLinkToEdit}
          setEditMode={setEditMode}
        />
      )}

      {!editMode && (
        <LinkHandlerModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      )}
      {/* <Footer /> */}
    </VStack>
  );
}

const Links = ({ links, setLinkToEdit, setEditMode, onOpen }) => {
  const toast = useToast();
  return (
    <SimpleGrid spacing={2} minChildWidth='160px' w='full'>
      {links.map((link) => {
        return (
          <VStack
            key={link.id}
            w={'160px'}
            spacing={2}
            border='1px #22222230 solid'
            rounded='3xl'
            mb={2}
          >
            <VStack w='full'>
              <HStack w='full' px={4} pt={4} justify={'space-between'}>
                <Image
                  src={
                    link.type === 'Shortened'
                      ? 'Shortened_Link.svg'
                      : 'Combined_Link.svg'
                  }
                  w='25px'
                />
                <Image
                  src='Edit.svg'
                  w='20px'
                  cursor={'pointer'}
                  onClick={() => {
                    onOpen();
                    setEditMode(true);
                    setLinkToEdit(link);
                  }}
                />
              </HStack>
              {/* <a href={'https://zipo.me/' + link.path} target='_blank'> */}
              <Box
                onClick={() => {
                  navigator.clipboard.writeText('https://zipo.me/' + link.path);
                  toast({
                    id: link.path,
                    title: 'Link copied',
                    status: 'success',
                    duration: 3000,
                  });
                }}
                cursor='pointer'
                p={2}
                rounded='full'
                bg={link.type === 'Shortened' ? 'zipo.500' : 'red'}
              >
                <Image src='Link.svg' w={'30px'} />
              </Box>
              {/* </a> */}
            </VStack>
            <Text
              fontWeight={500}
              fontSize='12px'
              maxW='145px'
              textAlign={'center'}
              noOfLines={1}
            >
              {link.path}
            </Text>
            <Divider color={'#22222230'} />

            <Box>
              <Link href={`/stat/${link.id}`}>
                <Button
                  leftIcon={<Image src='Stat_Icon.svg' w='20px' />}
                  variant='link'
                  color='zipo.500'
                  fontWeight={400}
                  fontSize='12px'
                  iconSpacing={'3px'}
                  textDecoration='none'
                  disabled
                >
                  View Stat
                </Button>
              </Link>
            </Box>
          </VStack>
        );
      })}
    </SimpleGrid>
  );
};

const LinkHandlerModal = ({ isOpen, onOpen, onClose }) => {
  const [modalType, setModalType] = React.useState('create_link');

  React.useEffect(() => {
    return () => {
      setModalType('create_link');
    };
  }, []);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        motionPreset='none'
      >
        <ModalOverlay />

        {modalType === 'create_link' ? (
          <CreateLink
            onClose={onClose}
            finalRef={finalRef}
            initialRef={initialRef}
            setModalType={setModalType}
          />
        ) : modalType === 'custom_link' ? (
          <CustomLink
            onClose={onClose}
            finalRef={finalRef}
            initialRef={initialRef}
            setModalType={setModalType}
          />
        ) : (
          <CombineLink
            onClose={onClose}
            finalRef={finalRef}
            initialRef={initialRef}
            setModalType={setModalType}
          />
        )}
      </Modal>
    </>
  );
};

const LinkEditHandlerModal = ({
  isOpen,
  onOpen,
  onClose,
  link,
  setLinkToEdit,
  setEditMode,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        motionPreset='none'
      >
        <ModalOverlay />

        {link.type === 'Shortened' ? (
          <CustomLinkEdit
            onClose={onClose}
            finalRef={finalRef}
            initialRef={initialRef}
            link={link}
            setLinkToEdit={setLinkToEdit}
            setEditMode={setEditMode}
          />
        ) : (
          <CombineLinkEdit
            onClose={onClose}
            finalRef={finalRef}
            initialRef={initialRef}
            link={link}
            setLinkToEdit={setLinkToEdit}
            setEditMode={setEditMode}
          />
        )}
      </Modal>
    </>
  );
};

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <Main />
    </PrivateRoute>
  );
};

export default DashboardPage;
