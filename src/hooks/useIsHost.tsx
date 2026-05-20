import { useEffect, useState } from "react";
import { getHost, logout } from "../services/auth";
import { ApiHost } from "../interfaces/host";

export function useIsHost() {

  const [host, setHost] = useState<ApiHost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getHost()
      .then((res) => {
        setHost(res);
      })
      .catch((err) => {
        if(err.response && err.response.data.message === "This manager has no room") {
          setHost({
            "is_premium": false,
            "max_room_size": 5,
          })
          return; 
        }
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return {
    host,
    isLoading,
    error,
    logout,
  }
}
