import { ApiHost, IHost } from "../interfaces/host";
import { apiHostToIPlan } from "./plan";

export function apiHostToHost(apiHost: ApiHost): IHost  {
  const dateObj = new Date(apiHost.premiumLastPayment);
  return {
    email: apiHost.email,
    plan: apiHostToIPlan(apiHost),
  }
}
