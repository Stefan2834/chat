//& Utilities
import React, { useContext, useEffect, useState, useRef, createContext, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useRouter } from 'next/router';
import axios from "axios"

//& Context
import { useDefault } from './Default';

//& Interfaces
import { ConversationType, SocketContextValue } from '@/exports/interfaces';

const socketIo = io(process.env.NEXT_PUBLIC_SERVER || '', {
    transports: ['websocket']
});


const query = `query ($email: String!, $jump: Int!) {
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
}`;

export const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within an DefaultProvider');
    }
    return context;
}

export function SocketProvider({ children }: { children: ReactNode }) {

    const { user, server, setError } = useDefault()

    const [socket, setSocket] = useState<Socket | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [sidebar, setSidebar] = useState<ConversationType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreData, setHasMoreData] = useState(false)

    const pathRef = useRef<string | null>(null);

    const router = useRouter()


    useEffect(() => {
        pathRef.current = router.asPath;
    }, [router.asPath]);

    useEffect(() => {

        setSocket(socketIo)

        const fetchSideData = async () => {
            try {
                const response = await axios.post(`${server}/graphql`, {
                    query: query,
                    variables: {
                        email: user?.email,
                        jump: 0
                    }
                })
                if (response?.data?.data?.getSidebar?.success) {
                    console.log(response.data.data.getSidebar)
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
            } catch (error: any) {
                console.log('Error fetching side data:', error);
                setError(`An error occurred while fetching sidebar data. ${error?.message}`);
                setSidebar([]);
            } finally {
                setIsLoading(false)
            }
        };

        const handleSocketChangeSide = (newSidebar: any) => {
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
                if (found === 0) {
                    updatedSidebar = [{
                        ...newSidebar.side,
                        lastYou: newSidebar.sender === user?.email,
                        seen: newSidebar?.sender === user?.email,
                    }, ...updatedSidebar]
                }
                updatedSidebar?.sort((a, b) => b.date - a.date);
                return updatedSidebar;
            })
        }

        const handleSocketSideSeen = (data: any) => {
            if (data.success) {
                setSidebar(s => s.map((side) => {
                    if (side.email === data.email) {
                        return { ...side, seen: true }
                    } else return side
                }))
            }
        }

        const handleSocketNotification = (data: any) => {
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
        }


        const room = `side-${user?.email}`
        if (user?.email) {
            fetchSideData();
            socket?.emit('join', { room })
        } else {
            setLoading(false)
        }


        socket?.on('changeSide', handleSocketChangeSide);

        socket?.on('sideSeen', handleSocketSideSeen);

        socket?.on('notification', handleSocketNotification);

        return () => {
            socket?.off('sideSeen')
            socket?.off('changeSide')
            socket?.off('notification')
            if (user?.email) {
                socket?.emit('leave', { room })
            }
            socket?.disconnect();
        };
    }, [user, socket])






    const value: SocketContextValue = {
        socket,
        sidebar, setSidebar,
        hasMoreData, setHasMoreData,
        isLoading
    };

    return (
        <SocketContext.Provider value={value}>
            {!loading && children}
        </SocketContext.Provider>
    )
}