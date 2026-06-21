import { ApiVideo, IVideo } from "../interfaces/youtube";

export function ApiVideoToIVideo(data: ApiVideo): IVideo[] {
  return data.items.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    thumbnailUrl: video.snippet.thumbnails.default.url,
    channelTitle: video.snippet.channelTitle,
  }));
}
