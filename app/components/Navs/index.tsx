import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WalletOptions } from "../WalletOptions";
import Dropdown from "../Dropdown";
import type { DropdownItem } from "../Dropdown";
import { message } from "@/app/utils";
import { Avatar } from "@nextui-org/react";

interface Link {
    title: string;
    link: string;
}

interface NavsProps {
    links?: Link[];
    isConnected: boolean;
    address?: string;
    onDisConnect: () => void;
    chain?: Record<string, any>;
    chains?: DropdownItem[];
}
export default function Navs(props: NavsProps) {
    const { links = [], chains = [], chain, isConnected, address = '', onDisConnect } = props;
    const router = useRouter();
    const pathname = usePathname();
    const [active, setActive] = useState<string>('/');

    useEffect(() => {
        setActive(pathname)
    }, [pathname])


    const handleCopy = (event: MouseEvent) => {
        event.preventDefault();
        message.info('Copied!')
    }



    return (
        <div className="flex flex-row items-center justify-between h-[72px] px-6">
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
                !isConnected ?
                    (<WalletOptions />) :
                    (
                        <div className="relative flex flex-row gap-[30px]">
                            <Dropdown items={chains}>
                                <span className="w-[200px] h-[50px] bg-[#5EDBD0] rounded-[10px] flex flex-row items-center justify-center text-[#5EDBD0] cursor-pointer border-[1px] border-solid border-[#5EDBD0] bg-white">{chain?.name}</span>
                            </Dropdown>
                            <Dropdown items={[{ key: 'logout', title: 'Logout', onClick: onDisConnect }]}>
                                <div className="w-[260px] h-[50px] bg-[#5EDBD0] rounded-[10px] flex flex-row items-center justify-center text-white cursor-pointer">
                                    <span className="font-semibold mr-[12px]">{address?.slice(0, 4)}...{address?.slice(-6)}</span>
                                </div>
                            </Dropdown>
                            <Avatar src="/images/avatar.png" />
                            <div className="absolute top-[15px] left-[440px] z-50 cursor-pointer">
                                <CopyToClipboard text={address}>
                                    <Image src='/icons/copy.svg' alt="copy" width={18} height={18} onClick={handleCopy} />
                                </CopyToClipboard>
                            </div>
                        </div>

                    )
            }

        </div>
    )
}