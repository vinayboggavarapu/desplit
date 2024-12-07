"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function manageGroups({
    name,
    image="",
    members
}:{
    name:string,
    image?:string,
    members:string[]
}) {
    const session = await auth();
    const membersList=[...members,session?.user?.email!];
    try {
        if(!session?.user) throw new Error("Unauthorized");
        await prisma.groups.create({
            data:{
                name,
                users : {
                    connect:membersList.map((member)=>({
                        email:String(member).toLowerCase()
                    }))
                },
                image
            }
        })
        return {
            success:true,
            message:"Group created successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"Failed to create group make sure each member is onboarded to the application."
        }
    }

}


export const getGroupById=async(id:string)=>{
    const session=await auth()
    if(!session?.user) throw new Error("Unauthorized")
    try {
        const group=await prisma.groups.findUnique({where:{id},include:{
            users:true,
            expenses:{
                include:{
                    expense_members:{
                        include:{
                            user:{
                                select:{
                                    id:true,
                                    name:true,
                                    email:true
                                }
                            }
                        }
                    }
                }
            }
        }})

        return group
    } catch (error) {
        console.log(error)
        return null
    }
}


export const deleteGroup=async(id:string)=>{
    const session=await auth()  
    if(!session?.user) throw new Error("Unauthorized")
    try {
        await prisma.groups.delete({where:{id}})
        return {
            success:true,
            message:"Group deleted successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:"Failed to delete group"
        }
    }
}
