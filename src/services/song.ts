import { ApiSong } from "../interfaces/song";
import api from "../utils/api";
import { queueRoomQueueEndpoint } from "../utils/endpoints";
import Cookies from "js-cookie";
import lastfmApi from "../utils/lastfmApi";
import { lastfmKey } from "../utils/settings";

const songDataQuery = (name: string) => `?method=track.search&api_key=${lastfmKey}&track=${name}&format=json`

export async function addSong(code: string, name: string, url: string): Promise<ApiSong> {
  const userId = Cookies.get("user-id");
  const songData = await lastfmApi.get(songDataQuery(name));
  const track = songData.data.results.trackmatches.track[0];
  const res = await api.post(queueRoomQueueEndpoint(code), { user_id: userId, name: track.name, artistName: track.artist, url });
  return res.data;
}
