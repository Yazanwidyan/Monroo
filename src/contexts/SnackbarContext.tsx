// SnackbarContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

type SnackBarType = "success" | "error" | "default";

interface SnackBarContextProps {
  snackBarOpen: boolean;
  snackBarMessage: string;
  snackBarType: SnackBarType;
  openSnackBar: (message: string, type?: SnackBarType) => void;
  closeSnackBar: () => void;
}

interface SnackBarProviderProps {
  children: ReactNode;
}

const SnackBarContext = createContext<SnackBarContextProps | undefined>(
  undefined
);

export const useSnackBar = (): SnackBarContextProps => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children,
}) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState<SnackBarType>("default");

  const openSnackBar = (message: string, type: SnackBarType = "default") => {
    setSnackBarMessage(message);
    setSnackBarType(type);
    setSnackBarOpen(true);
  };

  const closeSnackBar = () => {
    setSnackBarOpen(false);
    setSnackBarMessage("");
    setSnackBarType("default");
  };

  return (
    <SnackBarContext.Provider
      value={{
        snackBarOpen,
        snackBarMessage,
        snackBarType,
        openSnackBar,
        closeSnackBar,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};
