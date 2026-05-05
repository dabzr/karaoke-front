import { loginEndpoint } from "../utils/endpoints";
import api from "../utils/api";
import Cookies from "js-cookie";

export async function verifyIsHost(): Promise<boolean> {
  return Cookies.get("host-id") !== undefined;
}

export async function login(email: string): Promise<boolean> {
  const res = await api.post(loginEndpoint, { email });
  Cookies.set("host-id", res.data.id)
  return true;
}

export async function logout(): Promise<boolean> {
  Cookies.remove("host-id");
  Cookies.remove("user-id");
  return true;
}
