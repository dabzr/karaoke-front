import { useState, useEffect } from "react";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { backUrl } from "../utils/settings";
import { topicUsersRoomEmojiEndpoint } from "../utils/endpoints";
import { IEmoji } from "../interfaces/emoji";

export function useEmoji(id: string) {
  const [emoji, setEmoji] = useState<IEmoji | null>(null); 
  const [error, setError] = useState<string>(""); 

  useEffect(() => {
    const socket = () => new SockJs(backUrl + "/ws");
    const stompClient = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(topicUsersRoomEmojiEndpoint(id), (message: {body: string}) => {
        if(message.body) {
          const data = JSON.parse(message.body);
          setEmoji(data);
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
    emoji,
    error,
  };
}
