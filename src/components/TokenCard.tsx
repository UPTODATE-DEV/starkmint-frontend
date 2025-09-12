import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Token } from "@/types";
import { formatAddress, formatAmount, copyToClipboard } from "@/lib/utils";
import { Copy, ExternalLink, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface TokenCardProps {
  token: Token;
  onViewDetails?: (token: Token) => void;
  onCopyAddress?: (address: string) => void;
}

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  onViewDetails,
  onCopyAddress,
}) => {
  const handleCopyAddress = async () => {
    const success = await copyToClipboard(token.tokenAddress);
    if (success) {
      toast.success("Adresse copiée !");
      onCopyAddress?.(token.tokenAddress);
    } else {
      toast.error("Erreur lors de la copie");
    }
  };

  const getPlanBadgeVariant = (planId: number) => {
    switch (planId) {
      case 0:
        return "glass";
      case 1:
        return "mint";
      case 2:
        return "navy";
      default:
        return "outline";
    }
  };

  const getPlanName = (planId: number) => {
    switch (planId) {
      case 0:
        return "Gratuit";
      case 1:
        return "Pro";
      case 2:
        return "Enterprise";
      default:
        return "Inconnu";
    }
  };

  const getStatusIcon = () => {
    if (token.isVerified) {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    return <Clock className="h-4 w-4 text-warning" />;
  };

  const getStatusBadge = () => {
    if (token.isVerified) {
      return (
        <Badge variant="success" className="text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          Vérifié
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="text-xs">
        <Clock className="h-3 w-3 mr-1" />
        En attente
      </Badge>
    );
  };

  return (
    <Card variant="glow" className="token-card group hover:shadow-2xl hover:shadow-mint/10 transition-all duration-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-xl font-bold text-white group-hover:text-mint transition-colors duration-300">
              {token.name}
            </CardTitle>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-mono text-mint bg-mint/10 px-2 py-1 rounded-lg border border-mint/20">
                {token.symbol}
              </span>
              <Badge variant={getPlanBadgeVariant(token.planId)}>
                {getPlanName(token.planId)}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-10 w-10 p-0 hover:bg-mint/10 hover:text-mint transition-all duration-300"
            >
              <Copy className="h-4 w-4" />
            </Button>
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(token)}
                className="h-10 w-10 p-0 hover:bg-mint/10 hover:text-mint transition-all duration-300"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <span className="text-sm text-white/70">Adresse:</span>
            <span className="font-mono text-sm text-white font-semibold">
              {formatAddress(token.tokenAddress, 4)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-white/70">Décimales:</span>
            <span className="text-white font-semibold">{token.decimals}</span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-white/70">Supply initial:</span>
            <span className="font-mono text-sm text-white font-semibold">
              {formatAmount(token.supplyWithDecimals, 0, token.symbol)}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-white/70">Statut:</span>
            {getStatusBadge()}
          </div>
        </div>

        {token.deploymentTxHash && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <span className="text-sm text-white/70">Transaction:</span>
              <a
                href={`https://starkscan.co/tx/${token.deploymentTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-mint hover:text-mint-400 transition-colors duration-300 group"
              >
                <span className="font-mono text-sm">
                  {formatAddress(token.deploymentTxHash, 4)}
                </span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">
              Créé le {new Date(token.createdAt).toLocaleDateString("fr-FR", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {getStatusIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenCard;