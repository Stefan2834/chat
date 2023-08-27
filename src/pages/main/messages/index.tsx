import React from 'react'
import Sidebar from '@/components/Sidebar'
import { useDefault } from '@/contexts/Default'

export default function Messages() {
  const { user, socket } = useDefault()

  return (
    <div className='w-full h-full'>
      <Sidebar email={user?.email} socket={socket} />
    </div>
  )
}
