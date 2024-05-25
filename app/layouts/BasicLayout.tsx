'use client'
import Header from "./Header";

interface BasicLayoutProps {
    children: React.ReactNode;
}

export default function BasicLayout(props: BasicLayoutProps) {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
        </>
    )
}