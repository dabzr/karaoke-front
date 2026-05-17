import { loginEndpoint, managerEndpoint, roomManagerEndpoint } from "../utils/endpoints";
import { ApiHost } from "../interfaces/host";
import api from "../utils/api";
import Cookies from "js-cookie";

export async function getHost(): Promise<ApiHost> {
  const hostId = Cookies.get("host-id");
  if (!hostId) throw new Error("Id de host não encontrado");
  const res = await api.get(roomManagerEndpoint(hostId));
  return res.data;
}

export async function login(email: string, password: string): Promise<ApiHost> {
  const res = await api.post(loginEndpoint, { email, password });
  Cookies.set("host-id", res.data.id)
  const host = await getHost();
  return host;
}

export async function logout(): Promise<boolean> {
  Cookies.remove("host-id");
  Cookies.remove("user-id");
  return true;
}

export async function register(email: string, password: string): Promise<boolean> {
  const res = await api.post(managerEndpoint, { email, password });
  return true;
}
