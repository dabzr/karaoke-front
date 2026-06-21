import { ApiSong } from "./song";
import { IUser } from "./user";

export interface IRoom {
  name: string;
  code: string;
  password?: string;
  maxQuantity: number;
  timeoutSeconds: number;
};

export interface CreateRoom {
  name: string;
  password?: string;
  maxQuantity: number;
};

export interface ICreateRoom {
  name: string;
  password?: string;
  max_room_size: number;
  timeout_seconds: number;
};

export interface ApiRoom {
  max_room_size: number;
  managerId: string;
  name: string;
  password: string | undefined;
  code: string;
  users: IUser[];
  songs: ApiSong[];
  max_ROOM_SIZE_FREE_USER: number;
  premium: boolean;
  timeoutSeconds: number;
}

export interface ApiRoomInfo {
  name: string;
  hasPassword: boolean;
}


export interface IEditRoom {
  name?: string;
  password?: string;
  maxQuantity?: number;
  timeoutSeconds?: number;
};
export interface ApiEditRoom {
  name?: string;
  password?: string;
  max_room_size?: number;
  timeout_seconds?: number;
}

export interface ApiRoomMaxRoomSize {
  code: string;
  name: string;
  password?: string;
  maxRoomSize: number;
  timeoutSeconds: number;
}
