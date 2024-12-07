"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"

export const updatePrimaryAccount=async(address:string,chainId:number)=>{
    const session=await auth()
    if(!session?.user) throw new Error("Unauthorized")
        const user=await prisma.user.findUnique({
            where:{
                email:session.user.email!
            }
        })
    await prisma.user.update({
        where:{
            id:user?.id
        },
        data:{
            primaryAddress:address,
            primaryChain:chainId.toString()
        }
    })
}
