import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Avatar, Button, Paper, TextField, Skeleton, Alert, Snackbar, CircularProgress, Backdrop } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSocket } from '@/contexts/Socket';
import { useDefault } from '@/contexts/Default';

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
        socket,
        sidebar,
        setSidebar,
        isLoading,
        error,
        setError,
        hasMoreData,
        setHasMoreData
    } = useSocket()
    const { user } = useDefault()
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const loading = useRef<boolean>(false)
    const router = useRouter()

    const handleClose = () => {
        setError(null)
    }

    const handleScroll = useCallback(async () => {
        const container = scrollRef.current;
        if (container && !loading.current && hasMoreData) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 250) {
                loading.current = true
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/messages/sidebar/`, {
                        email: user?.email,
                        jump: sidebar?.length === 0 ? 10 : sidebar?.length
                    });
                    if (response?.data?.success) {
                        setSidebar(prevSidebar => [
                            ...prevSidebar,
                            ...(response?.data?.side || [])
                        ]);
                        setHasMoreData(response?.data?.hasMoreData)
                    } else {
                        console.error(response?.data?.message)
                        setError(response?.data?.message);
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


    return (
        <Paper elevation={3} className={`w-96 p-2 fixed h-full z-10 overflow-y-scroll flex flex-col items-center justify-start bg-white ${className} mobile:w-full mobile:mt-16 mobile:h-[calc(100%-64px)]`}
            ref={scrollRef}
        >
            <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', marginBottom: '40px' }}>
                    {error}
                </Alert>
            </Snackbar>
            <div className='w-[calc(100%+8px)] -m-2 sticky -top-2 -left-2 z-10 bg-white px-2 pt-2'>
                <TextField id="filled-basic" label="Search..." variant="filled" sx={{ width: '100%' }} />
            </div>
            {!isLoading && (
                <>
                    {sidebar?.length !== 0 ? sidebar?.map((conv: any, index: number) => {
                        const font = !conv.seen && !conv.lastYou ? 'font-semibold' : 'font-medium'
                        return (
                            <Button key={index} onClick={() => router.push(`/main/messages/${conv?.email}`)} variant='text'
                                sx={{ width: '100%', textTransform: "none", height: '80px', margin: '16px 0', justifyContent: "flex-start", display: "flex", alignItems: "center" }}
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
                            </Button>
                        )
                    }) : (
                        <div className='flex flex-col w-full h-full items-center justify-center'>
                            <div className='font-semibold text-md text-center mb-2'>You don't have any active conversation</div>
                            <Button onClick={() => router.push('/main/users')} variant="contained" sx={{ textTransform: "none", fontSize: '18px' }}>Find somebody to talk with</Button>
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

