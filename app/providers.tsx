'use client'

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/config';

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}