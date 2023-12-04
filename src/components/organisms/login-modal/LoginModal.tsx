import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import LoginUser from "../../pages/auth/login-user/LoginUser";
import LoginProvider from "../../pages/auth/login-provider/LoginProvider";

const LoginModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("user");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"white"} bg={"primary.500"}>
          Login
        </ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody>
          <Tabs
            isFitted
            index={selectedTab === "user" ? 0 : 1}
            onChange={(index) =>
              setSelectedTab(index === 0 ? "user" : "provider")
            }
          >
            <TabList>
              <Tab _selected={{ color: "primary.500" }} color={"gray.500"}>
                User
              </Tab>
              <Tab _selected={{ color: "primary.500" }} color={"gray.500"}>
                Provider
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginUser onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <LoginProvider onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
