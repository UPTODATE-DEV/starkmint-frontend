import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { User, LogOut, Settings, Copy, Check } from "lucide-react";
import { formatAddress, copyToClipboard } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyAddress = async () => {
    if (user?.walletAddress) {
      const success = await copyToClipboard(user.walletAddress);
      if (success) {
        setCopied(true);
        toast.success("Address copied!");
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const getPlanName = (planId: number) => {
    switch (planId) {
      case 0: return "Free";
      case 1: return "Pro";
      case 2: return "Enterprise";
      default: return "Unknown";
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border-gray-200 hover:bg-gray-50"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-blue-600" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {formatAddress(user.walletAddress)}
          </div>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Connected Wallet</div>
                <div className="text-sm text-gray-600">StarkNet Account</div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Address</div>
                <div className="text-sm text-gray-600 font-mono">
                  {formatAddress(user.walletAddress, 8)}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-gray-700">Current Plan</div>
                <div className="text-sm text-gray-600">{getPlanName(user.currentPlanId)}</div>
              </div>
              <Badge variant={user.currentPlanId === 0 ? "outline" : "default"}>
                {getPlanName(user.currentPlanId)}
              </Badge>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setIsOpen(false);
                // Add settings navigation here
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;