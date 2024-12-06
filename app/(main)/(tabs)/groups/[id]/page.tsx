import { getGroupById } from '@/actions/manage-groups'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { format } from 'date-fns'

const Page = async ({params}:{params:{id:string}}) => {
  const group=await getGroupById(params.id)
  console.log("group asdasd",group)
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
            <p className='text-sm'>You have paid <span className='text-primaryColor'>${expense.amount}</span></p>
            </div>
            </div>
            <p className='text-sm'>You owe <br/> <span className='text-primaryColor'>${expense.amount-expense.amount/expense.expense_members.length}</span></p>
          </div>
        ))
      }
    </div>
      </Suspense>
  )
}

export default Page
