import { IRoom } from "../interfaces/room";
import api from "../utils/api";
import { roomEndpoint } from "../utils/endpoints";
import { ICreateRoomParams, createRoomMapToICreateRoom } from "../mappers/room";

export async function createRoom(data: ICreateRoomParams): Promise<IRoom> {
  const mappedData = createRoomMapToICreateRoom(data);
  const res = await api.post(roomEndpoint, { ...mappedData });
  const room = res.data;
  return room;
}
