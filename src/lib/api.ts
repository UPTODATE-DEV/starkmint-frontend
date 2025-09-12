import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  AuthRequest,
  AuthResponse,
  User,
  Token,
  CreateTokenForm,
  Payment,
  PaymentInitiation,
  Plan,
  ApiError,
} from "@/types";

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = "/login";
        }
        return Promise.reject(this.handleError(error));
      }
    );

    // Charger le token depuis le localStorage
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("starkmint_token");
    }
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || "Une erreur est survenue",
        statusCode: error.response.status,
        error: error.response.data?.error,
      };
    }
    return {
      message: "Erreur de connexion",
      statusCode: 0,
    };
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("starkmint_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("starkmint_token");
    }
  }

  // Authentification
  async login(authData: AuthRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post(
      "/auth/login",
      authData
    );
    this.setToken(response.data.accessToken);
    return response.data;
  }

  async register(userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.client.post(
      "/auth/register",
      userData
    );
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get(
      "/users/profile"
    );
    return response.data;
  }

  async getUserStats(): Promise<any> {
    const response: AxiosResponse<any> = await this.client.get("/users/stats");
    return response.data;
  }

  // Tokens
  async getTokens(): Promise<Token[]> {
    const response: AxiosResponse<Token[]> = await this.client.get("/tokens");
    return response.data;
  }

  async getTokenById(id: string): Promise<Token> {
    const response: AxiosResponse<Token> = await this.client.get(
      `/tokens/${id}`
    );
    return response.data;
  }

  async getTokenByAddress(address: string): Promise<Token> {
    const response: AxiosResponse<Token> = await this.client.get(
      `/tokens/address/${address}`
    );
    return response.data;
  }

  async createToken(tokenData: CreateTokenForm): Promise<Token> {
    const response: AxiosResponse<Token> = await this.client.post(
      "/tokens",
      tokenData
    );
    return response.data;
  }

  // Paiements
  async initiatePayment(planId: number): Promise<PaymentInitiation> {
    const response: AxiosResponse<PaymentInitiation> = await this.client.post(
      "/payments/initiate",
      { planId }
    );
    return response.data;
  }

  async verifyPayment(txHash: string): Promise<Payment> {
    const response: AxiosResponse<Payment> = await this.client.get(
      `/payments/verify/${txHash}`
    );
    return response.data;
  }

  async getPayments(): Promise<Payment[]> {
    const response: AxiosResponse<Payment[]> = await this.client.get(
      "/payments"
    );
    return response.data;
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response: AxiosResponse<Payment> = await this.client.get(
      `/payments/${id}`
    );
    return response.data;
  }

  // Plans
  async getPlans(): Promise<Plan[]> {
    const response: AxiosResponse<Plan[]> = await this.client.get("/plans");
    return response.data;
  }

  async getPlanById(id: number): Promise<Plan> {
    const response: AxiosResponse<Plan> = await this.client.get(`/plans/${id}`);
    return response.data;
  }

  // Santé de l'API
  async getHealth(): Promise<any> {
    const response: AxiosResponse<any> = await this.client.get("/health");
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
