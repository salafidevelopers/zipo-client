import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { PureComponent } from 'react';
import { formatNumber } from '../../utils/misc';

import Footer from '../Footer';
import HeadComponent from '../Head';
import Header from '../Header';
import Wrapper from '../Wrapper';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDownIcon } from '@chakra-ui/icons';
import RawHeader from '../RawHeader';

const data = [
  {
    name: 'Page A',
    clicks: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    clicks: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    clicks: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    clicks: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    clicks: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    clicks: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    clicks: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = () => {
  const [mediumScreenAbove] = useMediaQuery('(min-width: 768px)');
  return (
    <LineChart
      width={mediumScreenAbove ? 430 : 320}
      height={mediumScreenAbove ? 230 : 230}
      data={data}
      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Line type='monotone' dataKey='clicks' stroke='#82ca9d' />
    </LineChart>
  );
};

function StatPage() {
  const link = {
    title: 'ArRisaalah Publications',
    clicks: 1009,
  };

  const [scale, setScale] = React.useState('Monthly');
  return (
    <Box h='100vh' w='100vw'>
      <HeadComponent title='Statistics' />
      <RawHeader fixed={false} />
      <Wrapper>
        <Box maxW='450px' w={{ base: 'full', md: 'auto' }}>
          <HStack spacing={4}>
            <Link href='/dashboard'>
              <Image src='/Back_Arrow.svg' w='15px' cursor={'pointer'} />
            </Link>
            <Heading size={'md'} fontWeight={600}>
              Statistics
            </Heading>
          </HStack>
          <Text mt={7} fontSize='15px' fontWeight={500}>
            {link.title}
          </Text>
          <Box mt={3} rounded='xl' border='1px solid #22222240' p={2} px={3}>
            <Text fontSize={'12px'} color='zipo.400'>
              Total Clicks
            </Text>
            <HStack justify={'space-between'} mt={3}>
              <Text fontSize={'xl'}>{formatNumber(link.clicks)}</Text>
              <Image src='/Click.svg' w='20px' bottom={2} right={3} />
            </HStack>
          </Box>
          <Box w='full' mt={3} rounded='xl' border='1px solid #22222240'>
            <HStack w='full' justify={'space-between'} p={3}>
              <Text fontSize={'14px'}>Click stat</Text>
              <Menu>
                <MenuButton
                  fontSize={'12px'}
                  p={2}
                  height='25px'
                  variant='outline'
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  {scale}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setScale('Monthly')}>
                    Monthly
                  </MenuItem>
                  <MenuItem onClick={() => setScale('Weekly')}>Weekly</MenuItem>
                  <MenuItem onClick={() => setScale('Daily')}>Daily</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Chart />
          </Box>
        </Box>
      </Wrapper>

      <Footer />
    </Box>
  );
}

export default StatPage;
