//& Utilities
import React from 'react'
import { useRouter } from 'next/router';

//& Mui
import { CircularProgress, Avatar } from '@mui/material';

//& Exports
import { formatTimestamp } from '@/exports/utilities';
import { MessageType, MessagePropsType } from '@/exports/types';

export default function Message({ messages, user, setViewPhoto, avatar }: MessagePropsType) {

    const router = useRouter();


    return (
        <>
            {messages?.map((mess: MessageType, index: number) => {
                const tooOld = index !== messages.length - 1 && messages[index].date - (3600 * 1000) > messages[index + 1].date || index === messages.length - 1 ||
                    new Date(mess.date).getDay() !== new Date(messages[index + 1].date).getDay();
                const tooOldSecond = index !== 0 && messages[index - 1].date - (3600 * 1000) > messages[index].date ||
                    new Date(messages[index - 1]?.date).getDay() !== new Date(mess.date).getDay();
                if (user?.email === mess?.email) {

                    //? Display the message in the right

                    const borderBottom = !tooOldSecond && index !== 0 && messages[index - 1].email === user?.email ? '0px' : '24px'
                    const borderTop = !tooOld && index !== messages.length - 1 && messages[index + 1].email === user?.email ? '0px' : '24px'
                    return (
                        <>
                            <div className='w-auto max-w-[60%] p-0.5 self-end mr-2 flex' key={index}>
                                <div className={`flex flex-col text-right bg-white p-3 overflow-hidden rounded-3xl items-start justify-start w-auto`}
                                    style={{ borderTopRightRadius: borderTop, borderBottomRightRadius: borderBottom }}
                                >
                                    {mess.photo && (
                                        <div className='cursor-pointer w-full max-w-md h-auto flex items-center justify-center'
                                            onClick={() => setViewPhoto(mess.photo)}
                                        >
                                            <img src={mess.photo} className='w-full h-auto rounded-xl' alt='This photo was deleted from the database' />
                                        </div>
                                    )}
                                    <div className='mr-2'>{mess.message}</div>
                                </div>
                                {mess?.loading && (
                                    <div className='w-10 flex items-center justify-center h-10'>
                                        <CircularProgress size={16} sx={{ ml: 1, mr: 1, color: 'white' }} />
                                    </div>
                                )}
                            </div>
                            {tooOld && (
                                <div className='my-4 text-white -ml-10 w-full text-center'>{formatTimestamp(messages[index]?.date)}</div>
                            )}
                        </>
                    )
                } else {

                    //? Display the message in the left

                    const borderBottom = !tooOldSecond && index !== 0 && messages[index - 1].email !== user?.email ? '0px' : '24px'
                    const borderTop = !tooOld && index !== messages.length - 1 && messages[index + 1].email !== user?.email ? '0px' : '24px'
                    return (
                        <>
                            <div className='w-auto max-w-[60%] p-0.5 self-start ml-2 flex justify-center items-end' key={index}>
                                {borderBottom === '24px' && (
                                    <Avatar src={avatar} onClick={() => router.push(`/main/users/${mess.email}`)}
                                        sx={{ cursor: 'pointer', ml: -5 }}
                                    />
                                )}
                                <div className='flex flex-col bg-white p-3 items-start overflow-hidden justify-start rounded-3xl ml-2 w-full'
                                    style={{ borderTopLeftRadius: borderTop, borderBottomLeftRadius: borderBottom }}
                                >
                                    {mess.photo && (
                                        <div className='cursor-pointer w-full max-w-md h-auto flex items-center justify-center'
                                            onClick={() => setViewPhoto(mess.photo)}
                                        >
                                            <img src={mess.photo} className='w-full h-auto rounded-xl' alt='This photo was deleted from the database' />
                                        </div>
                                    )}
                                    <div className=''>{mess.message}</div>
                                </div>
                            </div>
                            {tooOld && (
                                <div className='my-4 text-white -ml-10 w-full text-center'>{formatTimestamp(messages[index]?.date)}</div>
                            )}
                        </>
                    )
                }
            })}
        </>
    )
}
