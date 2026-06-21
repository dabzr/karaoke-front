import { useState, useEffect } from "react";
import { ApiUser } from "../interfaces/user";
import { getUsers } from "../services/users";
import { backUrl } from "../utils/settings";
import { usersTopicQueueEndpoint } from "../utils/endpoints";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function useUsers(id: string) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getUsers(id ?? "")
      .then((data: ApiSong[]) => {
        setUsers(data)
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
      stompClient.subscribe(usersTopicQueueEndpoint(id), (message: {body: string}) => {
        if(message.body) {
          const data = JSON.parse(message.body);
          setUsers(data);
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
    users,
    isLoading,
    error,
  }
}
