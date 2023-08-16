import React, { useEffect, useState } from 'react'
import { useDefault } from '@/contexts/Default'
import DynamicWidthComponent from '@/components/DynamicWidth'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Avatar, Button, Paper } from '@mui/material';
import Image from 'next/image';

interface UserPageProps {
    profile: {
        _id: string;
        email: string;
        name: string;
        image: string;
        posts: Posts[]
    } | null;
}

interface Posts {
    src: string,
    likes: string[],
    comments: {
        email: string,
        date: string,
        text: string
    }[]
}

export default function Profile({ profile }: UserPageProps) {
    const { navOpen } = useDefault()


    return (
        <DynamicWidthComponent navbar={navOpen}>
            {profile ? (
                <div className='w-full h-auto my-10 flex items-center justify-center flex-col'>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', width: "auto" }} >
                        <div className='flex items-center justify-center'>
                            <Avatar alt='avatar' src={profile?.image} sx={{ width: 140, height: 140 }} />
                            <div className='flex flex-col h-28 ml-8'>
                                <div className='flex w-full justify-around mb-4'>
                                    <Button variant="outlined" sx={{ textTransform: 'none', color: 'black', border: '1px solid #a9def9' }}>Edit</Button>
                                    <Button variant="outlined" sx={{ textTransform: 'none', color: 'black', border: '1px solid #a9def9' }}>Delete</Button>
                                </div>
                                <div className='text-lg'>Email: <span className='font-semibold'>{profile.email}</span></div>
                                <div className='text-lg'>Username: <span className='font-semibold'>{profile.name}</span></div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-3'>
                            <div className=''>
                                <span className='font-semibold'>0</span> posts
                            </div>
                            <div className=''>
                                <span className='font-semibold'>123</span> followers
                            </div>
                            <div className=''>
                                <span className='font-semibold'>321</span> following
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={1} sx={{ backgroundColor: 'black', opacity: '0.4' }} className='w-10/12 h-px my-20' />
                    <div className='relative left-0 font-semibold text-3xl w-10/12 pl-2'>Posts</div>
                    <div className='w-10/12 flex flex-wrap'>
                        {profile?.posts?.length !== 0 ? (
                            <>
                                {profile?.posts?.map((i: Posts, index: number) => {
                                    console.log(i.src)
                                    return (
                                        <div className='p-2 w-1/3 photo-hover' key={index}>
                                            <div className='relative w-full' style={{ aspectRatio: '1/1' }} >
                                                <Image width={100} height={100} alt='Poza'
                                                    src={i.src}
                                                    className='w-full h-full relative'
                                                    style={{ aspectRatio: '1/1' }}
                                                />
                                                <div className='flex items-center justify-evenly w-full h-full top-0 absolute cursor-pointer'>
                                                    <div className='bg-black w-full h-full absolute top-0 left-0 photo-opacity' />
                                                    <div className='text-white font-semibold text-md photo-text opacity-0'>{i?.likes?.length}</div>
                                                    <div className='text-white font-semibold text-md photo-text opacity-0'>{i?.comments?.length}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                Acest cont nu are postari
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <>Acest profil nu exista</>
            )
            }
        </DynamicWidthComponent >
    )
}


export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
    const { email } = context.query;
    const server = process.env.NEXT_PUBLIC_SERVER
    console.log('ID from query:', email);
    const profile = await axios.post(`${server}/profile/`, {
        email: email
    })
    console.log(profile.data.message)
    if (profile.data.success) {
        return {
            props: {
                profile: profile?.data?.message,
            },
        };
    } else {
        return {
            props: {
                profile: null
            }
        }
    }
};

