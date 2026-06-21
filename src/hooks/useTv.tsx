import { useEffect, useState } from "react";
import { getRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../utils/settings";
import { joinRoute } from "../utils/routes";
import * as QRCode from 'qrcode';
import { useQueueChange } from "./useQueueChange";
import { useRef } from "react";
import { useEmoji } from "./useEmoji";

export function useTv() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const navigator = useNavigate();
  const { code } = useQueueChange(id ?? "");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { emoji } = useEmoji(id ?? "");

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

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, [])

  useEffect(() => {
    if(!room) return;
    QRCode.toDataURL(`${url}${joinRoute}/${room.code}`, { width: 1024, margin: 1 })
    .then((url: string) => setQrCodeUrl(url))
  }, [room])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return {
    room,
    qrCodeUrl,
    isLoading,
    videoUrl: code,
    returnPage,
    isFullscreen,
    containerRef,
    toggleFullscreen,
    emoji,
  }
}
