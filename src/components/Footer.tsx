import React from "react";
import { Github, Twitter, Globe, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/Starkmint Image.png" 
                alt="StarkMint Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The easiest way to create ERC20 tokens on StarkNet. 
              Secure, fast, and user-friendly.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/starkmint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/starkmint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://starkmint.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="text-gray-600 hover:text-gray-900 transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#tutorials" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#community" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2024 StarkMint. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Built on StarkNet</span>
              <span>•</span>
              <span>Powered by STRK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;