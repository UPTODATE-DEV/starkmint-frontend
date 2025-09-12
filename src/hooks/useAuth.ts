import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/lib/api";
import { starknetManager } from "@/lib/starknet";
import { User, AuthRequest, AuthResponse } from "@/types";
import { toast } from "react-hot-toast";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("starkmint_token");
        if (token) {
          const userData = await apiClient.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur de vérification auth:", error);
        apiClient.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Connexion
  const loginMutation = useMutation(
    async (authData: AuthRequest) => {
      return await apiClient.login(authData);
    },
    {
      onSuccess: (data: AuthResponse) => {
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Connexion réussie !");
      },
      onError: (error: any) => {
        toast.error("Erreur de connexion: " + error.message);
      },
    }
  );

  // Déconnexion
  const logout = useCallback(() => {
    apiClient.clearToken();
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
    toast.success("Déconnexion réussie");
  }, [queryClient]);

  // Rafraîchir les données utilisateur
  const refreshUser = useCallback(async () => {
    try {
      const userData = await apiClient.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
      logout();
    }
  }, [logout]);

  // Connexion avec wallet
  const connectWallet = useCallback(async () => {
    try {
      // Vérifier la connexion StarkNet
      const isConnected = await starknetManager.checkConnection();
      if (!isConnected) {
        throw new Error("Impossible de se connecter au réseau StarkNet");
      }

      // Obtenir l'adresse du wallet (à implémenter selon le wallet)
      const address = await starknetManager.getAccountAddress();
      if (!address) {
        throw new Error("Aucun wallet connecté");
      }

      // Générer le message à signer
      const message = `StarkMint: Connect your wallet\nAddress: ${address}\nTimestamp: ${Date.now()}`;

      // Demander la signature (à implémenter selon le wallet)
      const signature = await signMessage(message);

      // Authentifier avec l'API
      await loginMutation.mutateAsync({
        walletAddress: address,
        signature,
        message,
      });
    } catch (error: any) {
      toast.error("Erreur de connexion wallet: " + error.message);
    }
  }, [loginMutation]);

  // Fonction de signature (à implémenter selon le wallet)
  const signMessage = async (message: string): Promise<string> => {
    // Cette fonction doit être implémentée selon le wallet utilisé
    // Pour l'instant, on simule une signature
    throw new Error("Fonction de signature non implémentée");
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isLoading,
    login: loginMutation.mutateAsync,
    logout,
    refreshUser,
    connectWallet,
    error: loginMutation.error,
  };
}
