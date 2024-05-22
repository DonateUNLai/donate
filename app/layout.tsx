import { ToastContainer } from 'react-toastify';
import { Providers } from "./providers";
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
                <ToastContainer />
            </body>
        </html>
    );
}