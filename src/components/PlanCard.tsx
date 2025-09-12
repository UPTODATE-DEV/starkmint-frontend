import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plan } from "@/types";
import { formatAmount } from "@/lib/utils";
import { Check, Star, Zap } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  isSelected?: boolean;
  isCurrent?: boolean;
  onSelect?: (plan: Plan) => void;
  onUpgrade?: (plan: Plan) => void;
  userTokenCount?: number;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelected = false,
  isCurrent = false,
  onSelect,
  onUpgrade,
  userTokenCount = 0,
}) => {
  const isFree = plan.priceStrk === 0;
  const isPopular = plan.name === "Pro";
  const canCreateToken = plan.canCreateToken(userTokenCount);
  const isUnlimited = plan.hasUnlimitedTokens();

  const handleAction = () => {
    if (isCurrent) return;

    if (isFree) {
      onSelect?.(plan);
    } else {
      onUpgrade?.(plan);
    }
  };

  const getIcon = () => {
    if (isFree) return <Check className="h-5 w-5" />;
    if (isPopular) return <Star className="h-5 w-5" />;
    return <Zap className="h-5 w-5" />;
  };

  const getButtonText = () => {
    if (isCurrent) return "Plan actuel";
    if (isFree) return "Sélectionner";
    return "Upgrader";
  };

  const getButtonVariant = () => {
    if (isCurrent) return "outline";
    if (isPopular) return "starknet";
    return "default";
  };

  return (
    <Card
      className={`relative transition-all duration-300 ${
        isSelected ? "ring-2 ring-starknet shadow-lg" : ""
      } ${isPopular ? "border-starknet/20 shadow-starknet/10" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="starknet" className="px-3 py-1">
            <Star className="h-3 w-3 mr-1" />
            Populaire
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-starknet/10">
          {getIcon()}
        </div>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-base">
          {isFree
            ? "Parfait pour commencer"
            : isPopular
            ? "Idéal pour les projets"
            : "Pour les entreprises"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Prix */}
        <div className="text-center">
          <div className="text-4xl font-bold text-starknet">
            {isFree
              ? "Gratuit"
              : `${formatAmount(plan.priceStrk.toString())} STRK`}
          </div>
          {!isFree && (
            <div className="text-sm text-muted-foreground mt-1">
              Paiement unique
            </div>
          )}
        </div>

        {/* Limites */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tokens maximum:</span>
            <span className="text-sm">
              {isUnlimited ? "Illimité" : plan.maxTokens}
            </span>
          </div>

          {!isUnlimited && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tokens créés:</span>
              <span className="text-sm">
                {userTokenCount} / {plan.maxTokens}
              </span>
            </div>
          )}

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-starknet h-2 rounded-full transition-all duration-300"
              style={{
                width: isUnlimited
                  ? "100%"
                  : `${(userTokenCount / (plan.maxTokens || 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Fonctionnalités */}
        {plan.features && plan.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Fonctionnalités incluses:</h4>
            <ul className="space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bouton d'action */}
        <Button
          onClick={handleAction}
          disabled={isCurrent || (!isFree && !canCreateToken)}
          variant={getButtonVariant()}
          className="w-full"
        >
          {getButtonText()}
        </Button>

        {!isFree && !canCreateToken && (
          <p className="text-xs text-center text-muted-foreground">
            Limite de tokens atteinte
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
