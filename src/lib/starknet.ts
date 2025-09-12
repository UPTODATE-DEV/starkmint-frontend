import {
  RpcProvider,
  Account,
  Contract,
  CallData,
  cairo,
  hash,
} from "starknet";
import { StarkNetConfig } from "@/types";

// Configuration StarkNet
export const starknetConfig: StarkNetConfig = {
  rpcUrl:
    process.env.NEXT_PUBLIC_STARKNET_RPC_URL ||
    "https://starknet-mainnet.infura.io/v3/YOUR_INFURA_KEY",
  chainId: "SN_MAIN",
  factoryAddress: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS || "",
  strkTokenAddress:
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4387",
};

// Provider StarkNet
export const provider = new RpcProvider({
  nodeUrl: starknetConfig.rpcUrl,
});

// ABI du contrat Factory
export const factoryAbi = [
  {
    type: "function",
    name: "create_token",
    inputs: [
      { name: "name", type: "felt252" },
      { name: "symbol", type: "felt252" },
      { name: "decimals", type: "u8" },
      { name: "initial_supply", type: "u256" },
      { name: "plan_id", type: "u64" },
    ],
    outputs: [{ name: "token_address", type: "ContractAddress" }],
    stateMutability: "external",
  },
  {
    type: "function",
    name: "pay_for_plan",
    inputs: [
      { name: "plan_id", type: "u64" },
      { name: "amount", type: "u256" },
    ],
    outputs: [],
    stateMutability: "external",
  },
  {
    type: "function",
    name: "get_plan_price",
    inputs: [{ name: "plan_id", type: "u64" }],
    outputs: [{ name: "price", type: "u256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verify_payment",
    inputs: [
      { name: "user", type: "ContractAddress" },
      { name: "plan_id", type: "u64" },
    ],
    outputs: [{ name: "verified", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "get_user_token_count",
    inputs: [{ name: "user", type: "ContractAddress" }],
    outputs: [{ name: "count", type: "u64" }],
    stateMutability: "view",
  },
];

// ABI du token STRK
export const strkTokenAbi = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "ContractAddress" }],
    outputs: [{ name: "balance", type: "u256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "ContractAddress" },
      { name: "spender", type: "ContractAddress" },
    ],
    outputs: [{ name: "allowance", type: "u256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "ContractAddress" },
      { name: "amount", type: "u256" },
    ],
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "external",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "recipient", type: "ContractAddress" },
      { name: "amount", type: "u256" },
    ],
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "external",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "sender", type: "ContractAddress" },
      { name: "recipient", type: "ContractAddress" },
      { name: "amount", type: "u256" },
    ],
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "external",
  },
];

// Classe pour gérer les interactions StarkNet
export class StarkNetManager {
  private provider: RpcProvider;
  private factoryContract: Contract;
  private strkTokenContract: Contract;

  constructor() {
    this.provider = provider;
    this.factoryContract = new Contract(
      factoryAbi,
      starknetConfig.factoryAddress,
      this.provider
    );
    this.strkTokenContract = new Contract(
      strkTokenAbi,
      starknetConfig.strkTokenAddress,
      this.provider
    );
  }

  // Vérifier la connexion au réseau
  async checkConnection(): Promise<boolean> {
    try {
      await this.provider.getChainId();
      return true;
    } catch (error) {
      console.error("Erreur de connexion StarkNet:", error);
      return false;
    }
  }

  // Obtenir l'adresse du compte connecté
  async getAccountAddress(): Promise<string | null> {
    try {
      // Cette fonction doit être implémentée selon le wallet utilisé
      // Pour l'instant, on retourne null
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse:", error);
      return null;
    }
  }

  // Signer un message
  async signMessage(message: string, account: Account): Promise<string> {
    try {
      // Pour le testnet, on simule une signature
      // En production, vous devriez implémenter une vraie signature
      const signature = "0x" + "0".repeat(130); // Signature simulée
      return signature;
    } catch (error) {
      console.error("Erreur lors de la signature:", error);
      throw error;
    }
  }

  // Vérifier la signature d'un message
  async verifyMessage(
    message: string,
    signature: string,
    address: string
  ): Promise<boolean> {
    try {
      const account = new Account(this.provider, address, "0x0");
      // Pour le testnet, on simule la vérification
      // En production, vous devriez implémenter une vraie vérification
      return true; // Vérification simulée
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      return false;
    }
  }

