import { useEffect, useState } from "react";
import { getHost, logout, getHostRoom } from "../services/auth";
import { IHost, ApiHostRoom } from "../interfaces/host";

export function useIsHost() {

  const [host, setHost] = useState<IHost | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [room, setRoom] = useState<ApiHostRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getHost()
      .then((res) => {
        setHost(res);
        setIsHost(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    if(!host) return;
    setIsLoading(true); 
    getHostRoom()
      .then((res) => {
        setRoom(res)
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [host])

  return {
    host,
    isLoading,
    error,
    logout,
    room,
    isHost,
  }
}
