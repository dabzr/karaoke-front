import { useState } from "react";
import { updatePlan } from "../services/plan";
import { IPlan } from "../interfaces/plan";

export function usePlan() {

  const [plan, setPlan] = useState<IPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const buyPlan = (type: string) => {
    setIsLoading(true);
    updatePlan(type)
      .then((res) => {
        setPlan(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return {
    isLoading,
    error,
    buyPlan,
    plan,
  }
}
