import { useQuery } from "react-query";
import { apiClient } from "@/lib/api";
import { Plan } from "@/types";

export function usePlans() {
  // Récupérer tous les plans
  const {
    data: plans = [],
    isLoading,
    error,
    refetch: refreshPlans,
  } = useQuery("plans", apiClient.getPlans, {
    staleTime: 300000, // 5 minutes
    cacheTime: 600000, // 10 minutes
  });

  // Récupérer un plan par ID
  const getPlanById = useQuery(
    ["plan", "id"],
    (id: number) => apiClient.getPlanById(id),
    {
      enabled: false,
    }
  );

  // Obtenir le plan gratuit
  const freePlan = plans.find((plan) => plan.priceStrk === 0);

  // Obtenir les plans payants
  const paidPlans = plans.filter((plan) => plan.priceStrk > 0);

  // Obtenir le plan le plus populaire (Pro)
  const popularPlan = plans.find((plan) => plan.name === "Pro");

  // Obtenir le plan Enterprise
  const enterprisePlan = plans.find((plan) => plan.name === "Enterprise");

  return {
    plans,
    freePlan,
    paidPlans,
    popularPlan,
    enterprisePlan,
    isLoading,
    error,
    refreshPlans,
    getPlanById: getPlanById.refetch,
  };
}
