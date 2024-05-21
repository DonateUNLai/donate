
import { useEffect, useState } from 'react';
import type { Connector } from 'wagmi';
import Image from 'next/image';
import { Button } from "@nextui-org/react";

interface WalletOptionProps {
    connector: Connector
    onClick: () => void
}

export default function WalletOption(props: WalletOptionProps) {
    const { connector, onClick } = props;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <Button color="primary" className="h-[50px] w-[260px] flex-row items-center justify-around" onClick={onClick}>
            <span className="font-semibold text-[20px]">Sign in with</span>
            <Image src="/images/metamask.png" alt="MetaMask" width={30} height={30} title='MetaMask' />
        </Button>
    )
}