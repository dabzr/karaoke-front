import { IRoom, ApiRoomInfo } from "../interfaces/room";
import api from "../utils/api";
import { roomInfoEndpoint, roomManagerEndpoint, roomUsersEndpoint } from "../utils/endpoints";
import { apiRoomToIRoom, ICreateRoomParams } from "../mappers/room";

export async function getRoom(): Promise<IRoom> {
  const res = await api.get(roomManagerEndpoint);
  const room = apiRoomToIRoom(res.data);
  return room;
} 

export async function editRoom(id: string, data: ICreateRoomParams): Promise<IRoom> {
  if(localStorage.getItem("rooms") === null) throw new Error();
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  const room = rooms.find(r => r.code === id)
  const editedRoom = {...room, ...data};
  const newRooms = rooms.map((room) => room.code === id ? editedRoom : room);
  localStorage.setItem("rooms", JSON.stringify(newRooms));
  return editedRoom;
} 

export async function getRoomInfo(code: string): Promise<ApiRoomInfo> {
  const res = await api.get(roomInfoEndpoint(code));
  return res.data;
}

export async function getUserRoom(code: string): Promise<IRoom> {
  const res = await api.get(roomUsersEndpoint(code));
  const room = apiRoomToIRoom(res.data);
  return room;
}
