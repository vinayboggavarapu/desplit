"use client";
import React from 'react'
import SignOutButton from '../../(auth)/sign-out/sign-out-btn'
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = () => {
  const {data} = useSession();
  return (
    <div className='flex flex-col justify-between h-full'>
            <div className="text-sm text-muted-foreground mb-2 flex flex-col items-start gap-2">
        <Avatar>
          <AvatarImage src={data?.user?.image ?? ""} />
          <AvatarFallback>
            {data?.user?.name?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>   
        <p className='text-lg font-bold'>{data?.user?.name}</p>
        <p className='text-sm text-muted-foreground'>{data?.user?.email}</p>
        <div className='w-full mt-2'>
          <h2 className='font-bold'>Connected Wallets</h2>
        </div>
      </div>
       <SignOutButton/>
    </div>
  )
}

export default ProfilePage
