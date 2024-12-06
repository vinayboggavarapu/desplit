"use server"
import { auth } from "@/auth"
import prisma from "@/lib/db"
export const addExpense=async({
    amount,
    description,
    groupId,
    selected
}:{
    amount:number,
    description:string,
    groupId:string,
    selected:string[]
})=>{
    const session=await auth()
    if(!session?.user) return {
        success:false,
        error:"You are not authenticated"
    }
    try {
        const otherMembers=selected.map((id)=>({
            user_id:id,
            isPayee:false
        }))

        const payeeMembers=[...otherMembers,{
            isPayee:true,
            user_id:session.user.id
        }]
    await prisma.expense.create({
        data:{
        amount,
        description,
        groupId,
        expense_members:{ 
            create: payeeMembers.map((e)=>({
                user_id:e.user_id!,
                group_id:groupId!,
                amount: e.isPayee?amount:amount/payeeMembers.length,
                isPayee:e.isPayee,
            }))
        }
        }
    })
        
    } catch (error:any) {
        return {
            success:false,
            error:error?.message
        }
        
    }

}