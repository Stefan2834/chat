import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Avatar, Button, Paper, TextField, Skeleton, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useDefault } from '@/contexts/Default';
import Link from 'next/link';
import axios from "axios"

import { formatTimeAgo } from '@/exports/utilities';
import { useSession } from 'next-auth/react'


import { ConversationType, SidebarRequestType } from '@/exports/types';


export default function Sidebar({ className }: { className?: string }) {
    const {
        isLoading, setIsLoading,
        socket,
        server, setError
    } = useDefault()


    const [hasMoreData, setHasMoreData] = useState(false)
    const [sidebar, setSidebar] = useState<ConversationType[]>([]);

    const { data: session } = useSession();

    const user = session?.user

    const scrollRef = useRef<HTMLDivElement | null>(null)
    const loading = useRef<boolean>(false)
    const [email, setEmail] = useState("")
    const router = useRouter()

    const pathRef = useRef<string | null>(null)


    useEffect(() => {
        pathRef.current = router.asPath;
    }, [router.asPath]);

    const handleScroll = useCallback(async () => {
        const container = scrollRef.current;
        if (container && !loading.current && hasMoreData && user?.email) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 250) {
                loading.current = true
                try {
                    const response = await axios.post(`${server}/sidebar`, {
                        email: user?.email,
                        jump: sidebar?.length
                    })
                    if (response?.data?.success) {
                        setSidebar(prevSidebar => [
                            ...prevSidebar,
                            ...(response?.data?.sidebar || [])
                        ]);
                        setHasMoreData(response?.data?.hasMoreData)
                    } else {
                        console.error(response?.data?.error)
                        setError(response?.data?.error)
                    }
                } catch (error) {
                    console.error('Error fetching side data:', error);
                    setError('An error occurred while fetching conversation data.');
                    setSidebar([])
                } finally {
                    loading.current = false
                }
            }
        }
    }, [loading, sidebar]);

    useEffect(() => {
        const container = scrollRef?.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const handleSubmit = () => {
        router.push(`/main/messages/${email}`)
    }

    useEffect(() => {
        const fetchSideData = async () => {
            try {
                const response: SidebarRequestType = await axios.post(`${server}/sidebar`, {
                    email: user?.email,
                    usersToSkip: 0
                })
                if (response?.data?.success) {
                    console.log(response?.data?.sidebar)
                    setSidebar(response?.data?.sidebar)
                    setHasMoreData(response?.data?.hasMoreData)
                } else {
                    setError(response?.data?.error)
                    console.error(response?.data?.error)
                }
            } catch (error: any) {
                console.log('Error fetching side data:', error?.message);
                setError(`An error occurred while fetching sidebar data. ${error?.message}`);
            } finally {
                setIsLoading(false)
            }
        };

        const handleSocketChangeSide = (newSidebar: any) => {
            setSidebar(s => {
                let found = 0;
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
    }, [])




    return (
        <Paper elevation={3} className={`w-96 p-2 fixed h-full z-10 overflow-y-scroll flex flex-col items-center justify-start ${className} mobile:w-full mobile:mt-16 mobile:h-[calc(100%-64px)] mobile:pb-12`}
            ref={scrollRef}
        >
            {!isLoading && (
                <>
                    {sidebar?.length !== 0 ? sidebar?.map((conversation: any, index: number) => {
                        const font = !conversation.seen && !conversation.lastYou ? 'font-semibold' : 'font-medium'
                        return (
                            <Link href={`/main/messages/${conversation?.email}`} key={index}
                                style={{ width: '100%', textTransform: "none", height: '80px', margin: '16px 0', justifyContent: "flex-start", display: "flex", alignItems: "center" }}
                            >
                                <Avatar src={conversation?.avatar} sx={{ height: "50px", width: "50px" }} />
                                <div className='w-full h-full flex-col flex items-start justify-center ml-2 text-black'>
                                    <div className='font-semibold text-lg'>{conversation?.username}</div>
                                    <div className='font-medium text-sm flex items-center justify-start'>
                                        <div className='truncate font-light max-w-[230px]'>
                                            <span className={font}>{conversation?.lastYou && 'You: '}</span>
                                            <span className={font}>{conversation?.lastMsg}</span>
                                        </div>
                                        <div className={font}>
                                            <span className='font-black mx-1'>·</span>
                                            {formatTimeAgo(conversation?.date)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className='w-full h-full flex items-center justify-center flex-col'>
                            <div className='text-lg font-semibold mb-4'>
                                Find a user to talk with:
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex items-center justify-center flex-col w-full'>
                                <TextField id="filled-basic" label="Email..." variant="filled" sx={{ width: '100%' }}
                                    value={email}
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button type='submit'>Enter</Button>
                            </form>
                        </div>
                    )}
                </>
            )}
            {isLoading && (
                <>
                    {Array.from({ length: 15 }).map((_, index: number) => (
                        <Button key={index} variant='text' sx={{ justifyContent: "flex-start", margin: "16px 0" }} className='h-20 w-full'>
                            <Skeleton sx={{ bgcolor: 'grey.400' }} variant="circular" width={50} height={50} />
                            <div className='h-full flex-col flex items-start justify-around ml-2'>
                                <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rounded" width={250} height={26} />
                                <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rounded" width={250} height={18} />
                            </div>
                        </Button>
                    ))}
                </>
            )}
            {hasMoreData && (
                <CircularProgress color="inherit" sx={{ m: 2 }} />
            )}
        </Paper>
    )
}

