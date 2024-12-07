"use client";
import React from 'react'
import SignOutButton from '../../(auth)/sign-out/sign-out-btn'
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';
import QrDialog from '@/components/qr-dialog';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ProfilePage = () => {
  const {data} = useSession();

  const generateQR = async (text:string) => {
    try {
      console.log(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col justify-between h-full'>
            <div className="text-sm text-muted-foreground mb-2 flex flex-col items-start gap-2">
              <div className='flex w-full items-start justify-between'>
                <div className='flex flex-col gap-2'>
        <Avatar>
          <AvatarImage src={data?.user?.image ?? ""} />
          <AvatarFallback>
            {data?.user?.name?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>   
        <p className='text-lg font-bold'>{data?.user?.name}</p>
        <p className='text-sm text-muted-foreground'>{data?.user?.email}</p>
        </div>
          <QrDialog/>
        </div>
        <div className='w-full mt-2'>
          <h2 className='font-bold'>Connected Wallets</h2>
          <ConnectButton />
        </div>
      </div>
       <SignOutButton/>
    </div>
  )
}

export default ProfilePage
