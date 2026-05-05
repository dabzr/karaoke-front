import { useEffect, useState } from "react";
import { verifyIsHost, logout } from "../services/auth";

export function useIsHost() {

  const [isHost, setIsHost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    verifyIsHost()
      .then((res) => {
        setIsHost(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return {
    isHost,
    isLoading,
    error,
    logout,
  }
}