  // Obtenir le prix d'un plan
  async getPlanPrice(planId: number): Promise<string> {
    try {
      const result = await this.factoryContract.get_plan_price(planId);
      const priceInWei = result.toString();
      const priceInSTRK = (parseInt(priceInWei) / Math.pow(10, 18)).toFixed(9);
      return priceInSTRK;
    } catch (error) {
      console.error("Erreur lors de la récupération du prix:", error);
      throw error;
    }
  }

  // Vérifier le paiement d'un utilisateur
  async verifyPayment(userAddress: string, planId: number): Promise<boolean> {
    try {
      const result = await this.factoryContract.verify_payment(
        userAddress,
        planId
      );
      return result;
    } catch (error) {
      console.error("Erreur lors de la vérification du paiement:", error);
      return false;
    }
  }

  // Obtenir le nombre de tokens d'un utilisateur
  async getUserTokenCount(userAddress: string): Promise<number> {
    try {
      const result = await this.factoryContract.get_user_token_count(
        userAddress
      );
      return parseInt(result.toString());
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de tokens:",
        error
      );
      return 0;
    }
  }

  // Obtenir le solde STRK d'un utilisateur
  async getSTRKBalance(userAddress: string): Promise<string> {
    try {
      const result = await this.strkTokenContract.balanceOf(userAddress);
      const balanceInWei = result.toString();
      const balanceInSTRK = (parseInt(balanceInWei) / Math.pow(10, 18)).toFixed(
        9
      );
      return balanceInSTRK;
    } catch (error) {
      console.error("Erreur lors de la récupération du solde STRK:", error);
      return "0";
    }
  }

  // Approuver les STRK pour le paiement
  async approveSTRK(account: Account, amount: string): Promise<string> {
    try {
      const amountInWei = cairo.uint256(
        (parseFloat(amount) * Math.pow(10, 18)).toString()
      );
      const result = await this.strkTokenContract.approve(
        starknetConfig.factoryAddress,
        amountInWei
      );
      return result.transaction_hash;
    } catch (error) {
      console.error("Erreur lors de l'approbation STRK:", error);
      throw error;
    }
  }

  // Effectuer un paiement
  async payForPlan(
    account: Account,
    planId: number,
    amount: string
  ): Promise<string> {
    try {
      const amountInWei = cairo.uint256(
        (parseFloat(amount) * Math.pow(10, 18)).toString()
      );
      const result = await this.factoryContract.pay_for_plan(
        planId,
        amountInWei
      );
      return result.transaction_hash;
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      throw error;
    }
  }

  // Créer un token
  async createToken(
    account: Account,
    name: string,
    symbol: string,
    decimals: number,
    initialSupply: string,
    planId: number
  ): Promise<string> {
    try {
      const supplyInWei = cairo.uint256(initialSupply);
      const result = await this.factoryContract.create_token(
        name,
        symbol,
        decimals,
        supplyInWei,
        planId
      );
      return result.transaction_hash;
    } catch (error) {
      console.error("Erreur lors de la création du token:", error);
      throw error;
    }
  }

  // Attendre la confirmation d'une transaction
  async waitForTransaction(txHash: string): Promise<any> {
    try {
      return await this.provider.waitForTransaction(txHash);
    } catch (error) {
      console.error("Erreur lors de l'attente de la transaction:", error);
      throw error;
    }
  }

  // Obtenir les détails d'une transaction
  async getTransaction(txHash: string): Promise<any> {
    try {
      return await this.provider.getTransaction(txHash);
    } catch (error) {
      console.error("Erreur lors de la récupération de la transaction:", error);
      throw error;
    }
  }

  // Obtenir le reçu d'une transaction
  async getTransactionReceipt(txHash: string): Promise<any> {
    try {
      return await this.provider.getTransactionReceipt(txHash);
    } catch (error) {
      console.error("Erreur lors de la récupération du reçu:", error);
      throw error;
    }
  }
}

// Instance globale
export const starknetManager = new StarkNetManager();

// Utilitaires
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount: string, decimals: number = 18): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "0";
  return num.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
};

export const parseAmount = (amount: string, decimals: number = 18): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "0";
  return (num * Math.pow(10, decimals)).toString();
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[0-9a-fA-F]{63,64}$/.test(address);
};

export const generateMessage = (address: string): string => {
  const timestamp = Date.now();
  return `StarkMint: Connect your wallet\nAddress: ${address}\nTimestamp: ${timestamp}`;
};
