import { createContext, useContext } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered successfully");
    } catch (error) {
      console.log(error);
      toastErrorNotify("Email-already in use");
    }
  };
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCredential);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const values = { createUser, loginUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
