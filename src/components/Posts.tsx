import React, { useRef, useState } from 'react'
import { Paper, Avatar, TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import like from '../svg/black/mail.svg'
import axios from 'axios'

interface Posts {
    src: string,
    image: string,
    email: string,
    message: string,
    date: String,
    likes: string[],
    _id: {
        $oid: string
    },
    comments: Comm[]
}

interface PostsProps {
    selectedPhoto: Posts | null;
    onClose: () => void;
    user: null | User;
    getComment: () => void;
}

interface User {
    email: string | null,
    image: string | null,
    name: string | null
}
interface Comm {
    email: string,
    date: string,
    image: string,
    message: string
}

function getCurrentDate() {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDateTime.getDate()).slice(-2);
    const hour = ('0' + currentDateTime.getHours()).slice(-2);
    const minute = ('0' + currentDateTime.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export default function Posts({ selectedPhoto, onClose, user, getComment }: PostsProps) {
    const commentRef = useRef<any>(null)
    const [loading, setLoading] = useState(false)

    const handleComment = (id: { $oid: string }) => {
        setLoading(true)
        const date: string = getCurrentDate()
        axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/users/posts`, {
            email: user?.email,
            photoEmail: selectedPhoto?.email,
            date: date,
            image: user?.image,
            id: id,
            message: commentRef.current?.value
        }).then(data => {
            commentRef.current!.value = null
            getComment()
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (!selectedPhoto) {
        return null;
    }

    return (
        <div className='fixed left-0 top-0 w-screen flex items-center justify-center h-screen z-20'>
            <div className='bg-black opacity-50 w-full h-full top-0 left-0 absolute' />
            <div className='h-[calc(100%-100px)] w-full items-start justify-center flex-wrap flex z-10 overflow-auto'
                onClick={onClose}
            >

                <img src={selectedPhoto.src} className="object-contain object-center w-auto h-full max-w-5xl bg-red-300"
                    onClick={(e) => e.stopPropagation()}
                />
                <div className='flex items-center justify-center flex-col h-full'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className=' bg-white flex h-[calc(100%-144px)] items-center flex-col justify-start px-2 py-4 overflow-auto'
                        style={{ width: "500px" }}
                    >
                        <Paper sx={{ bgcolor: "#eee", borderRadius: "12px" }} elevation={1}
                            className='cursor-pointer w-full p-1 flex items-center'
                        >
                            <Avatar src={selectedPhoto.image} sx={{ height: 60, width: 60 }} />
                            <div className='flex flex-col items-start justify-center ml-2'>
                                <div className="font-light text-sm">{selectedPhoto?.date}</div>
                                <Link href={`/main/users/${selectedPhoto?.email}`} className='font-semibold text-xl'>{selectedPhoto.email}</Link>
                                <div className=''>{selectedPhoto.message}</div>
                            </div>
                        </Paper>
                        <Paper elevation={1} sx={{ bgcolor: "black" }} className='my-8 w-full p-px opacity-25' />
                        {[...selectedPhoto.comments].reverse().map((comm: Comm, index: number) => (
                            <Paper sx={{ bgcolor: "#f0f0f0", borderRadius: "12px", margin: "16px 0" }}
                                key={index} elevation={1}
                                className='cursor-pointer w-full p-1 flex items-center'
                            >
                                <Avatar src={comm?.image} sx={{ height: 60, width: 60 }} />
                                <div className='flex flex-col items-start justify-center ml-2 overflow-hidden'>
                                    <div className="font-light text-sm">{comm?.date}</div>
                                    <Link href={`/main/users/${comm?.email}`} className='font-semibold text-lg'>{comm?.email}</Link>
                                    <div>{comm?.message}</div>
                                </div>
                            </Paper>
                        ))}
                    </div>
                    <div className="w-full h-36 bg-white border-y border-black flex items-center justify-around flex-col">
                        <div className='flex items-center w-[calc(100%-20px)]'>
                            <Image src={like} alt='Like' width={40} height={40} />
                            <div className='ml-2'>Liked by {selectedPhoto.likes.length} others</div>
                        </div>
                        <form className='w-[calc(100%-20px)]' onSubmit={(e) => { e.preventDefault(); handleComment(selectedPhoto._id) }}>
                            <TextField id="outlined-basic" label="Say something"
                                variant="outlined" sx={{ width: '100%' }} inputRef={commentRef}
                                required
                                inputProps={{
                                    maxLength: 100,
                                }}
                            />
                            <input type='submit' disabled={loading} style={{ display: "none" }} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
