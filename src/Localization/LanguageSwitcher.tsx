import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaFlagUsa, FaFlag } from "react-icons/fa"; // Import flag icons

const lngs = {
  en: { nativeName: "English", icon: <FaFlagUsa /> },
  ru: { nativeName: "Russian", icon: <FaFlag /> },
  ar: { nativeName: "Arabic", icon: <FaFlag /> },
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir(lng);
    setSelectedLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        fontSize={"small"}
        color={"primary.500"}
        _hover={{
          bg: "gary.700",
          color: "primary.500",
        }}
        variant="link"
      >
        {lngs[selectedLanguage].nativeName}
      </MenuButton>
      <MenuList>
        {Object.keys(lngs).map((lng) => (
          <MenuItem
            color={"primary.500"}
            key={lng}
            onClick={() => changeLanguage(lng)}
          >
            <Flex alignItems="center">{lngs[lng].nativeName}</Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
