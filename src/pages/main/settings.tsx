import React from 'react'
import { useDefault } from '@/contexts/Default'
import DynamicWidthComponent from '@/components/DynamicWidth'

export default function Settings() {
  const { navOpen } = useDefault()
  return (
    <DynamicWidthComponent navbar={navOpen}>
      <div className='flex items-center justify-center w-full h-screen text-4xl'>
        Aceasta pagina este in lucru, te rugam sa revi mai tarziu Settings
      </div>
    </DynamicWidthComponent>
  )
}