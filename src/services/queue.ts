import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { queueRoomEndpoint } from "../utils/endpoints";

export async function getQueue(code: string): Promise<ApiSong[]> {
  const res = await api.get(queueRoomEndpoint(code));
  return res.data;
}
