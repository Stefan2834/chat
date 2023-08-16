import React from 'react'
import './index.module.css'
import { useDefault } from '@/contexts/Default'
import DynamicWidthComponent from '@/components/DynamicWidth'

export default function Home() {
  const { navOpen } = useDefault()
  return (
    <DynamicWidthComponent navbar={navOpen}>
      <div className='flex items-center justify-center w-full h-screen text-4xl'>
        Aceasta pagina este in lucru, te rugam sa revi mai tarziu Home
      </div>
    </DynamicWidthComponent>
  )
}
