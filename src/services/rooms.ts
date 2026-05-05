import { IRoom } from "../interfaces/room";
import api from "../utils/api";
import Cookies from "js-cookie";
import { roomEndpoint } from "../utils/endpoints";
import { ICreateRoomParams, createRoomMapToICreateRoom } from "../mappers/room";

export async function createRoom(data: ICreateRoomParams): Promise<IRoom> {
  const hostId = Cookies.get("host-id");
  const mappedData = createRoomMapToICreateRoom(data);
  const res = await api.post(roomEndpoint, { ...mappedData, "manager_id": hostId });
  const room = res.data;
  return room;
}
