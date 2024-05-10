import { useLazyQuery } from "@apollo/client";
import {
  InputGroup,
  Input,
  InputRightElement,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { IS_LINK_CUSTOMIZABLE } from "../gql";
import { inputProps2 } from "./utils";

const CustomLinkBox = ({
  setCustomLink,
  customLink,
  customizeReady,
  setCustomizeReady,
}) => {
  const [isLinkCustomizable, { loading, data, error }] =
    useLazyQuery(IS_LINK_CUSTOMIZABLE);

  const handleCustomLink = (value) => {
    setCustomizeReady(false);
    // Make sure zipo.netlify.app/ preceeds any input by the user
    if (value.length >= 8 && value.startsWith("zipo.netlify.app/")) {
      setCustomLink(value);

      // Make sure that only links above 10 characters are sorted for
      if (value.length > 10 && !loading) {
        isLinkCustomizable({
          variables: { path: value.slice(8) },
          onCompleted: (data) => {
            if (data?.link_isCustomizable) {
              setCustomizeReady(true);
            }
          },
          fetchPolicy: "network-only",
        });
      }
    }
  };
  return (
    <InputGroup w="full">
      <Input
        placeholder="zipo.netlify.app/CustomLink"
        onChange={(e) => {
          handleCustomLink(e.target.value);
        }}
        value={customLink}
        {...inputProps2}
      />
      <InputRightElement
        children={
          loading ? (
            <Spinner size="xs" />
          ) : customizeReady ? (
            <Image src="Link_Correct.svg" />
          ) : (
            <Image src="Link_Wrong.svg" />
          )
        }
      />
    </InputGroup>
  );
};

export default CustomLinkBox;
