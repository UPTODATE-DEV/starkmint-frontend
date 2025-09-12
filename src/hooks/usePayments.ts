import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/lib/api";
import { starknetManager } from "@/lib/starknet";
import { Payment, PaymentInitiation } from "@/types";
import { toast } from "react-hot-toast";

export function usePayments() {
  const queryClient = useQueryClient();

  // Récupérer les paiements
  const {
    data: payments = [],
    isLoading,
    error,
    refetch: refreshPayments,
  } = useQuery("payments", () => apiClient.getPayments(), {
    staleTime: 30000, // 30 secondes
    cacheTime: 300000, // 5 minutes
  });

  // Initier un paiement
  const initiatePaymentMutation = useMutation(
    async (planId: number) => {
      return await apiClient.initiatePayment(planId);
    },
    {
      onSuccess: (data: PaymentInitiation) => {
        toast.success("Détails de paiement récupérés");
      },
      onError: (error: any) => {
        toast.error("Erreur lors de l'initiation: " + error.message);
      },
    }
  );

  // Vérifier un paiement
  const verifyPaymentMutation = useMutation(
    async (txHash: string) => {
      return await apiClient.verifyPayment(txHash);
    },
    {
      onSuccess: (data: Payment) => {
        queryClient.invalidateQueries("payments");
        queryClient.invalidateQueries("tokens");
        toast.success("Paiement vérifié avec succès !");
      },
      onError: (error: any) => {
        toast.error("Erreur lors de la vérification: " + error.message);
      },
    }
  );

  // Effectuer un paiement avec interaction blockchain
  const payWithBlockchain = async (planId: number, account: any) => {
    try {
      // Obtenir les détails du paiement
      const paymentData = await initiatePaymentMutation.mutateAsync(planId);

      // Obtenir le solde STRK
      const balance = await starknetManager.getSTRKBalance(account.address);
      const requiredAmount = parseFloat(paymentData.amountSTRK);

      if (parseFloat(balance) < requiredAmount) {
        throw new Error(
          `Solde STRK insuffisant. Requis: ${requiredAmount} STRK, Disponible: ${balance} STRK`
        );
      }

      // Approuver les STRK
      const approveTxHash = await starknetManager.approveSTRK(
        account,
        paymentData.amountSTRK
      );
      await starknetManager.waitForTransaction(approveTxHash);

      // Effectuer le paiement
      const paymentTxHash = await starknetManager.payForPlan(
        account,
        planId,
        paymentData.amountSTRK
      );
      await starknetManager.waitForTransaction(paymentTxHash);

      // Vérifier le paiement
      await verifyPaymentMutation.mutateAsync(paymentTxHash);

      return paymentTxHash;
    } catch (error: any) {
      toast.error("Erreur lors du paiement: " + error.message);
      throw error;
    }
  };

  // Obtenir un paiement par ID
  const getPaymentById = (id: string) => {
    return useQuery(["payment", id], () => apiClient.getPaymentById(id), {
      enabled: !!id,
    });
  };

  return {
    payments,
    isLoading,
    error,
    initiatePayment: initiatePaymentMutation.mutateAsync,
    verifyPayment: verifyPaymentMutation.mutateAsync,
    payWithBlockchain,
    refreshPayments,
    getPaymentById,
    isInitiating: initiatePaymentMutation.isLoading,
    isVerifying: verifyPaymentMutation.isLoading,
  };
}
