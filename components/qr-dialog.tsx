"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { QrCode } from 'lucide-react'
import QRCode from 'qrcode'
import Image from 'next/image'

const QrDialog = () => {
    const [qr,setQr]=useState<string>("")
    const generateQR = async (text:string) => {
        try {
          setQr(await QRCode.toDataURL(text))
        } catch (err) {
          console.error(err)
        }
      }

      useEffect(()=>{
        generateQR("Hello")
      },[])
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">
      <QrCode className='!size-5'/>
      </Button>
    </DialogTrigger>
    <DialogContent className='p-5'>
        <div className='flex flex-col items-center justify-center gap-4 mt-8'>
            <p className='text-sm'>Share this QR Code to make a payment to you</p>
      <Image src={qr} alt="QR Code" width={200} height={200}/>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default QrDialog
