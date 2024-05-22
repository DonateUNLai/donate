"use client"
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { signMessage } from '@wagmi/core';
import { NextPage } from 'next';
import Head from 'next/head';
import Navs from './components/Navs';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { fetchNonce, verifySign, fetchProfile } from './utils'
import { config } from '@/config';



const projects = [
    { title: "Ukraine 1", url: '/images/project/1.png' },
    { title: "Ukraine 2", url: '/images/project/2.png' },
    { title: "Ukraine 3", url: '/images/project/3.png' },
    { title: "Ukraine 4", url: '/images/project/4.png' },
]

const Page: NextPage = () => {
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
        <div>
            <Head>
                <title>UN Donate</title>
            </Head>
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
            <main className='mt-[120px] px-[245px]'>
                <article>
                    <section>
                        <h2 className='font-extrabold text-[#333] leading-[77px] text-[64px]'>We fight for <span className='text-[#5EDBD0]'>a bright tomorrow</span></h2>
                        <p className='mt-[20px] font-poppins font-normal text-[#909090] text-[24px] leading-[48px]'>Utilizing the transparency and immutability of blockchain technology, we shine the light on humanitarianaid,
                            ensuring that help reaches those who need it most, efficiently and without compromise.</p>
                    </section>
                    <section className='mt-[72px]'>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <h5 className='font-bold leading-[30px]'>Projects</h5>
                            <Button className='font-normal color-[#333]' variant="light">More</Button>
                        </div>
                        <div className='mt-[15px] grid grid-cols-4 gap-[30px]'>
                            {
                                projects.map(p => (
                                    <figure key={p.title} className='w-[340px] h-[250px] px-[12px] py-[15px] bg-white rounded-[10px] overflow-hidden'>
                                        <Image src={p.url} alt={p.title} width={310} height={170} />
                                        <figcaption className='mt-[20px] font-medium leading-[24px]'>{p.title}</figcaption>
                                    </figure>
                                ))
                            }
                        </div>
                    </section>
                </article>
                <article className='mt-[85px] font-bold text-[#333]'>
                    <section className='flex flex-col gap-[36px]'>
                        <h2 className='text-[32px] leading-[38px]'>Our <span className='text-[#5EDBD0]'>solution</span></h2>
                        <div>
                            <h5 className='text-[24px]'>Direct Giving</h5>
                            <p className='font-normal text-[18px] text-[#909090] leading-[30px]'>Utilizing the transparency and immutability of blockchain technology, we shine the light on humanitarianaid,ensuring that help reaches those who need it most, efficiently and without compromise.</p>
                        </div>
                        <div>
                            <h5 className='text-[24px]'>Transparency</h5>
                            <p className='font-normal text-[18px] text-[#909090] leading-[30px]'>We revolutionize global giving by making it more transparent to address challenges facing thesocial sector such as corruption, lack of trust in nonprofits, high global transfer fees, inefficientprocesses and lack of accountability in donor spending.</p>

                        </div>
                        <div>
                            <h5 className='text-[24px]'>Transformative Tech</h5>
                            <p className='font-normal text-[18px] text-[#909090] leading-[30px]'>We believe tech should serve people so we repurpose emerging tech as tools for social change.</p>
                        </div>
                    </section>
                </article>
                <footer></footer>
            </main>
        </div>
    )
};

export default Page;