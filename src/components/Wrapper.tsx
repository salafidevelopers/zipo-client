import { Container } from "@chakra-ui/react";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <Container maxW="container.lg" pt={4} pb={{ base: "5rem" }}>
      {children}
    </Container>
  );
};

export default Wrapper;
