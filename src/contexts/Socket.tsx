import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useDefault } from './Default';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import useAxiosAuth from '@/customHooks/useAxiosAuth';

interface SocketContextValue {
    socket: Socket | null,
    sidebar: ConversationType[];
    setSidebar: React.Dispatch<React.SetStateAction<ConversationType[]>>;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    hasMoreData: boolean;
    setHasMoreData: (hasMoreData: boolean) => void;
}

interface ConversationType {
    username: string;
    lastMsg: string;
    lastYou: boolean;
    date: number;
    seen: boolean;
    avatar: string;
    email: string;
}

export const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useDefault must be used within an DefaultProvider');
    }
    return context;
}

export function SocketProvider({ children }: { children: ReactNode }) {
    const { user, server, error, setError } = useDefault()
    const router = useRouter()
    const axios = useAxiosAuth()
    const pathRef = useRef<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [sidebar, setSidebar] = useState<ConversationType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(false)


    useEffect(() => {
        pathRef.current = router.asPath;
    }, [router.asPath]);

    useEffect(() => {


        const socketIo = io(process.env.NEXT_PUBLIC_SERVER || '', {
            transports: ['websocket']
        });
        setSocket(socketIo)




        const fetchSideData = async () => {
            try {
                const response = await axios.post(`${server}/graphql`, {
                    query: `query ($email: String!, $jump: Int!) {
                                getSidebar(email: $email, jump: $jump) {
                                success
                                message
                                hasMoreData
                                side {
                                    username
                                    lastMsg
                                    lastYou
                                    date
                                    seen
                                    avatar
                                    email
                                }
                                }
                            }`,
                    variables: {
                        email: user?.email,
                        jump: 0
                    }
                })
                console.log(response)
                if (response?.data?.data?.getSidebar?.success) {
                    setSidebar(response?.data?.data?.getSidebar?.side)
                    setHasMoreData(response.data.data.getSidebar.hasMoreData)
                } else {
                    setSidebar([])
                    if (!response.data.success) {
                        setError(response?.data?.message)
                    } else {
                        console.log(response?.data?.data?.getSidebar?.message)
                        setError(response?.data?.data?.getSidebar?.message)
                    }
                }
                setIsLoading(false);
            } catch (error: any) {
                if (error.response.data.message !== "Invalid token") {
                    console.log('Error fetching side data:', error);
                    setError(`An error occurred while fetching sidebar data. ${error?.message}`);
                    setSidebar([]);
                    setIsLoading(false)
                }
            } finally {
                setLoading(false)
            }
        };


        const room = `side-${user?.email}`
        if (user?.email) {
            fetchSideData();
            socket?.emit('join', { room })
        } else {
            setLoading(false)
        }


        socket?.on('changeSide', (newSidebar) => {
            setSidebar(s => {
                let found: number = 0;
                console.log(newSidebar)
                let updatedSidebar = s?.map((side: any) => {
                    if (side?.email === newSidebar?.side?.email) {
                        found = 1;
                        return {
                            ...newSidebar.side,
                            lastYou: newSidebar?.sender === user?.email,
                            seen: newSidebar?.sender === user?.email,
                        };
                    } else return side;
                });
                if(found === 0) { 
                    updatedSidebar = [{
                        ...newSidebar.side,
                        lastYou: newSidebar.sender === user?.email,
                        seen: newSidebar?.sender === user?.email,
                    }, ...updatedSidebar]
                }
                updatedSidebar?.sort((a, b) => b.date - a.date);
                return updatedSidebar;
            })
        });

        socket?.on('sideSeen', (data) => {
            if (data.success) {
                setSidebar(s => s.map((side) => {
                    if (side.email === data.email) {
                        return { ...side, seen: true }
                    } else return side
                }))
            }
        })

        socket?.on('notification', data => {
            if (data.success) {
                const mess = data.message
                if (Notification.permission === 'granted') {
                    if (pathRef?.current !== `/main/messages/${mess.email}`) {
                        new Notification(`Message from: ${mess.email}`, {
                            body: mess.message,
                            icon: data.avatar
                        }).addEventListener('click', () => {
                            window.open(`https://chat-drab-nine.vercel.app/main/messages/${mess.email}`);
                        });
                    }
                }
            }
        })

        return () => {
            socket?.off('sideSeen')
            socket?.off('changeSide')
            if (user?.email) {
                socket?.emit('leave', { room })
            }
            socket?.disconnect();
        };
    }, [user])






    const value: SocketContextValue = {
        socket,
        sidebar, setSidebar, isLoading, error, setError, hasMoreData, setHasMoreData
    };

    return (
        <SocketContext.Provider value={value}>
            {!loading && children}
        </SocketContext.Provider>
    )
}