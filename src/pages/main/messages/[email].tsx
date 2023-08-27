import React, { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import Sidebar from '@/components/Sidebar'
import { TextField, IconButton, Avatar, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Info from '@/components/messages/info';

import emoji from '../../../svg/black/emoji-emotions.svg'
import files from '../../../svg/black/image-files.svg'
import send from '../../../svg/black/send.svg'
import infoPhoto from '../../../svg/black/info.svg'

import { getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useDefault } from '@/contexts/Default';


interface MessagePageProps {
   messagesData: {
      email: string | null | undefined,
      date: number,
      message: string,
      loading?: boolean
   }[],
   avatar: string,
   username: string,
   hasSeen: boolean,
   background: string,
   params: string | null,
   err: string | null | undefined,
}

const formatTimestamp = (timestamp: number) => {
   const date = new Date(timestamp);
   const now = new Date();

   const diffInMilliseconds = now.getTime() - date.getTime();

   if (diffInMilliseconds < 24 * 60 * 60 * 1000 && now.getDay() === date.getDay()) {
      return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
   }
   else if (diffInMilliseconds < 2 * 24 * 60 * 60 * 1000 && now.getDay() - 1 === date.getDay()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
   }
   else if (diffInMilliseconds < 7 * 24 * 60 * 60 * 1000 && now.getDay() !== date.getDay()) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return `${days[date.getDay()]} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
   }
   else {
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
   }
};




export default function Messages({ messagesData, avatar, params, username, hasSeen, err, background }: MessagePageProps) {
   const router = useRouter()

   const { user, socket } = useDefault()

   const submitRef = useRef<HTMLInputElement | null>(null);
   const scrollRef = useRef<HTMLDivElement | null>(null)
   const loading = useRef<boolean>(false)

   const [hasMoreData, setHasMoreData] = useState(messagesData.length < 20 ? false : true)
   const [error, setError] = useState(err)
   const [seen, setSeen] = useState<boolean>(hasSeen)
   const [messages, setMessages] = useState(messagesData)
   const [info, setInfo] = useState<boolean>(false)
   const [bg, setBg] = useState<string>(background)



   const handleScroll = useCallback(async () => {
      const container = scrollRef.current;
      if (container && !loading.current && hasMoreData) {
         const { scrollTop, scrollHeight, clientHeight } = container;
         if (- scrollTop + clientHeight >= scrollHeight - 250) {
            loading.current = true
            try {
               const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/messages/messages/`, {
                  email: user?.email,
                  secondEmail: params,
                  jump: messages?.length
               });
               if (response?.data?.success) {
                  setMessages(prevMessages => [
                     ...prevMessages,
                     ...(response?.data?.messages || [])
                  ]);
                  setHasMoreData(response?.data?.hasMoreData)
               } else {
                  console.error(response?.data?.message)
                  setError(response?.data?.message);
               }
            } catch (error) {
               console.error('Error fetching side data:', error);
               setMessages([])
            } finally {
               loading.current = false
            }

         }
      }
      if (container && container.scrollTop === 0 && messages[0].email !== user?.email && !seen) {
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
      }
      return () => {
         if (container) {
            container.removeEventListener('scroll', handleScroll);
         }
      };
   }, [handleScroll]);

   useEffect(() => {
      setMessages(messagesData)
      setHasMoreData(messagesData.length < 20 ? false : true)
      setSeen(hasSeen)
      setBg(background)
      setInfo(false)
      const container = scrollRef?.current;
      if (container) container.scrollTop = 0
      const room = [user?.email, params].sort().join('-')

      socket?.emit('join', { room })
      if (messagesData[0]?.email !== user?.email && !seen) {
         const newEmit = {
            emailSend: user?.email,
            emailReceive: params,
            room: [user?.email, params].sort().join('-')
         }
         socket?.emit('seen', newEmit)
      }
      socket?.on('message', (newMessage) => {
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
               setMessages((prevMessages) => [{
                  email: message?.email,
                  date: message?.date,
                  message: message?.message,
               }, ...prevMessages,]);
            }
         } else setError(newMessage.message)
      });

      socket?.on('seen', (data) => {
         if (data.success) {
            setSeen(true)
         } else {
            console.error(data)
         }
      })

      return () => {
         socket?.off('message');
         socket?.off('seen')
         socket?.emit('leave', { room });
      };
   }, [params]);

   const handleSubmit = () => {
      const mess = submitRef?.current?.value;
      const date = Date.now()
      const newMessage = {
         emailSend: user?.email,
         emailReceive: params,
         avatarSend: user?.image,
         avatarReceive: avatar,
         userSend: user?.name,
         userReceive: username,
         date: date,
         message: mess || '',
      }
      setSeen(false)
      setMessages((m) => [{
         email: user?.email,
         date: date,
         message: mess || '',
         loading: true,
      }, ...m])
      socket?.emit('message', { ...newMessage, room: [user?.email, params].sort().join('-') })
      if (submitRef.current) submitRef.current.value = '';
   };


   return (
      <>
         <div className='w-full h-full mobile:h-[calc(100vh-120px)]'>
            <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={() => setError(null)}>
               <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                  {error}
               </Alert>
            </Snackbar>
            <Sidebar email={user?.email} socket={socket} className='block mobile:hidden' />
            <div className=' w-[calc(100%-384px)] h-screen relative flex flex-col ml-96 mobile:w-full mobile:ml-0'>
               {err === "User don't exist" ? (
                  <div className='w-full h-screen bg-red-400 flex flex-row items-center justify-center'>
                     <div className=''>User don't exist</div>
                  </div>
               ) : (
                  <>
                     <div className='sticky top-0 left-0 flex items-center justify-between bg-white w-full h-auto'>
                        <Button variant='text' className='cursor-pointer'
                           sx={{ textTransform: "none", color: "black", fontWeight: "600", fontSize: "16px", p: 3, display: 'flex', justifyContent: 'flex-start' }}
                           onClick={() => router.push(`/main/users/${params}`)}
                        >
                           <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
                           <div className='ml-2 truncate'>{params}</div>
                        </Button>
                        <Button variant='text' sx={{ textTransform: 'none', height: '50px', mr: 3 }} onClick={() => setInfo(!info)}>
                           <Image src={infoPhoto} alt='Info' width={35} height={35} />
                        </Button>
                     </div>
                     {info ? (
                        <Info activeBg={bg} setBg={(bg) => setBg(bg)}
                           setInfo={(value => setInfo(value))} setError={(value => setError(value))}
                           email={user?.email || ''} emailSend={params || ''} />
                     ) : (
                        <>
                           <div className='w-full bg relative overflow-auto flex items-center justify-start flex-col-reverse py-2 pl-10 h-full mobile:h-[calc(100vh-280px)]'
                              ref={scrollRef} style={{ backgroundImage: `url(${bg})` }}
                           >
                              {seen && messages[0]?.email === user?.email && (
                                 <div className='w-full text-right pr-4 text-white'>Seen</div>
                              )}
                              {messages?.map((mess: any, index: number) => {
                                 const toOld = index !== messages.length - 1 && messages[index].date - (3600 * 1000) > messages[index + 1].date || index === messages.length - 1 ||
                                    new Date(mess.date).getDay() !== new Date(messages[index + 1].date).getDay();
                                 const toOldSecond = index !== 0 && messages[index - 1].date - (3600 * 1000) > messages[index].date ||
                                    new Date(messages[index - 1]?.date).getDay() !== new Date(mess.date).getDay();
                                 if (user?.email === mess?.email) {
                                    const borderBottom = !toOldSecond && index !== 0 && messages[index - 1].email === user?.email ? '0px' : '24px'
                                    const borderTop = !toOld && index !== messages.length - 1 && messages[index + 1].email === user?.email ? '0px' : '24px'
                                    return (
                                       <>
                                          <div className='w-auto max-w-[60%] p-0.5 self-end mr-2 flex justify-center items-center' key={index}>
                                             <div className={`flex flex-col text-right bg-white p-3 overflow-hidden rounded-3xl items-center justify-start trans`}
                                                style={{ borderTopRightRadius: borderTop, borderBottomRightRadius: borderBottom }}
                                             >
                                                <div className='mr-2'>{mess.message}</div>
                                             </div>
                                             {mess?.loading && (
                                                <CircularProgress size={16} sx={{ ml: 1, mr: 1, color: 'white' }} />
                                             )}
                                          </div>
                                          {toOld && (
                                             <div className='my-4 text-white'>{formatTimestamp(messages[index]?.date)}</div>
                                          )}
                                       </>
                                    )
                                 } else {
                                    const borderBottom = !toOldSecond && index !== 0 && messages[index - 1].email !== user?.email ? '0px' : '24px'
                                    const borderTop = !toOld && index !== messages.length - 1 && messages[index + 1].email !== user?.email ? '0px' : '24px'
                                    return (
                                       <>
                                          <div className='w-auto max-w-[60%] p-0.5 self-start ml-2 flex justify-center items-center' key={index}>
                                             {borderBottom === '24px' && (
                                                <Avatar src={avatar} onClick={() => router.push(`/main/users/${mess.email}`)}
                                                   sx={{ cursor: 'pointer', ml: -5 }}
                                                />
                                             )}
                                             <div className='flex flex-col bg-white p-3 items-center justify-start rounded-3xl ml-2'
                                                style={{ borderTopLeftRadius: borderTop, borderBottomLeftRadius: borderBottom }}
                                             >
                                                <div className=''>{mess.message}</div>
                                             </div>
                                          </div>
                                          {toOld && (
                                             <div className='my-4 text-white'>{formatTimestamp(messages[index]?.date)}</div>
                                          )}
                                       </>
                                    )
                                 }
                              })}
                              {hasMoreData ? (
                                 <CircularProgress sx={{ m: 2, color: 'white' }} />
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
                              className='sticky bottom-0 w-full flex items-center justify-center px-8 py-3 mobile:fixed mobile:bottom-14 mobile:py-2 mobile:px-3'
                           >
                              <IconButton aria-label="Example" sx={{
                                 "@media (min-width: 1000px)": {
                                    mr: 2,
                                 },
                              }}>
                                 <Image src={emoji} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                              </IconButton>
                              <IconButton aria-label="Example" sx={{
                                 "@media (min-width: 1000px)": {
                                    mr: 2,
                                 },
                              }}>
                                 <Image src={files} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                              </IconButton>
                              <TextField id="outlined-basic" fullWidth label="Type..." variant="outlined"
                                 inputProps={{
                                    maxLength: 200,
                                    style: { height: '10px', fontSize:'14px' }
                                 }}
                                 required
                                 inputRef={submitRef}
                              />
                              <IconButton aria-label="Example" type='submit'
                                 sx={{ "@media (min-width: 1000px)": { mr: 2 } }}
                              >
                                 <Image src={send} alt='Emoji' width={35} height={35} className='cursor-pointer msg-img' />
                              </IconButton>
                           </form>
                        </>
                     )}

                  </>
               )}
            </div>
         </div >
      </>
   )
}


export const getServerSideProps: GetServerSideProps<MessagePageProps> = async (context) => {
   const { email } = context.query;
   const session = await getSession(context);
   const server = process.env.NEXT_PUBLIC_SERVER || ''
   const messages = await axios.post(`${server}/messages/messages/`, {
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
            background: messages?.data.bg || 'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg',
            params: email as string,
            err: null,
            revalidate: 1,
         },
      };
   } else return {
      props: {
         messagesData: [],
         avatar: '',
         username: '',
         hasSeen: false,
         background: '',
         params: null,
         err: messages?.data?.message
      }
   }
}