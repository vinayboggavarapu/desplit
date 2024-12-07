"use client";
import React from 'react'
import SignOutButton from '../../(auth)/sign-out/sign-out-btn'
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, ExternalLink, QrCode, Users, Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';
import QrDialog from '@/components/qr-dialog';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import FundMeOnRamp from '@/components/fund-me.onramp';
import { Card } from '@/components/ui/card';
import { useAccount } from 'wagmi';

const ProfilePage = () => {
  const {data} = useSession();
  const {address} = useAccount()

  const generateQR = async (text:string) => {
    try {
      console.log(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex flex-col justify-between h-full max-w-3xl mx-auto'>
            <div className="text-sm text-muted-foreground mb-2 flex flex-col items-start gap-2">
              <div className='flex w-full items-start justify-between'>
                <div className='flex items-center gap-4'>
        <Avatar>
          <AvatarImage src={data?.user?.image ?? ""} className='size-10' />
          <AvatarFallback>
            {data?.user?.name?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>   
        <div className='flex flex-col gap-1'>
        <p className='text-2xl font-bold text-white'>{data?.user?.name}</p>
        <p className='text-base text-muted-foreground'>{data?.user?.email}</p>
        </div>
        </div>
          <QrDialog/>
        </div>

        <Card className="p-6 w-full bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-500" />
              Connected Wallet
            </h2>
            <div className="flex gap-2 ml-8">
              <ConnectButton />
            </div>
          </div>
            <FundMeOnRamp/>
        </Card>

        {address && <Card className="p-6 bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl w-full">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Joined Test Group</p>
                  <p className="text-xs text-zinc-400">2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-zinc-800">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Connected Wallet</p>
                  <p className="text-xs text-zinc-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>}

      </div>
       <SignOutButton/>
    </div>
  )
}

export default ProfilePage
