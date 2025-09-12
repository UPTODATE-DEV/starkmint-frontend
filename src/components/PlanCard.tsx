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
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  isSelected?: boolean;
  isCurrent?: boolean;
  isPopular?: boolean;
  onSelect?: (plan: Plan) => void;
  onUpgrade?: (plan: Plan) => void;
  userTokenCount?: number;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelected = false,
  isCurrent = false,
  isPopular = false,
  onSelect,
  onUpgrade,
  userTokenCount = 0,
}) => {
  const isFree = plan.priceStrk === 0;
  const canCreateToken = plan.maxTokens
    ? userTokenCount < plan.maxTokens
    : true;
  const isUnlimited = !plan.maxTokens;

  const handleAction = () => {
    if (isCurrent) return;

    if (isFree) {
      onSelect?.(plan);
    } else {
      onUpgrade?.(plan);
    }
  };

  const getIcon = () => {
    if (isFree) return <Check className="h-6 w-6" />;
    if (plan.name === "Enterprise") return <Crown className="h-6 w-6" />;
    return <Zap className="h-6 w-6" />;
  };

  const getButtonText = () => {
    if (isCurrent) return "Plan actuel";
    if (isFree) return "Commencer gratuitement";
    return "Upgrader maintenant";
  };

  const getButtonVariant = () => {
    if (isCurrent) return "outline";
    if (isPopular || plan.name === "Pro") return "web3";
    return "mint";
  };

  const getCardVariant = () => {
    if (isPopular) return "glow";
    return "glass";
  };

  const getPlanDescription = () => {
    if (isFree) return "Parfait pour découvrir la plateforme";
    if (isPopular) return "Idéal pour les projets sérieux";
    return "Pour les entreprises et projets d'envergure";
  };

  return (
    <Card
      variant={getCardVariant()}
      className={`relative transition-all duration-500 group ${
        isSelected ? "ring-2 ring-mint shadow-2xl shadow-mint/20 scale-105" : ""
      } ${isPopular ? "border-mint/30 shadow-2xl shadow-mint/10" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Badge variant="mint" className="px-4 py-2 text-sm font-bold animate-glow-pulse">
            <Star className="h-4 w-4 mr-1" />
            Populaire
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-navy/5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
            isFree 
              ? "bg-white/10 text-white group-hover:bg-white/20" 
              : isPopular 
                ? "bg-gradient-to-br from-mint/20 to-mint/10 text-mint group-hover:from-mint/30 group-hover:to-mint/20" 
                : "bg-gradient-to-br from-navy/20 to-navy/10 text-navy group-hover:from-navy/30 group-hover:to-navy/20"
          }`}>
            {getIcon()}
          </div>
          <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
          <CardDescription className="text-base text-white/70">
            {getPlanDescription()}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Prix */}
        <div className="text-center">
          <div className={`text-4xl font-black mb-2 ${
            isFree ? "text-white" : "text-mint"
          }`}>
            {isFree
              ? "Gratuit"
              : `${formatAmount(plan.priceStrk.toString())} STRK`}
          </div>
          {!isFree && (
            <div className="text-sm text-white/60">
              Paiement unique • Accès à vie
            </div>
          )}
        </div>

        {/* Limites */}
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm font-medium text-white/80">Tokens maximum:</span>
            <span className={`text-sm font-bold ${isUnlimited ? "text-mint" : "text-white"}`}>
              {isUnlimited ? "Illimité" : plan.maxTokens}
            </span>
          </div>

          {!isUnlimited && (
            <>
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-white/80">Tokens créés:</span>
                <span className="text-sm font-bold text-white">
                  {userTokenCount} / {plan.maxTokens}
                </span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-mint to-mint-800 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{
                    width: `${(userTokenCount / (plan.maxTokens || 1)) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fonctionnalités */}
        {plan.features && plan.features.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white/90 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-mint" />
              Fonctionnalités incluses:
            </h4>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 mt-0.5 flex-shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-white/80 leading-relaxed">{feature}</span>
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
          size="lg"
          className="w-full group"
        >
          {getButtonText()}
          {!isCurrent && (
            <Zap className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          )}
        </Button>

        {!isFree && !canCreateToken && (
          <p className="text-xs text-center text-warning/80 bg-warning/10 border border-warning/20 rounded-lg p-3">
            Limite de tokens atteinte pour ce plan
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;