import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { queueRoomEndpoint, queueRoomPassEndpoint, queueRoomSongEndpoint, roomQrScreenEndpoint, historyEndpoint } from "../utils/endpoints";

export async function getQueue(code: string): Promise<ApiSong[]> {
  const res = await api.get(queueRoomEndpoint(code));
  return res.data;
}

export async function getNextSong(code: string): Promise<string> {
  const res = await api.delete(queueRoomPassEndpoint(code));
  return res.data;
}

export async function stopSong(code: string): Promise<string> {
  const res = await api.post(roomQrScreenEndpoint(code));
  return res.data;
}

export async function deleteSong(code: string, id: string) {
  const res = await api.delete(queueRoomSongEndpoint(code, id));
  return res.data;
}

export async function getLastSong(code: string) {
  const res = await api.get(historyEndpoint(code, 0, 0));
  return res.data;
}
