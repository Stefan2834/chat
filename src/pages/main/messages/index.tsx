import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'

export default function Messages() {
  const [email, setEmail] = useState("")
  const router = useRouter()


  const handleSubmit = () => {
    router.push(`/main/messages/${email}`)
  }

  return (
    <div className='w-full h-full'>
      <Sidebar />
      <div className='w-full h-full flex justify-end'>
        <div className='w-[calc(100%-384px)] flex items-center justify-center h-screen flex-col'>
          <div className='text-lg font-semibold mb-4'>
            Find a user to talk with:
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className='flex items-center justify-center'>
            <TextField id="filled-basic" label="Email..." variant="filled" sx={{ width: '300px' }}
              value={email}
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type='submit'>Enter</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
