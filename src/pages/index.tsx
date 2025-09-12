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
import { Plus, Coins, Zap, Shield, Users, Sparkles, TrendingUp, Globe, Star } from "lucide-react";

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

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 particles-bg">
          {/* Header */}
          <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/Starkmint Image.png" 
                    alt="StarkMint Logo" 
                    className="h-12 w-auto animate-float"
                  />
                </div>
                <Badge variant="mint" className="animate-glow">
                  <Globe className="h-3 w-3 mr-1" />
                  StarkNet
                </Badge>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  Créez vos tokens{" "}
                  <span className="text-gradient">ERC20</span>{" "}
                  sur{" "}
                  <span className="text-gradient">StarkNet</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Plateforme décentralisée nouvelle génération pour créer des tokens ERC20 
                  avec paiement sécurisé en STRK. Simple, rapide et transparent.
                </p>

                <div className="flex flex-col items-center space-y-12">
                  <WalletConnect />

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
                    <Card variant="glow" className="text-center group">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/20 to-mint/10 group-hover:from-mint/30 group-hover:to-mint/20 transition-all duration-300">
                          <Zap className="h-8 w-8 text-mint" />
                        </div>
                        <CardTitle className="text-2xl">Rapide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg">
                          Créez votre token en quelques minutes avec notre
                          interface intuitive et moderne
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card variant="glow" className="text-center group">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/20 to-mint/10 group-hover:from-mint/30 group-hover:to-mint/20 transition-all duration-300">
                          <Shield className="h-8 w-8 text-mint" />
                        </div>
                        <CardTitle className="text-2xl">Sécurisé</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg">
                          Smart contracts audités et paiements décentralisés en
                          STRK pour une sécurité maximale
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card variant="glow" className="text-center group">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/20 to-mint/10 group-hover:from-mint/30 group-hover:to-mint/20 transition-all duration-300">
                          <Users className="h-8 w-8 text-mint" />
                        </div>
                        <CardTitle className="text-2xl">Communautaire</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg">
                          Rejoignez une communauté active de créateurs de tokens
                          et d'innovateurs Web3
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-mint/5 via-transparent to-navy/5"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Choisissez votre plan
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Des plans flexibles conçus pour accompagner votre croissance dans l'écosystème Web3
                </p>
              </div>

              {!plansLoading && plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {plans.map((plan, index) => (
                    <div key={plan.id} className="relative">
                      {plan.name === "Pro" && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge variant="mint" className="px-4 py-2 text-sm font-bold animate-glow-pulse">
                            <Star className="h-4 w-4 mr-1" />
                            Populaire
                          </Badge>
                        </div>
                      )}
                      <PlanCard
                        plan={plan}
                        isPopular={plan.name === "Pro"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-mint mb-2">1000+</div>
                  <div className="text-white/70">Tokens créés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-mint mb-2">500+</div>
                  <div className="text-white/70">Utilisateurs actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-mint mb-2">99.9%</div>
                  <div className="text-white/70">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-mint mb-2">24/7</div>
                  <div className="text-white/70">Support</div>
                </div>
              </div>
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 particles-bg">
        {/* Header */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="/Starkmint Image.png" 
                  alt="StarkMint Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="mint">
                  {user?.currentPlanId === 0
                    ? "Gratuit"
                    : user?.currentPlanId === 1
                    ? "Pro"
                    : "Enterprise"}
                </Badge>
                <Badge variant="glass" className="font-mono">
                  {user?.walletAddress
                    ? `${user.walletAddress.slice(
                        0,
                        6
                      )}...${user.walletAddress.slice(-4)}`
                    : ""}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="glow" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-white/90">
                  Tokens créés
                </CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/20 group-hover:bg-mint/30 transition-all duration-300">
                  <Coins className="h-6 w-6 text-mint" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">{tokens.length}</div>
                <p className="text-sm text-white/60">
                  Total de vos tokens déployés
                </p>
              </CardContent>
            </Card>

            <Card variant="glow" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-white/90">
                  Plan actuel
                </CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/20 group-hover:bg-mint/30 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-mint" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {user?.currentPlanId === 0
                    ? "Gratuit"
                    : user?.currentPlanId === 1
                    ? "Pro"
                    : "Enterprise"}
                </div>
                <p className="text-sm text-white/60">
                  Plan de tarification actuel
                </p>
              </CardContent>
            </Card>

            <Card variant="glow" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-white/90">Statut</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/20 group-hover:bg-success/30 transition-all duration-300">
                  <Shield className="h-6 w-6 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">Actif</div>
                <p className="text-sm text-white/60">Wallet connecté et vérifié</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Mes Tokens</h2>
              <p className="text-white/70">Gérez et surveillez vos tokens ERC20</p>
            </div>
            <Button variant="web3" size="lg" className="group">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Créer un token
            </Button>
          </div>

          {/* Tokens List */}
          {tokensLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-white/10 rounded-lg w-3/4 loading-shimmer"></div>
                    <div className="h-4 bg-white/10 rounded-lg w-1/2 loading-shimmer"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/10 rounded-lg loading-shimmer"></div>
                      <div className="h-4 bg-white/10 rounded-lg w-2/3 loading-shimmer"></div>
                      <div className="h-4 bg-white/10 rounded-lg w-1/2 loading-shimmer"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onViewDetails={(token) => {
                    console.log("View details:", token);
                  }}
                />
              ))}
            </div>
          ) : (
            <Card variant="glow" className="text-center py-20 max-w-2xl mx-auto">
              <CardContent className="space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-mint/10 animate-float">
                  <Coins className="h-10 w-10 text-mint" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Aucun token créé</h3>
                  <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                    Commencez votre aventure Web3 en créant votre premier token ERC20 sur StarkNet
                  </p>
                </div>
                <Button variant="web3" size="xl" className="group">
                  <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
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