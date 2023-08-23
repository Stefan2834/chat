import React, { useEffect, useState, useRef } from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Avatar, Button, Paper } from '@mui/material';
import Image from 'next/image';
import likePhoto from '../../../svg/white/like.svg'
import commentPhoto from '../../../svg/white/comment.svg'
import cameraPhoto from '../../../svg/black/camera.svg'
import Posts from '@/components/Posts';
import { useDefault } from '@/contexts/Default';

interface UserPageProps {
    profileData: {
        _id: string;
        email: string;
        name: string;
        image: string;
        posts: Posts[]
    } | null;
    params: string | null
}

interface Posts {
    src: string,
    image: string,
    email: string,
    date: string,
    message: string,
    likes: string[],
    _id: {
        $oid: string
    },
    comments: Comm[]
}

interface Comm {
    email: string,
    image: string,
    date: string,
    message: string
}


export default function Profile({ profileData, params }: UserPageProps) {
    const { user, server } = useDefault()
    const [profile, setProfile] = useState(profileData)
    const [selectedPhoto, setSelectedPhoto] = useState<Posts | null>(null)

    const getComment = () => {
        axios.post(`${server}/users/profile/`, {
            email: params
        }).then(data => {
            if (data.data.success) {
                const newComm = data.data.message.posts.find((p: any) => p._id.$oid === selectedPhoto?._id.$oid);
                setSelectedPhoto(p => ({
                    src: p!.src,
                    image: p!.image,
                    email: p!.email,
                    message: p!.message,
                    date: p!.date,
                    likes: p!.likes,
                    _id: p!._id,
                    comments: newComm.comments,
                }));
                setProfile(data.data.message)
            }
            new Error(data.data.message)
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        setProfile(profileData)
        setSelectedPhoto(null)
    }, [profileData])

    useEffect(() => {
        if (selectedPhoto) {
            document.documentElement.style.overflowY = "hidden"
        } else {
            document.documentElement.style.overflowY = "scroll"
        }
        return () => {
            document.documentElement.style.overflowY = "hidden"
        }
    }, [selectedPhoto])

    const modifyLike = () => {
        const userName = user?.email;
        if (userName && selectedPhoto) {
            const updatedLikes = selectedPhoto.likes.includes(userName)
                ? selectedPhoto.likes.filter(likeUser => likeUser !== userName)
                : [...selectedPhoto.likes, userName];
            setSelectedPhoto(p => ({
                likes: updatedLikes,
                src: p!.src,
                image: p!.image,
                email: p!.email,
                message: p!.message,
                date: p!.date,
                _id: p!._id,
                comments: p!.comments,
            }));
        }
    };

    return (
        <>
            {profile ? (
                <div className='w-full h-auto mt-10 mb-28 flex items-center justify-center flex-col relative overflow-x-hidden'>
                    {selectedPhoto && (
                        <Posts selectedPhoto={selectedPhoto}
                            onClose={() => setSelectedPhoto(null)}
                            user={user}
                            getComment={() => getComment()}
                            modifyLike={() => modifyLike()}
                        />
                    )}
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', width: "auto", maxWidth: "100%" }} >
                        <div className='flex items-center justify-center'>
                            <Avatar alt='avatar' src={profile?.image} sx={{ width: 140, height: 140 }} />
                            <div className='flex flex-col h-28 ml-8'>
                                {user?.email === params && (
                                    <div className='flex w-full justify-around mb-4'>
                                        <Button variant="outlined" sx={{ textTransform: 'none', color: 'black', border: '1px solid #a9def9' }}>Edit</Button>
                                        <Button variant="outlined" sx={{ textTransform: 'none', color: 'black', border: '1px solid #a9def9' }}>Delete</Button>
                                    </div>
                                )}
                                <div className='text-lg flex'>Email: <div className='font-semibold'>{profile.email}</div></div>
                                <div className='text-lg flex text-ellipsis overflow-hidden whitespace-nowrap'>Username: <div className='font-semibold'>{profile.name}</div></div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-3'>
                            <div className=''>
                                <span className='font-semibold'>{profile?.posts?.length}</span> posts
                            </div>
                            <div className=''>
                                <span className='font-semibold'>123</span> followers
                            </div>
                            <div className=''>
                                <span className='font-semibold'>321</span> following
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={1} sx={{ backgroundColor: 'black', opacity: '0.4' }} className='md:w-10/12 w-full h-px my-20' />
                    <div className='relative left-0 font-semibold text-3xl w-full md:w-10/12 pl-2'>Posts</div>
                    <div className='flex flex-wrap w-full md:w-10/12'>
                        {profile?.posts?.length !== 0 ? (
                            <>
                                {profile?.posts?.map((i: Posts, index: number) => {
                                    return (
                                        <div className='p-2 w-full photo-hover md:w-1/3' key={index} onClick={() => setSelectedPhoto(i)}>
                                            <div className='relative w-full' style={{ aspectRatio: '1/1' }} >
                                                <img width={100} height={100} alt='Poza'
                                                    src={i.src}
                                                    className='w-full h-full relative object-cover object-center'
                                                />
                                                <div className='flex items-center justify-evenly w-full h-full top-0 absolute cursor-pointer'>
                                                    <div className='bg-black w-full h-full absolute top-0 left-0 photo-opacity' />
                                                    <div className='text-white font-semibold text-md photo-text opacity-0 flex z-10 items-center justify-center'>
                                                        <span className='text-xl mr-2'>{i?.likes?.length}</span>
                                                        <Image src={likePhoto} width={30} height={30} alt='Like' />
                                                    </div>
                                                    <div className='text-white font-semibold text-md photo-text opacity-0 flex z-10 items-center justify-center'>
                                                        <span className='text-xl mr-2'>{i?.comments?.length}</span>
                                                        <Image src={commentPhoto} width={30} height={30} alt='Comment' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <div className='flex w-full flex-col mt-20 items-center justify-center'>
                                <Image width={300} height={300} className='opacity-80' src={cameraPhoto} alt='Poza' />
                                <div className='font-semibold text-lg'>This account doesn't have any posts</div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>Acest profil nu exista</>
            )
            }
        </>
    )
}


export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
    const { email } = context.query;
    const server = 'https://chat-vfyj.onrender.com'
    // const server = 'http://localhost:9000'
    const profile = await axios.post(`${server}/users/profile/`, {
        email: email
    })
    if (profile.data.success) {
        return {
            props: {
                profileData: profile?.data?.message,
                params: email as string
            },
        };
    } else {
        return {
            props: {
                profileData: null,
                params: null
            }
        }
    }
};

