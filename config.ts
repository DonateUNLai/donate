import { http, createConfig } from '@wagmi/core';
import { sepolia, avalancheFuji } from '@wagmi/core/chains';

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

export const config = createConfig({
    chains: [sepolia, avalancheFuji],
    transports: {
        [avalancheFuji.id]: http(process.env.INFURA_API_KEY),
        [sepolia.id]: http(process.env.INFURA_API_KEY)
    },
    multiInjectedProviderDiscovery: true,
    ssr: true,
    connectors: [],
})