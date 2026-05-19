import { IVideo } from "../interfaces/youtube";
import { ApiVideoToIVideo } from "../mappers/youtube";
import { youtubeKey } from "../utils/settings";
import youtubeApi from "../utils/youtubeApi";

export const youtubeEndpoint = (search: string) => `?part=snippet&q=${search}&type=video&key=${youtubeKey}`

export async function getVideoData(name: string): Promise<IVideo[]> {
  const lastVideos = localStorage.getItem("videos")
  if(localStorage.getItem("lastSearch") === name && lastVideos) return JSON.parse(lastVideos);
  const res = await youtubeApi.get(youtubeEndpoint("karaokê " + name));
  localStorage.setItem("lastSearch", name);
  const videos = ApiVideoToIVideo(res.data);
  localStorage.setItem("videos", JSON.stringify(videos));
  return videos;
}
