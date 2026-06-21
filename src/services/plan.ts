import api from "../utils/api";
import { managerUpgradePlanEndpoint } from "../utils/endpoints";
import { apiHostToIPlan } from "../mappers/plan";

export async function updatePlan(type: string) {
  const res = await api.patch(managerUpgradePlanEndpoint(type));
  return apiHostToIPlan(res.data);
}
