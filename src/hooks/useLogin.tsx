import { useState } from "react";
import { login } from "../services/auth";
import { roomsRoute } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { strings, requiredFieldString, managerNotFoundString } from "../utils/strings";
import { language } from "../utils/settings";

export function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigator = useNavigate();

  const validations = [
    {
      "condition": () => email === "",
      "error": () => setEmailError(strings[language][requiredFieldString])
    },
    {
      "condition": () => password === "",
      "error": () => setPasswordError(strings[language][requiredFieldString])
    },
  ]

  const validateErrors = () => {
    let hasError = false;
    for(const validation of validations) {
      if(validation.condition()){
        validation.error();
        hasError = true;
      }
    }
    return hasError;
  }

  const handleLogin = () => {
    setIsLoading(true); 
    if(validateErrors()) {
      setIsLoading(false);
      return;
    }
    login(email, password)
      .then((res) => {
        if(res) navigator(`${roomsRoute}`)
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setError(strings[language][errorMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const returnPage = () => navigator("/");

  const handleCloseError = () => setError("");

  return {
    email,
    setEmail,
    isLoading,
    handleLogin,
    error,
    returnPage,
    password,
    setPassword,
    emailError,
    passwordError,
    handleCloseError,
  }
}
