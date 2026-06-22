import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getUser } from "../services/auth";

export function useIsUser() {

  const { id } = useParams();

  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getUser(id ?? "")
      .then((data) => {
        setIsUser(true);
        setCode(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return {
    isUser,
    isLoading,
    error,
    code,
  }
}
