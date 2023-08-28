import { useEffect } from 'react';
import { useDefault } from '@/contexts/Default'
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function Index() {
    const { user, server } = useDefault()
    const router = useRouter()

    useEffect(() => {
        console.log(user)
        if (user) {
            axios.post(`${server}/users`, {
                name: user?.name,
                email: user?.email,
                image: user?.avatar
            })
                .then(data => {
                    console.log(data)
                    if (data.data.success) {
                        router.push('/main/home')
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            signIn()
        }
    }, [user])
    return null
}
