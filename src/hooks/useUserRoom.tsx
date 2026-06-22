import { useEffect, useState } from "react";
import { getUserRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
import { sendEmoji } from "../services/emoji";
import { nanoid } from "nanoid";

export function useUserRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState<string>("");
  const navigator = useNavigate();
  const [emojiDrawerOpened, setEmojiDrawerOpened] = useState<boolean>(false);
  const [key, setKey] = useState<string>(nanoid());

  const refreshKey = () => setKey(nanoid());

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
  }, [key])


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
    message,
    handleCloseError,
    setMessage,
    toggleEmojiDrawner,
    emojiDrawerOpened,
    handleSelectEmoji,
    refreshKey,
  }
}
