import { useEffect, useState } from "react";
import { getRoom, editRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useNavigate, useParams } from "react-router-dom";
import { ICreateRoomParams } from "../mappers/room";
import { strings, queueString } from "../utils/strings";
import { language, url } from "../utils/settings";
import { joinRoute } from "../utils/routes";
import * as QRCode from 'qrcode';
import { useQueue } from "./useQueue";
import { useUsers } from "./useUsers";
import { getNextSong, deleteSong } from "../services/queue";

export function useHostRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const [activeButton, setActiveButton] = useState<string>(strings[language][queueString]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const { queue } = useQueue(id ?? "");
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

  useEffect(() => {
    if(!room) return;
    QRCode.toDataURL(`${url}${joinRoute}/${room.code}`, { width: 150, margin: 1 })
    .then((url: string) => setQrCodeUrl(url))
    }, [room])

  const handleEdit = (newData: ICreateRoomParams) => {
    setIsLoading(true);
    editRoom(id ?? "", newData)
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

  const handleNextSong = () => {
    setIsLoading(true);
    getNextSong(id ?? "")
      .then((data) => {
        navigator("/video/" + data)
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
      .then(() => {})
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return {
    room,
    navigator,
    activeButton, 
    setActiveButton,
    handleEdit,
    qrCodeUrl,
    isLoading,
    queue,
    users,
    handleNextSong,
    handleRemoveSong,
  }
}
