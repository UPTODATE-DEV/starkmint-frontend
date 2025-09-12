import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Token } from "@/types";
import { formatAddress, formatAmount, copyToClipboard } from "@/lib/utils";
import { Copy, ExternalLink, Eye } from "lucide-react";
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
        return "secondary";
      case 1:
        return "default";
      case 2:
        return "success";
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

  return (
    <Card className="token-card hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {token.name}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-muted-foreground">
                {token.symbol}
              </span>
              <Badge variant={getPlanBadgeVariant(token.planId)}>
                {getPlanName(token.planId)}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(token)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Adresse:</span>
            <span className="font-mono text-xs">
              {formatAddress(token.tokenAddress, 4)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Décimales:</span>
            <span>{token.decimals}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Supply initial:</span>
            <span className="font-mono">
              {formatAmount(token.supplyWithDecimals, 0, token.symbol)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Statut:</span>
            <Badge variant={token.isVerified ? "success" : "warning"}>
              {token.isVerified ? "Vérifié" : "En attente"}
            </Badge>
          </div>
        </div>

        {token.deploymentTxHash && (
          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction:</span>
              <a
                href={`https://starkscan.co/tx/${token.deploymentTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-starknet hover:underline"
              >
                <span className="font-mono text-xs">
                  {formatAddress(token.deploymentTxHash, 4)}
                </span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Créé le {new Date(token.createdAt).toLocaleDateString("fr-FR")}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenCard;
