import { useEffect, useState } from "react";
import { getRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../utils/settings";
import { joinRoute } from "../utils/routes";
import * as QRCode from 'qrcode';
import { useQueueChange } from "./useQueueChange";

export function useTv() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const navigator = useNavigate();
  const { code } = useQueueChange(id ?? "");

  const returnPage = () => navigator(-1);

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
    QRCode.toDataURL(`${url}${joinRoute}/${room.code}`, { width: 1024, margin: 1 })
    .then((url: string) => setQrCodeUrl(url))
    }, [room])

  return {
    room,
    qrCodeUrl,
    isLoading,
    videoUrl: code,
    returnPage,
  }
}
