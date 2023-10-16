import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Avatar, Button, Paper, TextField, Skeleton, Alert, Snackbar, CircularProgress, Backdrop } from '@mui/material';
import { useRouter } from 'next/router';
import useAxiosAuth from '@/customHooks/useAxiosAuth';
import { useSocket } from '@/contexts/Socket';
import { useDefault } from '@/contexts/Default';
import Link from 'next/link';

function formatTimeAgo(timestamp: number) {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
        return 'now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d`;
    } else if (diffInSeconds < 2419200) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `${weeks}w`;
    } else if (diffInSeconds < 29030400) {
        const months = Math.floor(diffInSeconds / 2419200);
        return `${months}mo`;
    } else {
        const years = Math.floor(diffInSeconds / 29030400);
        return `${years}y`;
    }
}

export default function Sidebar({ className }: { className?: string }) {
    const {
        sidebar,
        setSidebar,
        isLoading,
        hasMoreData,
        setHasMoreData
    } = useSocket()
    const axios = useAxiosAuth()
    const { user, server, setError } = useDefault()
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const loading = useRef<boolean>(false)
    const [email, setEmail] = useState("")
    const router = useRouter()


    const handleScroll = useCallback(async () => {
        const container = scrollRef.current;
        if (container && !loading.current && hasMoreData && user?.email) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 250) {
                loading.current = true
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
                            jump: sidebar?.length
                        }
                    })
                    if (response?.data?.data?.getSidebar?.success) {
                        setSidebar(prevSidebar => [
                            ...prevSidebar,
                            ...(response.data.data.getSidebar.side || [])
                        ]);
                        setHasMoreData(response.data.data.getSidebar.hasMoreData)
                    } else {
                        console.error(response.data.data.getSidebar.message)
                        setError(response.data.data.getSidebar.message)
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
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const handleSubmit = () => {
        router.push(`/main/messages/${email}`)
    }




    return (
        <Paper elevation={3} className={`w-96 p-2 fixed h-full z-10 overflow-y-scroll flex flex-col items-center justify-start ${className} mobile:w-full mobile:mt-16 mobile:h-[calc(100%-64px)] mobile:pb-12`}
            ref={scrollRef}
        >
            {!isLoading && (
                <>
                    {sidebar?.length !== 0 ? sidebar?.map((conv: any, index: number) => {
                        const font = !conv.seen && !conv.lastYou ? 'font-semibold' : 'font-medium'
                        return (
                            <Link href={`/main/messages/${conv?.email}`} key={index}
                                style={{ width: '100%', textTransform: "none", height: '80px', margin: '16px 0', justifyContent: "flex-start", display: "flex", alignItems: "center" }}
                            >
                                <Avatar src={conv?.avatar} sx={{ height: "50px", width: "50px" }} />
                                <div className='w-full h-full flex-col flex items-start justify-center ml-2 text-black'>
                                    <div className='font-semibold text-lg'>{conv?.username}</div>
                                    <div className='font-medium text-sm flex items-center justify-start'>
                                        <div className='truncate font-light max-w-[230px]'>
                                            <span className={font}>{conv?.lastYou && 'You: '}</span>
                                            <span className={font}>{conv?.lastMsg}</span>
                                        </div>
                                        <div className={font}>
                                            <span className='font-black mx-1'>·</span>
                                            {formatTimeAgo(conv?.date)}
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

