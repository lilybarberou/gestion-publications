import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from '@components/RequireAuth';
import { GlobalStyle, globalTheme } from '@contexts/GlobalStyle';
import Navigation from '@components/Navigations';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={globalTheme}>
            <GlobalStyle />
            <RequireAuth>
                <ToastContainer position="bottom-right" theme="dark" />
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Navigation />
                <Component {...pageProps} />
            </RequireAuth>
        </ThemeProvider>
    );
}
