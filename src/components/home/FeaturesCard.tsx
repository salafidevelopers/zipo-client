import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";

const FeaturesCard = ({ title, description, icon }) => {
  const IconComponent = icon;
  return (
    <Card maxW="sm" borderRadius="lg" bgColor="white" textAlign="center" p="3">
      <CardBody>
        <Box
          bgColor="zipo.500"
          p="3"
          marginInline="auto"
          borderRadius="full"
          w="fit-content"
        >
          <IconComponent boxSize={"8"} color="white" />
        </Box>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FeaturesCard;
