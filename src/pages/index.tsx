import React from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/useAuth";
import { useTokens } from "@/hooks/useTokens";
import { usePlans } from "@/hooks/usePlans";
import WalletConnect from "@/components/WalletConnect";
import TokenCard from "@/components/TokenCard";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Plus, Coins, Zap, Shield, Users } from "lucide-react";

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { tokens, isLoading: tokensLoading } = useTokens();
  const { plans, isLoading: plansLoading } = usePlans();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>StarkMint - Créez vos tokens ERC20 sur StarkNet</title>
          <meta
            name="description"
            content="Plateforme décentralisée pour créer des tokens ERC20 sur StarkNet avec paiement STRK"
          />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-starknet flex items-center justify-center">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">StarkMint</span>
                </div>
                <Badge variant="outline">StarkNet</Badge>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Créez vos tokens <span className="text-starknet">ERC20</span>{" "}
                sur <span className="text-starknet">StarkNet</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Plateforme décentralisée pour créer des tokens ERC20 avec
                paiement sécurisé en STRK. Simple, rapide et transparent.
              </p>

              <div className="flex flex-col items-center space-y-8">
                <WalletConnect />

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-starknet/10">
                        <Zap className="h-6 w-6 text-starknet" />
                      </div>
                      <CardTitle>Rapide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Créez votre token en quelques minutes avec notre
                        interface intuitive
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-starknet/10">
                        <Shield className="h-6 w-6 text-starknet" />
                      </div>
                      <CardTitle>Sécurisé</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Smart contracts audités et paiements décentralisés en
                        STRK
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-starknet/10">
                        <Users className="h-6 w-6 text-starknet" />
                      </div>
                      <CardTitle>Communautaire</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Rejoignez une communauté active de créateurs de tokens
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Choisissez votre plan
                </h2>
                <p className="text-muted-foreground">
                  Des plans flexibles pour tous vos besoins
                </p>
              </div>

              {!plansLoading && plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      isPopular={plan.name === "Pro"}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - StarkMint</title>
        <meta
          name="description"
          content="Gérez vos tokens ERC20 sur StarkNet"
        />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-starknet flex items-center justify-center">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">StarkMint</span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  {user?.currentPlanId === 0
                    ? "Gratuit"
                    : user?.currentPlanId === 1
                    ? "Pro"
                    : "Enterprise"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {user?.walletAddress
                    ? `${user.walletAddress.slice(
                        0,
                        6
                      )}...${user.walletAddress.slice(-4)}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tokens créés
                </CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tokens.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total de vos tokens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Plan actuel
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user?.currentPlanId === 0
                    ? "Gratuit"
                    : user?.currentPlanId === 1
                    ? "Pro"
                    : "Enterprise"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Plan de tarification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Statut</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Actif</div>
                <p className="text-xs text-muted-foreground">Wallet connecté</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Mes Tokens</h2>
            <Button variant="starknet">
              <Plus className="h-4 w-4 mr-2" />
              Créer un token
            </Button>
          </div>

          {/* Tokens List */}
          {tokensLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onViewDetails={(token) => {
                    // TODO: Implémenter la vue détaillée
                    console.log("View details:", token);
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun token créé</h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par créer votre premier token ERC20
                </p>
                <Button variant="starknet">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer mon premier token
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
