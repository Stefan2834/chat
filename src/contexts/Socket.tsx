import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useDefault } from './Default';
import io, { Socket } from 'socket.io-client';
import { useSideData } from '@/customHooks/useSidebar';
import { useRouter } from 'next/router';

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
    const { user, server } = useDefault()
    const router = useRouter()
    const pathRef = useRef<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [socket, setSocket] = useState<Socket | null>(null)
    const { sidebar, setSidebar, isLoading, error, setError, hasMoreData, setHasMoreData } = useSideData(user?.email || '');


    useEffect(() => {
        pathRef.current = router.asPath;
    }, [router.asPath]);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SERVER || '', {
            transports: ['websocket']
        });
        setSocket(socket)
        const room = `side-${user?.email}`
        socket?.emit('join', { room })

        // if (Notification.permission !== 'denied' && Notification.permission !== "granted") {
        //     Notification.requestPermission()
        // };

        setLoading(false)

        socket?.on('changeSide', (newSidebar) => {
            setSidebar(s => {
                const updatedSidebar = s?.map((side: any) => {
                    if (side.email === newSidebar.side.email) {
                        return {
                            ...newSidebar.side,
                            lastYou: newSidebar?.sender === user?.email,
                            seen: newSidebar?.sender === user?.email,
                        };
                    } else return side;
                });
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
                            window.open(`http://localhost:3000/main/messages/${mess.email}`);
                        });
                    }
                }
            }
        })

        return () => {
            socket?.off('sideSeen')
            socket?.off('changeSide')
            socket?.emit('leave', { room })
            socket.disconnect();
        };
    }, [])




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