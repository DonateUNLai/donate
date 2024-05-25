'use client'
import { useDisconnect, useAccount } from "wagmi";
import { WalletOptions } from '@/app/components/WalletOptions';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { fetchNonce, verifySign, fetchProfile } from "../../utils";
import { config } from "@/config";
import { signMessage } from "@wagmi/core";
import { useEffect } from "react";

const Login: NextPage = () => {
    const router = useRouter();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();

    const handleLogout = () => {
        disconnect();
        localStorage.clear();
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
                    router.push('/admin')
                }
            }
        } catch (error) {
            handleLogout();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && isConnected && address) {
            handleLogin();
        }
    }, [isConnected, address])

    return (
        <div className='bg-admin h-screen bg-no-repeat bg-cover bg-center'>
            <Head>
                <title>UN Donate Admin Login</title>
            </Head>
            <div className='h-screen relative flex flex-col items-center justify-center'>
                <div className="absolute top-[60px] left-[115px] cursor-pointer" onClick={() => router.push('/admin')}>
                    <Image src="/images/logo.png" alt="logo" width={294} height={45} />
                </div>
                <div className='flex flex-col items-center justify-center gap-[60px]'>
                    <h3 className='font-bold text-[32px] text-[rgba(51,51,51,1)]'>Sign in Admin</h3>
                    <WalletOptions className='w-[388px] h-[75px] text-[30px]' imageProps={{ width: 44, height: 44 }} />
                </div>
            </div>
        </div>
    )
}

export default Login;