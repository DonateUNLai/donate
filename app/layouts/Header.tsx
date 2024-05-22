'use client'

import { useSwitchChain, useDisconnect, useAccount } from "wagmi";
import Navs from "../components/Navs"
import { signMessage } from "@wagmi/core";
import { useCallback, useEffect } from "react";
import { fetchNonce, verifySign, fetchProfile } from "../utils";
import { config } from "@/config";

export default function Header() {
    const { chains, switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();
    const { address, isConnected, chain } = useAccount();

    const handleLogin = useCallback(async () => {
        try {
            if (address) {
                const { data } = await fetchNonce({ address })
                const nonce = data.nonce;
                if (nonce) {
                    console.log(nonce)
                    const signature = await signMessage(config, { message: String(nonce) })
                    const { data: verifyData } = await verifySign({ address, signature });
                    const { token } = verifyData;
                    if (token) {
                        localStorage.setItem('token', token);
                        await fetchProfile();
                    };
                }
            }
        } catch (error) {
            console.log('login error:', error);
            disconnect()
        }
    }, [address, disconnect])


    useEffect(() => {
        if (!isConnected) {
            handleLogin();
        }
    }, [handleLogin, isConnected])


    return (
        <header className='mt-[70px] sticky top-0 bg-white'>
            <Navs
                isConnected={isConnected}
                address={address}
                onDisConnect={disconnect}
                chain={chain}
                chains={chains.map(i => ({
                    key: i.name,
                    title: i.name,
                    onClick: () => switchChain({ chainId: i.id as any })
                }))}
            />
        </header>
    )
}