import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled(error) {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.inclues("Password")) {
        systemErrorMessage = "Password must be at least 6 characters long";
      } else if (error.message.includes("email")) {
        systemErrorMessage = "Email is not valid";
      } else if(error.message.includes("email-already")) {
        systemErrorMessage = "Email already in use";
      }
      else {
        systemErrorMessage = "Something went wrong";
      }
      setError(systemErrorMessage);
      setLoading(false);
      console.log("Criado com sucesso")
    }
  };
  //logout signout

  const logout = async () => {
    signOut(auth);
    console.log("Deslogado com sucesso")
  };

  //login

  const login = async(data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(" ");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.inclues("user-not-found")) {
        systemErrorMessage = "User not found";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password";
      } else {
        systemErrorMessage = "Something went wrong";
      }

      setLoading(false);
      setError(systemErrorMessage);
      console.log("Logado com sucesso")
    }
  }

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  });

  return { auth, createUser, error, loading, logout,login };
};
