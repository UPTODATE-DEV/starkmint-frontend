import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { Wallet, ArrowRight, CheckCircle } from "lucide-react";
import { formatAddress } from "@/lib/utils";

const WalletConnect: React.FC = () => {
  const { user, isAuthenticated, connectWallet, isLoading } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">Wallet Connecté</CardTitle>
          <CardDescription>
            Votre wallet StarkNet est connecté et prêt à utiliser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Adresse:
              </span>
              <span className="text-sm font-mono">
                {formatAddress(user.walletAddress)}
              </span>
            </div>
            {user.username && (
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Nom d'utilisateur:
                </span>
                <span className="text-sm">{user.username}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Plan actuel:
              </span>
              <span className="text-sm">
                {user.currentPlanId === 0
                  ? "Gratuit"
                  : user.currentPlanId === 1
                  ? "Pro"
                  : "Enterprise"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-starknet/10">
          <Wallet className="h-6 w-6 text-starknet" />
        </div>
        <CardTitle className="text-xl">Connecter votre Wallet</CardTitle>
        <CardDescription>
          Connectez votre wallet StarkNet pour commencer à créer des tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Créez des tokens ERC20 sur StarkNet</p>
          <p>• Paiement sécurisé en STRK</p>
          <p>• Interface simple et intuitive</p>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isLoading || isConnecting}
          loading={isLoading || isConnecting}
          variant="starknet"
          className="w-full"
        >
          {isLoading || isConnecting ? (
            "Connexion..."
          ) : (
            <>
              Connecter Wallet
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
