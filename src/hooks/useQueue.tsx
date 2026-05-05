import { ApiSong } from "../interfaces/song";
import { useEffect, useState } from "react";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { backUrl } from "../utils/settings";
import { roomTopicQueueEndpoint } from "../utils/endpoints";

export function useQueue(id: string)  {
  const [queue, setQueue] = useState<ApiSong[]>([]); 

  useEffect(() => {
    const socket = new SockJs(backUrl + "/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({},() => {
      stompClient.subscribe(roomTopicQueueEndpoint(id), (message) => {
        const data = JSON.parse(message.body);
        setQueue(data);
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    }
  }, [id])

  return {
    queue 
  };
}

