import Tabs from '@/components/tabs'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/utils/providers/query.provider'
import SessionWrapper from '@/utils/providers/session.provider'
import React from 'react'

const Layout =({children}:{children:React.ReactNode}) => {
  return (      
    //@ts-ignore
    <SessionWrapper>
      <QueryProvider>
    <div className='h-[100svh] overflow-clip flex flex-col'>
        <div className='flex-1 p-5 max-w-7xl w-full mx-auto'>
      {children}
      </div>
      <Tabs/>
    </div>
    </QueryProvider>
    <Toaster />
    </SessionWrapper>
  )
}

export default Layout
