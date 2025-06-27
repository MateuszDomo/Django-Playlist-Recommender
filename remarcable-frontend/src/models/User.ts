export interface User {
  id: string,
  name: string,
}

export const createUser = (id: string, name: string): User => {
    return {
        id: id,
        name:name,
    }
}
