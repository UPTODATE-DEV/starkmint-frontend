/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_STARKNET_RPC_URL: process.env.NEXT_PUBLIC_STARKNET_RPC_URL,
        NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS,
    },
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        return [
            {
                source: '/api/:path*',
                destination: `${apiUrl}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
