import { http, createConfig } from '@wagmi/core';
import { mainnet, sepolia } from '@wagmi/core/chains';

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(process.env.INFURA_API_KEY)
    },
    multiInjectedProviderDiscovery: true,
    ssr: true,
    connectors: [],
})