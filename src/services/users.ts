import { ApiUser } from "../interfaces/user";
import api from "../utils/api";
import { roomUsersEndpoint } from "../utils/endpoints";

export async function getUsers(id: string): Promise<ApiUser[]> {
  const res = await api.get(roomUsersEndpoint(id));
  return res.data;
}
