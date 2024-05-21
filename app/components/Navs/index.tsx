import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { WalletOptions } from "../WalletOptions";

interface Link {
    title: string;
    link: string;
}

interface NavsProps {
    links: Link[];
    isConnected: boolean;
    address?: string;
    onDisConnect: () => void;
}
export default function Navs(props: NavsProps) {
    const { links = [], isConnected, address, onDisConnect } = props;
    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState<string>('/');

    useEffect(() => {
        setActive(pathname)
    }, [pathname])



    return (
        <div className="flex flex-row items-center justify-between sticky bottom-0 h-[72px] px-6">
            <div className="cursor-pointer" onClick={() => router.push('/')}>
                <Image src="/images/logo.png" alt="logo" width={294} height={45} />
            </div>
            <nav className="flex flex-row items-center">
                {links.length > 0 ? links.map(i => (
                    <div
                        className={
                            `${active === i.link
                                ? 'font-semibold text-[rgba(6,6,32,1)]'
                                : 'font-normal text-[rgba(6,6,32,0.6)]'} relative text-[20px] cursor-pointer px-3 h-[24px] leading-[24px]`
                        }
                        key={i.title} onClick={() => router.push(i.link)}
                    >
                        <span className="font-medium">{i.title}</span>
                        {
                            active === i.link && (<span className="absolute bottom-[-12px] left-[45%] inline-block w-[10px] h-[10px] rounded-full bg-[#5EDBD0]" />)
                        }

                    </div>
                )) : null}
            </nav>
            {
                !isConnected ? (<WalletOptions />) : (<span onClick={onDisConnect}>{address}</span>)
            }

        </div>
    )
}