import React from 'react'
import Sidebar from '@/components/Sidebar'
import { useDefault } from '@/contexts/Default'

export default function Messages() {
  const { user } = useDefault()

  return (
    <div className='w-full h-screen bg-red-400'>
      <Sidebar email={user?.email} />
    </div>
  )
}
