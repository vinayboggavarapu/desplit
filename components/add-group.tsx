"use client"
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Loader2, LucideUserRoundPlus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { groupSchema } from '@/schema/group.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { manageGroups } from '@/actions/manage-groups'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

const AddGroup = () => {
  const router=useRouter()
  const [open,setOpen]=useState(false)
  const form=useForm<z.infer<typeof groupSchema>>({
    resolver:zodResolver(groupSchema),
    defaultValues:{
        name:"",
        image:"",
        members:[],
    }
  })

  const members=form.watch("members")

  const {mutate:addGroup,isPending}=useMutation({
    mutationFn:async(data:z.infer<typeof groupSchema>)=>{
      await manageGroups({
        name:data.name,
        image:data.image,
        members:data.members.map((member)=>member.email)
      })
    },
    onSuccess:()=>{
      router.refresh()
      setOpen(false)
    },
    onError:(error)=>{
      toast({
        title:"Error",
        description:error.message,
        variant:"destructive"
      })
    }
  })

  const {append,remove}=useFieldArray({
    control:form.control,
    name:"members"
  })


  const onSubmit=async(data:z.infer<typeof groupSchema>)=>{
    addGroup(data)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='p-0'>
        <LucideUserRoundPlus className='text-primaryColor !size-6'/>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[80vh] w-[80vw] flex flex-col gap-8 justify-normal'>
        <DialogHeader className='h-fit'>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 justify-start h-full'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col gap-3'>
                <FormField name='name' render={({field})=>(
                    <FormItem>
                        <FormLabel>Group Name</FormLabel>
                        <FormControl>
                            <Input placeholder='Group Name' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField name='members' render={({field})=>(
                    <FormItem className='my-4'>
                        <FormLabel>Members</FormLabel>
                        <FormControl>
                            <div className='flex gap-2 flex-wrap'>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        members.map((member,index)=>(
                                            <div key={index} className='flex bg-primaryColor text-white p-2 rounded-md items-center gap-2'>
                                                {member.email}
                                                <X className='cursor-pointer text-xs' onClick={()=>remove(index)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            <Input placeholder='Members' onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    e.stopPropagation()
                                    e.preventDefault()
                                    append({
                                        email:e.currentTarget.value
                                    })
                                    e.currentTarget.value=""
                                }
                            }}/>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <DialogFooter className='!mt-auto'>
                <Button disabled={isPending} type='submit' className='bg-primaryColor text-white font-semibold text-[1.05rem] p-2 rounded-full'>{isPending?<Loader2 className='animate-spin'/>:"+ Add Group"}</Button>
                </DialogFooter>
            </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddGroup
