"use client"
import { cn } from '@/lib/utils'
import { Activity, Circle, Scan, User, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const tabsSection=[
    {
        title:"Groups",
        icon: UsersRound ,
        href:"/groups"
    },
    // {
    //     title:"Scan",
    //     icon: Scan,
    //     href:"/activity"
    // },
    {
        title:"Profile",
        icon: Circle,
        href:"/profile"
    }
]
const Tabs = () => {
  const pathname=usePathname()
  return (
    <div className='flex mt-auto justify-center gap-8 border-t-2'>
        {tabsSection.map((tab)=>(
                <Link key={tab.title} href={tab.href} className={cn('flex flex-col p-2 items-center gap-2',pathname.startsWith(tab.href) && 'dark:text-primaryColor')}>
                <tab.icon className='text-sm size-5'/>
                <h3 className='text-sm'>{tab.title}</h3>
            </Link>
        ))}
      
    </div>
  )
}

export default Tabs
