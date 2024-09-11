import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(true);

  useEffect(() => {
    userObserver();
  }, []);

  const navigate = useNavigate();
  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      userObserver(auth.currentUser);
      navigate("/");
      toastSuccessNotify("Registered successfully");
    } catch (error) {
      toastErrorNotify("Email-already in use");
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Logged in successfully");
    } catch (error) {
      toastErrorNotify("Is invalid credential");
    }
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
      }
    });
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully");
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastSuccessNotify("Please check your email");
      })
      .catch((error) => {
        toastErrorNotify("missing email");
      });
  };

  const values = {
    createUser,
    loginUser,
    logOut,
    currentUser,
    signUpProvider,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
