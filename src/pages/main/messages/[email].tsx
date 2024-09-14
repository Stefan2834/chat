//& Utilities
import React, { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react';

//& Next
import Image from 'next/image';
import { GetServerSideProps } from 'next/types'
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

//& Mui
import { TextField, IconButton, Avatar, Button, CircularProgress, Input } from '@mui/material';

//& Components
import Sidebar from '@/components/Sidebar'
import Info from "@/components/messages/Info"
import Message from '@/components/messages/Message';

//& Emojis
import emojiPhoto from '../../../svg/black/emoji-emotions.svg'
import files from '../../../svg/black/image-files.svg'
import send from '../../../svg/black/send.svg'
import infoPhoto from '../../../svg/black/info.svg'
import backPhoto from '../../../svg/black/back.svg'


//& Context
import { useDefault } from '@/contexts/Default';

//& Exports
import { MessagePageProps } from '@/exports/types';


export default function Messages({ messagesData, avatar, params, username, hasSeen, err, background }: MessagePageProps) {

    const router = useRouter()

    const { data: session } = useSession();

    const user = session?.user

    const { server, setError, socket } = useDefault()

    const submitRef = useRef<HTMLInputElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const loading = useRef<boolean>(false)

    const [hasMoreData, setHasMoreData] = useState(messagesData.length < 20 ? false : true)
    const [emoji, setEmoji] = useState<boolean>(false)
    const [seen, setSeen] = useState<boolean>(hasSeen)
    const [messages, setMessages] = useState(messagesData)
    const [info, setInfo] = useState<boolean>(false)
    const [bg, setBg] = useState<string>(background)
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
    const [viewPhoto, setViewPhoto] = useState<string | null | undefined>(null)


    const handleScroll = useCallback(async () => {
        const container = scrollRef.current;
        if (container && !loading.current && hasMoreData) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (- scrollTop + clientHeight >= scrollHeight - 250) {
                loading.current = true
                try {
                    const response = await axios.post(`${server}/graphql`, {
                        email: user?.email,
                        secondEmail: params,
                        jump: messages?.length
                    })
                    if (response?.data?.success) {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            ...(response?.data?.messages || [])
                        ]);
                        setHasMoreData(response?.data?.hasMoreData)
                    } else {
                        console.error(response?.data?.error)
                        setError(response?.data?.error);
                    }
                } catch (error: any) {
                    console.error('Error fetching side data:', error);
                    setError(error.message as string);
                } finally {
                    loading.current = false
                }

            }
        }
        if (container && container.scrollTop === 0 && messages[0]?.email !== user?.email && !seen) {
            const newEmit = {
                emailSend: user?.email,
                emailReceive: params,
                room: [user?.email, params].sort().join('-')
            }
            socket?.emit('seen', newEmit)
        }
    }, [loading, messages]);

    useEffect(() => {
        const container = scrollRef?.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    useEffect(() => {
        setMessages(messagesData)
        setHasMoreData(messagesData.length < 20 ? false : true)
        setSeen(hasSeen)
        setBg(background)
        setInfo(false)
        const container = scrollRef?.current;
        if (container) container.scrollTop = 0

        const room = user?.email ? [user?.email, params].sort().join('-') : null

        if (user?.email) {
            socket?.emit('join', { room })
        }
        if (messagesData[0]?.email !== user?.email && !seen) {
            const newEmit = {
                emailSend: user?.email,
                emailReceive: params,
                room: [user?.email, params].sort().join('-')
            }
            socket?.emit('seen', newEmit)
        }
        socket?.on('message', (newMessage: any) => {
            if (newMessage.success) {
                if (scrollRef.current && scrollRef.current.scrollTop === 0 && newMessage.message.email !== user?.email) {
                    const newEmit = {
                        emailSend: user?.email,
                        emailReceive: params,
                        room: [user?.email, params].sort().join('-')
                    }
                    socket?.emit('seen', newEmit)
                }
                const message = newMessage?.message
                if (message.email === user?.email) {
                    setMessages(mess => {
                        const updatedMessages = [...mess];
                        const index = mess.findIndex(m => m?.loading && m?.date === message?.date && m?.message === message?.message);
                        if (index !== -1) {
                            const matchedMessage = updatedMessages.splice(index, 1)[0];
                            delete matchedMessage.loading;
                            const loadingIndex = updatedMessages.map(m => m.loading).lastIndexOf(true);
                            updatedMessages.splice(loadingIndex + 1, 0, matchedMessage);
                        }
                        return updatedMessages;
                    });
                } else {
                    setSeen(false)
                    setMessages((prevMessages) => [{
                        email: message?.email,
                        date: message?.date,
                        message: message?.message,
                        photo: message?.photo
                    }, ...prevMessages,]);
                }
            } else setError(newMessage.message)
        });

        socket?.on('seen', (data: any) => {
            if (data.success) {
                setSeen(true)
            } else {
                console.error(data)
            }
        })

        return () => {
            socket?.off('message');
            socket?.off('seen')
            if (user?.email) {
                socket?.emit('leave', { room });
            }
        };
    }, [params]);

    useEffect(() => {
        if (err === "User doesn't exist") {
            router.push('/main/messages')
        }
        setError(err)
    }, [params])

    if (params === user?.email) {
        router.push('/main/messages')
        setError("You can't talk with yourself")
        return null
    }

    const handleSubmit = async () => {
        try {
            const mess = submitRef?.current?.value;
            const date = Date.now()
            let photoUrl: string | null = null;
            if (selectedPhoto) {
                const formData = new FormData();
                formData.append('photo', selectedPhoto);
                const photo = await axios.post(`${server}/upload-photo`, formData)
                photoUrl = photo?.data?.url
            }
            const newMessage = {
                emailSend: user?.email,
                emailReceive: params,
                avatarSend: user?.avatar,
                avatarReceive: avatar,
                userSend: user?.username,
                userReceive: username,
                date: date,
                message: mess || '',
                photo: photoUrl
            }
            setSeen(false)
            setEmoji(false)
            setMessages((m) => [{
                email: user?.email,
                date: date,
                message: mess || '',
                loading: true,
                photo: photoUrl ? photoUrl : null
            }, ...m])
            setSelectedPhoto(null)
            socket?.emit('message', { ...newMessage, room: [user?.email, params].sort().join('-') })
            if (submitRef.current) submitRef.current.value = '';
            if (scrollRef.current) scrollRef.current.scrollTop = 0;
        } catch (err) {
            console.log(err)
        }
    };



    return (
        <>
            <div className='w-full h-screen mobile:h-full'>
                {window.innerWidth >= 1000} {
                    <Sidebar className='block mobile:hidden' />
                }
                {viewPhoto && (
                    <div className='w-screen h-screen z-40 absolute flex items-center justify-center left-0' onClick={() => setViewPhoto(null)}>
                        <div className='absolute w-full h-full bg-black opacity-50' />
                        <img src={viewPhoto} alt='This photo was deleted from the database' className='h-[calc(100%-100px)] max-w-[calc(100%-100px)] w-auto relative z-10' />
                    </div>
                )}
                <div className='w-[calc(100%-384px)] h-full relative flex flex-col ml-96 mobile:w-full mobile:ml-0 mobile:h-[calc(100vh-120px)] mobile:fixed mobile:top-0'>
                    <div className='sticky top-0 left-0 flex items-center justify-between w-full h-auto mobile:h-14 z-30 bg-white'>
                        <Button variant='text' sx={{ textTransform: 'none', height: '50px', display: 'none', '@media (max-width:1000px)': { display: 'inherit' } }}
                            onClick={() => router.push('/main/messages')}
                        >
                            <Image src={backPhoto} alt='Info' width={35} height={35} />
                        </Button>
                        <Button variant='text' className='cursor-pointer'
                            sx={{ textTransform: "none", color: "black", fontWeight: "600", fontSize: "16px", "@media (min-width:1000px)": { p: 3 }, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                            onClick={() => router.push(`/main/users/${params}`)}
                        >
                            <Avatar src={avatar} sx={{ width: 50, height: 50, '@media (max-width:1000px)': { width: 30, height: 30 } }} />
                            <div className='ml-2 truncate'>{params}</div>
                        </Button>
                        <Button variant='text' sx={{ textTransform: 'none', height: '50px', "@media (min-width:1000px)": { mr: 3 } }} onClick={() => setInfo(!info)}>
                            <Image src={infoPhoto} alt='Info' width={35} height={35} />
                        </Button>
                    </div>
                    {info ? (
                        <Info activeBg={bg} setBg={(bg: any) => setBg(bg)}
                            setInfo={((value: any) => setInfo(value))} setError={((value: any) => setError(value))}
                            email={user?.email || ''} emailSend={params || ''}
                        />
                    ) : (
                        <>
                            <div className='w-full bg relative overflow-auto flex items-center justify-start flex-col-reverse py-2 pl-10 h-full mobile:fixed mobile:bottom-16 mobile:h-[calc(100vh-170px)]'
                                ref={scrollRef} style={{ backgroundImage: `url(${bg})` }}
                            >
                                {seen && messages[0]?.email === user?.email && (
                                    <div className='w-full text-right pr-4 text-white'>Seen</div>
                                )}
                                <Message messages={messages} avatar={avatar}
                                    user={user} setViewPhoto={((value: string | null | undefined) => { setViewPhoto(value) })}
                                />
                                {hasMoreData ? (
                                    <CircularProgress sx={{ m: 2, color: 'white', marginLeft: "-40px" }} />
                                ) : (
                                    <div className='w-[calc(100%+40px)] -ml-10 mb-2'>
                                        <div className='w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center'>
                                            <Avatar sx={{ width: '100px', height: '100px' }} src={avatar} />
                                            <div className='font-semibold font-md m-2 py-2 text-white'>{params}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                                className={`sticky bottom-0 w-full flex items-center bg-white justify-center px-8 py-3 
                                mobile:fixed mobile:py-2 mobile:px-1`}
                            >
                                {emoji && window.innerWidth > 1000 && (
                                    <div className='absolute z-20 bottom-24 right-0 left-2 w-0'>
                                        <EmojiPicker
                                            lazyLoadEmojis={true}
                                            onEmojiClick={(emoji: any) => {
                                                if (submitRef.current) {
                                                    const input = submitRef.current;
                                                    const inputValue = input.value;
                                                    const selectionStart = input.selectionStart || 0;
                                                    const selectionEnd = input.selectionEnd || 0;

                                                    const newValue =
                                                        inputValue.slice(0, selectionStart) +
                                                        emoji.emoji +
                                                        inputValue.slice(selectionEnd);

                                                    input.value = newValue;
                                                    input.selectionStart = input.selectionEnd = selectionStart + emoji.emoji.length;
                                                    input.focus()
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                                {window.innerWidth >= 1000 && (
                                    <>
                                        <IconButton aria-label="Example" sx={{
                                            "@media (min-width: 1000px)": {
                                                mr: 2,
                                            },
                                        }} onClick={(e: any) => { e.stopPropagation(); setEmoji(!emoji) }}
                                        >
                                            <Image src={emojiPhoto} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                                        </IconButton>
                                    </>
                                )}
                                <Input
                                    inputProps={{
                                        accept: 'image/*',
                                    }}
                                    id="file-input"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(event: any) => {
                                        setSelectedPhoto(event.target.files[0])
                                    }}
                                />
                                <label htmlFor="file-input">
                                    <Button
                                        sx={{
                                            "@media (min-width: 1000px)": {
                                                mr: 2,
                                            },
                                            bgcolor: "transparent"
                                        }}
                                        component="span"
                                    >
                                        <Image src={files} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                                    </Button>
                                </label>
                                {selectedPhoto && (
                                    <div className="w-24 h-12 flex items-center justify-center mr-2 bg-center bg-contain bg-no-repeat relative"
                                        style={{ backgroundImage: `url(${URL.createObjectURL(selectedPhoto)})` }}>
                                        <div className='w-4 h-4 bg-black absolute right-0 top-0 rounded-full cursor-pointer text-white flex items-center justify-center text-xs'
                                            onClick={() => setSelectedPhoto(null)}
                                        >
                                            x
                                        </div>
                                    </div>
                                )}
                                <TextField id="outlined-basic" fullWidth label="Type..." variant="outlined"
                                    inputProps={{
                                        maxLength: 200,
                                        className: 'msg-input',
                                    }}
                                    required={!selectedPhoto}
                                    inputRef={submitRef}
                                />
                                <IconButton aria-label="Example" type='submit'
                                    sx={{ "@media (min-width: 1000px)": { mr: 2, ml: 2 }, mr: -1 }}
                                >
                                    <Image src={send} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                                </IconButton>
                            </form>
                        </>
                    )}

                </div>
            </div >
        </>
    )
}

export const getServerSideProps: GetServerSideProps<MessagePageProps> = async (context) => {
    const { email } = context.query;
    const server = process.env.NEXT_PUBLIC_SERVER || ''

    try {

        const session = await getSession(context);


        const messages = await axios.post(`${server}/messages`, {
            email: session?.user?.email,
            secondEmail: email,
            jump: 0
        })
        if (messages?.data?.success) {
            return {
                props: {
                    messagesData: messages?.data?.messages || [],
                    avatar: messages?.data?.avatar || '',
                    username: messages?.data?.username || '',
                    hasSeen: messages?.data?.seen || false,
                    background: messages?.data?.bg || 'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg',
                    params: email as string,
                    err: null,
                },
            };
        } else {
            return {
                props: {
                    messagesData: [],
                    avatar: '',
                    username: '',
                    hasSeen: false,
                    background: '',
                    params: null,
                    err: messages?.data?.error || null
                }
            }
        }
    } catch (err: any) {
        console.log(err.message)
        return {
            props: {
                messagesData: [],
                avatar: '',
                username: '',
                hasSeen: false,
                background: '',
                params: null,
                err: err?.message || ''
            }
        }
    }
}