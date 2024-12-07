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

    const userEmailData=await prisma.user.findUnique({where:{email:session.user.email!}})
    try {
        const otherMembers=selected.map((id)=>({
            user_id:id,
            isPayee:false
        }))

        const payeeMembers=[...otherMembers,{
            isPayee:true,
            user_id:userEmailData?.id
        }]
    const expense=await prisma.expense.create({
        data:{
        amount,
        description,
        groupId,
        expense_members:{ 
            create: payeeMembers.map((e)=>({
                user_id:e.user_id!,
                group_id:groupId!,
                amount:amount/payeeMembers.length,
                isPayee:e.isPayee,
            }))
        }
        }

    })
        
    console.log("expense",expense)
    } catch (error:any) {
        console.log("error",error.message)
        return {
            success:false,
            error:error?.message
        }
        
    }

}