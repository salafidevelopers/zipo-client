import React from "react";
import { ModalContent, ModalHeader, useToast } from "@chakra-ui/react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { randomCh } from "../../../utils/misc";
import { initialLinks } from "./utils";

const CombineLink = ({ finalRef, initialRef, onClose, setModalType }) => {
  const toast = useToast();
  const [initLinks, setInitLinks] = React.useState(initialLinks);
  const [step, setStep] = React.useState("step_1");
  const [customLink, setCustomLink] = React.useState("zipo.netlify.app/");

  const handleLinkDelete = (id) => {
    if (initLinks.length <= 2) {
      toast({
        id: "26480",
        title: "Links cannot be less than 2",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }
    setInitLinks(initLinks.filter((link) => link.id !== id));
  };

  const handleLinkAdd = () => {
    setInitLinks([
      ...initLinks,
      { title: "others", id: randomCh(8), url: undefined },
    ]);
  };

  const handleLinkEdit = (title, id) => {
    setInitLinks(
      initLinks.map((link) => {
        if (link.id === id) {
          link.title = title;
          return link;
        }
        return link;
      })
    );
  };

  const handleLinkUrl = (url, id) => {
    setInitLinks(
      initLinks.map((link) => {
        if (link.id === id) {
          link.url = url;
          return link;
        }
        return link;
      })
    );
  };

  return (
    <ModalContent
      p={{ base: 2, md: 8 }}
      rounded={"3xl"}
      w={{ base: "90%" }}
      top={{ base: "4rem", md: "auto" }}
    >
      <ModalHeader>Combine Links</ModalHeader>
      {step === "step_1" && (
        <FirstStep
          toast={toast}
          finalRef={finalRef}
          initLinks={initLinks}
          handleLinkEdit={handleLinkEdit}
          handleLinkDelete={handleLinkDelete}
          handleLinkAdd={handleLinkAdd}
          handleLinkUrl={handleLinkUrl}
          setStep={setStep}
          onClose={onClose}
          setModalType={setModalType}
          setInitLinks={setInitLinks}
        />
      )}
      {step === "step_2" && (
        <SecondStep
          finalRef={finalRef}
          initLinks={initLinks}
          setInitLinks={setInitLinks}
          handleLinkEdit={handleLinkEdit}
          handleLinkDelete={handleLinkDelete}
          handleLinkAdd={handleLinkAdd}
          customLink={customLink}
          setCustomLink={setCustomLink}
          setStep={setStep}
          onClose={onClose}
        />
      )}
      {step === "step_3" && (
        <ThirdStep
          finalRef={finalRef}
          initLinks={initLinks}
          handleLinkEdit={handleLinkEdit}
          setStep={setStep}
          onClose={onClose}
          customLink={customLink}
          setModalType={setModalType}
          setInitLinks={setInitLinks}
          setCustomLink={setCustomLink}
        />
      )}
    </ModalContent>
  );
};

export default CombineLink;
