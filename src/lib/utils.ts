import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatage des adresses
export function formatAddress(address: string, length: number = 6): string {
  if (!address) return "";
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

// Formatage des montants
export function formatAmount(
  amount: string | number,
  decimals: number = 18,
  symbol?: string
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";

  const formatted = num.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });

  return symbol ? `${formatted} ${symbol}` : formatted;
}

// Conversion des montants
export function parseAmount(amount: string, decimals: number = 18): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return "0";
  return (num * Math.pow(10, decimals)).toString();
}

// Validation des adresses
export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{63,64}$/.test(address);
}

// Validation des hash de transaction
export function isValidTxHash(hash: string): boolean {
  return /^0x[0-9a-fA-F]{63,64}$/.test(hash);
}

// Génération de messages pour la signature
export function generateMessage(
  address: string,
  action: string = "connect"
): string {
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(2, 15);

  return `StarkMint: ${action}\nAddress: ${address}\nTimestamp: ${timestamp}\nNonce: ${nonce}`;
}

// Copie dans le presse-papiers
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error("Erreur lors de la copie:", error);
    return false;
  }
}

// Formatage des dates
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Formatage des dates relatives
export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return "Il y a quelques secondes";
  if (diffInSeconds < 3600)
    return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`;
  if (diffInSeconds < 86400)
    return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`;
  if (diffInSeconds < 2592000)
    return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`;

  return formatDate(d);
}

// Débounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Génération d'ID unique
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Validation des formulaires
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateUsername(username: string): boolean {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
}

export function validateTokenName(name: string): boolean {
  return name.length >= 1 && name.length <= 100;
}

export function validateTokenSymbol(symbol: string): boolean {
  const re = /^[A-Z0-9]{1,20}$/;
  return re.test(symbol);
}

// Gestion des erreurs
export function getErrorMessage(error: any): string {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return "Une erreur inattendue est survenue";
}

// Gestion des statuts
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "confirmed":
    case "success":
      return "text-green-600 bg-green-100";
    case "failed":
    case "error":
      return "text-red-600 bg-red-100";
    case "cancelled":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

export function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "En attente";
    case "confirmed":
      return "Confirmé";
    case "failed":
      return "Échec";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
}

// Formatage des nombres
export function formatNumber(num: number): string {
  return num.toLocaleString("fr-FR");
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}

// Gestion des couleurs
export function getRandomColor(): string {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Gestion des tailles
export function getFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Gestion des URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getExplorerUrl(
  txHash: string,
  network: "mainnet" | "testnet" = "mainnet"
): string {
  const baseUrl =
    network === "mainnet"
      ? "https://starkscan.co"
      : "https://testnet.starkscan.co";
  return `${baseUrl}/tx/${txHash}`;
}

// Gestion des localStorage
export function getStorageItem(key: string, defaultValue: any = null): any {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem(key: string, value: any): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
  }
}
