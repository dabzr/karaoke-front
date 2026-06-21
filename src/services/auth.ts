import { loginEndpoint, managerEndpoint, roomManagerEndpoint, roomUserEndpoint } from "../utils/endpoints";
import { IHost, ApiHostRoom } from "../interfaces/host";
import api from "../utils/api";
import Cookies from "js-cookie";
import { apiHostToHost } from "../mappers/host";

export async function getHost(): Promise<IHost> {
  const res = await api.get(managerEndpoint);
  return apiHostToHost(res.data);
}

export async function getHostRoom(): Promise<ApiHostRoom> {
  const res = await api.get(roomManagerEndpoint);
  return res.data;
}

export async function login(email: string, password: string): Promise<boolean> {
  const res = await api.post(loginEndpoint, { email, password });
  Cookies.set("accessToken", res.data.id)
  return true;
}

export async function logout(): Promise<boolean> {
  Cookies.remove("accessToken");
  return true;
}

export async function register(email: string, password: string): Promise<boolean> {
  const res = await api.post(managerEndpoint, { email, password });
  return true;
}

export async function getUser(id: string): Promise<boolean> {
  const res = await api.get(roomUserEndpoint(id));
  return true;
}
