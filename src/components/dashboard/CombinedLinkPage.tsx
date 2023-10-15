import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RawHeader from '../RawHeader';
import { socialLinks } from './utils';

function CombinedLinkPage({ link }) {
  
  const content = link.combinedLink;
  return (
    <VStack justify={'space-between'} minH='100vh'>
      <RawHeader fixed={false} />

      <VStack spacing={2} maxW={{base: '250px', md: '500px'}} pb={14}>
        <Box mb={3}>
          <Image alt='zipo' src='Link_Blue.svg' width={100} height={100} />
        </Box>
        <Heading fontWeight={400}>{content.title}</Heading>
        <Text fontSize={'13px'}>{content.description}</Text>
        <HStack pt={3}>
          {content.links.map((link) => (
            <a
              href={link.url}
              key={link.id}
              style={{ cursor: 'pointer' }}
              target='_blank'
            >
              <Image
                width={35}
                height={35}
                alt={link.title}
                src={
                  socialLinks.find(
                    (socialLink) => socialLink.title === link.title
                  ).src
                }
              />
            </a>
          ))}
        </HStack>
      </VStack>
      <Text fontSize='13px'>
        You can also customize and combine your links{' '}
        <Link
          href='/dashboard'
          style={{ textDecoration: 'underline', color: '#313EF7' }}
        >
          here
        </Link>
      </Text>
    </VStack>
  );
}

export default CombinedLinkPage;
