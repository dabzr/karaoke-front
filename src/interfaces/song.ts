<<<<<<< Updated upstream
=======
import { ApiUser } from "./user";
>>>>>>> Stashed changes

export interface ISong {
  name: string;
  artist?: string;
  link?: string;
};
<<<<<<< Updated upstream
=======

export interface ApiSong {
  id: string;
  name: string;
  url?: string;
  user: ApiUser;
}
>>>>>>> Stashed changes
