import api from "../utils/api";
import { roomEmojiEndpoint } from "../utils/endpoints";

export async function sendEmoji(code: string, emoji: string) {
  const res = await api.post(roomEmojiEndpoint(code, emoji));
  return res.data;
}
