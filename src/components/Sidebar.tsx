import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, TextField, Skeleton, Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useSideData } from '@/customHooks/useSidebar';
import { Socket } from 'socket.io-client';

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

interface ConversationType {
    username: string;
    lastMsg: string;
    lastYou: boolean;
    date: number;
    seen: boolean;
    avatar: string;
    email: string;
}

export default function Sidebar({ email, socket }: { email: string | null | undefined, socket: Socket | null }) {
    const { conversation, isLoading, error, setError } = useSideData(email);
    const [sidebar, setSidebar] = useState<ConversationType[] | null | undefined>(conversation)
    const router = useRouter()

    const handleClose = () => {
        setError(null)
    }
    useEffect(() => {
        setSidebar(conversation)
    }, [conversation])

    useEffect(() => {
        const room = email
        socket?.emit('join', { room })
        socket?.on('changeSide', (newSidebar) => {
            setSidebar(s => {
                const updatedSidebar = s?.map((side: any) => {
                    if (side.email === newSidebar.side.email) {
                        return {
                            ...newSidebar.side,
                            lastYou: newSidebar?.sender === email,
                            seen: newSidebar?.sender === email,
                        };
                    } else return side;
                });
                updatedSidebar?.sort((a, b) => b.date - a.date);
                return updatedSidebar;
            })
        });

        return () => {
            socket?.off('changeSide')
            socket?.emit('leave', { room });
        };
    }, [])


    return (
        <Paper elevation={3} className='w-96 p-2 fixed h-full z-10 overflow-y-scroll flex flex-col items-center justify-start bg-white'>
            <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <TextField id="filled-basic" label="Search..." variant="filled" sx={{ width: '100%' }} />
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
                        <Button key={index} variant='text' sx={{ justifyContent: "flex-start", margin: "16px 0" }} className='h-20 w-full bg-red-400'>
                            <Skeleton sx={{ bgcolor: 'grey.400' }} variant="circular" width={50} height={50} />
                            <div className='h-full flex-col flex items-start justify-around ml-2'>
                                <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rounded" width={250} height={26} />
                                <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rounded" width={250} height={18} />
                            </div>
                        </Button>
                    ))}
                </>
            )}
        </Paper>
    )
}

