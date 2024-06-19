import React from "react";
import StatPage from "../../components/stats/Stat";
import { Box, Text } from "@chakra-ui/react";
import HeadComponent from "../../components/Head";
import RawHeader from "../../components/RawHeader";

function Stat() {
  return (
    <Box>
      <HeadComponent title="Statistics" />
      <RawHeader fixed={false} />
      <Text fontSize="3xl">Coming Soon...</Text>
      {/* <StatPage /> */}
    </Box>
  );
}

export default Stat;
