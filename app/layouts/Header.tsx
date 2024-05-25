import { usePathname } from "next/navigation";
import { useSwitchChain, useDisconnect, useAccount } from "wagmi";
import Navs from "../components/Navs"
import { signMessage } from "@wagmi/core";
import { useEffect } from "react";
import { fetchNonce, verifySign, fetchProfile } from "../utils";
import { config } from "@/config";

export default function Header() {
    const { chains, switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();
    const { address, isConnected, chain } = useAccount();
    const pathname = usePathname();

    const handleLogout = () => {
        disconnect();
        localStorage.clear();
    }

    const checkLoginStatus = async () => {
        const { data } = await fetchProfile() || {};
        if (data?.address === address) return;
        handleLogout();
    }

    const handleLogin = async () => {
        try {
            if (address) {
                const { data } = await fetchNonce({ address })
                const nonce = data.nonce;
                if (nonce) {
                    const signature = await signMessage(config, { message: String(nonce) })
                    const { data: verifyData } = await verifySign({ address, signature });
                    const { token } = verifyData;
                    if (token) localStorage.setItem('token', token);
                    const { data } = await fetchProfile()
                    localStorage.setItem('profile', JSON.stringify(data))
                }
            }
        } catch (error) {
            handleLogout();
        }
    }

    useEffect(() => {
        if (isConnected) {
            checkLoginStatus()
        }
    }, [pathname, isConnected])


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            handleLogin();
        }
    }, [isConnected, address])


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