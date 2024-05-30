"use client"
import { NextPage } from 'next';
import { useRouter } from "next/navigation";
import Head from 'next/head';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Project } from './type';
import { fetchProjects } from './utils';

const Page: NextPage = () => {
    const [list, setList] = useState<Project[]>([]);
    const router = useRouter();

    const handleFetchProjects = async () => {
        const { data = [] } = await fetchProjects();
        setList(data);
    }

    useEffect(() => {
        handleFetchProjects();
    }, [])


    return (
        <div>
            <Head>
                <title>UN Donate</title>
            </Head>
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
                            <Button className='font-normal color-[#333]' variant="light" onClick={() => router.push('/projects')}>More</Button>
                        </div>
                        <div className='mt-[15px] grid grid-cols-4 gap-[30px]'>
                            {
                                list.slice(0, 4).map((p, index) => (
                                    <figure key={p.title} className='w-[340px] h-[250px] px-[12px] py-[15px] bg-white rounded-[10px] overflow-hidden'>
                                        <Image src={`/images/project/${index + 1}.png`} alt={p.title!} width={310} height={170} />
                                        <figcaption className='mt-[20px] font-medium leading-[24px]'>{p.title}</figcaption>
                                    </figure>
                                ))
                            }
                        </div>
                    </section>
                </article>
                <article className='mt-[85px] mb-[60px] font-bold text-[#333]'>
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
            </main>
        </div>
    )
};

export default Page;