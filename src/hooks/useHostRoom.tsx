import { useEffect, useState } from "react";
import { getRoom, editRoom } from "../services/room";
import { IEditRoom, IRoom } from "../interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
import { ICreateRoomParams } from "../mappers/room";
import { strings, queueString } from "../utils/strings";
import { language } from "../utils/settings";
import { useQueue } from "./useQueue";
import { useUsers } from "./useUsers";
import { getNextSong, deleteSong, stopSong } from "../services/queue";

export function useHostRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);
  const navigator = useNavigate();
  const [activeButton, setActiveButton] = useState<string>(strings[language][queueString]);
  const { queue, setQueue } = useQueue(id ?? "");
  const { users } = useUsers(id ?? "");

  useEffect(() => {
    setIsLoading(true);
    getRoom()
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

  const handleEdit = (data: IEditRoom) => {
    setIsLoading(true);
    editRoom(id ?? "", data)
      .then((data) => {
        setRoom(data)
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleQueue = () => {
    if(queue.length === 0 && !isSongPlaying) {
      setError("Não há músicas na fila");
      return;
    }
    if(isSongPlaying) {
      handleStopSong();
      return;
    }
    handleNextSong();
  }

  const handleStopSong = () => {
    setIsLoading(true);
    stopSong(id ?? "")
      .then(() => {
        setIsSongPlaying(false); 
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleNextSong = () => {
    setIsLoading(true);
    getNextSong(id ?? "")
      .then(() => {
        setIsSongPlaying(true); 
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleRemoveSong = (songId: string) => {
    setIsLoading(true);
    deleteSong(id ?? "", songId)
      .then((data) => {
        setQueue((prev) => prev.filter((song) => song.id !== songId));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleCloseError = () => setError("");

  return {
    room,
    navigator,
    activeButton, 
    setActiveButton,
    handleEdit,
    isLoading,
    queue,
    users,
    handleQueue,
    handleRemoveSong,
    error,
    handleCloseError,
    id,
    isSongPlaying,
  }
}
