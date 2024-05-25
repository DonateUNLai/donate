'use client'
// import Header from "./Header";

interface UserLayoutProps {
    children: React.ReactNode;
}

export default function UserLayout(props: UserLayoutProps) {
    const { children } = props;
    return (
        <>
            {/* <Header /> */}
            {children}
        </>
    )
}