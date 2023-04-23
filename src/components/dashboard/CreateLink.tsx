import { AddIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';

export default function CreateLink({
  finalRef,
  initialRef,
  onClose,
  setModalType,
}) {
  return (
    <ModalContent
      p={{ base: 2, md: 8 }}
      rounded={'3xl'}
      w={{ base: '90%' }}
      top={{ base: '4rem', md: 'auto' }}
    >
      <ModalHeader>Create New Link</ModalHeader>
      <ModalBody ref={finalRef} as={VStack} spacing={7} w='full'>
        <HStack
          w='full'
          justify={'space-between'}
          border='1px solid #22222230'
          rounded='2xl'
          p={{ base: 3, md: 5 }}
          cursor='pointer'
          _hover={{ bg: 'whitesmoke' }}
          ref={initialRef}
          onClick={() => setModalType('custom_link')}
        >
          <HStack spacing={{ base: 2, md: 4 }}>
            <Image src='Shortened_Link.svg' w={{ base: '35px', md: '50px' }} />{' '}
            <VStack alignItems={'flex-start'} spacing={{ base: 0, md: 1 }}>
              <Text fontWeight={600} fontSize={{ base: '13px' }}>
                Create Custom Link
              </Text>{' '}
              <Text fontSize={{ base: '11px', md: '13px' }}>
                Branded link for your bussiness
              </Text>
            </VStack>
          </HStack>
          <AddIcon color={'#22222270'} />
        </HStack>

        <HStack
          w='full'
          justify={'space-between'}
          border='1px solid #22222230'
          rounded='2xl'
          p={{ base: 3, md: 5 }}
          cursor='pointer'
          _hover={{ bg: 'whitesmoke' }}
          onClick={() => setModalType('combine_links')}
        >
          <HStack spacing={{ base: 2, md: 4 }}>
            <Image src='Combined_Link.svg' w={{ base: '35px', md: '50px' }} />{' '}
            <VStack alignItems={'flex-start'} spacing={{ base: 0, md: 1 }}>
              <Text fontWeight={600} fontSize={{ base: '13px' }}>
                Create Combined Link
              </Text>{' '}
              <Text fontSize={{ base: '11px', md: '13px' }}>
                All your social links in one link
              </Text>
            </VStack>
          </HStack>
          <AddIcon color={'#22222270'} />
        </HStack>
      </ModalBody>

      <ModalFooter justifyContent={'flex-start'}>
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
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
