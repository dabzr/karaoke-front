import { ApiEditRoom, ApiRoom, ApiRoomMaxRoomSize, IEditRoom, IRoom } from "../interfaces/room";
import { ICreateRoom } from "../interfaces/room"
import { strings, requiredFieldString } from "../utils/strings";
import { language } from "../utils/settings";

export type ICreateRoomParams = {
  name: string;
  password: string;
  maxQuantity: number | null;
  timeoutTime: number | null;
}

export function createRoomMapToICreateRoom({ name, password, maxQuantity, timeoutTime }: ICreateRoomParams): ICreateRoom {
  if(maxQuantity === null) throw new Error(strings[language][requiredFieldString]);
  if(timeoutTime === null) throw new Error(strings[language][requiredFieldString]);
  return {
    name,
    password,
    max_room_size: maxQuantity,
    timeout_seconds: timeoutTime,
  }
}

export function apiRoomToIRoom(apiRoom: ApiRoom): IRoom {
  return {
    name: apiRoom.name,
    code: apiRoom.code,
    password: apiRoom.password,
    maxQuantity: apiRoom.max_room_size,
    timeoutSeconds: apiRoom.timeoutSeconds,
  };
}

export function iEditRoomMapToApiEditRoom(editData: IEditRoom): ApiEditRoom {
  return {
    name: editData.name,
    max_room_size: editData.maxQuantity,
    password: editData.password,
    timeout_seconds: editData.timeoutSeconds,
  };
}

export function apiRoomMapToIRoom(apiRoom: ApiRoomMaxRoomSize): IRoom {
  return {
    name: apiRoom.name,
    code: apiRoom.code,
    password: apiRoom.password,
    maxQuantity: apiRoom.maxRoomSize,
    timeoutSeconds: apiRoom.timeoutSeconds,
  };
}
