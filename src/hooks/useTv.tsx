import { useEffect, useState } from "react";
import { getRoom } from "../services/room";
import { IRoom } from "../interfaces/room";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../utils/settings";
import { joinRoute } from "../utils/routes";
import * as QRCode from 'qrcode';
import { roomTopicQueueUrlEndpoint } from "../utils/endpoints";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { backUrl } from "../utils/settings";

export function useTv() {
  const { id } = useParams();

  const [room, setRoom] = useState<IRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const navigator = useNavigate();

  const returnPage = () => navigator(-1);

  useEffect(() => {
    const socket = () => new SockJs(backUrl + "/ws");
    const stompClient = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(roomTopicQueueUrlEndpoint(id ?? ""), (message: {body: string}) => {
        if(message.body) {
          console.log(message.body)
          const data = message.body;
          setVideoUrl(data);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Erro no WS:", frame.headers["message"]);
    }

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    }
  }, [id])

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
    videoUrl,
    returnPage,
  }
}
