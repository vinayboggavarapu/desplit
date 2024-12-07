"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia, opBNB, baseSepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

const QueryProvider = ({children}:{children:React.ReactNode}) => {

  const config = getDefaultConfig({
    appName: 'Desplit',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    chains: [baseSepolia,opBNB],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
      {children}
    </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default QueryProvider;
