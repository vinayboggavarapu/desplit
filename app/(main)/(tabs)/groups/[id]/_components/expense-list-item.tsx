"use client"
import { expense, expense_member, groups } from '@prisma/client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'


type Expense=expense & {
    expense_members:expense_member[]
}
const ExpenseListItem = ({expense,group}:{expense:Expense,group:any}) => {
    const {data:session}=useSession()
    const [open,setOpen]=useState(false)
    const [selectedExpenseId,setSelectedExpenseId]=useState<string|null>(null)

    const isPayee=(id:string)=>{
        return group?.expenses.find((expense:any)=>expense.id===id)?.expense_members.find((member:any)=>member.user?.email===session?.user?.email)?.isPayee
      }
    
      const payeeName=(id:string)=>{
        return group?.expenses.find((expense:any)=>expense.id===id)?.expense_members.find((member:any)=>member.isPayee)?.user?.name
      }

  return (
    <div onClick={()=>{setOpen(true);setSelectedExpenseId(expense.id)}} key={expense.id} className='flex gap-2 items-center justify-between'>
    <div className='flex gap-6 items-center'>
    <div className='p-2 rounded-md font-semibold text-sm w-fit'>
    <p>{format(expense.createdAt,"MMM")}</p>
    <p>{format(expense.createdAt,"dd")}</p>
    </div>
    <div>
    <p>{expense.description}</p>
    <p className='text-sm'>{isPayee(expense.id)?"You have paid":payeeName(expense.id)} <span>${expense.amount}</span></p>
    </div>
    </div>
    <p className={cn("text-sm text-end",isPayee(expense.id)?"text-primaryColor":"text-orange-300")}>{isPayee(expense.id)?"You lent":"You borrowed"} <br/> <span className={cn("text-primaryColor",isPayee(expense.id)?"primaryColor":"text-orange-300")}>${expense.amount-expense.amount/expense.expense_members.length}</span></p>
    {selectedExpenseId===expense.id&&<Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {expense.description}
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-2 mt-8'>   
                        {expense.expense_members.map((member:any)=>(
                            <div key={member.id} className='flex items-center justify-between'>
                                <p>{member.user?.name}</p>
                                <p>${member.amount}</p>
                            </div>
                        ))} 
                    </div>
                </DialogContent>
                </DialogHeader>
        </DialogContent>
    </Dialog>}
  </div>

  )
}

export default ExpenseListItem
