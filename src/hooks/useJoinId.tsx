import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRoomInfo, joinRoom } from "../services/join";
import { roomRoute } from "../utils/routes";
import { ApiRoomInfo } from "../interfaces/room";
import { strings, invalidPasswordString, requiredFieldString } from "../utils/strings";
import { language } from "../utils/settings";

export function useJoinId() {
  const { id } = useParams();

  const [roomInfo, setRoomInfo] = useState<ApiRoomInfo>();
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validateAccess, setValidateAccess] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const navigator = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getRoomInfo(id ?? "")
      .then((data) => {
        setRoomInfo(data);
        setValidateAccess(!data.hasPassword);
      })
      .catch((error) => {
        setError(error); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const validatePassword = () => {
    if(password === "") {
      setError(strings[language][requiredFieldString]);
      return;
    }
    setValidateAccess(true);
  }

  const handlePassword = () => {
    setIsLoading(true);
    validatePassword();
    setIsLoading(false);
  }

  const returnPage = () => {
    setValidateAccess(false);
  }

  const handleEnter = () => {
    setIsLoading(true);
    joinRoom(id || "", password, name)
      .then(() => {
        navigator(`${roomRoute}/${id}`);
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        if(errorMessage === invalidPasswordString) returnPage();
        setError(strings[language][errorMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    roomInfo,
    password,
    setPassword,
    validateAccess,
    isLoading,
    name,
    setName,
    handlePassword,
    handleEnter,
    error,
    returnPage,
  }
}
