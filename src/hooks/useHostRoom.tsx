import { useEffect, useState } from "react";
import { getRoomAndSongs, editRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { ISong } from "../interfaces/song";
import { useNavigate, useParams } from "react-router-dom";
import { createRoomMap, ICreateRoomParams } from "../mappers/createRoom";
import { strings, queueString } from "../utils/strings";
import { language, url } from "../utils/settings";
import { joinRoute } from "../utils/routes";
import * as QRCode from 'qrcode';
import { useQueue } from "./useQueue";

export function useHostRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const [activeButton, setActiveButton] = useState<string>(strings[language][queueString]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
<<<<<<< Updated upstream
  const [songs, setSongs] = useState<ISong[]>([]);
=======
  const { queue } = useQueue(id ?? "");
>>>>>>> Stashed changes

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

  useEffect(() => {
    if(!room) return;
    QRCode.toDataURL(`${url}${joinRoute}/${room.code}`, { width: 150, margin: 1 })
    .then((url: string) => setQrCodeUrl(url))
  }, [room])

  const handleEdit = (newData: ICreateRoomParams) => {
    setIsLoading(true);
    editRoom(id ?? "", createRoomMap(newData))
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

  return {
    room,
    navigator,
    activeButton, 
    setActiveButton,
    handleEdit,
    qrCodeUrl,
    songs,
    isLoading,
    queue,
  }
}
