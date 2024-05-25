
import { useConnect } from 'wagmi';
import WalletOption from './option';
import { ImageProps } from 'next/image';

interface WalletOptionsProps {
    className?: string;
    imageProps?: Partial<ImageProps>
}

export function WalletOptions(props: WalletOptionsProps) {
    const { connectors, connect } = useConnect();
    return connectors.filter(i => i.name === 'MetaMask').map((connector) => (
        <WalletOption
            {...props}
            key={connector.id}
            connector={connector}
            onClick={() => connect({ connector })}
        />
    ))
}
