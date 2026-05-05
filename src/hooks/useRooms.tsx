import { useState } from "react";
import { createRoom } from "../services/rooms"
import { IRoom } from "../interfaces/room";
import { ICreateRoomParams } from "../mappers/room";
import { useNavigate } from "react-router-dom";
import { roomRoute } from "../utils/routes";
import { strings } from "../utils/strings";
import { language } from "../utils/settings";

export function useRooms() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateRoom = (data: ICreateRoomParams) => {
    createRoom(data)
      .then((room) => {
        setRooms((prev) => [...prev, room]);
        navigator(`${roomRoute}/${room.code}`)
      })
      .catch((error) => {
        const message = strings[language][error.response.data.message];
        setError(message);
      })
  };

  const handleCloseError = () => setError(""); 

  return {
    rooms,
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
