import React from "react";
import { useState } from "react";
import Head from "next/head";
import { useAuth } from "@/hooks/useAuth";
import { useTokens } from "@/hooks/useTokens";
import { usePlans } from "@/hooks/usePlans";
import WalletModal from "@/components/WalletModal";
import UserDropdown from "@/components/UserDropdown";
import Footer from "@/components/Footer";
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
import { Plus, Coins, Zap, Shield, Users, Sparkles, TrendingUp, Globe, Star, Wallet, ArrowRight } from "lucide-react";

const HomePage: React.FC = () => {
  const { user, isAuthenticated, connectWallet } = useAuth();
  const { tokens, isLoading: tokensLoading } = useTokens();
  const { plans, isLoading: plansLoading } = usePlans();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleWalletConnect = async (walletType: string) => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

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

        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/Starkmint Image.png" 
                    alt="StarkMint Logo" 
                    className="h-10 w-auto"
                  />
                  <div className="hidden md:flex items-center space-x-8 ml-8">
                    <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      Features
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      Pricing
                    </a>
                    <a href="#docs" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      Docs
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Globe className="h-3 w-3 mr-1" />
                    StarkNet
                  </Badge>
                  <Button
                    onClick={() => setShowWalletModal(true)}
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                  Create ERC20 tokens on{" "}
                  <span className="text-blue-600">StarkNet</span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                  The easiest way to deploy ERC20 tokens on StarkNet. 
                  Secure payments with STRK. Simple, fast, and transparent.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                  <Button
                    onClick={() => setShowWalletModal(true)}
                    size="xl"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    Connect Wallet to Start
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                  >
                    View Documentation
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>

                  {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="text-center p-8 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                          <Zap className="h-8 w-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">Fast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg text-gray-600">
                          Create your token in minutes with our 
                          intuitive and modern interface
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="text-center p-8 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                          <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">Secure</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg text-gray-600">
                          Audited smart contracts and decentralized 
                          STRK payments for maximum security
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="text-center p-8 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
                          <Users className="h-8 w-8 text-purple-600" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">Community</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg text-gray-600">
                          Join an active community of token creators 
                          and Web3 innovators
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section id="pricing" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Choose your plan
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Flexible plans designed to grow with you in the Web3 ecosystem
                </p>
              </div>

              {!plansLoading && plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {plans.map((plan, index) => (
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

          {/* Stats Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Tokens Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
          <WalletModal
            isOpen={showWalletModal}
            onClose={() => setShowWalletModal(false)}
            onConnect={handleWalletConnect}
          />
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

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="/Starkmint Image.png" 
                  alt="StarkMint Logo" 
                  className="h-10 w-auto"
                />
                <div className="hidden md:flex items-center space-x-8 ml-8">
                  <a href="#dashboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Dashboard
                  </a>
                  <a href="#tokens" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    My Tokens
                  </a>
                  <a href="#docs" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Docs
                  </a>
                </div>
              </div>
              <UserDropdown />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 bg-white min-h-screen">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Created Tokens
                </CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">{tokens.length}</div>
                <p className="text-sm text-gray-600">
                  Total deployed tokens
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Current Plan
                </CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.currentPlanId === 0
                    ? "Free"
                    : user?.currentPlanId === 1
                    ? "Pro"
                    : "Enterprise"}
                </div>
                <p className="text-sm text-gray-600">
                  Current pricing plan
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Status</CardTitle>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">Active</div>
                <p className="text-sm text-gray-600">Wallet connected and verified</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">My Tokens</h2>
              <p className="text-gray-600">Manage and monitor your ERC20 tokens</p>
            </div>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-5 w-5 mr-2" />
              Mint Your Token Now
            </Button>
          </div>

          {/* Tokens List */}
          {tokensLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse bg-white border border-gray-200">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded-lg"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
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
            <Card className="text-center py-20 max-w-2xl mx-auto bg-white border border-gray-200">
              <CardContent className="space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                  <Coins className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No tokens created yet</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    Start your Web3 journey by creating your first ERC20 token on StarkNet
                  </p>
                </div>
                <Button 
                  size="xl" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create My First Token
                </Button>
              </CardContent>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;