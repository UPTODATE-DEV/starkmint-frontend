import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/lib/api";
import { starknetManager } from "@/lib/starknet";
import { Token, CreateTokenForm } from "@/types";
import { toast } from "react-hot-toast";

export function useTokens() {
  const queryClient = useQueryClient();

  // Récupérer les tokens
  const {
    data: tokens = [],
    isLoading,
    error,
    refetch: refreshTokens,
  } = useQuery("tokens", apiClient.getTokens, {
    staleTime: 30000, // 30 secondes
    cacheTime: 300000, // 5 minutes
  });

  // Créer un token
  const createTokenMutation = useMutation(
    async (tokenData: CreateTokenForm) => {
      return await apiClient.createToken(tokenData);
    },
    {
      onSuccess: (data: Token) => {
        queryClient.invalidateQueries("tokens");
        toast.success(`Token ${data.name} créé avec succès !`);
      },
      onError: (error: any) => {
        toast.error("Erreur lors de la création: " + error.message);
      },
    }
  );

  // Créer un token avec interaction blockchain
  const createTokenWithBlockchain = async (
    tokenData: CreateTokenForm,
    account: any
  ) => {
    try {
      // Vérifier le paiement si nécessaire
      if (tokenData.planId > 0) {
        const hasPayment = await starknetManager.verifyPayment(
          account.address,
          tokenData.planId
        );

        if (!hasPayment) {
          throw new Error("Paiement requis pour ce plan");
        }
      }

      // Créer le token via l'API
      const result = await createTokenMutation.mutateAsync(tokenData);

      return result;
    } catch (error: any) {
      toast.error("Erreur lors de la création: " + error.message);
      throw error;
    }
  };

  // Obtenir un token par ID
  const getTokenById = (id: string) => {
    return useQuery(["token", id], () => apiClient.getTokenById(id), {
      enabled: !!id,
    });
  };

  // Obtenir un token par adresse
  const getTokenByAddress = (address: string) => {
    return useQuery(
      ["token", "address", address],
      () => apiClient.getTokenByAddress(address),
      {
        enabled: !!address,
      }
    );
  };

  return {
    tokens,
    isLoading,
    error,
    createToken: createTokenMutation.mutateAsync,
    createTokenWithBlockchain,
    refreshTokens,
    getTokenById,
    getTokenByAddress,
    isCreating: createTokenMutation.isLoading,
  };
}
