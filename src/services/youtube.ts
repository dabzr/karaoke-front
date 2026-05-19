import { IVideo } from "../interfaces/youtube";
import { ApiVideoToIVideo } from "../mappers/youtube";
import { youtubeKey } from "../utils/settings";
import youtubeApi from "../utils/youtubeApi";

export const youtubeEndpoint = (search: string) => `?part=snippet&q=${search}&type=video&key=${youtubeKey}`

export async function getVideoData(name: string): Promise<IVideo[]> {
  const res = await youtubeApi.get(youtubeEndpoint("karaokê " + name));
  return ApiVideoToIVideo(res.data);
}
