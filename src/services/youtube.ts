import { IVideo } from "../interfaces/youtube";
import { ApiVideoToIVideo } from "../mappers/youtube";


//export const youtubeEndpoint = (code: string) => "?part=snippet&q=python&type=video&key=SUA_CHAVE_AQUI"
export async function getVideoData(name: string): Promise<IVideo[]> {
  const res = {
    "kind": "youtube#searchListResponse",
    "etag": "m2GHIw6_g5uR9865U8N1GZg81-0",
    "nextPageToken": "CAUQAA",
    "regionCode": "BR",
    "pageInfo": {
      "totalResults": 1000000,
      "resultsPerPage": 5
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "sR4f6G2_h98765",
        "id": {
          "kind": "youtube#video",
          "videoId": "rfscVS0vtbw"
        },
        "snippet": {
          "publishedAt": "2026-01-15T14:00:00Z",
          "channelId": "UCwtdv17_79M8b698qf9O6aA",
          "title": "Curso de Python para Iniciantes - Do Zero ao Primeiro App",
          "description": "Aprenda Python do absoluto zero neste guia prático. Vamos construir nosso primeiro projeto e entender a sintaxe da linguagem.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/rfscVS0vtbw/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/rfscVS0vtbw/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/rfscVS0vtbw/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "Canal de Programação Oficial",
          "liveBroadcastContent": "none",
          "publishTime": "2026-01-15T14:00:00Z"
        }
      }
    ]
  }
  return ApiVideoToIVideo(res);
}
