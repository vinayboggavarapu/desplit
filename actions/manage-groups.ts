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
                        email:member
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