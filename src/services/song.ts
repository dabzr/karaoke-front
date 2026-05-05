import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { roomQueueEndpoint } from "../utils/endpoints";
import Cookies from "js-cookie";

export async function addSong(code: string, name: string, url: string): Promise<ApiSong> {
  const userId = Cookies.get("user-id");
  const res = await api.post(roomQueueEndpoint(code), { user_id: userId, name, url });
  return res.data;
}
