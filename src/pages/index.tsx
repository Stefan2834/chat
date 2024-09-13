import React, { useState } from 'react'
import { useDefault } from '@/contexts/Default'
import { TextField, Button } from '@mui/material'
import axios from 'axios'
import { signIn } from 'next-auth/react'



export default function Login() {
    const { server, setError } = useDefault()
    const [login, setLogin] = useState({
        email: '',
        pass: '',
        username: '',
    })
    const [register, setRegister] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        username: ''
    })


    const handleRegister = async () => {
        const { username, email, pass, confirmPass } = register
        try {
            if (confirmPass !== pass) {
                setError("Password don't match")
                return
            }
            const response = await axios.post(`${server}/login/register`, {
                username: username,
                password: pass,
                email: email,
                avatar: ''
            })
            if (!response?.data?.success) {
                console.log(response)
                setError(response?.data?.message)
            } else {
                alert('User register successfully')
            }
        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    const handleLogin = async () => {
        try {
            const { username, pass, email } = login
            const response = await axios.post(`${server}/login/login`, {
                username: username,
                password: pass,
                email: email
            })
            if (!response?.data?.success) {
                console.log(response)
                setError(response?.data?.message)
            } else {
                await signIn('credentials', {
                    username,
                    email
                });
                setLogin({
                    email: '',
                    pass: '',
                    username: '',
                })
            }
        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <div className='w-full flex items-center justify-center relative h-screen overflow-y-scroll mobile:pb-32 mobile:pt-96 mobile:fixed'>
            <div className='flex items-start justify-center flex-wrap'>
                <form className='flex flex-col items-center justify-center mx-4' onSubmit={(e: any) => { e.preventDefault(); handleRegister() }}>
                    <div className='font-semibold text-md'>Register</div>
                    <TextField id="filled-basic" label="Email" variant="filled"
                        sx={{ my: 2 }} required type='email'
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    />
                    <TextField id="filled-basic" label="Username" variant="filled"
                        sx={{ my: 2 }} required
                        onChange={(e) => setRegister({ ...register, username: e.target.value })}
                    />
                    <TextField id="filled-basic" label="Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        onChange={(e) => setRegister({ ...register, pass: e.target.value })}
                    />
                    <TextField id="filled-basic" label="Confirm Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        onChange={(e) => setRegister({ ...register, confirmPass: e.target.value })}
                    />
                    <Button type='submit' variant="outlined">Register</Button>
                </form>
                <form className='flex flex-col items-center justify-center mx-4' onSubmit={(e: any) => { e.preventDefault(); handleLogin() }}>
                    <div className='font-semibold text-md'>Login</div>
                    <TextField id="filled-basic" label="Email" variant="filled"
                        sx={{ my: 2 }} required type='email'
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                    <TextField id="filled-basic" label="Username" variant="filled"
                        sx={{ my: 2 }} required
                        onChange={(e) => setLogin({ ...login, username: e.target.value })}
                    />
                    <TextField id="filled-basic" label="Password" variant="filled" type='password'
                        sx={{ my: 2 }} required
                        onChange={(e) => setLogin({ ...login, pass: e.target.value })}
                    />
                    <Button type='submit' variant="outlined">Login</Button>
                </form>
            </div>
        </div>
    )
}