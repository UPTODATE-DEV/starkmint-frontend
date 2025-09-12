import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { Wallet, ArrowRight, CheckCircle, Sparkles, Shield, Zap } from "lucide-react";
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
      <Card variant="glow" className="w-full max-w-md mx-auto animate-fade-in">
        <CardHeader className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-mint/10 to-navy/10 rounded-t-2xl"></div>
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-success to-success-light animate-glow-pulse">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl mb-2">Wallet Connecté</CardTitle>
            <CardDescription className="text-lg">
              Votre wallet StarkNet est connecté et prêt à utiliser
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium text-white/80">
                Adresse:
              </span>
              <span className="text-sm font-mono text-mint font-semibold">
                {formatAddress(user.walletAddress)}
              </span>
            </div>
            {user.username && (
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-white/80">
                  Nom d'utilisateur:
                </span>
                <span className="text-sm text-white font-semibold">{user.username}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-medium text-white/80">
                Plan actuel:
              </span>
              <Badge variant="mint">
                {user.currentPlanId === 0
                  ? "Gratuit"
                  : user.currentPlanId === 1
                  ? "Pro"
                  : "Enterprise"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glow" className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-navy/5 rounded-t-2xl"></div>
        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-mint to-mint-800 animate-float">
            <Wallet className="h-8 w-8 text-navy" />
          </div>
          <CardTitle className="text-2xl mb-2">Connecter votre Wallet</CardTitle>
          <CardDescription className="text-lg">
            Connectez votre wallet StarkNet pour commencer à créer des tokens
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/20">
              <Sparkles className="h-4 w-4 text-mint" />
            </div>
            <span className="text-white/90">Créez des tokens ERC20 sur StarkNet</span>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/20">
              <Shield className="h-4 w-4 text-mint" />
            </div>
            <span className="text-white/90">Paiement sécurisé en STRK</span>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/20">
              <Zap className="h-4 w-4 text-mint" />
            </div>
            <span className="text-white/90">Interface simple et intuitive</span>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isLoading || isConnecting}
          loading={isLoading || isConnecting}
          variant="web3"
          size="lg"
          className="w-full"
        >
          {isLoading || isConnecting ? (
            "Connexion..."
          ) : (
            <>
              Connecter Wallet
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-white/60 leading-relaxed">
          En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;