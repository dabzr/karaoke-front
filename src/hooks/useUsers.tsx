import { useState, useEffect } from "react";
import { ApiUser } from "../interfaces/user";
import { getUsers } from "../services/users";

export function useUsers(id: string) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getUsers(id)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return {
    users,
    isLoading,
    error,
  }
}
