import { SessionProvider } from "next-auth/react"
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from "@/components/Layout";
import { DefaultProvider } from "@/contexts/Default";

interface AppProps {
    Component: React.ComponentType<any>;
    pageProps: {
        session: any; // Adjust the type for the session object based on your application's session structure
        // ...other pageProps if any
    };
}

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif', // Use the font family you imported
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const { session, ...restPageProps } = pageProps;

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                <DefaultProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </DefaultProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}