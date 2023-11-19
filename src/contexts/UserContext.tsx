import React, { createContext, useState, ReactNode } from "react";
import { LoginInput } from "../models/LoginInput";

// Define a type for user information

// Define a type for the context value
type UserContextType = {
  user: LoginInput | null;
  updateUser: (userInfo: LoginInput | null) => void;
};

// Create a context to hold user information
export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
});

// Create a UserProvider component to wrap your app and manage user data
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginInput | null>(null);

  // Function to set user information
  const updateUser = (userInfo: LoginInput | null) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
