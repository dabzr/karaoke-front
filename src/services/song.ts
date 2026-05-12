import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { queueRoomQueueEndpoint } from "../utils/endpoints";
import Cookies from "js-cookie";

export async function addSong(code: string, name: string, artistName: string, url: string): Promise<ApiSong> {
  const userId = Cookies.get("user-id");
  const res = await api.post(queueRoomQueueEndpoint(code), { user_id: userId, name, artistName, url });
  return res.data;
}
