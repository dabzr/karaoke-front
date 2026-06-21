import { ApiHost } from "../interfaces/host";
import { IPlan } from "../interfaces/plan";
import { language } from "../utils/settings";
import { strings } from "../utils/strings";

export function apiHostToIPlan(apiHost: ApiHost): IPlan {
  const dateObj = new Date(apiHost.premiumLastPayment);
  return {
    name: strings[language][apiHost.type],
    lastPayment: apiHost.premiumLastPayment ? dateObj.toLocaleDateString("pt-br", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : "Nunca foi pago",
  }
}
