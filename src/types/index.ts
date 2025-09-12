// Types pour l'API
export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  username?: string;
  currentPlanId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: number;
  name: string;
  priceStrk: number;
  maxTokens?: number;
  features?: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Token {
  id: string;
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  planId: number;
  deploymentTxHash?: string;
  blockNumber?: number;
  isVerified: boolean;
  createdAt: string;
  formattedSupply: string;
  supplyWithDecimals: string;
}

export interface Payment {
  id: string;
  userId: string;
  planId: number;
  amountStrk: number;
  paymentTxHash: string;
  paymentStatus: "pending" | "confirmed" | "failed" | "refunded";
  blockNumber?: number;
  createdAt: string;
  confirmedAt?: string;
  formattedAmount: string;
}

export interface PaymentInitiation {
  amountSTRK: string;
  factoryAddress: string;
  planId: number;
  instructions: string;
}

// Types pour l'authentification
export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface AuthRequest {
  walletAddress: string;
  signature: string;
  message: string;
}

// Types pour les formulaires
export interface CreateTokenForm {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  planId: number;
}

export interface PaymentForm {
  planId: number;
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Types pour les hooks
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: AuthRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export interface UseTokensReturn {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  createToken: (tokenData: CreateTokenForm) => Promise<Token>;
  refreshTokens: () => Promise<void>;
}

export interface UsePaymentsReturn {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  initiatePayment: (planId: number) => Promise<PaymentInitiation>;
  verifyPayment: (txHash: string) => Promise<Payment>;
  refreshPayments: () => Promise<void>;
}

// Types pour les composants
export interface TokenCardProps {
  token: Token;
  onViewDetails?: (token: Token) => void;
  onCopyAddress?: (address: string) => void;
}

export interface PlanCardProps {
  plan: Plan;
  isSelected?: boolean;
  onSelect?: (plan: Plan) => void;
  onUpgrade?: (plan: Plan) => void;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: PaymentInitiation;
  onPaymentComplete?: (txHash: string) => void;
}

// Types pour les contextes
export interface AppContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  network: "mainnet" | "testnet";
  setNetwork: (network: "mainnet" | "testnet") => void;
}

// Types pour les utilitaires
export interface FormatOptions {
  decimals?: number;
  symbol?: string;
  showSymbol?: boolean;
}

export interface CopyToClipboardOptions {
  text: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// Types pour les événements
export interface TokenCreatedEvent {
  tokenAddress: string;
  owner: string;
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  planId: number;
}

export interface PaymentReceivedEvent {
  user: string;
  amount: string;
  planId: number;
  txHash: string;
}

// Types pour les configurations
export interface StarkNetConfig {
  rpcUrl: string;
  chainId: string;
  factoryAddress: string;
  strkTokenAddress: string;
}

export interface AppConfig {
  apiUrl: string;
  starknet: StarkNetConfig;
  features: {
    enablePayments: boolean;
    enableAnalytics: boolean;
    enableNotifications: boolean;
  };
}
