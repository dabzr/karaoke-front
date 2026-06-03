import { useState, useEffect } from "react";
import { createRoom } from "../services/rooms"
import { ICreateRoomParams } from "../mappers/room";
import { useNavigate } from "react-router-dom";
import { managerRoomRoute } from "../utils/routes";
import { strings } from "../utils/strings";
import { language } from "../utils/settings";
import { useIsHost } from "./useIsHost";

export function useRooms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { host } = useIsHost();
  const navigator = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if(!host) return;
    navigator(`${managerRoomRoute}/${host.code}`)
  }, [host])

  const handleCreateRoom = (data: ICreateRoomParams) => {
    setIsLoading(true);
    createRoom(data)
      .then((room) => {
        navigator(`${managerRoomRoute}/${room.code}`)
      })
      .catch((error) => {
        const message = strings[language][error.response.data.message];
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleCloseError = () => setError(""); 

  return {
    open,
    handleOpen,
    handleClose,
    handleCreateRoom,
    navigator,
    isLoading,
    error,
    handleCloseError,
  }
}
