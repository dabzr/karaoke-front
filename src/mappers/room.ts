import { ApiRoom, IRoom } from "../interfaces/room";
import { ICreateRoom } from "../interfaces/room"
import { strings, requiredFieldString } from "../utils/strings";
import { language } from "../utils/settings";

export type ICreateRoomParams = {
  name: string;
  password: string;
  maxQuantity: number | null;
}

export function createRoomMapToICreateRoom({ name, password, maxQuantity }: ICreateRoomParams): ICreateRoom {
  if(maxQuantity === null) throw new Error(strings[language][requiredFieldString]);
  return {
    name,
    password,
    max_room_size: maxQuantity,
  }
}

export function apiRoomToIRoom(apiRoom: ApiRoom): IRoom {
  const users = apiRoom?.users || [];
  return {
    name: apiRoom.name,
    code: apiRoom.code,
    password: apiRoom.password,
    maxQuantity: apiRoom.max_room_size,
    quantity: users.length,
    users: users,
    songs: apiRoom.songs,
  };
}
