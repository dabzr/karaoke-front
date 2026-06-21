import { useEffect, useState } from "react";
import { getUserRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { ISong } from "../interfaces/song";
import { useNavigate, useParams } from "react-router-dom";
import { useQueue } from "./useQueue";
import { useQueueChange } from "./useQueueChange";
import { getLastSong } from "../services/queue";
import { sendEmoji } from "../services/emoji";

export function useUserRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState<string>("");
  const navigator = useNavigate();
  const { queue } = useQueue(id ?? "");
  const { code } = useQueueChange(id ?? "");
  const [lastSong, setLastSong] = useState<ISong | null>(null);
  const [emojiDrawerOpened, setEmojiDrawerOpened] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getUserRoom(id ?? "")
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

  useEffect(() => {
    if(!code) {
      setLastSong(null);
      return;
    }
    getLastSong(id ?? "")
      .then((data) => {
        setLastSong(data[0]);
      })
      .catch((error) => {
        setError(error);
      })
  }, [code])

  const goToProfilePage = () => {
    navigator("/user")
  }

  const openModal = () => setOpen(true);

  const onClose = () => {
    setOpen(false);
  }

  const handleCloseError = () => setMessage("");

  const toggleEmojiDrawner = () => setEmojiDrawerOpened((prev) => !prev);
  
  const handleSelectEmoji = (emoji: string) => {
    sendEmoji(id ?? "", emoji);  
    toggleEmojiDrawner();
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
    message,
    handleCloseError,
    lastSong,
    setMessage,
    toggleEmojiDrawner,
    emojiDrawerOpened,
    handleSelectEmoji,
  }
}
