"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { opBnbContractAddress } from '@/contracts/utils/opBnb/address'
import { tokenBnbBridgeAbi } from '@/contracts/utils/opBnb/cross-chain-bridge'
import { useSendTransaction } from 'wagmi'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { baseContractAddress } from '@/contracts/utils/base/address'
import {  tokenBaseSendAbi, tokenBridgeBaseAbi } from '@/contracts/utils/base/cross-chain-bridge'
import { sendTransaction } from 'viem/actions'
import { parseEther } from 'viem'
import { useRouter } from 'next/navigation'
import { updateGroupMembers } from '@/actions/manage-groups'

const SettleUp = ({group}:{group:any}) => {
    const [open,setOpen]=useState(false)
    const {data}=useSession()
    const {address}=useAccount()
    const router=useRouter()

    const [TobeSent,setTobeSent]=useState({
      groupId:"",
      email:"",
    })

  const {writeContract,error}=useWriteContract()
  const { data: hash, sendTransaction,isSuccess} = useSendTransaction()
  const [pending,setPending]=useState(false)

  const pairAmount=1*10**18 * 88
  const handleWriteContract=async({
    amount,
    receipent,
    email,
    groupId
  }:{
    receipent:string,
    amount:number,
    email:string,
    groupId:string
  })=>{
    setPending(true)
    sendTransaction({ to:receipent as `0x${string}` , value: parseEther(String(amount * 0.00025)) }  )

    // writeContract({
    //   address: baseContractAddress.BASE_BRIDGE_ADDRESS as `0x${string}`,
    //   abi: tokenBaseSendAbi,
    //   functionName: "transferWithDetails",
    //   args:[receipent,pairAmountConverted,email,groupId],
    //   account:address
    // })
  }


  useEffect(()=>{
    const settleUp=async()=>{ 
      if(isSuccess&&hash){
      console.log("isSuccess")
       await updateGroupMembers({groupId:group.id,email:data?.user?.email as string})
       router.refresh()
       setPending(false)
       setOpen(false)
    }
  }
  settleUp()
  },[isSuccess,hash])

  useEffect(()=>{
    setOpen(true)
  },[pending])
  // Temporary pair amount
 

  const handleSettleUp=async({
    receiver,
    amount,
    email,
    groupId
  }:{
    receiver:string,
    amount:number,
    email:string,
    groupId:string
  })=>{
    const pairAmountConverted=amount * pairAmount
    console.log("pairAmountConverted",pairAmountConverted)
    writeContract({
      address: opBnbContractAddress.bridgeAddress as `0x${string}`,
      abi: tokenBnbBridgeAbi,
      functionName: "mintTokens",
      args:[groupId,email]
    })
  }

 const allMembers=group?.users?.map((member:any)=>member.email).filter((member:any)=>member!==data?.user?.email)
  const getSettleMentAmountForUser=(email:string)=>{
    const settleMentAmount=group?.expenses.reduce((acc:number,expense:any)=>{
        const expenseMembers=expense.expense_members
        const payee=expenseMembers.find((member:any)=>member.user?.email===email)
        if(payee?.isPayee){
            return acc+expense.amount/expenseMembers.length
        }
        else{
          return acc
        }
      },0)

      const getPaidByTheUserAmount=group?.expenses.reduce((acc:number,expense:any)=>{
        const expenseMembers=expense.expense_members
        const payee=expenseMembers.find((member:any)=>member.user?.email===data?.user?.email)
        if(payee?.isPayee){
          return acc+expense.amount/expenseMembers.length
      }
      else{
        return acc
      }
    },0)
      console.log("SettleMent",settleMentAmount)
    return settleMentAmount-getPaidByTheUserAmount > 0 ? settleMentAmount-getPaidByTheUserAmount : 0
  }

  const getPrimaryAddressOfTheReceipent=({email}:{email:string})=>{
    const user=group?.users.find((user:any)=>user.email===email)
    return {address:user?.primaryAddress,chain:user?.primaryChain}
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
                            <Button onClick={()=>{
                              handleWriteContract({receipent:getPrimaryAddressOfTheReceipent({email:e}).address,amount:getSettleMentAmountForUser(e),email:e,groupId:group.id})
                            }
                            } disabled={pending}>{ pending?<Loader2 className='animate-spin'/>:"Pay"}</Button>
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
