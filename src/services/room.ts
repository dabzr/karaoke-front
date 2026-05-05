import { IRoom, ApiRoomInfo } from "../interfaces/room";
import api from "../utils/api";
import { roomAuthEndpoint, roomInfoEndpoint } from "../utils/endpoints";
import { apiRoomToIRoom, ICreateRoomParams } from "../mappers/room";
import Cookies from "js-cookie";

export async function getRoom(id: string): Promise<IRoom> {
  const rooms = [];
  if(!rooms) throw new Error();
  return rooms.find((room) => room.code === id);
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

export async function getRoomAndSongs(code: string): Promise<IRoom> {
  const hostId = Cookies.get("host-id");
  const res = await api.get(roomAuthEndpoint(code, hostId));
  const room = apiRoomToIRoom(res.data);
  return room;
}

export async function getRoomInfo(code: string): Promise<ApiRoomInfo> {
  const res = await api.get(roomInfoEndpoint(code));
  return res.data;
}

export async function getRoomAndSongsWithUser(code: string): Promise<IRoom> {
  const hostId = Cookies.get("user-id");
  const res = await api.get(roomAuthEndpoint(code, hostId));
  const room = apiRoomToIRoom(res.data);
  return room;
}
