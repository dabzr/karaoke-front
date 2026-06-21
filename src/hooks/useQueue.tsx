import { ApiSong } from "../interfaces/song";
import { useEffect, useState } from "react";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { backUrl } from "../utils/settings";
import { roomTopicQueueEndpoint } from "../utils/endpoints";
import { getQueue } from "../services/queue";

export function useQueue(id: string)  {
  const [queue, setQueue] = useState<ApiSong[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(""); 

  useEffect(() => {
    setIsLoading(true);
    getQueue(id ?? "")
      .then((data: ApiSong[]) => {
        setQueue(data)
      })
      .catch((error: string) => {
        setError(error); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  useEffect(() => {
    const socket = () => new SockJs(backUrl + "/ws");
    const stompClient = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(roomTopicQueueEndpoint(id), (message: {body: string}) => {
        if(message.body) {
          const data = JSON.parse(message.body);
          setQueue(data);
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

  return {
    queue,
    isLoading,
    error,
    setQueue,
  };
}

