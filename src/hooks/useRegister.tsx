import { useState } from "react";
import { register } from "../services/auth";
import { loginRoute } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { strings, requiredFieldString } from "../utils/strings";
import { language } from "../utils/settings";

export function useRegister() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
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
    {
      "condition": () => confirmPassword === "",
      "error": () => setConfirmPasswordError(strings[language][requiredFieldString])
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
    register(email, password)
      .then((res) => {
        if(res) navigator(`${loginRoute}`)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const returnPage = () => {
    navigator("/")
  }
  const changePassword = (value: string) => {
    setConfirmPasswordError(confirmPassword && confirmPassword !== value ? "As senhas não coincidem" : "");
    setPassword(value);
  }

  const verifyConfirmPassword = (value: string) => {
    setConfirmPasswordError(password !== value ? "As senhas não coincidem" : "");
    setConfirmPassword(value);
  }

  return {
    email,
    setEmail,
    isLoading,
    handleLogin,
    error,
    returnPage,
    password,
    changePassword,
    returnPage,
    emailError,
    passwordError,
    confirmPassword,
    verifyConfirmPassword,
    confirmPasswordError,
  }
}
