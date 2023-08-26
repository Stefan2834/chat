import React, { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import Sidebar from '@/components/Sidebar'
import { TextField, IconButton, Avatar, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import Image from 'next/image';
import emoji from '../../../svg/black/emoji-emotions.svg'
import send from '../../../svg/black/send.svg'
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




export default function Messages({ messagesData, avatar, params, username, hasSeen, err }: MessagePageProps) {
   const router = useRouter()

   const { user, socket } = useDefault()

   const submitRef = useRef<HTMLInputElement | null>(null);
   const scrollRef = useRef<HTMLDivElement | null>(null)
   const loading = useRef<boolean>(false)

   const [hasMoreData, setHasMoreData] = useState(true)
   const [error, setError] = useState(err)
   const [seen, setSeen] = useState<boolean>(hasSeen)
   const [messages, setMessages] = useState(messagesData)



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
         } else if (scrollTop === 0 && messages[0].email !== user?.email) {
            const newEmit = {
               emailSend: user?.email,
               emailReceive: params,
               room: [user?.email, params].sort().join('-')
            }
            socket?.emit('seen', newEmit)
         }
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
      setSeen(hasSeen)
      const room = [user?.email, params].sort().join('-')

      if (messages[0].email !== user?.email) {
         const newEmit = {
            emailSend: user?.email,
            emailReceive: params,
            room: [user?.email, params].sort().join('-')
         }
         socket?.emit('seen', newEmit)
      }
      socket?.emit('join', { room })
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
                     updatedMessages.unshift(matchedMessage);
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
         <div className='w-full h-full'>
            <Snackbar open={error !== null ? true : false} autoHideDuration={5000} onClose={() => setError(null)}>
               <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                  {error}
               </Alert>
            </Snackbar>
            <Sidebar email={user?.email} socket={socket} />
            <div className='w-[calc(100%-384px)] h-screen relative flex flex-col ml-96'>
               {err === "User don't exist" ? (
                  <div className='w-full h-screen bg-red-400 flex flex-row items-center justify-center'>
                     <div className=''>User don't exist</div>
                  </div>
               ) : (
                  <>
                     <div className='sticky top-0 left-0 flex items-center justify-between bg-white w-full h-20'>
                        <Button variant='text' className='cursor-pointer'
                           sx={{ textTransform: "none", color: "black", fontWeight: "600", fontSize: "16px", p: 3, display: 'flex', justifyContent: 'flex-start' }}
                           onClick={() => router.push(`/main/users/${params}`)}
                        >
                           <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
                           <div className='ml-2'>{params}</div>
                        </Button>
                        <Button variant='text' sx={{ textTransform: 'none', height: '50px', mr: 3 }}>
                           Hey
                        </Button>
                     </div>
                     <div className='w-full test bg-blue-400 relative overflow-auto flex items-center justify-start flex-col-reverse py-2 pl-10' ref={scrollRef}>
                        {seen && messages[0].email === user?.email && (
                           <div className='w-full text-right pr-4'>Seen</div>
                        )}
                        {messages?.map((mess: any, index: number) => {
                           const toOld = index !== messages.length - 1 && messages[index].date - (3600 * 1000) > messages[index + 1].date || index === messages.length - 1;
                           const toOldSecond = index !== 0 && messages[index - 1].date - (3600 * 1000) > messages[index].date
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
                                          <CircularProgress color='inherit' size={16} sx={{ ml: 1, mr: 1 }} />
                                       )}
                                    </div>
                                    {toOld && (
                                       <div className='my-4'>{formatTimestamp(messages[index]?.date)}</div>
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
                                       <div className='my-4'>{formatTimestamp(messages[index]?.date)}</div>
                                    )}
                                 </>
                              )
                           }
                        })}
                        {hasMoreData ? (
                           <CircularProgress color="inherit" sx={{ m: 2 }} />
                        ) : (
                           <div className='w-[calc(100%+40px)] bg-blue-400 -ml-10 mb-2'>
                              <div className='w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center'>
                                 <Avatar sx={{ width: '100px', height: '100px' }} src={avatar} />
                                 <div className='font-semibold font-md m-2 py-2'>{params}</div>
                              </div>
                           </div>
                        )}
                     </div>
                     <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='sticky bottom-0 w-full bg-white flex items-center justify-center px-8 py-3'>
                        <IconButton aria-label="Example" sx={{ mr: 2 }}>
                           <Image src={emoji} alt='Emoji' width={35} height={35} className='cursor-pointer' />
                        </IconButton>
                        <IconButton aria-label="Example" sx={{ mr: 2 }}>
                           <Image src={emoji} alt='Emoji' width={35} height={35} className='cursor-pointer' />
                        </IconButton>
                        <TextField id="outlined-basic" fullWidth label="Type..." variant="outlined"
                           inputProps={{
                              maxLength: 200,
                           }}
                           required
                           inputRef={submitRef}
                        />
                        <IconButton aria-label="Example" sx={{ ml: 3 }} type='submit' >
                           <Image src={send} alt='Emoji' width={35} height={35} className='cursor-pointer' />
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
   const session = await getSession(context);
   const server = 'https://chat-vfyj.onrender.com'
   // const server = 'http://localhost:9000'
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
         params: null,
         err: messages?.data?.message
      }
   }
}