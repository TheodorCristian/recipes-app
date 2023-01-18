import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseAuthConfig";
import { getAccount } from "../Utils/utils";
import { SignalCellularNoSimOutlined } from "@material-ui/icons";

const UserContext = createContext();

export const UserAuth = () => {
  return useContext(UserContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      await setUser(currentUser);

    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    signup,
    login,
    logout,
    user,
    isAdmin,
    setIsAdmin,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
