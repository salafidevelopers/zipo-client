import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Image,
  Container,
  Text,
} from "@chakra-ui/react";
import Wrapper from "../Wrapper";

const faqs = [
  {
    question: "How does link shortening work?",
    answer:
      "Zipo utilizes advanced algorithms to condense long URLs into shorter, more manageable links. Simply paste your original link into our platform, and we'll generate a short, optimized version that's ready to be shared.",
  },
  {
    question: "Can I track the performance of my shortened links?",
    answer:
      "Absolutely! Zipo offers comprehensive analytics that provide valuable insights into click-through rates, user engagement, and geographic distribution. Monitor your link performance in real-time and make data-driven decisions.",
  },
  {
    question: "Can I customize my shortened links with my brand name?",
    answer:
      "Yes, you can! Zipo allows you to create branded short links that reflect your brand identity. Establish trust and credibility with every click by incorporating your brand name into your URLs.",
  },
  {
    question: "Can I manage all my links in one place?",
    answer:
      "Definitely! Our user-friendly dashboard enables you to manage all your links from a single centralized location. Organize, categorize, and track your links effortlessly, ensuring maximum efficiency and productivity.",
  },
  {
    question: "Is my data secure with Zipo?",
    answer:
      "Absolutely. We prioritize the security and privacy of your data. Zipo implements state-of-the-art security measures to safeguard your information, ensuring a secure and reliable link management experience.",
  },
];

const FaqSection = () => {
  return (
    <Box py="6">
      <Wrapper>
        <Wrapper>
          <Heading
            w="fit-content"
            mx="auto"
            size="lg"
            color="zipo.500"
            textAlign="center"
            lineHeight={1.4}
            position={"relative"}
            mb={4}
          >
            Frequenty Asked Questions
            <Image
              src="/Pattern_1.svg"
              alt="pattern 1"
              width={15}
              height={15}
              style={{ position: "absolute", right: -15, top: -10 }}
            />
          </Heading>
          <Container>
            <Text textAlign="center" pt="2" fontSize="md">
              FAQs - We Have Answers!
            </Text>
          </Container>
        </Wrapper>
        <Container maxW="container.lg">
          <Accordion allowToggle>
            {faqs.map(({ answer, question }) => (
              <AccordionItem borderTop={0} mb={3} key={question}>
                <h3>
                  <AccordionButton
                    borderRadius={7}
                    bg="#313EF70F"
                    paddingBlock={4}
                    fontWeight={"bold"}
                  >
                    <Box flex="1" textAlign="left">
                      {question}
                    </Box>
                    <AccordionIcon color={"zipo.500"} />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4} bg="#313EF70F">
                  {answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Wrapper>
    </Box>
  );
};

export default FaqSection;
