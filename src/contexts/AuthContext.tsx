import { getCurrentUser } from "@/lib/appwrite/api";
import { INewUser } from "@/types";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext, createContext, useEffect, useState } from "react";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount?.$id,
          name: currentAccount?.name,
          username: currentAccount?.username,
          email: currentAccount?.email,
          imageUrl: currentAccount?.imageUrl,
          bio: currentAccount?.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("coockieFallback") === "[]") {
      navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
