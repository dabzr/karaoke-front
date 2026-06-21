import { useEffect, useState } from "react";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { backUrl } from "../utils/settings";
import { roomTopicQueueUrlEndpoint, usersTopicQueueQrEndpoint } from "../utils/endpoints";

export function useQueueChange(id: string) {

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const socket = () => new SockJs(backUrl + "/ws");
    const stompClient = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });
    const stompClientQr = new Client({
      webSocketFactory: socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(roomTopicQueueUrlEndpoint(id ?? ""), (message: {body: string}) => {
        if(message.body) {
          const data = message.body;
          setCode(data);
        }
      });
    };

    stompClientQr.onConnect = () => {
      stompClientQr.subscribe(usersTopicQueueQrEndpoint(id ?? ""), (message: {body: string}) => {
        if(message.body) {
          setCode("");
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Erro no WS:", frame.headers["message"]);
    }

    stompClientQr.onStompError = (frame) => {
      console.error("Erro no WS do QrCode:", frame.headers["message"]);
    }

    stompClient.activate();
    stompClientQr.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
      if (stompClientQr.active) {
        stompClientQr.deactivate();
      }
    }
  }, [id])

  return {
    code
  }
}
