"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const SettleUp = ({group}:{group:any}) => {
    const [open,setOpen]=useState(false)
    const {data}=useSession()

    // console.log(group)


 const allMembers=group?.users?.map((member:any)=>member.email).filter((member:any)=>member!==data?.user?.email)

  const getSettleMentAmountForUser=(email:string)=>{
    const settleMentAmount=group?.expenses.reduce((acc:number,expense:any)=>{
        const expenseMembers=expense.expense_members

        const payee=expenseMembers.find((member:any)=>member.user?.email===email)
        if(payee?.isPayee && !allMembers.includes(email)){
            return acc+expense.amount
        }
        return acc
    },0)
    return settleMentAmount
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                        return <div key={e} className='flex w-full items-center justify-between'>
                            <p className='text-sm'>{e}</p>
                            <div className='flex items-center gap-2'>
                            <p className='text-orange-300'>$ {getSettleMentAmountForUser(e)}</p>
                            <Button>Pay</Button>
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
