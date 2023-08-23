import React from 'react'
import { Button, Avatar, TextField, Tooltip, CircularProgress } from '@mui/material'
import { IconButton } from '@mui/material'

export default function Test() {
    const messagesState = [{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },
    {
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    },{
        email: 'mirel',
        message: 'sall',
        user: 'mirel',
        photo: 'mirel',
        time: 'ieri'
    }
]
    return (
        <div className="flex w-screen h-screen justify-center items-start relative">
            <div className="max-w-[700px] w-full relative">
                <div className="w-full max-w-[700px] h-16 bg-slate-300 font-semibold flex items-center justify-evenly z-10 fixed shadow-md">
                    <div>{'mirel'}</div>
                    <Button variant='outlined'>Sign out</Button>
                </div>
                <div className="w-full flex flex-col-reverse items-end justify-start bg-gradient-to-br from-slate-200  to-blue-200 overflow-scroll overflow-x-hidden scroll-container mt-16"
                >
                    <div className="h-auto w-full flex flex-col-reverse items-center justify-center">
                        {messagesState.map((mess, index) => {
                            if (mess.email === 'mirel') {
                                return (
                                    <div className="flex justify-end w-full items-center m-3" key={index}>
                                        <div className="flex flex-col items-end justify-end m-2">
                                            <div className="flex items-center justify-center">
                                                <div className="font-extralight text-xs overflow-hidden">{mess.time}</div>
                                                <div className="font-sm">{mess.user}</div>
                                            </div>
                                            <div className="bg-white p-1 rounded text-right shadow-sm" key={index}>{mess.message}</div>
                                        </div>
                                        {/* <Avatar className="rounded-full mr-2 shadow-sm" src={''} width={35} height={35} alt='Profile picture' /> */}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="flex justify-start w-full items-center m-3" key={index}>
                                        {/* <Avatar className="rounded-full ml-2 shadow-sm" src={''} width={35} height={35} alt='Profile picture' /> */}
                                        <div className="flex flex-col items-start justify-end m-2">
                                            <div className="flex items-center justify-center">
                                                <div className="font-sm">{mess.user}</div>
                                                <div className="font-extralight text-xs overflow-hidden">{mess.time}</div>
                                            </div>
                                            <div className="bg-white p-1 rounded shadow-sm" key={index}>{mess.message}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        <div className="w-full bg-blue-400 flex flex-col items-center justify-center font-semibold text-center">
                            <span className="my-1">Chat-app versiunea beta</span>
                            <span className="my-1">Trimiți și primești mesaje în timp real</span>
                            <span className="my-1">Versiunea full disbonibilă în curând</span>
                        </div>
                    </div>
                </div>
                <form
                    className="flex items-center justify-between w-full bottom-0 h-16 bg-zinc-200 max-w-[700px] fixed"
                >
                    {/* <Avatar className="rounded-full mx-2" width={40} height={40} alt='Profile picture' /> */}
                    <TextField
                        sx={{
                            width: 'calc(100% - 50px)',
                            maxWidth: '650px',
                            position: 'fixed',
                            bottom: '3px',
                            marginLeft: '60px',
                            paddingRight: '70px',
                            backgroundColor: 'transparent',
                        }} label="Type something..." variant="filled" className="w-100"
                        inputProps={{
                            maxLength: 100,
                        }}
                        required
                    />
                    <Tooltip title="Send">
                        <IconButton sx={{ position: 'absolute', right: '4px', height: '50px', width: '50px' }} type='submit'>
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: 'rgb(96, 165, 250)',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </form>
            </div>
        </div>
    )
}
