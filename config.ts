import { http, createConfig } from '@wagmi/core';
import { mainnet, sepolia, avalancheFuji } from '@wagmi/core/chains';

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

export const config = createConfig({
    chains: [mainnet, sepolia, avalancheFuji],
    transports: {
        [mainnet.id]: http(process.env.INFURA_API_KEY),
        [avalancheFuji.id]: http(process.env.INFURA_API_KEY),
        [sepolia.id]: http(process.env.INFURA_API_KEY)
    },
    multiInjectedProviderDiscovery: true,
    ssr: true,
    connectors: [],
})