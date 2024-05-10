import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { socialLinks } from "../utils";

const SelectSocials = ({ title, id, handleLinkEdit }) => {
  const getLinkSrc = (title) => {
    return (
      socialLinks.find((link) => link.title === title)?.src ||
      socialLinks[socialLinks.length - 1].src
    );
  };
  const [src, setSrc] = React.useState(getLinkSrc(title));
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Image src={src} w="20px" />}
        // leftIcon={<Image src={src} w="20px" />}
        h={12}
        pr={4}
        pl={4}
        borderLeftRadius={100}
        borderColor="#222222"
        borderRightColor="#22222220"
        variant="outline"
      >
        <TriangleDownIcon color="#22222230" fontSize={"11px"} ml={1} />
      </MenuButton>

      <MenuList>
        {socialLinks.map((link) => {
          return (
            <MenuItem
              icon={<Image src={link.src} w="20px" />}
              onClick={() => {
                setSrc(getLinkSrc(link.title));
                handleLinkEdit(link.title, id);
              }}
            >
              {link.title}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default SelectSocials;
