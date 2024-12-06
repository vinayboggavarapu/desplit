import { z } from "zod";

export const groupSchema=z.object({
    name:z.string().min(1,{message:"Group name is required"}),
    image:z.string().optional(),
    members:z.array(z.object({
        email:z.string().email(),
    })).min(1,{message:"At least one member is required"}).max(5,{message:"Maximum 5 members are allowed"})
})