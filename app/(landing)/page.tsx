'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const LandingPage = () => {
  const router=useRouter()
  useEffect(()=>{
    router.push('/groups')
  },[])

  return <div className='flex justify-center items-center h-screen'><Loader2 className='animate-spin size-12'/></div>
}

export default LandingPage
