export type TGroup=groups & {
    users:Pick<User,"id" | "email" | "name">[]
  }