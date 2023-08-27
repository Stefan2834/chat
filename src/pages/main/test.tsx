import React from 'react'
import Image from 'next/image';
import { TextField, IconButton, Avatar, Button, Snackbar, Alert, CircularProgress } from '@mui/material';

export default function Test() {
    const avatar = ''
    const params = ''
    const messages = [{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    },
    {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }, {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        avatar: 'mirel',
        date: 16944444555
    }
    ]
    return (
        <>
            <div className='w-full mobile:h-[calc(100vh-120px)] h-full'>
                <div className='mobile:w-full h-screen relative flex flex-col mobile:ml-0 w-[calc(100%-384px)] ml-96'>
                    {false ? (
                        <div className='w-full h-screen bg-red-400 flex flex-row items-center justify-center'>
                            <div className=''>User don't exist</div>
                        </div>
                    ) : (
                        <>
                            <div className='sticky top-0 left-0 flex items-center justify-between bg-white w-full h-20'>
                                <Button variant='text' className='cursor-pointer'
                                    sx={{ textTransform: "none", color: "black", fontWeight: "600", fontSize: "16px", p: 3, display: 'flex', justifyContent: 'flex-start' }}
                                >
                                    <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
                                    <div className='ml-2'>{params}</div>
                                </Button>
                                <Button variant='text' sx={{ textTransform: 'none', height: '50px', mr: 3 }}>
                                    <Image src={'/infoPhoto'} alt='Info' width={35} height={35} />
                                </Button>
                            </div>
                            {false ? (
                                <></>
                            ) : (
                                <>
                                    <div className='w-full bg relative overflow-auto flex items-center justify-start flex-col-reverse py-2 pl-10 h-[calc(100vh-280px)] mobile:h-full'
                                    >
                                        {messages?.map((mess: any, index: number) => {
                                            const toOld = index !== messages.length - 1 && messages[index].date - (3600 * 1000) > messages[index + 1].date || index === messages.length - 1 ||
                                                new Date(mess.date).getDay() !== new Date(messages[index + 1].date).getDay();
                                            const toOldSecond = index !== 0 && messages[index - 1].date - (3600 * 1000) > messages[index].date ||
                                                new Date(messages[index - 1]?.date).getDay() !== new Date(mess.date).getDay();
                                            if ('iosifs617@gmail.com' === mess?.email) {
                                                const borderBottom = !toOldSecond && index !== 0 && messages[index - 1].email === 'iosifs617@gmail.com' ? '0px' : '24px'
                                                const borderTop = !toOld && index !== messages.length - 1 && messages[index + 1].email === 'iosifs617@gmail.com' ? '0px' : '24px'
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
                                                            <div className='my-4 text-white'>Ieri</div>
                                                        )}
                                                    </>
                                                )
                                            } else {
                                                const borderBottom = !toOldSecond && index !== 0 && messages[index - 1].email !== 'iosifs617@gmail.com' ? '0px' : '24px'
                                                const borderTop = !toOld && index !== messages.length - 1 && messages[index + 1].email !== 'iosifs617@gmail.com' ? '0px' : '24px'
                                                return (
                                                    <>
                                                        <div className='w-auto max-w-[60%] p-0.5 self-start ml-2 flex justify-center items-center' key={index}>
                                                            {borderBottom === '24px' && (
                                                                <Avatar src={avatar}
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
                                                            <div className='my-4 text-white'>Today</div>
                                                        )}
                                                    </>
                                                )
                                            }
                                        })}
                                        <div className='w-[calc(100%+40px)] -ml-10 mb-2'>
                                            <div className='w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center'>
                                                <Avatar sx={{ width: '100px', height: '100px' }} src={avatar} />
                                                <div className='font-semibold font-md m-2 py-2 text-white'>{params}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={(e) => { e.preventDefault() }} className='sticky bottom-0 w-full bg-white flex items-center justify-center px-8 py-3 mobile:fixed mobile:bottom-14'>
                                        <IconButton aria-label="Example" sx={{ mr: 2 }}>
                                            <Image src={'/emoji'} alt='Emoji' width={35} height={35} className='cursor-pointer' />
                                        </IconButton>
                                        <IconButton aria-label="Example" sx={{ mr: 2 }}>
                                            <Image src={'/files'} alt='Emoji' width={35} height={35} className='cursor-pointer' />
                                        </IconButton>
                                        <TextField id="outlined-basic" fullWidth label="Type..." variant="outlined"
                                            inputProps={{
                                                maxLength: 200,
                                            }}
                                            required
                                        />
                                        <IconButton aria-label="Example" sx={{ ml: 3 }} type='submit' >
                                            <Image src={'/send'} alt='Emoji' width={35} height={35} className='cursor-pointer' />
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
