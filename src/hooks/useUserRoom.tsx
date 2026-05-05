import { useEffect, useState } from "react";
import { getRoomAndSongsWithUser } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
import { useQueue } from "./useQueue";

export function useUserRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const { queue } = useQueue(id ?? "");

  useEffect(() => {
    setIsLoading(true);
    getRoomAndSongsWithUser(id ?? "")
      .then((data) => {
        setRoom(data)
      })
      .catch((error) => {
        setError(error); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const goToProfilePage = () => {
    navigator("/user")
  }

  const openModal = () => setOpen(true);

  const onClose = () => {
    setOpen(false);
  }

  return {
    room,
    navigator,
    goToProfilePage,
    isLoading,
    open,
    openModal,
    onClose,
    queue,
  }
}
