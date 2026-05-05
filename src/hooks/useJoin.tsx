import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomInfo } from "../services/join";
import { joinRoute } from "../utils/routes";
import { strings, invalidRoomCodeString } from "../utils/strings";
import { language } from "../utils/settings";

export function useJoin() {
  const navigator = useNavigate();
  const [code, setCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEnter = () => {
    if(code === "") {
      setCodeError(strings[language][invalidRoomCodeString]);
      return;
    }
    setIsLoading(true);
    getRoomInfo(code)
      .then(() => {
        navigator(`${joinRoute}/${code}`)
      })
      .catch((error) => {
        setCodeError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    code, 
    setCode,
    codeError,
    handleEnter,
    isLoading,
  };
}
