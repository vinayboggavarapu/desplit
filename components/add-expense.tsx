"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Checkbox } from './ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Loader2, Users2 } from 'lucide-react'
import { User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { addExpense } from '@/actions/manage-expense'
import { TGroup } from '@/types/group'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AddExpense = ({groups}:{groups:TGroup[]}) => {
  const {data}=useSession()
  const router=useRouter()
  const [open,setOpen]=useState(false)
  const [expense,setExpense]=useState<{
    name : string,
    amount : number,
    selectedGroup:string,
    selected:string[]
  }>({
    name : "",
    amount : 0,
    selectedGroup:"",
    selected:[]
  })

  // console.log(groups)

  const  {mutate,isPending}=useMutation({
    mutationFn:async()=>{
      await addExpense({
        amount:expense.amount,
        description:expense.name,
        groupId:expense.selectedGroup,
        selected:expense.selected
      })
    },
    onSuccess:()=>{
      router.refresh()
      setOpen(false)
    }
  })

  const selectedGroupMembers=(groups.find((group)=>group.id===expense.selectedGroup)?.users)?.filter((user)=>user.email!==data?.user?.email)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className='bg-primaryColor text-white font-semibold text-[1.05rem] p-2 rounded-full'>+ Add Expense</Button>
      </DialogTrigger>
      <DialogContent className='h-[100svh] w-[100vw] md:h-[80vh] md:w-[80vw] flex flex-col gap-8 justify-normal'>
        <DialogHeader className='h-fit'>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 justify-start'>
          <Input onChange={(e)=>setExpense({...expense,name:e.target.value})} placeholder='Expense Name'/>
          <Input type='number' onChange={(e)=>setExpense({...expense,amount:Number(e.target.value)})} placeholder='Expense amount'/>
          <div className='my-4 mx-auto'>
            <p>Paid by <span className='text-primaryColor font-bold p-2 rounded-md'>You</span> and split <span className='text-primaryColor font-bold p-2 rounded-md'>among</span></p>
          </div>
          {expense.selectedGroup&&<div className='flex flex-col gap-4 h-[30vh] overflow-y-auto'>
            {groups.length>0?selectedGroupMembers?.map((user)=>(
            <div key={user.id} className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
              <Avatar>
                <AvatarFallback>
                  U
                </AvatarFallback>
                <AvatarImage src='https://github.com/a.png'/>
              </Avatar>
              <p>{user.name}</p>
              </div>
              <Checkbox checked={expense.selected.includes(user.id)} onCheckedChange={e=>{
                if(e){
                    setExpense({...expense,selected:[...(expense.selected??[]),user.id]})
                }else{
                  setExpense({...expense,selected:expense.selected?.filter((id)=>id!==user.id)})
                }
              }}/>
                  </div>
            )):
            <p className='text-center text-lg font-semibold'>No groups found</p>}
            </div>}
        </div>
        <DialogFooter className='mt-auto flex flex-row justify-between items-center w-full'>
          <div className='w-fit'>
        <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 pl-2'>
        <Users2 className='w-4 h-4'/> {expense.selectedGroup?groups.find((group)=>group.id===expense.selectedGroup)?.name:"Group"}
        </DropdownMenuTrigger>
  <DropdownMenuContent align='start'>
   {
    groups.length>0?groups.map((group)=>(
      <DropdownMenuItem onClick={()=>setExpense({...expense,selectedGroup:group.id})} key={group.id}>{group.name}</DropdownMenuItem>
    )):
    <DropdownMenuItem>No groups found</DropdownMenuItem>
   }
  </DropdownMenuContent>
</DropdownMenu>
</div>
<div className='w-fit md:w-full flex justify-end items-center'>
            <Button onClick={()=>mutate()} disabled={isPending||!expense.name||!expense.amount||!expense.selectedGroup||!expense.selected.length} className='bg-primaryColor text-white font-semibold text-[1.05rem] p-2 rounded-full'>{isPending?<Loader2 className='w-4 h-4 animate-spin'/>:"Save"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpense
