import { useEffect, useState } from "react";
import { getRoomAndSongs } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
<<<<<<< Updated upstream
import { createRoomMap, ICreateRoomParams } from "../mappers/createRoom";
import { ISong } from "../interfaces/song";
=======
import { useQueue } from "./useQueue";
>>>>>>> Stashed changes

export function useUserRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [songs, setSongs] = useState<ISong[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const { queue } = useQueue(id ?? "");

  useEffect(() => {
    setIsLoading(true);
    getRoomAndSongs(id ?? "")
      .then((data) => {
        setRoom(data.room)
        setSongs(data.songs)
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

  return {
    room,
    songs,
    navigator,
    goToProfilePage,
    isLoading,
<<<<<<< Updated upstream
=======
    open,
    openModal,
    onClose,
    queue,
>>>>>>> Stashed changes
  }
}
