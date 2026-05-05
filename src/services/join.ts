import { ApiRoomInfo } from "../interfaces/room";
import { IUser } from "../interfaces/user";
import api from "../utils/api";
import { joinRoomEndpoint, roomInfoEndpoint } from "../utils/endpoints";
import Cookies from "js-cookie";

export async function getRoomInfo(code: string): Promise<ApiRoomInfo> {
  const res = await api.get(roomInfoEndpoint(code));
  return res.data;
}

export async function joinRoom(code: string, password: string, name: string): Promise<IUser> {
  const res = await api.post(joinRoomEndpoint(code), { name, password });
  Cookies.set("user-id", res.data)
  return {
    id: res.data,
    name,
  }
}
