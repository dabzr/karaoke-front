import { IRoom, ApiRoomInfo, IEditRoom } from "../interfaces/room";
import api from "../utils/api";
import { roomInfoEndpoint, roomManagerEndpoint, roomCodeEndpoint, roomIdEndpoint } from "../utils/endpoints";
import { apiRoomMapToIRoom, apiRoomToIRoom, iEditRoomMapToApiEditRoom } from "../mappers/room";

export async function getRoom(): Promise<IRoom> {
  const res = await api.get(roomManagerEndpoint);
  const room = apiRoomToIRoom(res.data);
  return room;
} 

export async function editRoom(id: string, data: IEditRoom): Promise<IRoom> {
  const apiEditRoom = iEditRoomMapToApiEditRoom(data);
  const res = await api.put(roomIdEndpoint(id), apiEditRoom);
  return apiRoomMapToIRoom(res.data);
} 

export async function getRoomInfo(code: string): Promise<ApiRoomInfo> {
  const res = await api.get(roomInfoEndpoint(code));
  return res.data;
}

export async function getUserRoom(code: string): Promise<IRoom> {
  const res = await api.get(roomCodeEndpoint(code));
  const room = apiRoomToIRoom(res.data);
  return room;
}
