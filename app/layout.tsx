"use client"
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import { UserLayout, BasicLayout } from './layouts';
import { ToastContainer } from 'react-toastify';
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const Layout = /admin/.test(pathname) ? UserLayout : BasicLayout
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Layout>
                        <div>
                            {children}
                        </div>
                    </Layout>
                </Providers>
                <ToastContainer />
            </body>
        </html>
    );
}