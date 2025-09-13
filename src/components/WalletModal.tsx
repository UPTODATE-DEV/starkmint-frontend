import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { X, Wallet, ExternalLink, Download } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const wallets = [
  {
    id: "argent",
    name: "Argent",
    icon: "🦊",
    description: "The most popular StarkNet wallet",
    downloadUrl: "https://chrome.google.com/webstore/detail/argent/dlcobpjiigpikoobohmabehhmhfoodbb",
    isInstalled: false,
  },
  {
    id: "braavos",
    name: "Braavos",
    icon: "🛡️",
    description: "Secure multi-sig wallet for StarkNet",
    downloadUrl: "https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
    isInstalled: false,
  },
  {
    id: "okx",
    name: "OKX Wallet",
    icon: "⭕",
    description: "Multi-chain wallet with StarkNet support",
    downloadUrl: "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
    isInstalled: false,
  },
];

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = async (walletId: string) => {
    setIsConnecting(walletId);
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConnect(walletId);
      onClose();
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose your preferred StarkNet wallet to connect
        </p>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{wallet.name}</h3>
                      <p className="text-sm text-gray-600">{wallet.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {wallet.isInstalled ? (
                      <Button
                        onClick={() => handleConnect(wallet.id)}
                        disabled={isConnecting === wallet.id}
                        loading={isConnecting === wallet.id}
                        variant="default"
                        size="sm"
                      >
                        {isConnecting === wallet.id ? "Connecting..." : "Connect"}
                      </Button>
                    ) : (
                      <a
                        href={wallet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Download className="h-4 w-4" />
                        <span>Install</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>New to StarkNet?</strong> We recommend starting with Argent wallet for the best experience.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;