import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { queueRoomEndpoint, queueRoomPassEndpoint } from "../utils/endpoints";

export async function getQueue(code: string): Promise<ApiSong[]> {
  const res = await api.get(queueRoomEndpoint(code));
  return res.data;
}

export async function getNextSong(code: string): Promise<string> {
  const res = await api.delete(queueRoomPassEndpoint(code));
  return res.data;
}
