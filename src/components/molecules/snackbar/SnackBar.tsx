import React, { useEffect } from "react";
import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useSnackBar } from "../../../contexts/SnackbarContext";

const SnackBar: React.FC = () => {
  const { snackBarOpen, snackBarMessage, snackBarType, closeSnackBar } =
    useSnackBar();

  const getAlertStatus = () => {
    switch (snackBarType) {
      case "success":
        return "success";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  useEffect(() => {
    let timeoutId: any;

    if (snackBarOpen) {
      timeoutId = setTimeout(() => {
        closeSnackBar();
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [snackBarOpen, closeSnackBar]);

  return (
    <>
      {snackBarOpen && (
        <Alert
          status={getAlertStatus()}
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          position="fixed"
          top="60px"
          left="46%"
          transform="translate(-50%, -50%)"
          width="300px"
          zIndex={9999}
        >
          <AlertIcon />
          <AlertTitle>{snackBarMessage}</AlertTitle>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={closeSnackBar}
          />
        </Alert>
      )}
    </>
  );
};

export default SnackBar;
