import { useState } from "react";
import { login } from "../services/auth";
import { roomsRoute } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { strings, invalidEmailString } from "../utils/strings";
import { language } from "../utils/settings";

export function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigator = useNavigate();

  const handleLogin = () => {
    setIsLoading(true); 
    if(email === "") {
      setError(strings[language][invalidEmailString]);
      setIsLoading(false); 
      return;
    }
    login(email)
      .then((res) => {
        if(res) navigator(`${roomsRoute}`)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    email,
    setEmail,
    isLoading,
    handleLogin,
    error,
  }
}
