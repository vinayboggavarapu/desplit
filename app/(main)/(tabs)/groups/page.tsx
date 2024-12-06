import { auth } from '@/auth'
import AddExpense from '@/components/add-expense'
import AddGroup from '@/components/add-group'
import RouteHeader from '@/components/route-header'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/lib/db'
import { cn } from '@/lib/utils'
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
      expenses:{
        include:{
          expense_members:{
            include:{
              user:true
            }
          }
        }
      },
      users:{
        select:{
          id:true,
          email:true,
          name:true
        }
      }
    }
  })

  const getTotalGroupLent=()=>{
    return groups.reduce((acc:number,group)=>{
      return acc+getLentAggregate(group.id)-getBorrowedAggregate(group.id)
    },0)
  }

  const getLentAggregate=(id:string)=>{
    const group=groups.find((group)=>group.id===id)
    const getLentAggregate=group?.expenses.reduce((acc:number,expense)=>{
      const isPayeeChecker=expense.expense_members.find((member)=>member.user?.email===session?.user?.email)
      return acc+(isPayeeChecker?.isPayee?expense.amount/expense.expense_members.length:0)
    },0)
    return getLentAggregate!
  }

  const getBorrowedAggregate=(id:string)=>{
    const group=groups.find((group)=>group.id===id)
    const getBorrowedAggregate=group?.expenses.reduce((acc:number,expense)=>{
      const isPayeeChecker=expense.expense_members.find((member)=>member.user?.email===session?.user?.email)
      return acc+(isPayeeChecker?.isPayee?0:expense.amount/expense.expense_members.length)
    },0)
    return getBorrowedAggregate!
  }

  const checkForLent=(id:string)=>{
    return getLentAggregate(id)-getBorrowedAggregate(id)>0?true:false
  }
  return (
    <div className='relative flex flex-col gap-5 container h-full'>
      <RouteHeader>
        <AddGroup/>
      </RouteHeader>
      <Suspense fallback={<Skeleton className='w-full h-[100px]'/>}>
       <h2 className={cn('text-2xl font-semibold')}>Hey {session?.user?.name}, {getTotalGroupLent()>0?'You are owed total of':'You have borrowed total of'} <span className={cn('font-semibold',getTotalGroupLent()>0?'text-primaryColor':'text-orange-300')}>${getTotalGroupLent()>0?getTotalGroupLent():getTotalGroupLent()*-1}</span></h2>
       <div className='grid md:grid-cols-3 gap-12 p-5 max-h-[60vh] overflow-y-auto'>
        {groups.length>0?groups.map((group:TGroup)=>(
          <Link key={group.id} href={`/groups/${group.id}`}   className='flex items-center gap-4 hover:cursor-pointer'>
        <Image src={"/vercel.svg"} alt='user' width={70} height={70}/>
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold'>{group.name}</p>
          <p className={cn('text-primaryColor',checkForLent(group.id)?'text-primaryColor':'text-orange-300')}>{checkForLent(group.id)?`You owe $${getLentAggregate(group.id)-getBorrowedAggregate(group.id)}`:`You have borrowed $${getBorrowedAggregate(group.id)-getLentAggregate(group.id)}`}</p>
          {/* <div className='flex flex-col gap-2 text-sm'>
            <p>Vy owes you $100</p>
            <p>Show +2 more</p>
          </div> */}
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
