"use client"
import { deleteGroup } from '@/actions/manage-groups'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const RemoveGroup = ({id}:{id:string}) => {
    const router=useRouter()
    const {mutate,isPending}=useMutation({
        mutationFn:()=>deleteGroup(id),
        onSuccess:()=>{
            router.push("/groups")
        }
    })
  return (
    <>
        <Button  disabled={isPending} variant="destructive" onClick={()=>{mutate()}}><Trash2/></Button>
        
    </>
  )
}

export default RemoveGroup
