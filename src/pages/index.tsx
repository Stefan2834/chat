import React, { useEffect, useRef } from 'react'
import axios from 'axios'

import { TextField, Button, setRef } from '@mui/material'
import { useDefault } from '@/contexts/Default'
import { useRouter } from 'next/router'


export default function Login() {
    const { server, setUser, setRefreshToken, setAccessToken } = useDefault()
    const router = useRouter()
    const usernameRegisterRef = useRef<HTMLInputElement>(null)
    const emailRegisterRef = useRef<HTMLInputElement>(null)
    const passRegisterRef = useRef<HTMLInputElement>(null)
    const confirmPassRegisterRef = useRef<HTMLInputElement>(null)
    const usernameLoginRef = useRef<HTMLInputElement>(null)
    const emailLoginRef = useRef<HTMLInputElement>(null)
    const passLoginRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setAccessToken('')
        setRefreshToken('')
    }, [])


    const handleRegister = async () => {
        const username = usernameRegisterRef?.current?.value || null
        const email = emailRegisterRef?.current?.value || null
        const pass = passRegisterRef?.current?.value || null
        const confirmPass = confirmPassRegisterRef?.current?.value
        if (confirmPass !== pass) {
            alert("Password don't match")
            return
        }
        const response = await axios.post(`${server}/login/register`, {
            username: username,
            password: pass,
            email: email,
            avatar: ''
        }, { withCredentials: true })
        if (response?.data?.success) {
            alert(response?.data?.message)
        } else {
            alert(response?.data?.message)
        }
        if (usernameRegisterRef?.current) {
            usernameRegisterRef.current.value = '';
        }
        if (emailRegisterRef?.current) {
            emailRegisterRef.current.value = '';
        }
        if (passRegisterRef?.current) {
            passRegisterRef.current.value = '';
        }
        if (confirmPassRegisterRef?.current) {
            confirmPassRegisterRef.current.value = '';
        }

    }

    const handleLogin = async () => {
        try {
            const username = usernameLoginRef?.current?.value || null
            const pass = passLoginRef?.current?.value || null
            const email = emailLoginRef?.current?.value || null
            const response = await axios.post(`${server}/login/login`, {
                username: username,
                password: pass,
                email: email
            }, { withCredentials: true })
            if (response?.data?.success) {
                console.log(response)
                const dbUser = response.data.user
                setAccessToken(response?.data?.accessToken)
                setUser({
                    email: dbUser.email,
                    username: dbUser.username,
                    avatar: dbUser.avatar
                })
                router.push('/main/home')
            } else {
                console.log(response)
                alert(response?.data?.message)
            }
            if (usernameLoginRef?.current) {
                usernameLoginRef.current.value = '';
            }
            if (emailLoginRef?.current) {
                emailLoginRef.current.value = '';
            }
            if (passLoginRef?.current) {
                passLoginRef.current.value = '';
            }
        } catch (err) {
            console.log(err)
        }


    }

    return (
        <div className='w-full flex items-center justify-center relative h-screen overflow-y-scroll mobile:pb-32 mobile:pt-96 mobile:fixed'>
            <div className='flex items-start justify-center flex-wrap'>
                <form className='flex flex-col items-center justify-center mx-4' onSubmit={(e: any) => { e.preventDefault(); handleRegister() }}>
                    <div className='font-semibold text-md'>Register</div>
                    <TextField id="filled-basic" label="Email" variant="filled"
                        sx={{ my: 2 }} required type='email'
                        inputRef={emailRegisterRef}
                    />
                    <TextField id="filled-basic" label="Username" variant="filled"
                        sx={{ my: 2 }} required
                        inputRef={usernameRegisterRef}
                    />
                    <TextField id="filled-basic" label="Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        inputRef={passRegisterRef}
                    />
                    <TextField id="filled-basic" label="Confirm Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        inputRef={confirmPassRegisterRef}
                    />
                    <Button type='submit' variant="outlined">Register</Button>
                </form>
                <form className='flex flex-col items-center justify-center mx-4' onSubmit={(e: any) => { e.preventDefault(); handleLogin() }}>
                    <div className='font-semibold text-md'>Login</div>
                    <TextField id="filled-basic" label="Email" variant="filled"
                        sx={{ my: 2 }} required type='email'
                        inputRef={emailLoginRef}
                    />
                    <TextField id="filled-basic" label="Username" variant="filled"
                        sx={{ my: 2 }} required
                        inputRef={usernameLoginRef}
                    />
                    <TextField id="filled-basic" label="Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        inputRef={passLoginRef}
                    />
                    <Button type='submit' variant="outlined">Login</Button>
                </form>
            </div>
        </div>
    )
}
