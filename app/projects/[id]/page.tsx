'use client'
import { Button, Progress } from '@nextui-org/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";

const projects = new Array(12).fill(1).map((_, id) => ({
    id,
    title: `Ukraine ${id + 1}`,
    url: '/images/project/1.png',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elitAenean euismod bibendum laoreet. Proin gravida dolorsit amet lacus accumsan et viverra justo commodo.Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nasceturridiculus mus.Nam fermentum, nulla luctus pharetravulputate, felis tellus mollis orci, sed rhoncus proninsapien nunc accuan eget. ${id + 1}`
}))

const Page: NextPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const detail = projects.find(i => i.id === Number(id));

    return (
        <div>
            <Head>
                <title>UN Donate Project {id}</title>
            </Head>
            <main className='mt-[100px] px-[245px]'>
                <article className='flex flex-col gap-[72px]'>
                    <section className='flex flex-col'>
                        <div className='flex flex-row items-center gap-[16px]'>
                            <h5 className='font-bold leading-[30px] text-[rgba(51,51,51,0.6)]'>All Projects</h5>
                            <Image src='/icons/arrow-right.svg' alt='breadcrumbs' width={8.5} height={16} />
                            <h5 className='font-font-medium leading-[30px] text-[rgba(51,51,51,1)]'>{detail?.title}</h5>
                        </div>
                        <div className='mt-[34px] w-full bg-white px-[52px] py-[30px] box-border flex flex-col gap-[21px] rounded-[10px] overflow-hidden'>
                            <figcaption className='font-medium leading-[21px] text-[18px] text-[rgba(0,0,0,1)]'>{detail?.title}</figcaption>
                            <figure className='flex flex-row gap-[72px]'>
                                <div className='w-[471px] flex flex-col gap-[25px]'>
                                    <Image className='w-[471px] h-[257px] rounded-[10px] overflow-hidden' src={detail?.url || ''} alt={detail?.title || ''} width={471} height={257} />
                                    <Progress size="sm" value={70} title='70%' />
                                </div>
                                <div className='max-h-[287px] flex flex-col flex-1 justify-between'>
                                    <blockquote className='font-normal leading-[21px] text-[#909090] text-[14px]'>{detail?.description}</blockquote>
                                    <Button className='w-[270px] h-[40px] text-[16px] font-semibold' color='primary'>Donate Now</Button>
                                </div>
                            </figure>

                        </div>
                    </section>

                    <section className='flex flex-col'>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <h5 className='font-bold leading-[30px]'>Allocation</h5>
                            <Button className='font-normal color-[#333]' variant="light" onClick={() => router.push('/projects')}>More</Button>
                        </div>
                        <div className='mt-[15px] grid grid-cols-4 gap-x-[40px]'>
                            {
                                projects.slice(0, 4).map(p => (
                                    <figure
                                        key={p.title}
                                        className='box-border flex flex-col gap-[14px] w-[290px] h-[160px] bg-white hover:shadow-[0px_1px_10px_0px_rgba(0,119,222,0.25)] rounded-[10px] overflow-hidde'
                                        onClick={() => router.push(`/projects/${p.id}`)}
                                    >

                                    </figure>
                                ))
                            }
                        </div>
                    </section>

                    <section className='flex flex-col mb-[40px]'>
                        <div className='w-full flex flex-row items-center justify-between'>
                            <h5 className='font-bold leading-[30px]'>Donors</h5>
                            <Button className='font-normal color-[#333]' variant="light" onClick={() => router.push('/projects')}>More</Button>
                        </div>
                        <div className='mt-[15px] grid grid-cols-4 gap-x-[40px]'>
                            {
                                projects.slice(0, 4).map(p => (
                                    <figure
                                        key={p.title}
                                        className='box-border flex flex-col items-center justify-center gap-[14px] w-[290px] h-[160px] bg-white hover:shadow-[0px_1px_10px_0px_rgba(0,119,222,0.25)] rounded-[10px] overflow-hidde'
                                        onClick={() => router.push(`/projects/${p.id}`)}
                                    >
                                        <p className='font-normal leading-[24px] text-[20px] text-[rgba(0,0,0,1)]'>ADO***ANE</p>
                                        <span className='font-bold leading-[30px] text-[24px] text-[rgba(94,219,208,1)]'>0 ETH</span>
                                    </figure>
                                ))
                            }
                        </div>
                    </section>
                </article>

            </main>
        </div>
    )
};

export default Page;