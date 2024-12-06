import { groups, User } from "@prisma/client"

export type TGroup=groups & {
    users:Pick<User,"id" | "email" | "name">[]
  }