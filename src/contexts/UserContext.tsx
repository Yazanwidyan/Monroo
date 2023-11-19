import React, { createContext, useState, ReactNode, useEffect } from "react";
import { LoginInput } from "../models/LoginInput";

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
  const [user, setUser] = useState<LoginInput | null>(() => {
    // Retrieve user data from localStorage on initialization
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to set user information and update localStorage
  const updateUser = (userInfo: LoginInput | null) => {
    setUser(userInfo);
    // Update localStorage with the new user information
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    // You might add additional logic here if needed when user changes
    // This effect runs whenever 'user' changes
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
