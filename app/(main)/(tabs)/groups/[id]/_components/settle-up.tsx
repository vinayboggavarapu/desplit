"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { opBnbContractAddress } from '@/contracts/utils/opBnb/address'
import { tokenBnbBridgeAbi } from '@/contracts/utils/opBnb/cross-chain-bridge'
import { useContractWrite } from 'wagmi'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { Loader2 } from 'lucide-react'

const SettleUp = ({group}:{group:any}) => {
    const [open,setOpen]=useState(false)
    const {data}=useSession()
    const {address}=useAccount()

  const {writeContract,isPending}=useWriteContract()

  const handleWriteContract=async({
    amount,
    email,
    groupId
  }:{
    amount:number,
    email:string,
    groupId:string
  })=>{
    writeContract({
      address: opBnbContractAddress.bridgeAddress as `0x${string}`,
      abi: tokenBnbBridgeAbi,
      functionName: "lockAndBurnTokens",
      args:[amount,groupId,email]
    })
  }


 const allMembers=group?.users?.map((member:any)=>member.email).filter((member:any)=>member!==data?.user?.email)
  const getSettleMentAmountForUser=(email:string)=>{
    const settleMentAmount=group?.expenses.reduce((acc:number,expense:any)=>{
        const expenseMembers=expense.expense_members
        console.log("expenseMembers",expenseMembers)
        const payee=expenseMembers.find((member:any)=>member.user?.email===email)
        if(payee?.isPayee && !allMembers.includes(data?.user?.email!)){
            return acc+expense.amount/expenseMembers.length
        }
      },0)
    return settleMentAmount
  }
  return (
    address&&<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
        <Button variant="outline" className='bg-primaryColor text-white'>
        Settle Up
      </Button> 
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Settle Up</DialogTitle>
            <div className='flex items-center'>
                {
                    allMembers?.map((e:any)=>{
                        return <div key={e} className='flex flex-col w-full items-start border-b border-gray-200 pb-2 justify-between flex-wrap'>
                            <p className='text-[0.85rem]'>{e}</p>
                            <div className='flex items-center gap-2 justify-between w-full'>
                            <p className='text-orange-300'>$ {getSettleMentAmountForUser(e)}</p>
                            <Button onClick={()=>handleWriteContract({amount:getSettleMentAmountForUser(e),email:e,groupId:group.id})} disabled={isPending}>{isPending?<Loader2 className='animate-spin'/>:"Pay"}</Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default SettleUp
