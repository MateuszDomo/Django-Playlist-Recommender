import type { BaseModel } from "./BaseModel"

export interface User extends BaseModel {
  username: string,
}

export const createUser = (id: string, username: string): User => {
  return {
    id: id,
    username:username,
  }
}
