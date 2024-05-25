
import { useEffect, useState } from 'react';
import type { Connector } from 'wagmi';
import Image, { ImageProps } from 'next/image';
import { Button } from "@nextui-org/react";
``
interface WalletOptionProps {
    connector: Connector;
    onClick: () => void;
    className?: string;
    imageProps?: Partial<ImageProps>
}

export default function WalletOption(props: WalletOptionProps) {
    const { connector, onClick, className = '', imageProps = {} } = props;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <Button color="primary" className={`h-[50px] w-[260px] flex-row items-center justify-around text-[20px] ${className}`} onClick={onClick}>
            <span className="font-semibold">Sign in with</span>
            <Image src="/images/metamask.png" alt="MetaMask" width={30} height={30} {...imageProps} title='MetaMask' />
        </Button>
    )
}