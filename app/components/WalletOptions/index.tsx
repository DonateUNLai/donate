
import { useConnect } from 'wagmi';
import WalletOption from './option';

export function WalletOptions() {
    const { connectors, connect } = useConnect();
    return connectors.filter(i => i.name === 'MetaMask').map((connector) => (
        <WalletOption
            key={connector.id}
            connector={connector}
            onClick={() => connect({ connector })}
        />
    ))
}
