"use client"
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Checkbox } from './ui/checkbox'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Users2 } from 'lucide-react'
import { groups, User } from '@prisma/client'


type TGroup=groups & {
  users:Pick<User,"id" | "email" | "name">[]
}
const AddExpense = ({groups}:{groups:TGroup[]}) => {
  const [expense,setExpense]=useState({
    name : "",
    amount : 0,
    selectedGroup:"",
    selected:[]
  })

  const selectedGroupMembers=groups.find((group)=>group.id===expense.selectedGroup)?.users
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className='bg-primaryColor text-white font-semibold text-[1.05rem] p-2 rounded-full'>+ Add Expense</Button>
      </DialogTrigger>
      <DialogContent className='h-[80vh] w-[80vw] flex flex-col gap-8 justify-normal'>
        <DialogHeader className='h-fit'>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 justify-start'>
          <Input placeholder='Expense Name'/>
          <Input type='number' placeholder='Expense amount'/>
          <div className='my-4 mx-auto'>
            <p>Paid by <span className='text-primaryColor font-bold p-2 rounded-md'>You</span> and split <span className='text-primaryColor font-bold p-2 rounded-md'>among</span></p>
          </div>
          <div className='flex flex-col gap-4 h-[30vh] overflow-y-auto'>
            {groups.length>0?selectedGroupMembers?.map((user)=>(
            <div key={user.id} className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
              <Avatar>
                <AvatarFallback>
                  U
                </AvatarFallback>
                <AvatarImage src='https://github.com/a.png'/>
              </Avatar>
              </div>
              <Checkbox checked={expense.selected?.includes(user?.id)} onCheckedChange={e=>{
                if(e){
                    setExpense({...expense,selected:[...(expense.selected??[]),user.id]})
                }else{
                  setExpense({...expense,selected:expense.selected?.filter((id)=>id!==user.id)})
                }
              }}/>
                  </div>
            )):
            <p className='text-center text-lg font-semibold'>No groups found</p>}
          </div>
        </div>
        <DialogFooter className='mt-auto flex justify-between w-full'>
        <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 w-fit pl-2'><Users2 className='w-4 h-4'/> {expense.selectedGroup?groups.find((group)=>group.id===expense.selectedGroup)?.name:"Group"}</DropdownMenuTrigger>
  <DropdownMenuContent align='start'>
   {
    groups.length>0?groups.map((group)=>(
      <DropdownMenuItem onClick={()=>setExpense({...expense,selectedGroup:group.id})} key={group.id}>{group.name}</DropdownMenuItem>
    )):
    <DropdownMenuItem>No groups found</DropdownMenuItem>
   }
  </DropdownMenuContent>
</DropdownMenu>
<div className='w-full flex justify-end'>
          <Button className='bg-primaryColor w-fit text-white font-semibold text-[1.05rem] p-2 rounded-full'>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpense
