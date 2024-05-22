import { ToastContainer } from 'react-toastify';
import { Providers } from "./providers";
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './layouts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    <div>
                        {children}
                    </div>
                </Providers>
                <ToastContainer />
            </body>
        </html>
    );
}