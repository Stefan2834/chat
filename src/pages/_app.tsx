import { SessionProvider } from "next-auth/react"
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from "@/components/Layout";
import { DefaultProvider } from "@/contexts/Default";
import { SocketProvider } from "@/contexts/Socket";
import Navbar from "@/components/Navbar";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRouter } from "next/router";
import '../app/globals.css'

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
    const router = useRouter()


    let shouldTransition = router.route === '/main/messages' ? 'left' : router.route === '/main/messages/[email]' ? 'right' : null


    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                <DefaultProvider>
                    <SocketProvider>
                        <Navbar />
                        <Layout>
                            {shouldTransition ? (
                                <TransitionGroup className="transition-group">
                                    {shouldTransition === 'right' ? (
                                        <CSSTransition
                                            key={router.route}
                                            timeout={{ enter: 600, exit: 600 }}
                                            classNames={`page-right`}
                                        >
                                            <div className={`page-right`}>
                                                <Component {...pageProps} />
                                            </div>
                                        </CSSTransition>
                                    ) : (
                                        <CSSTransition
                                            key={router.route}
                                            timeout={{ enter: 600, exit: 600 }}
                                            classNames={`page-left`}
                                        >
                                            <div className={`page-left`}>
                                                <Component {...pageProps} />
                                            </div>
                                        </CSSTransition>
                                    )}
                                </TransitionGroup>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </Layout>
                    </SocketProvider>
                </DefaultProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}