import { getGroupById } from '@/actions/manage-groups'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import ExpenseListItem from './_components/expense-list-item'
import RemoveGroup from './_components/delete-event'
import SettleUp from './_components/settle-up'

const Page = async ({params}:{params:{id:string}}) => {
  const group=await getGroupById(params.id)
  return (
      <Suspense fallback={<Skeleton className='w-full h-[100px]'/>}>
    <div className='flex flex-col gap-4'>
      <div className='fixed top-5 left-0 flex items-center gap-2 justify-between w-full px-5'>
        <Link href="/groups" className='flex items-center gap-2'><ArrowLeft/>Back</Link>
        <RemoveGroup id={params.id}/>
        </div>
      <Image src={"/vercel.svg"} alt='group' width={100} height={100} className='w-[100vw] h-[30vh] object-cover'/>
      <div className='flex items-center justify-between'>
      <p>{group?.name}</p>
      <SettleUp group={group}/>
      </div>
      <div className='max-h-[48vh] h-full overflow-y-auto pr-2'>
      {
        group?.expenses.map((expense)=>(
<ExpenseListItem key={expense.id} expense={expense} group={group}/>
        ))
      }
      </div>
    </div>
      </Suspense>
  )
}

export default Page
