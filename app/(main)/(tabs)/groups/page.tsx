import { auth } from '@/auth'
import AddExpense from '@/components/add-expense'
import AddGroup from '@/components/add-group'
import RouteHeader from '@/components/route-header'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/db'
import { TGroup } from '@/types/group'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

const GroupsPage = async () => {
  const session = await auth();
  const groups = await prisma.groups.findMany({
    where:{
      users:{
        some:{
          email:session?.user?.email!
        },
      },
    },
    include:{
      users:{
        select:{
          id:true,
          email:true,
          name:true
        }
      }
    }
  })
  return (
    <div className='relative flex flex-col gap-5 container h-full'>
      <RouteHeader>
        <AddGroup/>
      </RouteHeader>
      <Suspense fallback={<Skeleton className='w-full h-[100px]'/>}>
       <h2 className='text-2xl font-semibold'>Hey {session?.user?.name}, you are owed total of <span className='font-semibold text-primaryColor'>$1000</span></h2>
       <div className='grid md:grid-cols-3 gap-12 p-5 max-h-[60vh] overflow-y-auto'>
        {groups.length>0?groups.map((group:TGroup)=>(
          <Link key={group.id} href={`/groups/${group.id}`}   className='flex items-center gap-4 hover:cursor-pointer'>
        <Image src={"/vercel.svg"} alt='user' width={70} height={70}/>
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold'>{group.name}</p>
          <p className='text-primaryColor'>you are owned $100</p>
          <div className='flex flex-col gap-2 text-sm'>
            <p>Vy owes you $100</p>
            <p>Show +2 more</p>
          </div>
        </div>
       </Link>
        )):
        <p className='text-center text-lg font-semibold'>No groups found</p>}
       </div>
        <div className='absolute bottom-2 right-2'>
          <AddExpense groups={groups}/>
        </div>
        </Suspense>
    </div>
  )
}

export default GroupsPage
