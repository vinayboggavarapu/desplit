import { getGroupById } from '@/actions/manage-groups'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { format } from 'date-fns'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'

const Page = async ({params}:{params:{id:string}}) => {
  const group=await getGroupById(params.id)
  console.log("group asdasd",group)
  const session=await auth()
  
  const isPayee=(id:string)=>{
    return group?.expenses.find((expense)=>expense.id===id)?.expense_members.find((member)=>member.user?.email===session?.user?.email)?.isPayee
  }

  const payeeName=(id:string)=>{
    return group?.expenses.find((expense)=>expense.id===id)?.expense_members.find((member)=>member.isPayee)?.user?.name
  }
  return (
      <Suspense fallback={<Skeleton className='w-full h-[100px]'/>}>
    <div className='flex flex-col gap-4'>
        <Link href="/groups" className='fixed top-5 left-5 !z-[1000] flex items-center gap-2'><ArrowLeft/>Back</Link>
      <Image src={"/vercel.svg"} alt='group' width={100} height={100} className='w-[100vw] h-[30vh] object-cover'/>
      <p>{group?.name}</p>
      {
        group?.expenses.map((expense)=>(
          <div key={expense.id} className='flex gap-2 items-center justify-between'>
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
          </div>
        ))
      }
    </div>
      </Suspense>
  )
}

export default Page
