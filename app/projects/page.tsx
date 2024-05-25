'use client'
import { useRouter } from "next/navigation";
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const projects = new Array(12).fill(1).map((_, id) => ({
    id,
    title: `Ukraine ${id + 1}`,
    url: '/images/project/1.png',
    description: `UN works for peaceful resolutionof crisis, respect for human rights ${id + 1}`
}))

const Page: NextPage = () => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>UN Donate Projects</title>
            </Head>
            <main className='mt-[100px] px-[245px]'>
                <article>
                    <section className='mt-[72px] mb-[40px] flex flex-col'>
                        <h5 className='font-bold leading-[30px]'>All Projects</h5>
                        <div className='mt-[15px] grid grid-cols-4 gap-x-[27px] gap-y-[36px]'>
                            {
                                projects.map(p => (
                                    <figure
                                        key={p.title}
                                        className='box-border flex flex-col gap-[14px] w-[300px] h-[270px] px-[12px] py-[15px] bg-white rounded-[10px] overflow-hidden hover:shadow-[0px_1px_10px_0px_rgba(0,119,222,0.25)] cursor-pointer'
                                        onClick={() => router.push(`/projects/${p.id}`)}
                                    >
                                        <Image src={p.url} alt={p.title} width={275} height={150} />
                                        <figcaption className='font-medium leading-[24px]'>{p.title}</figcaption>
                                        <blockquote className='font-normal leading-[21px] text-[#909090] text-[14px]'>{p.description}</blockquote>
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