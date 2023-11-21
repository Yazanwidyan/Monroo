import React, { createContext, useState, ReactNode, useEffect } from "react";
import { LoginInput } from "../models/LoginInput";

type UserContextType = {
  user: any;
  updateUser: (userInfo: any | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginInput | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (userInfo: LoginInput | null) => {
    setUser(userInfo);
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
