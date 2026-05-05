import { ApiSong, ISong } from "./song";
import { IUser } from "./user";

export interface IRoom {
  name: string;
  code: string;
  password?: string;
  maxQuantity: number;
  quantity: number;
  users: IUser[];
  songs: ISong[];
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
}

export interface ApiRoomInfo {
  name: string;
  hasPassword: boolean;
}
