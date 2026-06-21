import { ApiUser } from "./user";

export interface ISong {
  id: string;
  name: string;
  artistName?: string;
  url?: string;
  user: ApiUser;
};

export interface ApiSong {
  id: string;
  name: string;
  url?: string;
  user: ApiUser;
}
