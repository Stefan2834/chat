//& Utilities
import React, { useState } from 'react'
import axios from 'axios'

//& Mui
import { Button, CircularProgress } from '@mui/material'

//& Exports
import { CompType } from '@/exports/types'
import { bgAvailable } from '@/exports/utilities'

export default function Info({ activeBg, setBg, setInfo, setError, email, emailSend }: CompType) {

    const [newBg, setNewBg] = useState<string>(activeBg)
    const [loading, setLoading] = useState(false)


    const modifyBg = (value: string) => {
        setLoading(true)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER}/graphql`, {
            query: `mutation ($bg: String!, $email: String!, $emailSend: String!) {
                changeBg(bg: $bg, email: $email, emailSend: $emailSend)
            }`,
            variables: {
                email: email,
                emailSend: emailSend,
                bg: value
            }
        }).then((data: any) => {
            console.log(data)
            if (data.data.data.changeBg) {
                setBg(value)
                setInfo(false)
            } else {
                console.error(data)
                setError('An error has ocurred')
            }
        }).catch((err: any) => {
            console.error(err)
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='w-full bg-white flex items-center justify-start flex-col h-full overflow-auto'>
            <div className="font-semibold text-base mt-2">Background</div>
            <div className='flex justify-around w-full h-full items-center mt-10 flex-wrap'>
                {bgAvailable?.map((background: string, index: number) => {
                    if (background === newBg) {
                        return (
                            <div className='bg aspect-square w-60 rounded m-4 hover:bg-white border-8 border-slate-950'
                                style={{ backgroundImage: `url(${background})` }} key={index}
                            />
                        )
                    } else {
                        return (
                            <div className='bg aspect-square w-60 rounded m-4 hover:bg-white'
                                style={{ backgroundImage: `url(${background})` }} key={index}
                                onClick={() => setNewBg(background)}
                            />
                        )
                    }
                })}
                <div className='flex justify-evenly items-center w-full pb-8'>
                    <Button variant="contained" sx={{ textTransform: 'none', mt: '25px', fontSize: '22px' }}
                        onClick={() => { modifyBg(newBg) }} disabled={loading}
                    >
                        Save
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: 'red',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                    <Button variant="text" sx={{ textTransform: 'none', mt: '25px', fontSize: '22px' }}
                        onClick={() => setInfo(false)}
                    >
                        Back
                    </Button>
                </div>
            </div>
        </div>
    )
}
